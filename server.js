const express = require('express');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const multer = require('multer');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use('/media', express.static(path.join(__dirname, 'media'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.opus')) res.set('Content-Type', 'audio/ogg; codecs=opus');
        if (filePath.endsWith('.pdf')) res.set('Content-Type', 'application/pdf');
    }
}));

const MEDIA_DIR = path.join(__dirname, 'media');
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR);
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

function parseWhatsAppTXT(content, sourceName) {
    const lines = content.split(/\r?\n/);
    const messages = [];
    const dateRegex = /^(\d{2}\/\d{2}\/\d{4})[ ,](\d{2}:\d{2})(?::\d{2})?\s?-\s?(.*?): (.*)$/;
    
    for (const line of lines) {
        const match = line.match(dateRegex);
        if (match) {
            const [, date, time, sender, text] = match;
            const mediaRegex = /([A-Z0-9_-]+\.(?:jpg|jpeg|png|gif|mp4|mov|mp3|ogg|opus|pdf|webp|doc|docx|xls|xlsx))/gi;
            let medias = [];
            let m;
            while ((m = mediaRegex.exec(text)) !== null) {
                medias.push(m[1]);
            }
            messages.push({
                timestamp: new Date(date.split('/').reverse().join('-') + 'T' + time).getTime(),
                dateStr: date,
                timeStr: time,
                sender: sender.trim(),
                text: text.includes('mídia omitida') ? '' : text,
                medias,
                source: sourceName
            });
        }
    }
    return messages;
}

app.post('/upload', upload.array('zips', 20), (req, res) => {
    let allMessages = [];
    req.files.forEach(file => {
        try {
            const zip = new AdmZip(file.path);
            zip.getEntries().forEach(e => {
                const fname = path.basename(e.entryName);
                if (fname.endsWith('.txt')) {
                    allMessages.push(...parseWhatsAppTXT(e.getData().toString('utf-8'), file.originalname));
                } else if (!e.isDirectory) {
                    fs.writeFileSync(path.join(MEDIA_DIR, fname), e.getData());
                }
            });
            fs.unlinkSync(file.path);
        } catch (err) { console.error("Erro no ZIP:", err); }
    });
    
    allMessages.sort((a, b) => a.timestamp - b.timestamp);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(allMessages, null, 2));
    res.redirect('/');
});

app.get('/messages', (req, res) => {
    if (fs.existsSync(MESSAGES_FILE)) res.sendFile(MESSAGES_FILE);
    else res.json([]);
});

app.listen(process.env.PORT || 3000, () => console.log('Servidor Online'));