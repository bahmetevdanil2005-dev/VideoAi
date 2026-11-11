/* Детальные декорации: окна, телефон, графики, svg */
/* ---------- детальные декорации ---------- */
const rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
const rr=(x,y,w,h,r,f,s,lw)=>{cx.beginPath();cx.roundRect(x,y,Math.max(0,w),Math.max(0,h),Math.max(0,Math.min(r,w/2,h/2)));if(f){cx.fillStyle=f;cx.fill()}if(s){cx.strokeStyle=s;cx.lineWidth=lw||2;cx.stroke()}};
const ln=(a,b,c,d,col,w)=>{cx.beginPath();cx.moveTo(a,b);cx.lineTo(c,d);cx.strokeStyle=col;cx.lineWidth=w||2;cx.lineCap="round";cx.stroke()};
const tx=(s,x,y,sz,col,al,wt,fam)=>{cx.font=`${wt||800} ${sz}px ${fam||"Manrope"}`;cx.fillStyle=col;cx.textAlign=al||"left";cx.textBaseline="middle";cx.fillText(s,x,y)};
const dot=(x,y,r,f)=>{cx.beginPath();cx.arc(x,y,Math.max(0,r),0,7);cx.fillStyle=f;cx.fill()};
const tri=(x,y,s,f)=>{cx.beginPath();cx.moveTo(x-s*.4,y-s*.6);cx.lineTo(x+s*.7,y);cx.lineTo(x-s*.4,y+s*.6);cx.closePath();cx.fillStyle=f;cx.fill()};
const MONO="ui-monospace,Menlo,Consolas,monospace";
function theme(C){const l=C.inv;return{pn:l?"#ffffff":"#121416",p2:l?"#efeeea":"#0b0c0d",ln:l?"rgba(0,0,0,.14)":"rgba(255,255,255,.14)",tx:l?"#111111":"#f2f2f2",mu:l?"rgba(0,0,0,.4)":"rgba(255,255,255,.4)",ac:S.pal.ac,a2:l?"#111111":"#ffffff",ink:S.pal.bg}}
function win(T,w,h,title){cx.save();cx.shadowColor="rgba(0,0,0,.5)";cx.shadowBlur=70;cx.shadowOffsetY=28;rr(0,0,w,h,28,T.pn);cx.restore();rr(0,0,w,h,28,null,T.ln,2);ln(0,58,w,58,T.ln,2);["#ff5f57","#febc2e","#28c840"].forEach((c,i)=>dot(34+i*28,29,8,c));if(title)tx(title,w/2,30,20,T.mu,"center",700)}
const DIM={phone:[400,800],waveform:[1000,420],prompt:[1000,420]};
const DECO={
motion:(T,t,L,u)=>{win(T,1000,620,L.file||"moving.html");const vy=74,gy=vy+240,R=26;cx.save();cx.beginPath();cx.roundRect(24,vy,952,330,18);cx.clip();
 let g=cx.createLinearGradient(0,vy,0,vy+330);g.addColorStop(0,"#46433e");g.addColorStop(1,"#292724");cx.fillStyle=g;cx.fillRect(24,vy,952,330);
 g=cx.createRadialGradient(500,vy+350,0,500,vy+350,460);g.addColorStop(0,rgba(T.ac,.7));g.addColorStop(1,rgba(T.ac,0));cx.fillStyle=g;cx.fillRect(24,vy,952,330);
 const q=(t%1.2)/1.2,d=4*q*(1-q),sq=d<.15?(.15-d)/.15*.3:0,bx=110+780*((t/3.6)%1);ln(100,gy,900,gy,"rgba(255,255,255,.55)",2);cx.setLineDash([3,9]);
 [0,1,2].forEach(k=>{cx.beginPath();cx.ellipse(210+k*190,gy,70,110,0,Math.PI,0);cx.strokeStyle="rgba(255,255,255,.5)";cx.lineWidth=2;cx.stroke()});cx.setLineDash([]);
 cx.save();cx.translate(bx,gy-R*(1-sq)-110*d);cx.scale(1+sq,1-sq);ball(R,T.ac);cx.restore();
 const cp=String(L.text||"Squash & *stretch.*").split("*");cx.font="800 36px Manrope";const ws=cp.map(c=>cx.measureText(c).width);let X=500-ws.reduce((a,b)=>a+b,0)/2;cp.forEach((c,i)=>{tx(c,X,gy+66,36,i%2?T.ac:"#fff","left",800);X+=ws[i]});cx.restore();
 rr(24,420,952,176,18,"#1c1e1d");["Position X","Position Y","Scale","Rotation"].forEach((n,i)=>{dot(52,448+i*34,5,i?"#555":T.ac);tx(n,70,448+i*34,15,i?"#777":"#fff","left",700)});
 const pp=(t/3.6)%1,X0=250,X1=920,Y0=570,Y1=450,px=X0+(X1-X0)*pp,py=Y0+(Y1-Y0)*pp;ln(X0,Y0,px,py,"#e8e8e8",3);
 for(let k=0;k<4;k++){const f=k/3,kx=X0+(X1-X0)*f,ky=Y0+(Y1-Y0)*f;dot(kx,ky,9,"#1c1e1d");cx.beginPath();cx.arc(kx,ky,9,0,7);cx.strokeStyle=f<=pp?T.ac:"#e8e8e8";cx.lineWidth=2.5;cx.stroke()}
 ln(px,432,px,588,T.ac,3);tri(px+10,py+16,18,"#fff");tx("linear",940,578,14,T.ac,"right",700)},
bento:(T,t,L,u)=>{const N=["Kinetic type","Springs","3D","Data","Data","Paths"],cw=300,ch=270,bz=(a,b,c,d,v)=>(1-v)**3*a+3*(1-v)**2*v*b+3*(1-v)*v*v*c+v**3*d;
 for(let i=0;i<6;i++){const p=E.back(E.cl((t-i*.08)/.5));if(p<=0)continue;const x=26+(i%3)*324,y=28+(i/3|0)*294;cx.save();cx.globalAlpha=E.cl(p);cx.translate(x+cw/2,y+ch/2);cx.scale(p,p);cx.translate(-cw/2,-ch/2);
  cx.save();cx.shadowColor="rgba(0,0,0,.25)";cx.shadowBlur=28;cx.shadowOffsetY=10;rr(0,0,cw,ch,22,i==1?T.ac:"#f6f3ed");cx.restore();cx.save();cx.beginPath();cx.roundRect(0,0,cw,ch,22);cx.clip();
  tx(N[i],22,34,15,i==1?"rgba(255,255,255,.8)":"#9a968c","left",700);
  if(i==0)tx("Type",150,150,92,"#1c1c1c","center",S.font[1],'"'+S.font[0]+'"');
  else if(i==1)[90,150,210].forEach((a,k)=>dot(a,160+Math.sin(t*6+k*.8)*22,20,"#fff"));
  else if(i==2){cx.translate(150,160);cx.rotate(Math.sin(t*1.5)*.06);cube(72,T.ac)}
  else if(i==3){for(let k=-8;k<10;k++){cx.fillStyle=k%2?"#222":T.ac;const o=k*30+(t*45)%60;cx.beginPath();cx.moveTo(o,ch);cx.lineTo(o+30,ch);cx.lineTo(o+30+160,40);cx.lineTo(o+160,40);cx.fill()}}
  else if(i==4){for(let k=0;k<9;k++){const hh=170*(.2+.5*Math.abs(Math.sin(t*2+k*.9)));rr(30+k*29,240-hh,20,hh,3,k==7?T.ac:"#1c1c1c")}}
  else{const v=(t*.5)%1;cx.strokeStyle="#1c1c1c";cx.lineWidth=2.5;cx.beginPath();for(let f=0;f<=1;f+=.04){const X=bz(30,120,165,270,f),Y=bz(205,55,245,95,f);f?cx.lineTo(X,Y):cx.moveTo(X,Y)}cx.stroke();dot(bz(30,120,165,270,v),bz(205,55,245,95,v),10,T.ac)}
  cx.restore();cx.restore()}},
editor:(T,t,L,u)=>{win(T,1000,620,L.text||"Монтаж — Новый проект");
 for(let i=0;i<6;i++)rr(30+i*48,78,36,30,9,T.p2,T.ln,1.5);rr(850,78,120,30,15,T.ac);tx("Экспорт",910,94,15,T.ink,"center");
 rr(30,124,600,210,18,T.p2,T.ln,1.5);const g=cx.createLinearGradient(30,124,630,334);g.addColorStop(0,rgba(T.ac,.4));g.addColorStop(1,rgba(T.ac,.04));rr(30,124,600,210,18,g);
 dot(330,229,36,T.ac);tri(330,229,26,T.ink);rr(210,300,240,16,8,T.a2);
 rr(650,124,320,210,18,T.p2,T.ln,1.5);["Масштаб","Яркость","Скорость"].forEach((s,i)=>{const y=156+i*58,v=[.72,.45,.86][i]*u(.3+i*.15);tx(s,672,y,16,T.mu,"left",700);rr(672,y+20,276,8,4,T.ln);rr(672,y+20,276*v,8,4,T.ac);dot(672+276*v,y+24,10,T.a2)});
 ln(0,352,1000,352,T.ln,2);for(let i=0;i<19;i++){const x=64+i*48;ln(x,374,x,i%2?384:392,T.mu,2);if(i%2==0)tx("0:0"+i/2,x,404,12,T.mu,"center",700)}
 const cols=[T.ac,rgba(T.ac,.55),null,T.a2];
 for(let r=0;r<4;r++){const y=420+r*44;rr(30,y,26,34,8,T.p2,T.ln,1.5);let x=70,n=0;
  if(r===2){for(let k=0;k<176;k++){const h=6+rnd(k+9)*26*Math.abs(Math.sin(k*.09)+.3),a=u(.2+k*.004,.3);if(a>0)rr(70+k*5,y+17-h*a/2,3,h*a,1.5,rgba(T.ac,.85))}continue}
  while(x<950){const len=50+rnd(r*17+n)*140,w=Math.min(len,950-x)*u(.15+r*.12+n*.07,.5);rr(x,y,w,34,10,cols[r]);if(w>40)rr(x+10,y+13,Math.min(w-20,60),6,3,r===3?T.ink:"rgba(0,0,0,.35)");x+=len+8;n++}}
 const px=70+((t*.16)%1)*880;ln(px,364,px,604,T.a2,3);rr(px-8,356,16,14,3,T.a2)},
code:(T,t,L,u)=>{win(T,1000,620,"Редактор");rr(0,59,1000,44,0,T.p2);rr(20,66,170,38,10,T.pn);tx("scene.js",42,86,16,T.tx,"left",700);tx("theme.css",216,86,16,T.mu,"left",700);tx("render.js",360,86,16,T.mu,"left",700);ln(0,103,1000,103,T.ln,2);rr(0,104,78,516,0,T.p2);
 const K={k:T.ac,v:T.tx,s:rgba(T.ac,.75),n:T.a2,c:T.mu,t:T.tx};
 const LN=[[["const ","k"],["scene","v"],[" = createScene({","t"]],[["  title: ","t"],['"Интро"',"s"],[",","t"]],[["  duration: ","t"],["2.4","n"],[",","t"]],[["  effects: [","t"],['"zoom"',"s"],[", ","t"],['"glitch"',"s"],["],","t"]],[["  // слой за слоем","c"]],[["});","t"]],[["","t"]],[["timeline","v"],[".add(scene);","t"]],[["await ","k"],["render","v"],["({ fps: ","t"],["60","n"],[" });","t"]]];
 let left=Math.floor(t*55),lx=104,ly=140;
 LN.forEach((ts,i)=>{const y=140+i*46;tx(String(i+1),58,y,18,T.mu,"right",700,MONO);let x=104;ts.forEach(([s,c])=>{if(left<=0)return;const part=s.slice(0,left);left-=s.length;cx.font="700 24px "+MONO;cx.fillStyle=K[c];cx.textAlign="left";cx.fillText(part,x,y);x+=cx.measureText(part).width;lx=x;ly=y})});
 if(Math.floor(t*2.4)%2==0)rr(lx+3,ly-15,4,30,2,T.ac);tx("JS  UTF-8",960,602,14,T.mu,"right",700)},
browser:(T,t,L,u)=>{win(T,1000,620,"");rr(210,13,580,32,16,T.p2,T.ln,1.5);dot(236,29,6,T.ac);tx(L.text||"motion.studio",500,30,16,T.mu,"center",700);
 const a=u(.2),b=u(.45),c=u(.7);rr(48,110,430*a,34,10,T.tx);rr(48,158,340*a,34,10,T.tx);[0,1,2].forEach(i=>rr(48,222+i*24,(400-i*60)*b,12,6,T.mu));
 rr(48,320,190*c,54,27,T.ac);if(c>.8)tx("Начать",143,347,19,T.ink,"center");rr(254,320,150*c,54,27,null,T.ln,2);
 const g=cx.createLinearGradient(600,100,950,400);g.addColorStop(0,rgba(T.ac,.55));g.addColorStop(1,rgba(T.ac,.06));rr(590,100,360,300,30,g,T.ln,2);dot(700,200,60*b,rgba(T.ac,.9));dot(850,310,38*b,T.a2);tri(700,200,34*b,T.ink);
 for(let i=0;i<3;i++){const x=48+i*308,v=u(.9+i*.15);rr(x,430,284,150*v,22,T.p2,T.ln,2);if(v>.7){dot(x+40,470,18,rgba(T.ac,.9));rr(x+70,460,150,12,6,T.tx);rr(x+24,500,230,10,5,T.mu);rr(x+24,524,190,10,5,T.mu)}}},
phone:(T,t,L,u)=>{cx.save();cx.shadowColor="rgba(0,0,0,.55)";cx.shadowBlur=70;cx.shadowOffsetY=28;rr(0,0,400,800,64,"#15171a");cx.restore();rr(0,0,400,800,64,null,"rgba(255,255,255,.22)",3);rr(14,14,372,772,50,T.pn);rr(142,28,116,32,16,"#000");
 tx(L.text||"Для вас",200,102,20,T.tx,"center",800);const g=cx.createLinearGradient(34,130,366,550);g.addColorStop(0,rgba(T.ac,.6));g.addColorStop(1,rgba(T.ac,.06));rr(34,132,332,420,30,g,T.ln,2);
 const b=E.back(E.cl((t-.2)/.5));dot(200,330,46*b,T.ac);tri(200,330,34*b,T.ink);[0,1,2].forEach(i=>dot(336,380+i*52,18*u(.4+i*.1),"rgba(255,255,255,.85)"));
 rr(54,490,190*u(.5),14,7,"#fff");rr(54,516,130*u(.6),12,6,"rgba(255,255,255,.6)");rr(34,572,332,6,3,T.ln);rr(34,572,332*((t*.15)%1),6,3,T.ac);
 [0,1].forEach(i=>{const y=598+i*76,a=u(.7+i*.15);rr(34,y,332,64*a,18,T.p2,T.ln,1.5);if(a>.8){rr(46,y+10,44,44,12,rgba(T.ac,.8));rr(104,y+16,150,12,6,T.tx);rr(104,y+38,100,10,5,T.mu)}});
 [0,1,2,3].forEach(i=>dot(76+i*82,766,6,i==0?T.ac:T.mu))},
dashboard:(T,t,L,u)=>{win(T,1000,620,L.text||"Аналитика");const base=+L.to||12840,ks=[["Просмотры",Math.round(base*u(.2,1.2)).toLocaleString("ru")],["Вовлечённость",Math.round(94*u(.3,1.2))+"%"],["Рост",Math.round(23*u(.4,1.2))+"%"]];
 ks.forEach((k,i)=>{const x=28+i*236;rr(x,80,220,112,18,T.p2,T.ln,1.5);tx(k[0],x+20,108,15,T.mu,"left",700);tx(k[1],x+20,152,38,T.tx,"left",800);rr(x+150,96,52,22,11,rgba(T.ac,.22));tx("+"+(8+i*5)+"%",x+176,108,12,T.tx,"center",800)});
 rr(28,212,700,380,20,T.p2,T.ln,1.5);for(let i=0;i<5;i++){const y=270+i*62;ln(60,y,700,y,T.ln,1.5);tx(String(100-i*25),48,y,12,T.mu,"right",700)}
 const v=(Array.isArray(L.values)&&L.values.length>1?L.values:[30,44,38,62,55,80,72,96]).map(Number).slice(0,8),n=v.length,mx=Math.max(...v)*1.05,P=v.map((a,i)=>[90+i*(590/(n-1)),518-a/mx*240]),k=u(.4,1.2)*(n-1),i0=Math.min(Math.floor(k),n-2),f0=Math.min(1,k-i0),ex=P[i0][0]+(P[i0+1][0]-P[i0][0])*f0,ey=P[i0][1]+(P[i0+1][1]-P[i0][1])*f0;
 const path=()=>{cx.beginPath();cx.moveTo(...P[0]);for(let i=1;i<=i0;i++)cx.lineTo(...P[i]);cx.lineTo(ex,ey)};
 path();cx.lineTo(ex,518);cx.lineTo(P[0][0],518);cx.closePath();const g=cx.createLinearGradient(0,270,0,518);g.addColorStop(0,rgba(T.ac,.4));g.addColorStop(1,rgba(T.ac,0));cx.fillStyle=g;cx.fill();
 path();cx.strokeStyle=T.ac;cx.lineWidth=6;cx.lineJoin="round";cx.lineCap="round";cx.stroke();for(let i=0;i<=i0;i++)dot(P[i][0],P[i][1],7,T.pn),dot(P[i][0],P[i][1],4,T.ac);
 dot(ex,ey,13,rgba(T.ac,.3));dot(ex,ey,7,T.ac);rr(ex-50,ey-56,100,34,10,T.tx);tx(Math.round(v[i0]+(v[i0+1]-v[i0])*f0)+"K",ex,ey-39,16,T.pn,"center",800);
 rr(748,80,224,512,20,T.p2,T.ln,1.5);cx.beginPath();cx.arc(860,220,70,0,7);cx.strokeStyle=T.ln;cx.lineWidth=18;cx.stroke();cx.beginPath();cx.arc(860,220,70,-Math.PI/2,-Math.PI/2+Math.PI*2*.72*u(.4,1.2));cx.strokeStyle=T.ac;cx.lineCap="round";cx.stroke();tx(Math.round(72*u(.4,1.2))+"%",860,220,34,T.tx,"center",800);
 [0,1,2].forEach(i=>{const y=350+i*70;dot(776,y,8,i?rgba(T.ac,.7-.25*i):T.ac);rr(796,y-6,100*u(.6+i*.1),12,6,T.tx);rr(796,y+14,70*u(.7+i*.1),9,5,T.mu)})},
player:(T,t,L,u)=>{win(T,1000,620,L.text||"Плеер");const g=cx.createLinearGradient(28,80,972,470);g.addColorStop(0,rgba(T.ac,.5));g.addColorStop(1,rgba(T.ac,.05));rr(28,80,944,396,20,g,T.ln,2);
 const b=E.back(E.cl((t-.2)/.5));dot(500,278,58*b,T.ac);tri(500,278,40*b,T.ink);rr(52,102,84,30,15,"rgba(0,0,0,.55)");dot(72,117,5,"#ff4d4d");tx("LIVE",88,117,13,"#fff","left",800);rr(884,102,64,30,15,"rgba(0,0,0,.55)");tx("4K",916,117,13,"#fff","center",800);
 const pr=(t*.14)%1;rr(28,506,944,10,5,T.ln);rr(28,506,944*Math.min(1,pr+.25),10,5,rgba(T.ac,.3));rr(28,506,944*pr,10,5,T.ac);dot(28+944*pr,511,12,T.a2);
 tx("0:"+String(Math.floor(pr*30)).padStart(2,"0"),28,550,15,T.mu,"left",700);tx("0:30",972,550,15,T.mu,"right",700);
 tri(430,574,16,T.tx);rr(486,558,10,32,3,T.tx);rr(506,558,10,32,3,T.tx);tri(574,574,16,T.tx);[0,1,2,3].forEach(i=>rr(880+i*14,586-(i+1)*6,8,(i+1)*6+2,3,i<3?T.tx:T.mu))},
chat:(T,t,L,u)=>{win(T,1000,620,"Чат");rr(0,59,250,561,0,T.p2);ln(250,59,250,620,T.ln,2);
 ["Алина","Команда","Студия","Макс"].forEach((n,i)=>{const y=100+i*76;if(!i)rr(12,y-32,226,64,16,rgba(T.ac,.16));dot(52,y,22,i?rgba(T.ac,.55-.1*i):T.ac);tx(n,88,y-8,17,T.tx,"left",800);rr(88,y+10,100,9,4,T.mu)});
 const B=(x,y,w,h,me,d,fn)=>{const a=u(d,.4);if(a<=0)return;cx.save();cx.globalAlpha=a;cx.translate(0,(1-a)*20);rr(x,y,w,h,22,me?T.ac:T.p2,me?null:T.ln,1.5);fn();cx.restore()};
 B(280,100,420,86,0,.3,()=>{rr(304,126,300,12,6,T.mu);rr(304,150,220,12,6,T.mu)});
 B(560,206,390,70,1,.9,()=>tx(String(L.text||"Сделай ролик").slice(0,28),586,241,20,T.ink,"left",800));
 B(280,296,340,86,0,1.5,()=>{rr(304,322,250,12,6,T.mu);rr(304,346,170,12,6,T.mu)});
 if(u(2.1,.3)>0){rr(280,404,100,52,22,T.p2,T.ln,1.5);[0,1,2].forEach(i=>dot(310+i*22,430+Math.sin(t*8+i)*5,6,T.mu))}
 rr(280,540,600,52,26,T.p2,T.ln,1.5);tx("Сообщение…",306,566,17,T.mu,"left",700);dot(920,566,26,T.ac);tri(920,566,14,T.ink)},
waveform:(T,t,L,u)=>{cx.save();cx.shadowColor="rgba(0,0,0,.5)";cx.shadowBlur=70;cx.shadowOffsetY=28;rr(0,0,1000,420,32,T.pn);cx.restore();rr(0,0,1000,420,32,null,T.ln,2);
 dot(78,70,28,T.ac);rr(71,52,14,26,7,T.ink);cx.beginPath();cx.arc(78,68,13,0,Math.PI);cx.strokeStyle=T.ink;cx.lineWidth=3;cx.stroke();ln(78,81,78,88,T.ink,3);
 tx(L.text||"Озвучка",124,60,26,T.tx);tx("запись 00:"+String(Math.floor(t*3)%60).padStart(2,"0"),124,92,16,T.mu,"left",700);
 const n=64,pr=(t*.12)%1;for(let i=0;i<n;i++){const a=(.2+.8*Math.abs(Math.sin(i*.37+t*4)*Math.sin(i*.11+t*1.7+1)))*u(.1+i*.012,.4),h=Math.max(6,a*210);rr(52+i*14.4,240-h/2,8,h,4,i/n<pr?T.ac:rgba(T.ac,.3))}
 ln(52+pr*920,120,52+pr*920,360,T.a2,3);tx("0:"+String(Math.floor(pr*30)).padStart(2,"0"),52,396,15,T.mu,"left",700);tx("0:30",948,396,15,T.mu,"right",700)},
prompt:(T,t,L,u)=>{cx.save();cx.shadowColor=T.ac;cx.shadowBlur=55;rr(0,0,1000,420,36,T.pn,T.ac,3);cx.restore();
 cx.beginPath();[[0,-1],[.25,-.25],[1,0],[.25,.25],[0,1],[-.25,.25],[-1,0],[-.25,-.25]].forEach(([a,b],i)=>{const X=56+a*18,Y=58+b*18;i?cx.lineTo(X,Y):cx.moveTo(X,Y)});cx.closePath();cx.fillStyle=T.ac;cx.fill();
 tx("Новый запрос",92,58,20,T.mu,"left",700);ln(30,92,970,92,T.ln,2);
 const rows=[""];String(L.text||"Сделай ролик про будущее нейросетей").split(" ").forEach(w=>{if((rows.at(-1)+" "+w).trim().length>30)rows.push(w);else rows[rows.length-1]=(rows.at(-1)+" "+w).trim()});
 let left=Math.floor(t*26),lx=60,ly=150;rows.slice(0,3).forEach((r,i)=>{const part=r.slice(0,Math.max(0,left));left-=r.length+1;tx(part,60,150+i*56,42,T.tx,"left",800);lx=60+cx.measureText(part).width;ly=150+i*56});
 if(Math.floor(t*2.4)%2==0)rr(lx+4,ly-24,4,48,2,T.ac);
 let X=36;["9:16","30 сек","Агрессивно"].forEach(c=>{cx.font="800 18px Manrope";const w=cx.measureText(c).width+36;rr(X,320,w,42,21,T.p2,T.ln,1.5);tx(c,X+w/2,341,18,T.tx,"center",800);X+=w+12});
 dot(924,340,34,T.ac);ln(924,356,924,324,T.ink,5);ln(924,324,910,338,T.ink,5);ln(924,324,938,338,T.ink,5)}
};
function deco(L,lt,C){const t=lt-(L.at||0);if(t<0)return;const W=cv.width,H=cv.height,T=theme(C),MAP={timeline:"editor",progress:"player",window:"browser"},k0=MAP[L.kind]||L.kind,kind=DECO[k0]?k0:"browser",[bw,bh]=DIM[kind]||[1000,620];
 const f=Math.max(.7,Math.min(1.25,(L.size||.25)/.25)),s=Math.min(W*.92/bw,H*(kind==="phone"?.8:.72)/bh)*f,p=E.cl(t/.55),e=E.back(p),u=(d,du=.5)=>E.out(E.cl((t-d)/du));
 cx.save();cx.globalAlpha=p;cx.translate((L.x??.5)*W,(L.y??.5)*H+Math.sin(t*1.5)*5);const z=s*(.8+.2*e);cx.scale(z,z);cx.translate(-bw/2,-bh/2);DECO[kind](T,t,L,u);cx.restore()}
