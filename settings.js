/* ---------- settings ---------- */
$("#sapi").value=cfg.api;$("#sq").value=cfg.q;
$("#svoice").innerHTML=VOICES.map(v=>`<option>${v}</option>`).join("");$("#svoice").value=cfg.voice;
["sapi","svoice","sq"].forEach(id=>$("#"+id).onchange=()=>{cfg.api=$("#sapi").value.trim();cfg.voice=$("#svoice").value;cfg.q=+$("#sq").value;SV("ms_cfg",cfg);toast("Сохранено")});
$("#wipe").onclick=()=>{if(confirm("Удалить все проекты и ассеты?")){SV("ms_proj",[]);SV("ms_lib",[]);toast("Удалено")}};
