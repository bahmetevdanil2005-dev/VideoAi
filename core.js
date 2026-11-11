/* Общие утилиты, конфиг, состояние, toast/busy */

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],sleep=ms=>new Promise(r=>setTimeout(r,ms));
const LS=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},SV=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const cfg={api:"https://video-radar-api.bahmetevdanil2005.workers.dev",voice:"Fenrir",q:720,...LS("ms_cfg",{})};
const FONTS=[["Unbounded",900,.66],["Montserrat",900,.9],["Rubik",900,1],["Manrope",800,1.05],["Oswald",700,1.1],["Russo One",400,.95],["Bebas Neue",400,1.3],["Golos Text",900,1]];
const TONES=["Агрессивная","Позитивная","Новости","Разговорная","Обучающая","Дерзкая"];
const VOICES=["Fenrir","Puck","Charon","Kore","Zephyr","Orus","Leda","Aoede"];
const CAT={bg:["dark","light","accent","grid","rays","glow","studio","paper"],fx:["pop","slide","zoomin","stretch","type","strike","fade","gloss"],tr:["cut","flash","wipe","zoom","fade"],ch:["bar","line"],shp:["circle","ring","rect","line","arrow","play","ball","cube"],ico:["нет"],who:["нет"],models:["нет"],sfx:["нет"],music:["energetic"]};
const S={font:FONTS[0],pal:{bg:"#050505",tx:"#ffffff",ac:"#c8ff2e"},fmt:"9:16",dur:30,tone:TONES[0],sc:null,st:[],total:0,master:null,blob:null,id:null};
const icons=()=>lucide.createIcons();
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),2600)}
function busy(m){$("#busy").classList.toggle("on",!!m);$("#bt").textContent=m||""}
