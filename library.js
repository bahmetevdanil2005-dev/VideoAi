/* ---------- library ---------- */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const lib=()=>LS("ms_lib",[]);
$("#aadd").onclick=()=>{const n=$("#an").value.trim(),c=$("#ac").value;if(!n||!c.trim())return toast("Нужны название и код");const l=lib();l.push({id:Date.now(),name:n,folder:$("#af").value.trim(),code:c});SV("ms_lib",l);$("#an").value=$("#af").value=$("#ac").value="";renderLib();toast("Ассет добавлен")};
function renderLib(){const l=lib();if(!l.length){$("#alist").innerHTML='<div class="empty"><i data-lucide="box"></i><p>Ассетов пока нет</p></div>';return icons()}
 const g={};l.forEach(a=>(g[a.folder||""]??=[]).push(a));
 $("#alist").innerHTML=Object.entries(g).map(([f,a])=>`<div class="card"><h3>${f?esc(f):"Без папки"}</h3>${a.map(x=>`<div class="it"><iframe sandbox="allow-scripts" srcdoc="${esc('<body style="margin:0;background:#000;color:#fff;display:grid;place-items:center;height:100vh;overflow:hidden">'+x.code)}"></iframe><div style="flex:1"><b>${esc(x.name)}</b><small>для режиссёра: «${esc(x.name)}»</small></div><button class="chip" data-d="${x.id}"><i data-lucide="trash-2"></i></button></div>`).join("")}</div>`).join("");
 $$("[data-d]").forEach(b=>b.onclick=()=>{SV("ms_lib",lib().filter(x=>x.id!=b.dataset.d));renderLib()});icons()}
