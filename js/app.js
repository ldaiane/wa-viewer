let db=[]
let chatAtual=""

localforage.getItem("db").then(d=>{

if(d) db=d

renderLista()

})

function renderLista(){

let area=document.getElementById("chat-list")

area.innerHTML=""

let chats=[...new Set(db.map(x=>x.grupo))]

chats.forEach(c=>{

let row=document.createElement("div")

row.className="chat-row"

row.innerHTML=`

<div class="avatar">${c[0]}</div>
<div>${c}</div>
`

row.onclick=()=>abrirChat(c)

area.appendChild(row)

})

}

function abrirChat(nome){

chatAtual=nome

document.getElementById("home").style.display="none"
document.getElementById("chat").style.display="block"

document.getElementById("chat-name").innerText=nome

page=0

document.getElementById("messages").innerHTML=""

carregarMais()

}

function voltar(){

document.getElementById("chat").style.display="none"
document.getElementById("home").style.display="block"

}
