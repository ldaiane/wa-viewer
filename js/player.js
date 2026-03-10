let audioAtual=null

function criarPlayer(url){

let div=document.createElement("div")

div.className="player"

div.innerHTML=`

<button>▶</button>

<div class="barra"><div class="prog"></div></div>

`

let btn=div.querySelector("button")
let prog=div.querySelector(".prog")

btn.onclick=()=>{

if(audioAtual) audioAtual.pause()

let audio=new Audio(url)

audioAtual=audio

audio.play()

audio.ontimeupdate=()=>{

prog.style.width=(audio.currentTime/audio.duration*100)+"%"

}

}

return div

}
