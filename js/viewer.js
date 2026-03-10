function renderChat(){

const container=document.getElementById("chatContainer")

container.innerHTML=""

for(let msg of currentChat.messages){

const div=document.createElement("div")

div.className="msg"

if(msg.media){

const url=URL.createObjectURL(msg.media)

if(msg.media.type.startsWith("image"))
div.innerHTML=`<img src="${url}">`

else if(msg.media.type.startsWith("audio"))
div.innerHTML=`<audio controls src="${url}"></audio>`

else if(msg.media.type.startsWith("video"))
div.innerHTML=`<video controls src="${url}"></video>`

else
div.innerHTML=`<a href="${url}">${msg.media.name}</a>`

}else{

div.innerText=msg.sender+": "+msg.text

}

container.appendChild(div)

}

}

function sortMessages(){

currentChat.messages.sort((a,b)=>new Date(a.date)-new Date(b.date))

}
