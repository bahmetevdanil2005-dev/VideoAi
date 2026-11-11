/* Библиотека нарисованных предметов. Слой: {type:"obj", name, x, y, size, at, label, text}
   Чтобы добавить предмет: OBJ.имя=(t,A,L)=>{...} — рисуем в квадрате -100..100, t — секунды от появления. */
const lg=(x0,y0,x1,y1,s)=>{const g=cx.createLinearGradient(x0,y0,x1,y1);s.forEach(a=>g.addColorStop(a[0],a[1]));return g};
const rgd=(x,y,r0,r1,s)=>{const g=cx.createRadialGradient(x,y,r0,x,y,r1);s.forEach(a=>g.addColorStop(a[0],a[1]));return g};
const fillP=(fn,f,st,lw)=>{cx.beginPath();fn();cx.fillStyle=f;cx.fill();if(st){cx.strokeStyle=st;cx.lineWidth=lw||1.5;cx.stroke()}};
const pt=(k,t,fn,dy=14)=>{const p=E.out(E.cl((t-k*.1)/.35));if(p<=0)return;cx.save();cx.globalAlpha*=p;cx.translate(0,(1-p)*dy);fn(p);cx.restore()};
const rr2=(x,y,w,h,r)=>cx.roundRect(x,y,w,h,r);
const poly=(a,p)=>{let tot=0;const sg=[];for(let i=1;i<a.length;i++){const l=Math.hypot(a[i][0]-a[i-1][0],a[i][1]-a[i-1][1]);sg.push(l);tot+=l}let r=tot*p;cx.beginPath();cx.moveTo(a[0][0],a[0][1]);for(let i=1;i<a.length;i++){const l=sg[i-1];if(r>=l){cx.lineTo(a[i][0],a[i][1]);r-=l}else{cx.lineTo(a[i-1][0]+(a[i][0]-a[i-1][0])*r/l,a[i-1][1]+(a[i][1]-a[i-1][1])*r/l);break}}};
const stripes=(x,y,w,h,a,b)=>{cx.save();cx.beginPath();cx.rect(x,y,w,h);cx.clip();cx.fillStyle=a;cx.fillRect(x,y,w,h);cx.fillStyle=b;for(let i=-2;i<w/16+2;i++){cx.beginPath();cx.moveTo(x+i*32,y+h);cx.lineTo(x+i*32+16,y+h);cx.lineTo(x+i*32+16+h*.6,y);cx.lineTo(x+i*32+h*.6,y);cx.fill()}cx.restore()};
const OBJ={
camera:(t,A)=>{
 pt(0,t,()=>{fillP(()=>rr2(-80,-28,160,88,16),lg(0,-28,0,60,[[0,"#50535b"],[.45,"#2c2e34"],[1,"#17181c"]]),"rgba(255,255,255,.16)");
  fillP(()=>{cx.moveTo(-36,-28);cx.lineTo(-26,-52);cx.lineTo(26,-52);cx.lineTo(36,-28)},lg(0,-52,0,-28,[[0,"#42454c"],[1,"#26282d"]]),"rgba(255,255,255,.12)");
  fillP(()=>rr2(-80,-6,34,66,12),lg(-80,0,-46,0,[[0,"#1d1e22"],[1,"#33353b"]]));fillP(()=>rr2(-72,-20,22,10,4),"#d9dade");});
 pt(1,t,()=>{const x=10,y=14;fillP(()=>cx.arc(x,y,47,0,7),lg(x-40,y-40,x+40,y+40,[[0,"#5a5d66"],[1,"#101115"]]),"rgba(255,255,255,.2)");
  fillP(()=>cx.arc(x,y,39,0,7),lg(x,y-39,x,y+39,[[0,"#8b8e98"],[.5,"#2b2d33"],[1,"#6c6f79"]]));
  cx.strokeStyle=A.ac;cx.lineWidth=3.5;cx.beginPath();cx.arc(x,y,31,0,7);cx.stroke();
  fillP(()=>cx.arc(x,y,27,0,7),rgd(x-9,y-9,2,30,[[0,A.hi],[.22,mixc(A.ac,"#000000",.45)],[.7,"#0b0d12"],[1,"#040507"]]));
  cx.strokeStyle="rgba(255,255,255,.55)";cx.lineWidth=3;cx.lineCap="round";cx.beginPath();cx.arc(x,y,20,3.4,4.5);cx.stroke();cx.fillStyle="rgba(255,255,255,.8)";cx.beginPath();cx.arc(x+10,y+9,2.6,0,7);cx.fill()});
 pt(2,t,()=>{fillP(()=>cx.arc(52,-38,8,0,7),lg(0,-46,0,-30,[[0,A.hi],[1,A.lo]]));fillP(()=>rr2(-20,-62,40,10,3),"#2d2f35","rgba(255,255,255,.12)");
  cx.fillStyle=A.ac;cx.shadowColor=A.ac;cx.shadowBlur=10;cx.beginPath();cx.arc(64,-12,4,0,7);cx.fill();cx.shadowBlur=0},8)},
clapper:(t,A)=>{const u=t%2.8,ang=-.42*(u<.9?1:u<1.02?1-(u-.9)/.12:u<2.3?0:E.out((u-2.3)/.5));
 pt(0,t,()=>{fillP(()=>rr2(-66,-14,132,84,8),lg(0,-14,0,70,[[0,"#383a41"],[1,"#18191d"]]),"rgba(255,255,255,.14)");
  cx.strokeStyle="rgba(255,255,255,.2)";cx.lineWidth=2;for(let i=0;i<3;i++){cx.beginPath();cx.moveTo(-54,18+i*16);cx.lineTo(-54+(i==1?96:70),18+i*16);cx.stroke()}
  fillP(()=>rr2(-54,50,34,10,3),lg(0,50,0,60,[[0,A.hi],[1,A.ac]]));stripes(-66,-34,132,20,"#f3f3f1","#1a1b1f")});
 pt(1,t,()=>{cx.save();cx.translate(-66,-34);cx.rotate(ang);stripes(0,-22,132,20,"#f3f3f1","#1a1b1f");cx.strokeStyle="rgba(0,0,0,.35)";cx.lineWidth=1.5;cx.strokeRect(0,-22,132,20);cx.restore();
  fillP(()=>cx.arc(-66,-34,6,0,7),lg(-72,-40,-60,-28,[[0,"#cfcfd4"],[1,"#5d5f66"]]))},-10)},
reel:(t,A)=>{
 pt(0,t,()=>{cx.save();cx.beginPath();cx.rect(-98,46,196,42);cx.clip();fillP(()=>cx.rect(-98,46,196,42),"#16171a");const o=(t*26)%26;
  for(let i=-1;i<9;i++){const x=-98+i*26+o;fillP(()=>rr2(x+3,52,20,30,3),lg(x,52,x+20,82,[[0,mixc(A.ac,"#000000",.2)],[1,mixc(A.ac,"#000000",.6)]]));cx.fillStyle="#3a3c42";cx.fillRect(x+6,48,8,3);cx.fillRect(x+6,83,8,3)}cx.restore()});
 pt(1,t,()=>{cx.save();cx.translate(0,-16);cx.rotate(t*.9);fillP(()=>cx.arc(0,0,64,0,7),lg(-60,-60,60,60,[[0,"#5b5e67"],[.5,"#26282d"],[1,"#101114"]]),"rgba(255,255,255,.2)",2);
  for(let i=0;i<6;i++){cx.save();cx.rotate(i*Math.PI/3);fillP(()=>cx.arc(0,-38,15,0,7),rgd(-3,-41,1,17,[[0,"#06070a"],[1,"#15161a"]]),"rgba(255,255,255,.18)");cx.restore()}
  fillP(()=>cx.arc(0,0,14,0,7),lg(-10,-10,10,10,[[0,A.hi],[1,A.lo]]));cx.strokeStyle=A.ac;cx.lineWidth=3;cx.beginPath();cx.arc(0,0,57,0,7);cx.stroke();cx.restore()})},
sneaker:(t,A)=>{
 pt(0,t,()=>fillP(()=>{cx.moveTo(-88,38);cx.lineTo(92,38);cx.lineTo(90,44);cx.quadraticCurveTo(88,48,80,48);cx.lineTo(-78,48);cx.quadraticCurveTo(-87,48,-88,42);cx.closePath()},lg(0,38,0,48,[[0,"#33353b"],[1,"#15161a"]])));
 pt(1,t,()=>{fillP(()=>{cx.moveTo(-91,24);cx.lineTo(97,24);cx.quadraticCurveTo(100,25,99,30);cx.lineTo(97,36);cx.quadraticCurveTo(95,39,90,39);cx.lineTo(-84,39);cx.quadraticCurveTo(-91,39,-91,32);cx.closePath()},lg(0,24,0,39,[[0,"#ffffff"],[1,"#d8d5cc"]]));
  cx.strokeStyle=A.ac;cx.lineWidth=3;cx.beginPath();cx.moveTo(-86,31);cx.lineTo(92,31);cx.stroke()});
 pt(2,t,()=>{const up=()=>{cx.moveTo(-88,25);cx.bezierCurveTo(-93,2,-91,-22,-82,-34);cx.lineTo(-70,-38);cx.bezierCurveTo(-60,-36,-52,-30,-44,-21);cx.lineTo(-33,-25);cx.bezierCurveTo(-20,-36,-8,-40,4,-31);cx.lineTo(28,-8);cx.bezierCurveTo(50,4,74,4,89,13);cx.bezierCurveTo(96,17,99,22,97,25);cx.closePath()};
  fillP(up,lg(0,-40,0,26,[[0,"#ffffff"],[.6,"#ecebe5"],[1,"#cfccc2"]]),"rgba(0,0,0,.18)",1.5);
  cx.save();cx.beginPath();up();cx.clip();fillP(()=>{cx.moveTo(52,2);cx.bezierCurveTo(72,5,90,10,100,22);cx.lineTo(100,26);cx.lineTo(48,26);cx.closePath()},lg(0,0,0,26,[[0,"#f7f6f2"],[1,"#c9c6bb"]]),"rgba(0,0,0,.12)");
  fillP(()=>{cx.moveTo(-90,26);cx.bezierCurveTo(-95,2,-92,-24,-82,-36);cx.lineTo(-62,-30);cx.bezierCurveTo(-68,-14,-69,6,-64,26);cx.closePath()},lg(-90,0,-62,0,[[0,A.lo],[1,A.ac]]));cx.restore()});
 pt(3,t,()=>{cx.strokeStyle=A.ac;cx.lineWidth=11;cx.lineCap="round";cx.beginPath();cx.moveTo(-36,14);cx.quadraticCurveTo(0,-4,42,10);cx.stroke();cx.strokeStyle="rgba(255,255,255,.4)";cx.lineWidth=2.5;cx.beginPath();cx.moveTo(-34,10);cx.quadraticCurveTo(0,-8,40,6);cx.stroke()});
 pt(4,t,()=>{cx.lineCap="round";for(let i=0;i<4;i++){const x=-14+i*11.5,y=-27+i*6.6;cx.strokeStyle="rgba(0,0,0,.2)";cx.lineWidth=5;cx.beginPath();cx.moveTo(x-5,y+4);cx.lineTo(x+8,y-5);cx.stroke();cx.strokeStyle="#ffffff";cx.lineWidth=3.4;cx.beginPath();cx.moveTo(x-5,y+3);cx.lineTo(x+8,y-6);cx.stroke()}
  fillP(()=>{cx.moveTo(-44,-21);cx.bezierCurveTo(-52,-30,-60,-36,-70,-38);cx.lineTo(-64,-24);cx.closePath()},lg(0,-38,0,-20,[[0,"#d9d6cc"],[1,"#f4f3ee"]]))},-8)},
shield:(t,A)=>{const sp=()=>{cx.moveTo(0,-86);cx.bezierCurveTo(26,-66,52,-60,72,-62);cx.lineTo(72,6);cx.bezierCurveTo(72,46,42,72,0,92);cx.bezierCurveTo(-42,72,-72,46,-72,6);cx.lineTo(-72,-62);cx.bezierCurveTo(-52,-60,-26,-66,0,-86);cx.closePath()};
 pt(0,t,()=>{fillP(()=>cx.arc(0,0,120,0,7),rgd(0,0,10,120,[[0,rgba(A.ac,.4)],[1,rgba(A.ac,0)]]));fillP(sp,lg(-70,-80,70,90,[[0,A.hi],[.5,A.ac],[1,A.lo]]));
  cx.save();cx.translate(0,6);cx.scale(.8,.8);fillP(sp,lg(-60,-70,60,90,[[0,mixc(A.ac,"#000000",.25)],[1,mixc(A.ac,"#000000",.6)]]),"rgba(255,255,255,.18)",2);cx.restore();
  cx.save();cx.beginPath();sp();cx.clip();cx.fillStyle="rgba(255,255,255,.16)";cx.beginPath();cx.moveTo(-72,-70);cx.lineTo(-20,-70);cx.lineTo(-72,40);cx.fill();cx.restore()});
 pt(2,t,()=>{const p=E.out(E.cl((t-.4)/.5));cx.lineCap=cx.lineJoin="round";cx.strokeStyle="rgba(0,0,0,.3)";cx.lineWidth=17;poly([[-30,8],[-8,32],[34,-18]],p);cx.stroke();cx.strokeStyle="#fff";cx.lineWidth=13;poly([[-30,8],[-8,32],[34,-18]],p);cx.stroke()},0)},
padlock:(t,A)=>{const lift=-20*(1-E.out(E.cl((t-.7)/.3)));
 pt(0,t,()=>{cx.lineCap="butt";cx.strokeStyle=lg(-34,0,34,0,[[0,"#8d9099"],[.5,"#f1f2f5"],[1,"#7b7e87"]]);cx.lineWidth=16;cx.beginPath();cx.moveTo(-31,-6+lift);cx.lineTo(-31,-30+lift);cx.arc(0,-30+lift,31,Math.PI,0);cx.lineTo(31,-6+lift);cx.stroke()});
 pt(1,t,()=>{fillP(()=>rr2(-54,-8,108,88,18),lg(0,-8,0,80,[[0,A.hi],[.35,A.ac],[1,A.lo]]),"rgba(255,255,255,.2)");cx.fillStyle="rgba(255,255,255,.2)";cx.beginPath();rr2(-48,-3,96,14,8);cx.fill();
  fillP(()=>cx.arc(0,30,12,0,7),"#15161a");fillP(()=>{cx.moveTo(-6,34);cx.lineTo(6,34);cx.lineTo(9,58);cx.lineTo(-9,58)},"#15161a")})},
server:(t,A)=>{for(let i=0;i<3;i++)pt(i,t,()=>{const y=-70+i*48,pl=.55+.45*Math.sin(t*2+i*1.3);fillP(()=>rr2(-72,y,144,40,9),lg(0,y,0,y+40,[[0,"#464952"],[1,"#202227"]]),"rgba(255,255,255,.15)");
  for(let k=0;k<3;k++)fillP(()=>rr2(-60+k*34,y+9,28,22,4),lg(0,y+9,0,y+31,[[0,"#111215"],[1,"#2a2c32"]]));cx.fillStyle="rgba(255,255,255,.12)";for(let k=0;k<5;k++)cx.fillRect(-60+k*3,y+34,2,4);
  cx.save();cx.shadowColor=A.ac;cx.shadowBlur=10*pl;cx.fillStyle=A.ac;cx.beginPath();cx.arc(52,y+14,4.5,0,7);cx.fill();cx.restore();cx.fillStyle="#d8d9de";cx.beginPath();cx.arc(52,y+28,3.5,0,7);cx.fill()},0)},
globe:(t,A)=>{pt(0,t,()=>{fillP(()=>cx.arc(0,0,100,0,7),rgd(0,0,60,100,[[0,rgba(A.ac,.28)],[1,rgba(A.ac,0)]]));fillP(()=>cx.arc(0,0,72,0,7),rgd(-24,-26,4,90,[[0,mixc(A.ac,"#000000",.65)],[1,"#06080c"]]),rgba(A.ac,.7),2.5);
  const rot=t*.5;for(let la=-75;la<=75;la+=15)for(let lo=0;lo<360;lo+=15){const a=la*Math.PI/180,b=lo*Math.PI/180+rot,x=Math.cos(a)*Math.sin(b),z=Math.cos(a)*Math.cos(b),y=Math.sin(a);if(z<0)continue;cx.fillStyle=rgba(A.hi,.25+.7*z);cx.beginPath();cx.arc(x*72,-y*72,1.2+1.5*z,0,7);cx.fill()}
  cx.setLineDash([5,6]);cx.lineDashOffset=-t*16;cx.strokeStyle=A.hi;cx.lineWidth=2.5;cx.lineCap="round";cx.beginPath();cx.moveTo(-46,-14);cx.quadraticCurveTo(0,-96,52,6);cx.stroke();cx.setLineDash([]);
  [[-46,-14],[52,6]].forEach((p,i)=>{cx.fillStyle="#fff";cx.shadowColor=A.ac;cx.shadowBlur=14;cx.beginPath();cx.arc(p[0],p[1],4+Math.sin(t*3+i)*.8,0,7);cx.fill();cx.shadowBlur=0})})},
box:(t,A,L)=>{const lift=9+8*Math.sin(t*1.6);
 pt(0,t,()=>{fillP(()=>rr2(-74,-4,148,70,8),lg(0,-4,0,66,[[0,A.ac],[1,A.lo]]),"rgba(255,255,255,.14)");fillP(()=>rr2(-26,12,52,34,5),"#f6f3ec");cx.fillStyle="#1a1b1f";cx.font='900 20px "'+S.font[0]+'"';cx.textAlign="center";cx.textBaseline="middle";cx.fillText(String(L.text||"42").slice(0,6),0,29);
  cx.fillStyle="rgba(0,0,0,.25)";cx.fillRect(-18,40,36,2.5)});
 pt(1,t,()=>{cx.save();cx.translate(0,-lift);fillP(()=>rr2(-80,-34,160,34,9),lg(0,-34,0,0,[[0,A.hi],[1,A.ac]]),"rgba(255,255,255,.2)");cx.restore()},-12)},
tag:(t,A,L)=>{pt(0,t,()=>{cx.save();cx.rotate(-.2+Math.sin(t*1.5)*.03);cx.strokeStyle="rgba(255,255,255,.7)";cx.lineWidth=2.5;cx.beginPath();cx.moveTo(-62,0);cx.bezierCurveTo(-96,-24,-84,-60,-60,-80);cx.stroke();
  fillP(()=>{cx.moveTo(-64,-38);cx.lineTo(28,-38);cx.lineTo(76,0);cx.lineTo(28,38);cx.lineTo(-64,38);cx.quadraticCurveTo(-76,38,-76,26);cx.lineTo(-76,-26);cx.quadraticCurveTo(-76,-38,-64,-38)},lg(-76,-38,70,38,[[0,A.hi],[.45,A.ac],[1,A.lo]]),"rgba(255,255,255,.25)");
  fillP(()=>cx.arc(-62,0,7,0,7),"#101114");cx.fillStyle=S.pal.bg;cx.font='900 34px "'+S.font[0]+'"';cx.textAlign="center";cx.textBaseline="middle";cx.fillText(String(L.text||"-30%").slice(0,7),-4,2);cx.restore()})},
bulb:(t,A)=>{pt(0,t,()=>{fillP(()=>cx.arc(0,-22,110,0,7),rgd(0,-22,20,110,[[0,rgba(A.ac,.35)],[1,rgba(A.ac,0)]]));
  fillP(()=>{cx.moveTo(-22,34);cx.bezierCurveTo(-22,22,-54,12,-54,-20);cx.arc(0,-20,54,Math.PI,0);cx.bezierCurveTo(54,12,22,22,22,34);cx.closePath()},rgd(-14,-34,4,70,[[0,mixc(A.ac,"#ffffff",.85)],[.5,A.ac],[1,A.lo]]),"rgba(255,255,255,.3)",2);
  cx.strokeStyle="rgba(255,255,255,.9)";cx.lineWidth=3;cx.lineJoin="round";cx.beginPath();cx.moveTo(-10,36);cx.lineTo(-10,6);cx.lineTo(-4,-12);cx.lineTo(0,2);cx.lineTo(4,-12);cx.lineTo(10,6);cx.lineTo(10,36);cx.stroke();
  cx.fillStyle="rgba(255,255,255,.35)";cx.beginPath();cx.ellipse(-30,-34,8,18,.5,0,7);cx.fill()});
 pt(1,t,()=>{for(let i=0;i<3;i++)fillP(()=>rr2(-22+i*1.5,36+i*11,44-i*3,9,3.5),lg(0,36+i*11,0,45+i*11,[[0,"#c9cbd2"],[1,"#6c6e76"]]));fillP(()=>cx.arc(0,73,7,0,7),"#33353b")},-6);
 pt(2,t,()=>{cx.strokeStyle=A.ac;cx.lineWidth=4;cx.lineCap="round";for(let i=0;i<7;i++){const a=-Math.PI+i*Math.PI/6,p=E.out(E.cl((t-.3-i*.05)/.3));if(p<=0)continue;cx.beginPath();cx.moveTo(Math.cos(a)*74,-20+Math.sin(a)*74);cx.lineTo(Math.cos(a)*(74+16*p),-20+Math.sin(a)*(74+16*p));cx.stroke()}},0)},
rocket:(t,A)=>{const by=Math.sin(t*2)*3,fl=34+5*Math.sin(t*6);cx.save();cx.translate(0,by);
 pt(0,t,()=>{fillP(()=>{cx.moveTo(-14,34);cx.quadraticCurveTo(0,34+fl*1.6,14,34)},lg(0,34,0,34+fl,[[0,"#fff"],[.4,A.hi],[1,rgba(A.ac,0)]]));
  fillP(()=>{cx.moveTo(-30,6);cx.lineTo(-58,50);cx.lineTo(-30,34)},lg(-58,0,-30,0,[[0,A.lo],[1,A.ac]]));fillP(()=>{cx.moveTo(30,6);cx.lineTo(58,50);cx.lineTo(30,34)},lg(58,0,30,0,[[0,A.lo],[1,A.ac]]))});
 pt(1,t,()=>{const b=()=>{cx.moveTo(0,-88);cx.bezierCurveTo(30,-62,36,-20,32,36);cx.lineTo(-32,36);cx.bezierCurveTo(-36,-20,-30,-62,0,-88);cx.closePath()};fillP(b,lg(-34,0,34,0,[[0,"#c9cbd2"],[.45,"#ffffff"],[1,"#a9acb5"]]),"rgba(0,0,0,.15)");
  cx.save();cx.beginPath();b();cx.clip();fillP(()=>cx.rect(-40,-100,80,50),lg(-34,0,34,0,[[0,A.lo],[.5,A.hi],[1,A.lo]]));cx.fillStyle=A.ac;cx.fillRect(-40,26,80,10);cx.restore();
  fillP(()=>cx.arc(0,-26,15,0,7),"#2a2d34");fillP(()=>cx.arc(0,-26,11,0,7),rgd(-4,-30,1,12,[[0,A.hi],[1,mixc(A.ac,"#000000",.5)]]))},0);cx.restore()},
ruler:(t,A,L)=>{pt(0,t,()=>{fillP(()=>rr2(-92,-20,184,40,7),lg(0,-20,0,20,[[0,"#f6f2e6"],[1,"#d6cfbd"]]),"rgba(0,0,0,.18)");cx.strokeStyle="#2a2b2f";cx.fillStyle="#2a2b2f";cx.lineWidth=1.6;cx.font='800 10px Manrope';cx.textAlign="center";cx.textBaseline="middle";
  for(let i=0;i<=20;i++){const x=-80+i*8;cx.beginPath();cx.moveTo(x,-20);cx.lineTo(x,-20+(i%4==0?16:9));cx.stroke();if(i%4==0)cx.fillText(String(38+i/4),x,6)}
  const px=-80+E.out(E.cl((t-.4)/.8))*32;cx.fillStyle=A.ac;cx.beginPath();cx.moveTo(px-7,-30);cx.lineTo(px+7,-30);cx.lineTo(px,-18);cx.fill()})}
};
function objL(L,lt,C){const t=lt-(L.at||0);if(t<0)return;const f=OBJ[String(L.name||"").toLowerCase().trim()];if(!f)return iconsL({...L,type:"icon",size:L.size||.2},lt,C);
 const W=cv.width,H=cv.height,s=(L.size||.3)*Math.min(W,H)*2.3/200,p=E.back(E.cl(t/.45)),P=S.pal,A={ac:P.ac,hi:mixc(P.ac,"#ffffff",.55),lo:mixc(P.ac,"#000000",.45)};
 cx.save();cx.translate((L.x??.5)*W,(L.y??.5)*H+Math.sin(t*1.4)*3);cx.scale(s*p,s*p);cx.globalAlpha=E.cl(t/.2);
 cx.save();cx.translate(0,94);cx.scale(1,.15);fillP(()=>cx.arc(0,0,82,0,7),rgd(0,0,0,82,[[0,"rgba(0,0,0,.4)"],[1,"rgba(0,0,0,0)"]]));cx.restore();
 f(t,A,L);
 if(L.label){cx.globalAlpha=E.cl((t-.3)/.3);cx.font=`${S.font[1]} 17px "${S.font[0]}"`;cx.textAlign="center";cx.textBaseline="middle";cx.fillStyle=C.f;cx.fillText(String(L.label).toUpperCase(),0,122)}
 cx.restore()}
