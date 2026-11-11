/* Иконки Lucide (1700+ штук) и свои. Слои: icon {name,label,style} и icons {names,labels,layout: row|grid|hub} */
const XI={sneaker:[["path",{d:"M2.5 16V8.2c0-.7.5-1.2 1.2-1.2H6l1.2 2.1c.6 1 1.6 1.7 2.8 1.8l6.3.8c2.3.3 4.2 1.8 5 3.9.1.3.2.7.2 1V16"}],["path",{d:"M2 16h20v1.8c0 .7-.6 1.2-1.2 1.2H3.2C2.5 19 2 18.5 2 17.8Z"}],["path",{d:"M10 9.6l1.4-1.6"}],["path",{d:"M12.6 10.5L14 8.9"}],["path",{d:"M15.2 11.3l1.3-1.5"}]]};
const ALIAS={shoe:"sneaker",shoes:"sneaker",sneakers:"sneaker",trainer:"sneaker",kicks:"sneaker",vpn:"shield-check",editing:"clapperboard",montage:"clapperboard",cut:"scissors",size:"ruler",sizes:"ruler",price:"tag",brand:"badge-check",lens:"aperture",internet:"globe",security:"shield-check",privacy:"eye-off",money:"banknote",learn:"graduation-cap",study:"book-open",idea:"lightbulb"};
const IC={};let svgHost;
const pascal=n=>n.split("-").map(x=>x?x[0].toUpperCase()+x.slice(1):"").join("");
function iconNodes(raw){let n=String(raw||"").toLowerCase().trim().replace(/[\s_]+/g,"-");n=ALIAS[n]||n;if(XI[n])return[n,XI[n]];
 const I=(window.lucide&&lucide.icons)||{},p=pascal(n);let k=I[p]?p:null;if(!k){const ks=Object.keys(I);k=ks.find(x=>x.startsWith(p))||ks.find(x=>x.includes(p))||(I.Sparkles?"Sparkles":null)}
 if(!k)return["none",[]];const v=I[k];return[k,Array.isArray(v)&&v[0]==="svg"?v[2]:v]}
function toPath(t,a){const n=k=>+a[k]||0;if(t==="path")return new Path2D(a.d);const p=new Path2D;
 if(t==="circle"){p.moveTo(n("cx")+n("r"),n("cy"));p.arc(n("cx"),n("cy"),n("r"),0,6.2832)}
 else if(t==="ellipse")p.ellipse(n("cx"),n("cy"),n("rx"),n("ry"),0,0,6.2832);
 else if(t==="rect")p.roundRect(n("x"),n("y"),n("width"),n("height"),n("rx")||0);
 else if(t==="line"){p.moveTo(n("x1"),n("y1"));p.lineTo(n("x2"),n("y2"))}
 else if(t==="polyline"||t==="polygon"){const q=String(a.points).trim().split(/[\s,]+/).map(Number);for(let i=0;i<q.length;i+=2)i?p.lineTo(q[i],q[i+1]):p.moveTo(q[i],q[i+1]);if(t==="polygon")p.closePath()}
 return p}
function prep(raw){const[key,nodes]=iconNodes(raw);if(IC[key])return IC[key];
 if(!svgHost){svgHost=document.createElementNS("http://www.w3.org/2000/svg","svg");svgHost.setAttribute("width","0");svgHost.setAttribute("height","0");svgHost.style.cssText="position:absolute;left:-9999px";document.body.appendChild(svgHost)}
 return IC[key]={parts:nodes.map(([tag,a])=>{const el=document.createElementNS("http://www.w3.org/2000/svg",tag);for(const k in a)el.setAttribute(k,a[k]);svgHost.appendChild(el);let len=40;try{len=el.getTotalLength()}catch{}svgHost.removeChild(el);return{path:toPath(tag,a),len:Math.max(len,1)}})}}
function glyph(name,sz,p,col,sw){const g=prep(name),s=sz/24;cx.save();cx.scale(s,s);cx.translate(-12,-12);cx.lineWidth=sw;cx.lineCap=cx.lineJoin="round";cx.strokeStyle=col;
 g.parts.forEach(q=>{cx.setLineDash([q.len+1,q.len+1]);cx.lineDashOffset=(q.len+1)*(1-p);cx.stroke(q.path)});cx.setLineDash([]);cx.restore()}
function tile(name,x,y,sz,t,label,C,style){const p=E.back(E.cl(t/.35));if(t<=0)return;const dp=E.out(E.cl((t-.12)/.6)),fl=t>.8?Math.sin(t*1.6)*sz*.018:0,R=sz/2,bare=style==="bare",P=S.pal;
 cx.save();cx.translate(x,y+fl);cx.scale(p,p);cx.globalAlpha=E.cl(t/.2);
 if(!bare){cx.save();cx.shadowColor="rgba(0,0,0,.35)";cx.shadowBlur=sz*.25;cx.shadowOffsetY=sz*.08;const g=cx.createLinearGradient(0,-R,0,R);
  if(C.inv){g.addColorStop(0,"#ffffff");g.addColorStop(1,"#ecebe6")}else{g.addColorStop(0,mixc(P.bg,"#ffffff",.18));g.addColorStop(1,mixc(P.bg,"#ffffff",.07))}
  cx.fillStyle=g;cx.beginPath();cx.roundRect(-R,-R,sz,sz,sz*.26);cx.fill();cx.restore();cx.strokeStyle=C.inv?"rgba(0,0,0,.1)":"rgba(255,255,255,.14)";cx.lineWidth=2;cx.beginPath();cx.roundRect(-R,-R,sz,sz,sz*.26);cx.stroke()}
 glyph(name,sz*(bare?1:.54),dp,C.inv?P.bg:C.acc?P.tx:P.ac,bare?1.5:1.8);
 if(label){cx.globalAlpha=dp;cx.font=`${S.font[1]} ${sz*.14}px "${S.font[0]}"`;cx.textAlign="center";cx.textBaseline="middle";cx.fillStyle=C.f;cx.fillText(String(label).toUpperCase(),0,R+sz*.2)}
 cx.restore()}
function iconsL(L,lt,C){const W=cv.width,H=cv.height,t0=lt-(L.at||0);if(t0<0)return;const Mn=Math.min(W,H),one=L.type==="icon",names=one?[L.name]:(L.names||[]).slice(0,6),lab=one?[L.label]:(L.labels||[]),n=names.length;if(!n)return;
 const X=(L.x??.5)*W,Y=(L.y??.5)*H,s0=(L.size||.16)*Mn*1.7;let pos,sz=s0,big=0;
 if(n===1)pos=[[0,0]];
 else if(L.layout==="hub"&&n>=3){sz=Math.min(s0,Mn*.2);big=1;const r=sz*1.6;pos=[[0,0]];for(let i=1;i<n;i++){const a=-Math.PI/2+(i-1)*2*Math.PI/(n-1);pos.push([Math.cos(a)*r,Math.sin(a)*r])}}
 else if(L.layout==="grid"&&n>=3){sz=Math.min(s0,W*.36,H*.2);const g=sz*1.3,r=Math.ceil(n/2);pos=names.map((_,i)=>[((i%2)-.5)*g,(Math.floor(i/2)-(r-1)/2)*g*1.1])}
 else{sz=Math.min(s0,W*.86/(n*1.28));const g=sz*1.28;pos=names.map((_,i)=>[(i-(n-1)/2)*g,0])}
 pos.forEach((q,i)=>tile(names[i],X+q[0],Y+q[1],big&&i===0?sz*1.3:sz,t0-i*.12,big&&i===0?"":lab[i],C,L.style))}
