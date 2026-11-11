/* Запись видео и скачивание */
/* ---------- export ---------- */
$("#dl").onclick=async()=>{if(!S.sc)return;if(!S.blob){try{await record()}catch(e){busy();if(gn)gn.gain.value=1;return toast("Запись не удалась: "+e.message.slice(0,90))}}$("#sheet").classList.add("on")};
async function record(){pause();tNow=0;busy("Записываю видео — не сворачивайте вкладку…");const st=cv.captureStream(30);
 if(S.master){gainN();gn.gain.value=0;dn.stream.getAudioTracks().forEach(x=>st.addTrack(x))}
 const mt=["video/mp4;codecs=avc1.42E01E,mp4a.40.2","video/mp4","video/webm;codecs=vp9,opus","video/webm"].find(m=>MediaRecorder.isTypeSupported(m));if(!mt)throw new Error("браузер не умеет записывать видео");
 const ch=[],rec=new MediaRecorder(st,{mimeType:mt,videoBitsPerSecond:cv.height>=1080?16e6:9e6,audioBitsPerSecond:192e3});rec.ondataavailable=e=>e.data.size&&ch.push(e.data);const done=new Promise(r=>rec.onstop=r);
 rec.start(500);await play();await new Promise(r=>{const iv=setInterval(()=>{$("#bt").textContent="Записываю видео… "+Math.round(tNow/S.total*100)+"%";if(!playing){clearInterval(iv);r()}},120)});await sleep(500);rec.stop();await done;if(gn)gn.gain.value=1;
 S.blob=new Blob(ch,{type:mt.split(";")[0]});S.ext=mt.includes("mp4")?"mp4":"webm";busy()}
const fname=()=>(S.sc.title||"video").replace(/[^\wа-яё-]+/gi,"_")+"."+S.ext;
$("#sv").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(S.blob);a.download=fname();a.click();$("#sheet").classList.remove("on")};
$("#ss").onclick=async()=>{const f=new File([S.blob],fname(),{type:S.blob.type});try{if(navigator.canShare?.({files:[f]}))await navigator.share({files:[f],title:S.sc.title});else toast("Отправка не поддерживается — сохраните файл")}catch{}$("#sheet").classList.remove("on")};
$("#sx").onclick=()=>$("#sheet").classList.remove("on");
