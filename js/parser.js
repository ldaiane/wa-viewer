function parseWhatsApp(text){

const lines = text.split("\n")

for(let line of lines){

const regex=/(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}) - (.*?): (.*)/

const match=line.match(regex)

if(match){

const date=match[1]
const time=match[2]
const sender=match[3]
const message=match[4]

currentChat.messages.push({

sender:sender,
text:message,
date:new Date(date+" "+time)

})

}

}

sortMessages()

renderChat()

}
