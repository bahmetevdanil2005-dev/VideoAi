/* Загрузчик: подгружает разделы (views/), остров и оверлеи (partials/), затем скрипты по порядку.
   Чтобы сбросить кэш после правок — увеличьте VER здесь и в index.html. */
const VER=2;
const VIEWS=["create","library","projects","content","settings"];
const SCRIPTS=["core","island","create","settings","library","projects","director","voice","renderer","decorations","icons","scene","player","export","main"];
const get=u=>fetch(u+"?v="+VER).then(r=>{if(!r.ok)throw new Error(u+" — "+r.status);return r.text()});
(async()=>{try{
 const [isl,ovl,...views]=await Promise.all(["partials/island.html","partials/overlays.html",...VIEWS.map(v=>"views/"+v+".html")].map(get));
 document.getElementById("app").innerHTML=views.join("\n");
 document.body.insertAdjacentHTML("beforeend",isl+ovl);
 for(const f of SCRIPTS)await new Promise((ok,no)=>{const e=document.createElement("script");e.src="js/"+f+".js?v="+VER;e.async=false;e.onload=ok;e.onerror=()=>no(new Error("js/"+f+".js"));document.body.appendChild(e)});
}catch(e){document.body.insertAdjacentHTML("afterbegin",'<pre style="color:#fff;padding:24px;white-space:pre-wrap">Ошибка загрузки: '+e.message+'\nОткройте сайт через GitHub Pages или локальный веб-сервер, а не как файл с диска.</pre>')}})();
