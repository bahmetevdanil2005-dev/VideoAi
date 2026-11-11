/* Плавающий остров: переключение разделов */
function tab(i){$$(".view").forEach((v,j)=>v.classList.toggle("on",i==j));$$("#island button").forEach((b,j)=>b.classList.toggle("on",i==j));if(i==1)renderLib();if(i==2)renderProj();scrollTo(0,0)}
$$("#island button").forEach(b=>b.onclick=()=>tab(+b.dataset.i));