const SI={};
function svgL(L,lt){const t=lt-(L.at||0);if(t<0||!L.svg)return;let im=SI[L.svg];if(!im){im=SI[L.svg]=new Image();im.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(L.svg)}
 if(!im.complete||!im.naturalWidth)return;const W=cv.width,H=cv.height,p=E.cl(t/.6),e=E.back(p),r=im.naturalHeight/im.naturalWidth;let w=Math.min(W*.9,Math.min(W,H)*(L.size||.3)*3.4),h=w*r;if(h>H*.7){h=H*.7;w=h/r}
 cx.save();cx.globalAlpha=p;cx.translate((L.x??.5)*W,(L.y??.5)*H+Math.sin(t*1.5)*6);const z=.8+.2*e;cx.scale(z,z);cx.rotate((1-p)*-.08);cx.drawImage(im,-w/2,-h/2,w,h);cx.restore()}
function chart(L,lt,C){const W=cv.width,H=cv.height,t=lt-(L.at||0);if(t<0)return;const v=(Array.isArray(L.values)&&L.values.length?L.values:[3,5,4,8,10]).slice(0,8).map(Number),m=Math.max(...v,1),w=W*.8,h=H*.28,x0=(L.x??.5)*W-w/2,y0=(L.y??.5)*H+h/2,bw=w/v.length;
 cx.fillStyle=cx.strokeStyle=C.a;cx.lineWidth=6;cx.lineJoin="round";if(L.kind==="line"){cx.beginPath();v.forEach((a,i)=>{const p=E.out(E.cl(t/.9-i*.06)),X=x0+bw*(i+.5),Y=y0-h*a/m*p;i?cx.lineTo(X,Y):cx.moveTo(X,Y)});cx.stroke()}
 else v.forEach((a,i)=>{const p=E.out(E.cl(t/.7-i*.08));cx.beginPath();cx.roundRect(x0+bw*i+bw*.12,y0-h*a/m*p,bw*.76,h*a/m*p,8);cx.fill()});cx.fillStyle=C.f;cx.fillRect(x0,y0+6,w,3)}
const AI={};function asset(L,lt){const a=lib().find(x=>x.name.toLowerCase()===String(L.name).toLowerCase());if(!a)return;let im=AI[a.id];
 if(!im){im=AI[a.id]=new Image();im.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:600px;height:600px;display:grid;place-items:center">${a.code.replace(/<script[\s\S]*?<\/script>/g,"")}</div></foreignObject></svg>`)}
 if(!im.complete||!im.naturalWidth||lt<(L.at||0))return;const s=(L.size||.3)*Math.min(cv.width,cv.height)*2*E.back(E.cl((lt-(L.at||0))/.5));cx.drawImage(im,(L.x??.5)*cv.width-s/2,(L.y??.5)*cv.height-s/2,s,s)}
