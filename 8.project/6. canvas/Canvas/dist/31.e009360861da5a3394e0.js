(window.webpackJsonp=window.webpackJsonp||[]).push([[31,25],{"0Pcb":function(t,e,i){"use strict";const s=function(){const t=window.navigator.userAgent;return window.location.href,function(t){const e={},i=t.indexOf("iPhone")>=0||t.indexOf("iPad")>=0||t.indexOf("iPod")>=0,s=t.indexOf("Android")>0;return e.ios=i,e.android=s,e.mobile=i||s,e.pc=!i&&!s,e}(t)}();e.a=s},Qb4n:function(t,e,i){"use strict";var s=i("kZAv");e.a=class{constructor(){this.el=document.createElement("canvas")}initCanvasSize(t,e){this.el.width=t,this.el.height=e,this.width=t,this.height=e}getContext(t,e){return this.el.getContext(t,e)}render(t){this.container=t;let{width:e,height:i}=t.getBoundingClientRect();this.initCanvasSize(e||s.d,i||s.b),this.container.innerHTML="",this.container.appendChild(this.el)}}},QmmR:function(t,e,i){"use strict";i.r(e);e.default=class{constructor(t,e,i,s){this.value=t,this.x=e,this.y=i,this.alpha=s,this.gray=.98,this.count=0}drop(t,e){this.x+=t,this.y+=e+this.gray*this.count,this.count+=1/60}}},bMxf:function(t,e,i){"use strict";i.r(e);var s=i("Qb4n"),n=i("QmmR");e.default=class extends s.a{constructor(t,e){super(),this.ctx=this.getContext("2d"),this.btnWidth=160,this.btnHeight=40,this.btnLeft=t/2-this.btnWidth/2,this.btnTop=.75*e,this.startDrop=!1,this.lines=[],this.btnText=[],this.duration=0,this.isOut=!1,this.gray=.98,this.initCanvasSize(t,e),this.createTextLine(),this.createBtnText()}createTextLine(){let t,{ctx:e,width:i,height:s}=this,h=.3*s,r=[{text:"小猪猪",space:30,y:h},{text:"对不起",space:10,y:h+60},{text:"不要生气",space:10,y:h+120}];for(let[s,{text:h,space:o,y:a}]of r.entries()){this.lines[s]=[];let r=h.split("");t=i/2-(e.measureText(h).width+o*(r.length-1))/2;for(let i of r){let h=e.measureText(i).width;this.lines[s].push(new n.default(i,t,a,1)),t=t+h+o}}}createBtnText(){let t,{ctx:e,btnTop:i,btnHeight:s,width:h}=this,r=i+s/2+e.measureText("M").width/2,o="接受道歉".split("");t=h/2-(e.measureText("接受道歉").width+6*(o.length-1))/2;for(let i of o){let s=e.measureText(i).width;this.btnText.push(new n.default(i,t,r,1)),t=t+s+6}}drawBtn(){let{ctx:t,btnLeft:e,btnTop:i,btnWidth:s,btnHeight:n,btnText:h,startDrop:r,duration:o,gray:a}=this;t.save(),t.fillStyle="#ffffff",t.shadowOffsetX=3,t.shadowOffsetY=3,t.shadowBlur=4,t.shadowColor="#cea3a3",t.fillRect(e,i,s,n),t.restore(),t.save(),t.font="18px sans-serif",t.fillStyle="#916c2b";for(let e of h)r&&e.drop(-.6,1),t.fillText(e.value,e.x,e.y);r&&(this.btnLeft-=.6,this.btnTop+=1+a*(o/60)),t.restore()}drawText(){let{ctx:t,width:e,height:i,lines:s,startDrop:n,duration:h}=this;t.save(),t.font="18px sans-serif",t.fillStyle="#ffffff";let r,o,a=Math.floor(h/20);for(let h=0,c=s.length;h<c;h++)for(let l=0,d=(r=s[h]).length;l<d;l++)o=r[l],n&&l+h*c<=a&&o.drop(-1,.2*h+1),t.fillText(o.value,o.x,o.y),this.isOut=h===c-1&&l===d-1&&(o.x>e||o.y>i);t.restore()}drop(){this.startDrop=!0}render(){let{ctx:t,width:e,height:i,startDrop:s}=this;return t.clearRect(0,0,e,i),this.drawText(),this.drawBtn(),s&&(this.duration+=1),this}}},kZAv:function(t,e,i){"use strict";i.d(e,"d",function(){return s}),i.d(e,"b",function(){return n}),i.d(e,"a",function(){return h}),i.d(e,"c",function(){return r});const s=500,n=500,h=`${i("0Pcb").a.pc?24:16}px sans-serif`,r="https://snayan.github.io/canvas-demo/"}}]);