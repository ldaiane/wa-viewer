let page=0
let pageSize=100

function carregarMais(){

let msgs=db
.filter(m=>m.grupo==chatAtual)
.sort((a,b)=>b.ts-a.ts)
.slice(page*pageSize,(page+1)*pageSize)

msgs.reverse().forEach(renderMsg)

page++

}

document.getElementById("messages").addEventListener("scroll",e=>{

if(e.target.scrollTop<100){

carregarMais()

}

})
