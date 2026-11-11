/* ---------- player (главные часы — звук) ---------- */
let playing=false,ready=false,t0=0,tNow=0,actx,gn,dn,srcN,useA=false;
const ac=()=>actx||(actx=new(window.AudioContext||window.webkitAudioContext)());
const gainN=()=>{if(!gn){const c=ac();gn=c.createGain();gn.connect(c.destination);dn=c.createMediaStreamDestination()}return gn};
const fm=x=>Math.floor(x/60)+":"+String(Math.floor(x%60)).padStart(2,"0");
const now=()=>useA?actx.currentTime-t0:performance.now()/1e3-t0;
const stopSrc=()=>{try{srcN&&srcN.stop()}catch{}srcN=null};
async function play(){if(!S.sc||playing)return;if(tNow>=S.total-.05)tNow=0;playing=true;ready=false;$("#pp").innerHTML='<i data-lucide="pause"></i>';icons();
 if(S.master){const c=ac();try{await c.resume()}catch{}if(!playing)return;gainN();stopSrc();srcN=c.createBufferSource();srcN.buffer=S.master;srcN.connect(gn);srcN.connect(dn);srcN.start(0,Math.min(tNow,S.master.duration-.05));t0=c.currentTime-tNow;useA=true}
 else{t0=performance.now()/1e3-tNow;useA=false}ready=true}
function pause(){playing=false;ready=false;stopSrc();$("#pp").innerHTML='<i data-lucide="play"></i>';icons()}
$("#pp").onclick=()=>playing?pause():play();
$("#seek").oninput=e=>{const was=playing;pause();tNow=e.target.value/1000*S.total;if(was)play()};
(function tick(){if(S.sc){if(playing&&ready){tNow=now();if(tNow>=S.total){tNow=S.total-.001;pause()}}frame(tNow);if(!document.activeElement||document.activeElement.id!=="seek")$("#seek").value=tNow/S.total*1000;$("#tm").textContent=fm(tNow)+" / "+fm(S.total)}requestAnimationFrame(tick)})();
