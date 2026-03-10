function mediaTimeline(){

let area=document.getElementById("media-view")

area.innerHTML=""

let medias=db.filter(x=>x.grupo==chatAtual && x.mKey)

medias.forEach(async m=>{

let blob=await localforage.getItem("media_"+m.mKey)

let url=URL.createObjectURL(blob)

let img=document.createElement("div")

img.style.backgroundImage="url("+url+")"
img.className="gal"

area.appendChild(img)

})

}
