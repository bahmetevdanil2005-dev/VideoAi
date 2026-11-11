/* Озвучка и подготовка речи */
/* ---------- речь: цифры и сокращения словами ---------- */
const UN=["","один","два","три","четыре","пять","шесть","семь","восемь","девять","десять","одиннадцать","двенадцать","тринадцать","четырнадцать","пятнадцать","шестнадцать","семнадцать","восемнадцать","девятнадцать"],TN=["","","двадцать","тридцать","сорок","пятьдесят","шестьдесят","семьдесят","восемьдесят","девяносто"],HN=["","сто","двести","триста","четыреста","пятьсот","шестьсот","семьсот","восемьсот","девятьсот"];
const h3=(n,f)=>{const r=n%100,o=[HN[Math.floor(n/100)]],g=u=>f&&u==1?"одна":f&&u==2?"две":UN[u];if(r<20)o.push(g(r));else o.push(TN[Math.floor(r/10)],g(r%10));return o.filter(Boolean).join(" ")};
const num=n=>{if(n===0)return"ноль";const o=[];if(n>=1000){const k=Math.floor(n/1000),a=k%10,b=k%100;o.push(k==1?"":h3(k,1),a==1&&b!=11?"тысяча":a>1&&a<5&&(b<12||b>14)?"тысячи":"тысяч");n%=1000}o.push(h3(n));return o.filter(Boolean).join(" ")};
const LAT={fps:"эф пи эс",ai:"эй ай",html:"эйч ти эм эл",css:"си эс эс",js:"джей эс",api:"эй пи ай",hd:"эйч ди",tiktok:"тик ток",capcut:"кэп кат",app:"эпп",ok:"окей",ui:"ю ай",ux:"ю экс",vpn:"ви пи эн",pc:"пи си",x:"икс",k:"тысяч",gpt:"джи пи ти",pro:"про",ai3d:"эй ай"};
function speak(w){const tail=(w.match(/[,.!?:;—…]+$/)||[""])[0],core=w.replace(/^[«"'(]+|[»"')]+$|[,.!?:;—…]+$/g,"");let c=core.toLowerCase(),m;
 if(/^\d{1,6}$/.test(c))c=num(+c);else if(m=c.match(/^(\d{1,6})%$/))c=num(+m[1])+" процентов";else if(m=c.match(/^(\d{1,6})([a-zа-яё]+)$/i))c=num(+m[1])+" "+(LAT[m[2]]||m[2]);else if(LAT[c])c=LAT[c];
 return c+tail}
function sceneWords(s){const o=[];s.layers.filter(l=>l.type==="text"||l.type==="mega").forEach(l=>split(l.type==="mega"?String(l.text).toUpperCase():String(l.text)).forEach(x=>o.push({o:x,l})));return o}

/* ---------- озвучка: каждая сцена озвучивается отдельно, слова выравниваются по звуку ---------- */
async function voiceOver(){if(!S.sc)return;const sc=S.sc.scenes,jobs=[];
 sc.forEach((s,i)=>{const ws=sceneWords(s);if(ws.length)jobs.push({i,ws,say:ws.map(x=>speak(x.o.w))})});
 if(!jobs.length)return toast("Нет текста для озвучки");
 try{pause();const c=ac();await c.resume().catch(()=>{});let done=0;busy("Озвучка 0/"+jobs.length);
  const style="Говори по-русски дикторским голосом, подача: "+($("#tone2").value.trim()||S.tone)+". Читай текст дословно, ничего не добавляй и не пропускай.";
  const run=async j=>{for(let a=0;a<3&&!j.buf;a++){try{const b=await api("/tts",{text:j.say.join(" "),voice:cfg.voice,style});j.buf=await c.decodeAudioData(await b.arrayBuffer())}catch(e){j.err=e;await sleep(900*(a+1))}}busy("Озвучка "+(++done)+"/"+jobs.length)};
  const q=[...jobs];await Promise.all([0,1,2].map(async()=>{while(q.length)await run(q.shift())}));
  const bad=jobs.find(j=>!j.buf);if(bad)throw new Error("сцена "+(bad.i+1)+": "+(bad.err?.message||"ошибка"));
  busy("Подгоняю субтитры под голос…");const sr=c.sampleRate,fr=Math.round(sr*.01),LEAD=.15,PRE=.04;
  jobs.forEach(j=>{const d=j.buf.getChannelData(0),n=Math.floor(d.length/fr),env=new Float32Array(n);
   for(let k=0;k<n;k++){let s=0;for(let m=k*fr;m<k*fr+fr;m++)s+=d[m]*d[m];env[k]=Math.sqrt(s/fr)}
   let pk=0;for(const v of env)if(v>pk)pk=v;const th=Math.max(.008,pk*.06);let a=0,b=n-1;while(a<n-1&&env[a]<th)a++;while(b>a&&env[b]<th)b--;
   const w=j.say.map(s=>Math.max(1,(s.match(/[аеёиоуыэюя]/gi)||[]).length)+(/[,.!?:;—…]$/.test(s)?.8:0)),tot=w.reduce((x,y)=>x+y,0),len=b-a+1;let acc=0,avg=0;for(let k=a;k<=b;k++)avg+=env[k];avg/=len;
   const st=w.map(x=>{const v=Math.round(a+len*acc/tot);acc+=x;return v});
   const sn=st.map((v,k)=>{if(!k)return a;let bm=v,bv=1e9;for(let m=Math.max(a+1,v-12);m<=Math.min(b-1,v+12);m++)if(env[m]<bv){bv=env[m];bm=m}if(bv>=avg*.4)return v;while(bm<b-1&&env[bm]<th*2)bm++;return bm});
   sn.forEach((v,k)=>{if(k&&v<sn[k-1])sn[k]=sn[k-1]});
   j.a=a;j.b=b;j.vd=len*.01;j.ws.forEach(x=>x.l.wt=[]);j.ws.forEach((x,k)=>x.l.wt.push(+(Math.max(0,(sn[k]-a)*.01-.03)+LEAD).toFixed(3)));
   sc[j.i].dur=Math.max(1.4,LEAD+j.vd+.3)});
  timeline();const m=c.createBuffer(1,Math.ceil(S.total*sr)+sr,sr),md=m.getChannelData(0),fd=Math.round(.006*sr);
  jobs.forEach(j=>{const d=j.buf.getChannelData(0),s0=Math.max(0,j.a*fr-Math.round(PRE*sr)),s1=Math.min(d.length,(j.b+1)*fr+Math.round(.12*sr)),pos=Math.round((S.st[j.i]+LEAD)*sr)-(j.a*fr-s0);
   for(let k=s0;k<s1;k++){const o=pos+k-s0;if(o<0||o>=md.length)continue;const ki=k-s0,kj=s1-1-k;let g=1;if(ki<fd)g=ki/fd;if(kj<fd)g=Math.min(g,kj/fd);md[o]+=d[k]*g}});
  S.master=m;S.blob=null;tNow=0;frame(0);saveProj()}
 catch(e){S.master=null;toast("Озвучка: "+e.message.slice(0,110))}finally{busy()}}
$("#bvoice").onclick=voiceOver;
$("#bedit").onclick=()=>{const e=$("#editbox");e.style.display=e.style.display==="none"?"block":"none"};
$("#eapply").onclick=async()=>{const i=$("#einst").value.trim();if(!i)return;
 try{busy("Вношу правки…");const r=await api("/edit",{instruction:i,scenario:S.sc,catalog:CAT});const had=!!S.master;S.master=null;await show(r.scenario,true);if(had)toast("Голос устарел — нажмите «Озвучить»");$("#einst").value="";saveProj()}catch(e){toast(e.message.slice(0,120))}finally{busy()}};
