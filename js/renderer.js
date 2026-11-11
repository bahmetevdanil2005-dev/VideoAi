/* Рендер: шкала времени, субтитры, фигуры */
/* ---------- renderer ---------- */
const cv=$("#cv"),main=cv.getContext("2d"),oc=document.createElement("canvas");let cx=main;
const E={out:x=>1-(1-x)**3,back:x=>1+2.7*(x-1)**3+1.7*(x-1)**2,cl:x=>Math.max(0,Math.min(1,x))};
const rgba=(h,a)=>{const n=parseInt(h.slice(1),16);return`rgba(${n>>16},${n>>8&255},${n&255},${a})`};
function timeline(){let t=0;S.st=S.sc.scenes.map(s=>{const a=t;t+=s.dur;return a});S.total=t}
async function show(sc,keep){S.sc=sc;S.blob=null;timeline();const[a,b]=S.fmt.split(":").map(Number),q=+cfg.q;
 if(a>=b){cv.height=q;cv.width=Math.round(q*a/b)}else{cv.width=q;cv.height=Math.round(q*b/a)}
 await Promise.all([...FONTS.map(f=>document.fonts.load(`${f[1]} 40px "${f[0]}"`,"Аб"))]);
 $("#res").style.display="block";pause();tNow=0;frame(0);icons()}
const split=s=>{const o=[];let k="";String(s).split("\n").forEach((row,li)=>{let first=li>0;row.split(/([*^~])/).forEach(g=>{if(g==="*"||g==="^"||g==="~"){k=k===g?"":g;return}g.split(/\s+/).filter(Boolean).forEach(w=>{if(o.length&&!first&&/^[.,!?…:;]+$/.test(w)){o[o.length-1].w+=w;return}o.push({w,m:k==="*"||k==="^",k,nl:first});first=false})})});return o};
function bar(x,y,hw,th,col,p){if(p<=0)return;cx.save();cx.translate(x,y);cx.lineCap="round";cx.beginPath();cx.moveTo(-hw,0);cx.lineTo(-hw+2*hw*p,0);cx.strokeStyle="rgba(0,0,0,.35)";cx.lineWidth=th*1.25;cx.stroke();cx.strokeStyle=col;cx.lineWidth=th;cx.stroke();cx.restore()}
/* Субтитры: ровный текст, слова появляются быстро и мягко, буквы растягиваются при появлении */
function textL(L,lt,C,mega){const W=cv.width,H=cv.height,t=lt-(L.at||0),wt=L.wt;if(!wt&&t<0)return;
 const ws=split(String(L.text||"").toUpperCase());if(!ws.length)return;
 const P=S.pal,sub=!!L.sub,wide=+L.wide||1,Mn=Math.min(W,H),barC=C.acc?P.bg:P.ac,left=L.align==="left";
 let fs=(sub?(L.size||.05):Math.max(L.size||.1,mega?.14:.1))*Mn*(mega?1.7:1.45);
 const FS=o=>fs*(o.k==="*"&&!sub?1.14:1),WF=o=>wide*(o.k==="*"&&!sub?1.1:1),fnt=o=>`${S.font[1]} ${FS(o)}px "${S.font[0]}"`;
 const meas=()=>ws.forEach(o=>{cx.font=fnt(o);o.rw=cx.measureText(o.w).width;o.mw=o.rw*WF(o)});meas();
 const mx=Math.max(...ws.map(o=>o.mw));if(mx>W*.9){fs*=W*.9/mx;meas()}
 const sp=fs*.26,lines=[];let ln=[],lw=0;ln.lw=0;lines.push(ln);
 ws.forEach(o=>{if(ln.length&&(o.nl||lw+sp+o.mw>W*.9)){ln=[];ln.lw=0;lines.push(ln);lw=0}lw+=(ln.length?sp:0)+o.mw;ln.push(o);ln.lw=lw});
 const lh=fs*1.1,bw=Math.max(...lines.map(l=>l.lw)),cxL=(L.x??.5)*W,cyL=(L.y??.5)*H,y0=cyL-lines.length*lh/2+lh/2,fx=mega?(L.dir==="up"?"up":"slide"):(L.fx||"pop");
 let idx=0,chars=0;cx.save();cx.textBaseline="middle";
 lines.forEach((ln,li)=>{let x=left?cxL-bw/2:cxL-ln.lw/2;const y=y0+li*lh;
  ln.forEach(o=>{const tw=wt?lt-(wt[idx]??0):t-idx*.09,p=E.out(E.cl(tw/.12)),isLast=idx===ws.length-1,acc=o.k==="*";idx++;const cxw=x+o.mw/2;let s=1,dx=0,dy=0,w=o.w;
   if(fx==="pop"||fx==="gloss")s=.94+.06*p;else if(fx==="zoomin")s=1+.25*(1-p);
   else if(fx==="slide")dx=(L.dir==="right"?1:-1)*(L.dir?W:0)*(1-p),dy=L.dir?0:fs*.5*(1-p);else if(fx==="up")dy=H*.08*(1-p);
   else if(fx==="type"){const n=wt?Math.ceil(o.w.length*p):Math.floor(t*30)-chars;w=w.slice(0,Math.max(0,n));chars+=o.w.length+1;if(!w)return x+=o.mw+sp}
   if(p<=0)return x+=o.mw+sp;
   const kp=o.k==="~"?E.out(E.cl((tw-.35)/.3)):0,useBox=o.k==="^"||(acc&&(C.inv||C.acc||L.hl)),bc=C.inv?[P.ac,P.bg]:C.acc?[P.bg,P.ac]:[P.ac,P.bg];
   cx.save();cx.globalAlpha=(fx==="type"?1:p)*(1-.45*kp)*(sub?.85:1);cx.translate(cxw+dx,y+dy);cx.scale(s*WF(o),s);
   if(useBox){const bp=E.out(E.cl((tw-.05)/.2));cx.fillStyle=bc[0];cx.beginPath();cx.roundRect(-o.rw/2-fs*.14,-fs*.58,(o.rw+fs*.28)*bp,fs*1.16,fs*.14);cx.fill()}
   const col=useBox?bc[1]:acc?C.a:C.f,f2=FS(o),dotEnd=isLast&&o.w.length>1&&o.w.endsWith(".")&&!useBox&&o.k!=="~";cx.font=fnt(o);cx.textAlign="left";
   if(acc&&!useBox&&!C.inv&&!C.acc){cx.shadowColor=rgba(P.ac,.5);cx.shadowBlur=fs*.28}
   const pre=[0];for(let j=1;j<=o.w.length;j++)pre.push(cx.measureText(o.w.slice(0,j)).width);
   const paint=(c,px,cl)=>{if(fx==="gloss"){for(let k=10;k>0;k--){cx.fillStyle=mixc(cl,"#000000",.5+k*.02);cx.fillText(c,px+k*.3,k*.65)}const g=cx.createLinearGradient(0,-f2*.5,0,f2*.5);g.addColorStop(0,mixc(cl,"#ffffff",.55));g.addColorStop(.55,cl);g.addColorStop(1,mixc(cl,"#000000",.3));cx.fillStyle=g;cx.fillText(c,px,0);cx.strokeStyle="rgba(255,255,255,.5)";cx.lineWidth=f2*.012;cx.strokeText(c,px,0)}else{cx.fillStyle=cl;cx.fillText(c,px,0)}};
   const amt=acc?1.5:1.1;
   for(let j=0;j<w.length;j++){const lp=E.out(E.cl((tw-j*.022)/.2)),a=E.cl(lp*2.5);if(a<=0)continue;const lw2=pre[j+1]-pre[j];
    cx.save();cx.globalAlpha*=a;cx.translate(-o.rw/2+pre[j]+lw2/2,0);cx.scale(1+amt*(1-lp),1);paint(w[j],-lw2/2,dotEnd&&j===o.w.length-1?barC:col);cx.restore()}
   cx.shadowColor="transparent";if(o.k==="~")bar(0,fs*.04,o.rw/2+fs*.1,fs*.14,barC,kp);
   cx.restore();x+=o.mw+sp});
  if(fx==="strike"){const p=E.out(E.cl((wt?lt-(wt[wt.length-1]||0)-.1:t-.5)/.4));bar(left?cxL-bw/2+ln.lw/2:cxL,y,ln.lw/2+fs*.1,fs*.14,barC,p)}});
 cx.restore()}
