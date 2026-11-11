/* Фон, кадр, motion blur, зерно */
function bgDraw(id,C,lt){const W=cv.width,H=cv.height;cx.fillStyle=C.b;cx.fillRect(0,0,W,H);
 if(id==="rays"){cx.save();cx.translate(W/2,H/2);cx.rotate(lt*.2);cx.strokeStyle=rgba(S.pal.ac,.4);cx.lineWidth=4;for(let k=0;k<30;k++){cx.rotate(Math.PI/15);cx.beginPath();cx.moveTo(H*.12,0);cx.lineTo(H,0);cx.stroke()}cx.restore()}
 else if(id==="grid"){cx.strokeStyle=rgba(S.pal.ac,.5);cx.lineWidth=2;const hz=H*.5;for(let i=-10;i<=10;i++){cx.beginPath();cx.moveTo(W/2+i*W*.03,hz);cx.lineTo(W/2+i*W*.28,H);cx.stroke()}for(let i=0;i<10;i++){const z=((i+lt*.6)%10)/10,y=hz+(H-hz)*z*z;cx.beginPath();cx.moveTo(0,y);cx.lineTo(W,y);cx.stroke()}}
 else if(id==="studio"){let g=cx.createLinearGradient(0,0,0,H);g.addColorStop(0,mixc(S.pal.bg,"#ffffff",.3));g.addColorStop(1,mixc(S.pal.bg,"#ffffff",.08));cx.fillStyle=g;cx.fillRect(0,0,W,H);g=cx.createRadialGradient(W/2,H*1.02,0,W/2,H*1.02,H*.42);g.addColorStop(0,rgba(S.pal.ac,.75));g.addColorStop(1,rgba(S.pal.ac,0));cx.fillStyle=g;cx.fillRect(0,0,W,H)}
 else if(id==="paper"){cx.fillStyle="rgba(0,0,0,.08)";const q=W*.045;for(let X=q/2;X<W;X+=q)for(let Y=q/2;Y<H;Y+=q)cx.fillRect(X,Y,2,2)}
 else if(!C.inv&&!C.acc){const g=cx.createRadialGradient(W/2,H/2,0,W/2,H/2,H*.7);g.addColorStop(0,rgba(S.pal.ac,id==="glow"?.35:.1));g.addColorStop(1,rgba(S.pal.ac,0));cx.fillStyle=g;cx.fillRect(0,0,W,H)}}
const mixc=(a,b,k)=>{const f=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),A=f(a),B=f(b);return"#"+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,"0")).join("")};
const NZ=(()=>{const c=document.createElement("canvas");c.width=c.height=128;const x=c.getContext("2d"),d=x.createImageData(128,128);for(let i=0;i<d.data.length;i+=4){d.data[i]=d.data[i+1]=d.data[i+2]=Math.random()*255;d.data[i+3]=26}x.putImageData(d,0,0);return c})();
function frame(t){const W=cv.width,H=cv.height,n=playing?3:1;
 if(n===1){cx=main;scene(t)}else{if(oc.width!==W||oc.height!==H){oc.width=W;oc.height=H}const o=oc.getContext("2d");for(let i=0;i<n;i++){cx=o;scene(Math.max(0,t-(n-1-i)*.011));main.globalAlpha=1/(i+1);main.drawImage(oc,0,0)}main.globalAlpha=1;cx=main}
 main.save();main.translate(Math.random()*128|0,Math.random()*128|0);main.fillStyle=main.createPattern(NZ,"repeat");main.fillRect(-128,-128,W+128,H+128);main.restore();
 const g=main.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.75);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,0,0,.22)");main.fillStyle=g;main.fillRect(0,0,W,H)}
function ball(R,A){const g=cx.createRadialGradient(-R*.3,-R*.35,R*.1,0,0,R);g.addColorStop(0,mixc(A,"#ffffff",.6));g.addColorStop(.5,A);g.addColorStop(1,mixc(A,"#000000",.35));cx.fillStyle=g;cx.beginPath();cx.arc(0,0,R,0,7);cx.fill()}
function cube(a,A){const k=.87*a,q=(...p)=>{cx.beginPath();p.forEach((v,i)=>i?cx.lineTo(v[0],v[1]):cx.moveTo(v[0],v[1]));cx.closePath();cx.fill()};
 cx.fillStyle=A;q([0,-a],[k,-a/2],[0,0],[-k,-a/2]);cx.fillStyle="#fbf9f4";q([-k,-a/2],[0,0],[0,a],[-k,a/2]);cx.fillStyle="#e4dfd4";q([0,0],[k,-a/2],[k,a/2],[0,a])}
function scene(t){const sc=S.sc.scenes;let i=0;while(i<sc.length-1&&t>=S.st[i+1])i++;const s=sc[i],lt=t-S.st[i],W=cv.width,H=cv.height,P=S.pal,id=s.bg||"dark",inv=id==="light"||id==="paper",acc=id==="accent";
 const C={b:inv?(id==="paper"?mixc(P.tx,"#d9d3c5",.18):P.tx):acc?P.ac:P.bg,f:inv?P.bg:acc?P.bg:P.tx,a:inv||acc?P.bg:P.ac,inv,acc},tp=E.cl(lt/.4);
 cx.save();if(s.trans==="zoom"){const z=1+.18*(1-E.out(tp));cx.translate(W/2,H/2);cx.scale(z,z);cx.translate(-W/2,-H/2)}
 bgDraw(id,C,lt);(s.layers||[]).forEach(L=>{try{const k=L.type;if(k==="text")textL(L,lt,C,0);else if(k==="mega")textL(L,lt,C,1);else if(k==="shape"||k==="char"||k==="three")shape(L,lt,C);
  else if(k==="icon"||k==="icons")iconsL(L,lt,C);
  else if(k==="ui"||k==="deco")deco(L,lt,C);else if(k==="svg")svgL(L,lt);else if(k==="chart")chart(L,lt,C);else if(k==="asset")asset(L,lt);
  else if(k==="counter")textL({...L,text:"*"+Math.round((+L.to||0)*E.out(E.cl((lt-(L.at||0))/1.2)))+(L.suffix||"")+"*",size:L.size||.2,fx:"pop"},lt,C,1)}catch(e){}});cx.restore();
 if(tp<1){if(s.trans==="flash"){cx.fillStyle=`rgba(255,255,255,${.9*(1-tp)})`;cx.fillRect(0,0,W,H)}else if(s.trans==="wipe"){cx.fillStyle=P.ac;cx.fillRect(W*E.out(tp),0,W,H)}else if(s.trans==="fade"){cx.fillStyle=`rgba(0,0,0,${1-tp})`;cx.fillRect(0,0,W,H)}}}
