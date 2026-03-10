let currentChat = {messages:[]}

document.getElementById("importZip").addEventListener("change", async e => {

const file = e.target.files[0]

await openZip(file)

})

document.getElementById("importFolder").addEventListener("change", e => {

loadFolder(e.target.files)

})

document.getElementById("addMediaBtn").onclick = ()=>{

document.getElementById("addMediaInput").click()

}

document.getElementById("addMediaInput").onchange = e => {

const files = e.target.files

for(let file of files){

currentChat.messages.push({

sender:"arquivo",
date:new Date(),
text:"",
media:file

})

}

sortMessages()

renderChat()

}
