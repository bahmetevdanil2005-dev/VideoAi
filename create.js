/* Раздел «Создать»: шрифты, цвета, форматы, подача */
function chips(el,items,get,set,fmt=x=>x){const r=$(el);r.innerHTML=items.map((x,i)=>`<button class="chip${get(x)?" on":""}" data-i="${i}">${fmt(x)}</button>`).join("");r.querySelectorAll("button").forEach(b=>b.onclick=()=>{set(items[b.dataset.i]);chips(el,items,get,set,fmt)})}
const drawFonts=()=>{$("#fonts").innerHTML=FONTS.map((f,i)=>`<button class="fc${f===S.font?" on":""}" data-i="${i}"><b style="font:${f[1]} ${(30*f[2]).toFixed(1)}px '${f[0]}'">Моушен</b><small>${f[0]}</small></button>`).join("");$$("#fonts button").forEach(b=>b.onclick=()=>{S.font=FONTS[b.dataset.i];drawFonts()})};
function setPal(p){Object.assign(S.pal,p);["bg","tx","ac"].forEach((k,i)=>$("#c"+i).value=S.pal[k])}
["#c0","#c1","#c2"].forEach((id,i)=>$(id).oninput=e=>S.pal[["bg","tx","ac"][i]]=e.target.value);
$("#pick").onclick=()=>$("#photo").click();
$("#photo").onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{setPal(extract(im));toast("Цвета подобраны — можно поправить")};im.src=URL.createObjectURL(f)};
function extract(img){const c=document.createElement("canvas");c.width=c.height=48;const x=c.getContext("2d");x.drawImage(img,0,0,48,48);const d=x.getImageData(0,0,48,48).data,b={};
 for(let i=0;i<d.length;i+=4){const k=[d[i]>>5,d[i+1]>>5,d[i+2]>>5]+"";const o=b[k]||(b[k]=[0,0,0,0]);o[0]+=d[i];o[1]+=d[i+1];o[2]+=d[i+2];o[3]++}
 const cols=Object.values(b).map(o=>[o[0]/o[3],o[1]/o[3],o[2]/o[3],o[3]]).sort((a,b)=>b[3]-a[3]).slice(0,10);
 const L=c=>.3*c[0]+.59*c[1]+.11*c[2],Sa=c=>Math.max(...c.slice(0,3))-Math.min(...c.slice(0,3));
 const by=f=>[...cols].sort((a,b)=>f(b)-f(a))[0],mix=(c,t,k)=>c.slice(0,3).map((v,i)=>v+(t[i]-v)*k);
 const hx=c=>"#"+c.map(v=>Math.round(v).toString(16).padStart(2,"0")).join("");
 return{bg:hx(mix(by(c=>-L(c)),[0,0,0],.75)),tx:hx(mix(by(L),[255,255,255],.85)),ac:hx(by(c=>Sa(c)+L(c)*.3).slice(0,3))}}
chips("#fmt",["9:16","16:9","1:1"],x=>x===S.fmt,x=>S.fmt=x);
chips("#dur",[15,30,45,60],x=>x===S.dur,x=>S.dur=x,x=>x+" сек");
chips("#tone",TONES,x=>x===S.tone&&!$("#tone2").value,x=>{S.tone=x;$("#tone2").value=""});
$("#tone2").oninput=()=>chips("#tone",TONES,x=>x===S.tone&&!$("#tone2").value,x=>{S.tone=x;$("#tone2").value=""});
drawFonts();setPal({});
