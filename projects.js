/* ---------- projects ---------- */
const projs=()=>LS("ms_proj",[]);
function saveProj(){if(!S.sc)return;const l=projs(),m={id:S.id||(S.id=Date.now()),title:S.sc.title||"Видео",date:new Date().toLocaleDateString("ru"),sc:S.sc,meta:{font:S.font[0],pal:S.pal,fmt:S.fmt,dur:S.dur,tone:S.tone,topic:$("#topic").value,wish:$("#wish").value}},i=l.findIndex(x=>x.id==m.id);i<0?l.unshift(m):l[i]=m;SV("ms_proj",l.slice(0,40))}
function renderProj(){const l=projs();if(!l.length){$("#plist").innerHTML='<div class="empty"><i data-lucide="film"></i><p>Созданные видео появятся здесь</p></div>';return icons()}
 $("#plist").innerHTML=`<div class="card">${l.map(p=>`<div class="it"><div style="flex:1"><b>${esc(p.title)}</b><small>${p.date} · ${p.meta.fmt} · ${p.sc.scenes.length} сцен</small></div><button class="chip" data-o="${p.id}">Открыть</button><button class="chip" data-x="${p.id}"><i data-lucide="trash-2"></i></button></div>`).join("")}</div>`;
 $$("[data-o]").forEach(b=>b.onclick=()=>openProj(b.dataset.o));$$("[data-x]").forEach(b=>b.onclick=()=>{SV("ms_proj",projs().filter(x=>x.id!=b.dataset.x));renderProj()});icons()}
async function openProj(id){const p=projs().find(x=>x.id==id);if(!p)return;const m=p.meta;S.font=FONTS.find(f=>f[0]===m.font)||FONTS[0];setPal(m.pal);S.fmt=m.fmt;S.dur=m.dur;S.tone=m.tone;S.id=p.id;S.master=null;
 $("#topic").value=m.topic||"";$("#wish").value=m.wish||"";drawFonts();chips("#fmt",["9:16","16:9","1:1"],x=>x===S.fmt,x=>S.fmt=x);chips("#dur",[15,30,45,60],x=>x===S.dur,x=>S.dur=x,x=>x+" сек");
 tab(0);await show(p.sc,false);$("#res").scrollIntoView({behavior:"smooth"})}
