/* ИИ-режиссёр: запросы к воркеру */
/* ---------- director API ---------- */
async function api(p,b){const r=await fetch(cfg.api.replace(/\/$/,"")+p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});
 if(!r.ok){let e;try{e=(await r.json()).error}catch{}throw new Error(e||"Ошибка "+r.status)}return p==="/tts"?r.blob():r.json()}
const HINT=()=>`Подача: ${$("#tone2").value.trim()||S.tone}. Шрифт: ${S.font[0]}. Палитра: фон ${S.pal.bg}, текст ${S.pal.tx}, акцент ${S.pal.ac}. Формат ${S.fmt}. Ролик строго про тему пользователя: всё, что он просит показать или нарисовать, рисуй конкретно (иконки по теме, svg-иллюстрации предметов, нужные макеты), без посторонних тем.${lib().length?" Ассеты пользователя (слой asset по name): "+lib().map(a=>a.name+(a.folder?" ("+a.folder+")":"")).join(", ")+".":""}`;
async function gen(voice){const topic=$("#topic").value.trim();if(!topic)return toast("Введите тему видео");
 try{busy("ИИ-режиссёр пишет сценарий…");const wish=$("#wish").value.trim();
  const r=await api("/director",{brief:topic+(wish?". Пожелания: "+wish:""),dur:S.dur,format:S.fmt,style:"premium kinetic typography",tone:$("#tone2").value.trim()||S.tone,hint:HINT(),visualPrompt:wish,catalog:CAT});
  S.id=null;S.master=null;await show(r.scenario,false);
  if(voice)await voiceOver();saveProj();$("#res").scrollIntoView({behavior:"smooth"})}
 catch(e){toast(e.message.slice(0,120))}finally{busy()}}
$("#go1").onclick=()=>gen(true);$("#go0").onclick=()=>gen(false);