function shape(L,lt,C){const W=cv.width,H=cv.height,t=lt-(L.at||0);if(t<0)return;const p=E.back(E.cl(t/.5)),r=(L.size||.2)*Math.min(W,H)*.5*p,x=(L.x??.5)*W,y=(L.y??.5)*H,k=L.kind;
 cx.save();cx.translate(x,y);cx.fillStyle=cx.strokeStyle=C.a;cx.lineWidth=r*.12;cx.lineCap="round";cx.beginPath();
 if(k==="circle")cx.arc(0,0,r,0,7),cx.fill();else if(k==="rect")cx.roundRect(-r,-r*.7,r*2,r*1.4,r*.2),cx.fill();
 else if(k==="line")cx.moveTo(-r*2*E.out(E.cl(t/.5)),0),cx.lineTo(r*2*E.out(E.cl(t/.5)),0),cx.stroke();
 else if(k==="arrow")cx.moveTo(-r,0),cx.lineTo(r,0),cx.moveTo(r*.3,-r*.6),cx.lineTo(r,0),cx.lineTo(r*.3,r*.6),cx.stroke();
 else if(k==="play"){cx.roundRect(-r,-r,r*2,r*2,r*.35);cx.fill();cx.beginPath();cx.fillStyle=C.b;cx.moveTo(-r*.3,-r*.5);cx.lineTo(r*.55,0);cx.lineTo(-r*.3,r*.5);cx.fill()}
 else if(k==="ball"){const R=r*.5,u=(t%1.1)/1.1,d=4*u*(1-u),sq=d<.15?(.15-d)/.15*.3:0;cx.fillStyle="rgba(128,128,128,.5)";cx.fillRect(-r*2,R,r*4,2);cx.translate(0,-r*2*d-R*sq);cx.scale(1+sq,1-sq);ball(R,S.pal.ac)}
 else if(k==="cube"){cx.rotate(Math.sin(t*1.5)*.08);cube(r,S.pal.ac)}
 else cx.arc(0,0,r*(1+.06*Math.sin(t*5)),0,7),cx.stroke();cx.restore()}
