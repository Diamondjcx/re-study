(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{G12C:function(t,i,s){"use strict";var e;s.r(i),s.d(i,"Sprite",function(){return h}),s.d(i,"CircleSprite",function(){return a}),s.d(i,"RectSprite",function(){return l}),s.d(i,"ImageSprite",function(){return r}),function(t){t[t.Circle=0]="Circle",t[t.Rect=1]="Rect",t[t.Image=2]="Image"}(e||(e={}));class h{constructor(t,i,s){this.name=t,this.ctx=i,this.isVisible=s.isVisible||!0,this.type=s.type||e.Rect,this.fillStyle=s.fillStyle||this.ctx.fillStyle,this.lineWidth=s.lineWidth||this.ctx.lineWidth,this.strokeStyle=s.strokeStyle||this.ctx.strokeStyle,this.shadowOffsetX=s.shadowOffsetX||this.ctx.shadowOffsetX,this.shadowOffsetY=s.shadowOffsetY||this.ctx.shadowOffsetY,this.shadowBlur=s.shadowBlur||this.ctx.shadowBlur,this.shadowColor=s.shadowColor||this.ctx.shadowColor,this.horizontalVelocity=s.horizontalVelocity||0,this.verticalVelocity=s.verticalVelocity||0,this.behaviors=s.behaviors||[]}applyStyle(){let{ctx:t,fillStyle:i,lineWidth:s,strokeStyle:e,shadowOffsetX:h,shadowOffsetY:a,shadowBlur:l,shadowColor:r}=this;t.fillStyle=i,t.lineWidth=s,t.strokeStyle=e}addBehavior(t){Array.isArray(t)?this.behaviors.concat(t):this.behaviors.push(t)}update(t,i,s){for(let e of this.behaviors)e.execute(this,t,i,s)}draw(){this.artist&&"function"==typeof this.artist.draw&&this.artist.draw(this)}}class a extends h{constructor(t,i,s={}){super(t,i,{...s,type:e.Circle}),this.x=s.x||0,this.y=s.y||0,this.radius=s.radius||10,this.startAngle=s.startAngle||0,this.endAngle=s.endAngle||2*Math.PI,this.anticlockwise=s.anticlockwise||!1,this.artist=s.artist||{draw:function(t){let{ctx:i,x:s,y:e,radius:h,startAngle:a,endAngle:l,anticlockwise:r}=t;i.save(),t.applyStyle(),i.beginPath(),i.arc(s,e,h,a,l,r),i.fill(),i.stroke(),i.restore()}}}}class l extends h{constructor(t,i,s){super(t,i,{...s,type:e.Rect}),this.left=s.left||0,this.top=s.top||0,this.width=s.width||10,this.height=s.height||10,this.artist=s.artist||{draw:function(t){let{ctx:i,left:s,top:e,width:h,height:a}=t;i.save(),t.applyStyle(),i.beginPath(),i.rect(s,e,h,a),i.fill(),i.stroke(),i.restore()}}}}class r extends h{constructor(t,i,s){super(t,i,{...s,type:e.Image,isVisible:!1}),this.src=s.src,this.left=s.left||0,this.top=s.top||0,this.isLoaded=!1,this.isLoading=!1,this.el=document.createElement("img"),this.loadCallBack=s.loadCallBack,this.artist=s.artist||{draw:function(t){let{ctx:i,el:s,left:e,top:h,width:a,height:l}=t;i.save(),t.applyStyle(),i.drawImage(s,e,h,a,l),i.restore()}},this.loadImage()}loadImage(t){if(this.isLoading||this.isLoaded)return;let i=()=>{this.isVisible=!0,this.isLoaded=!0,this.isLoading=!1,this.width||(this.width=this.el.width),this.height||(this.height=this.el.height),"function"==typeof this.loadCallBack&&this.loadCallBack(this),"function"==typeof t&&t.call(this)};this.isLoading=!0,this.el.addEventListener("load",i),this.el.addEventListener("error",i),this.el.src=this.src}async draw(){if(!this.isLoaded)return this.loadImage(this.draw);super.draw()}}}}]);