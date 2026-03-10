function loadFolder(files){

for(let file of files){

if(file.name.endsWith(".txt")){

file.text().then(parseWhatsApp)

}else{

currentChat.messages.push({

sender:"arquivo",
date:new Date(),
media:file

})

}

}

renderChat()

}
