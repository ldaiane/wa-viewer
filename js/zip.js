async function openZip(file){

const zip=await JSZip.loadAsync(file)

zip.forEach(async(path,entry)=>{

if(path.endsWith(".txt")){

const text=await entry.async("text")

parseWhatsApp(text)

}

if(!entry.dir && !path.endsWith(".txt")){

const blob=await entry.async("blob")

const mediaFile=new File([blob],path)

currentChat.messages.push({

sender:"arquivo",
date:new Date(),
media:mediaFile

})

}

})

}
