# 移动端下的1px

## 基本概念

### 英寸：（物理像素，设备真实的物理单元

英寸：英寸描述的是屏幕的物理大小，如电脑显示器17、22，手机显示器的4.8、5.7等使用的单位都是英寸；尺寸都是屏幕对角线的长度

### 分辨率：（物理像素，设备真实的物理单元

像素：即一个小方块，它具有特定的位置和颜色

图片、电子屏幕（手机、电脑）就是由无数个具有特定颜色和特定位置的小方块拼接而成

像素可以作为图片和电子屏幕中的最小单位

- 屏幕分辨率

一个屏幕具体有多少个像素点组成

iPhone XS Max 和 iPhone SE的分辨率分别为2688 x 1242和1136 x 640。这表示手机分别在垂直和水平上所具有的像素点数。

- 图像分辨率

一张图片含有的像素数；

一张图片的分辨率为800 x 400，垂直和水平上所具有的像素点数为800和400

同一尺寸的图片，分辨率越高，图片越清晰

- PPI

PPI(Pixel Per Inch)：每英寸包括的像素数（物理像素点）

PPI可以用于描述屏幕的清晰度以及一张图片的质量 PPI越高，图片质量越高，使用PPI描述屏幕时，PPI越高，屏幕越清晰

- DPI

DPI(Dot Per Inch)：即每英寸包括的点数.

DPI最常用的是用于描述打印机，表示打印机每英寸可以打印的点数

打印机的DPI越高，打印图像的精细程度就越高，同时这也会消耗更多的墨点和时间

### 设备独立像素（Device independent pixels）DIP DP

同一尺寸的手机，手机一：300个物理像素  手机二：600个物理像素  同样的字体，在手机二中会显示的清晰一点

用一种单位来同时告诉不同分辨率的手机，他们在界面上显示元素的大小是多少，这个单位就是设备独立像素

- 设备像素比

device pixel ratio：dpr   物理像素和设备独立像素的比值

在web中，浏览器为我们提供了window.devicePixelRatio来帮助我们获取dpr。

在css中，可以使用媒体查询min-device-pixel-ratio，区分dpr：

```css
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){ }
```

当然，上面的规则也有例外，iPhone 6、7、8 Plus的实际物理像素是1080 x 1920，在开发者工具中我们可以看到：它的设备独立像素是414 x 736，设备像素比为3，设备独立像素和设备像素比的乘积并不等于1080 x 1920，而是等于1242 x 2208。

实际上，手机会自动把1242 x 2208个像素点塞进1080 * 1920个物理像素点来渲染，我们不用关心这个过程，而1242 x 2208被称为屏幕的设计像素。我们开发过程中也是以这个设计像素为准。

- 移动端开发

开发中样式单位使用的是设备独立像素

为了适配所有机型，在写样式时需要把物理像素转换为设备独立像素。
例如：如果给定一个元素的告诉为200px（px指物理像素，非css像素）iphone6的设备像素比为2，给定的height应为200px/2=100dp

所有UI图按照设备独立像素来出

- web端开发

在写CSS时，我们用到最多的单位是px，即CSS像素，当页面缩放比例为100%时，一个CSS像素等于一个设备独立像素。

但是CSS像素是很容易被改变的，当用户对浏览器进行了放大，CSS像素会被放大，这时一个CSS像素会跨越更多的物理像素。

页面的缩放系数 = CSS像素 / 设备独立像素。

### 视口

视口（viewport）代表当前可见的计算机图形区域。在Web浏览器术语中，通常与浏览器窗口相同，但不包括浏览器的UI， 菜单栏等——即指你正在浏览的文档的那一部分

- 布局视口

当我们以百分比来指定一个元素的大小时，它的计算值是由这个元素的包含块计算而来的。当这个元素是最顶级元素时，它就是基于布局视口来计算的。

布局视口是网页布局的基准窗口，在pc浏览器上，布局视口就等于当前浏览器的窗口大小（不包含borders、margins、滚动条）

在移动端布局视口被赋予一个默认值，大部分为980px，保证pc的网页可以在手机浏览器上呈现

document.documentElement.clientWidth / clientHeight来获取布局视口大小

- 视觉视口

用户通过屏幕真实看到的区域。

视觉窗口默认等于当前浏览器的窗口大小（包括滚动条宽度）

当用户对浏览器进行缩放时，不会改变布局视口的大小，所以页面布局是不变的，但是缩放会改变视觉视口的大小

例如：用户将浏览器窗口放大了200%，这时浏览器窗口中的css像素会随着视觉视口的放大而放大，这时一个css像素会跨域更多的物理像素

所以，布局视口会限制你的css布局，而视觉视口决定用户具体能看到什么

window.innerWidth / innerHeight来获取视觉视口大小

- 理想视口

布局视口在移动端展示的效果并不是一个理想的效果，所以理想视口就诞生了：网站页面在移动端展示的理想大小

在浏览器调试移动端时页面上给定的像素大小就是理想视口大小，它的单位正式设备独立像素

页面缩放系数 = css像素 / 设备独立像素 不如说 页面缩放系数 = 理想视口宽度 / 视觉视口宽度

所以页面缩放比例为100%时，css像素 = 设备独立像素  理想视口 = 视觉视口

screen.width / height来获取理想视口大小

- Meta viewport

可以借助<meta>元素的viewport来帮助我们设置视口、缩放等，从而让移动端得到更好的展示效果

```html
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">
```

width: 正整数或device-width 以pixels（像素）为单位，定义布局视口的宽度
initial-scale：定义页面初始缩放比率。
user-scalable：如果设置为 no，用户将不能放大或缩小网页。默认值为 yes。

- 移动端适配

为了在移动端让页面获得更好的显示效果，我们必须让布局视口、视觉视口都尽可能等于理想视口。

device-width就等于理想视口的宽度，所以设置width=device-width就相当于让布局视口等于理想视口。

由于initial-scale = 理想视口宽度 / 视觉视口宽度，所以我们设置initial-scale=1;就相当于让视觉视口等于理想视口。

这时，1个CSS像素就等于1个设备独立像素，而且我们也是基于理想视口来进行布局的，所以呈现出来的页面布局在各种设备上都能大致相似

- 缩放

上面提到width可以决定布局视口的宽度，实际上它并不是布局视口的唯一决定性因素，设置initial-scale也有肯能影响到布局视口，因为布局视口宽度取的是width和视觉视口宽度的最大值。

例如：若手机的理想视口宽度为400px，设置width=device-width，initial-scale=2，此时视觉视口宽度 = 理想视口宽度 / initial-scale即200px，布局视口取两者最大值即device-width 400px。

若设置width=device-width，initial-scale=0.5，此时视觉视口宽度 = 理想视口宽度 / initial-scale即800px，布局视口取两者最大值即800px

- 获取浏览器的大小

  - window.innerHeight：获取浏览器视觉视口高度（包括垂直滚动条）。
  - window.outerHeight：获取浏览器窗口外部的高度。表示整个浏览器窗口的高度，包括侧边栏、窗口镶边和调正窗口大小的边框。
  - window.screen.Height：获取获屏幕取理想视口高度，这个数值是固定的，设备的分辨率/设备像素比
  - window.screen.availHeight：浏览器窗口可用的高度。
  - document.documentElement.clientHeight：获取浏览器布局视口高度，包括内边距，但不包括垂直滚动条、边框和外边距。
  - document.documentElement.offsetHeight：包括内边距、滚动条、边框和外边距。
  - document.documentElement.scrollHeight：在不使用滚动条的情况下适合视口中的所有内容所需的最小宽度。测量方式与clientHeight相同：它包含元素的内边距，但不包括边框，外边距或垂直滚动条。


## 1px问题

- 产生原因

为了适配各种屏幕，写代码时一般使用设备独立像素来对页面进行布局

在设备像素比大于1的屏幕上，我们写的1px实际上是被多个物理像素渲染，就会出现1px在有些屏幕上看起来很粗的现象

ui给的设计图基本都是二倍、三倍图

假设设计图是750px的二倍图，在750px上设计了1px的边框，要拿到375px宽度的手机来显示，就相当于整体设计图缩小了一倍，所以750px设计图里的1px边框在375px手机设备上要以0.5px来呈现才符合预期效果，然而css里最低只支持1px大小，不足1px就以1px显示，所以你看到的就显得边框较粗，实际上只是设计图整体缩小了，而1px的边框没有跟着缩小导致的。

- 解决方案

  - border-image
  
  基于media查询判断不同的设备像素比给定不同的border-image：

  ```css
         .border_1px{
          border-bottom: 1px solid #000;
        }
        @media only screen and (-webkit-min-device-pixel-ratio:2){
            .border_1px{
                border-bottom: none;
                border-width: 0 0 1px 0;
                border-image: url(../img/1pxline.png) 0 0 2 0 stretch;
            }
        }
  ```
  - background-image

  和border-image类似，准备一张符合条件的边框背景图，模拟在背景上

  ```css
         .border_1px{
          border-bottom: 1px solid #000;
        }
        @media only screen and (-webkit-min-device-pixel-ratio:2){
            .border_1px{
                background: url(../img/1pxline.png) repeat-x left bottom;
                background-size: 100% 1px;
            }
        }
  ```
  - 伪类 + transform

  基于media查询判断不同的设备像素比对线条进行缩放

  ```css
         .border_1px:before{
          content: '';
          position: absolute;
          top: 0;
          height: 1px;
          width: 100%;
          background-color: #000;
          transform-origin: 50% 0%;
        }
        @media only screen and (-webkit-min-device-pixel-ratio:2){
            .border_1px:before{
                transform: scaleY(0.5);
            }
        }
        @media only screen and (-webkit-min-device-pixel-ratio:3){
            .border_1px:before{
                transform: scaleY(0.33);
            }
        }
  ```
  - svg

  上面我们border-image和background-image都可以模拟1px边框，但是使用的都是位图，还需要外部引入。

  借助PostCSS的postcss-write-svg我们能直接使用border-image和background-image创建svg的1px边框：
  
  ```css
  @svg border_1px { 
  height: 2px; 
  @rect { 
    fill: var(--color, black); 
    width: 100%; 
    height: 50%; 
    } 
  } 
  .example { border: 1px solid transparent; border-image: svg(border_1px param(--color #00b1ff)) 2 2 stretch; }
  ```
  编译后：

  ```css
  .example { border: 1px solid transparent; border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='2px'%3E%3Crect fill='%2300b1ff' width='100%25' height='50%25'/%3E%3C/svg%3E") 2 2 stretch; }
  ```

  上面的方案是大漠在他的文章中推荐使用的，基本可以满足所有场景，而且不需要外部引入，这是我个人比较喜欢的一种方案。

  - 设置viewport

  通过设置缩放，让CSS像素等于真正的物理像素。

  例如：当设备像素比为3时，我们将页面缩放1/3倍，这时1px等于一个真正的屏幕像素。

  ```javascript
    const scale = 1 / window.devicePixelRatio;
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        window.document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
    ```

    当然，这样做是要付出代价的，这意味着你页面上所有的布局都要按照物理像素来写。这显然是不现实的，这时，我们可以借助flexible或vw、vh来帮助我们进行适配。

## 移动端适配方案

  - flexible方案   rem布局

  ```javascript
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }
  setRemUnit()
  ```

  rem是相对于html节点的font-size来做计算的

  通过设置document.documentElement.style.fontSize统一整个页面的布局标准



  - vh、vw方案

## 适配iphoneX

## 横屏适配

```javascript
window.orientation
window.addEventListener("resize", ()=>{
    if (window.orientation === 180 || window.orientation === 0) { 
      // 正常方向或屏幕旋转180度
        console.log('竖屏');
    };
    if (window.orientation === 90 || window.orientation === -90 ){ 
       // 屏幕顺时钟旋转90度或屏幕逆时针旋转90度
        console.log('横屏');
    }  
}); 

```
css检测横屏

```javascript
@media screen and (orientation: portrait) {
  /*竖屏...*/
} 
@media screen and (orientation: landscape) {
  /*横屏...*/
}
```

## 图片模糊问题

产生原因：平时使用的图片大多数都属于位图（png、jpg...）位图由一个个像素点构成的，每个像素都具有特定的位置和颜色值

位图的每个像素对应在屏幕上使用一个物理像素来渲染，才能达到最佳的显示效果

而在dpr > 1的屏幕上，位图的一个像素可能由多个物理像素来渲染，然而这些物理像素点并不能被准确的分配上对应位图像素的颜色，只能取近似值，所以相同的图片在dpr > 1的屏幕上就会模糊

解决方案：针对不同DPR的屏幕，我们需要展示不同分辨率的图片。

- 在dpr=2的屏幕上展示两倍图(@2x)，在dpr=3的屏幕上展示三倍图(@3x)
- media查询
```css
       .avatar{
            background-image: url(conardLi_1x.png);
        }
        @media only screen and (-webkit-min-device-pixel-ratio:2){
            .avatar{
                background-image: url(conardLi_2x.png);
            }
        }
        @media only screen and (-webkit-min-device-pixel-ratio:3){
            .avatar{
                background-image: url(conardLi_3x.png);
            }
        }
```
- image-set
```css
.avatar {
    background-image: -webkit-image-set( "conardLi_1x.png" 1x, "conardLi_2x.png" 2x );
}
```

- scrset
```css
<img src="conardLi_1x.png"
     srcset=" conardLi_2x.png 2x, conardLi_3x.png 3x">

```

- JavaScript拼接图片url

```javascript
const dpr = window.devicePixelRatio;
const images =  document.querySelectorAll('img');
images.forEach((img)=>{
  img.src.replace(".", `@${dpr}x.`);
})
```

- 使用svg

```css
<img src="conardLi.svg">

<img src="data:image/svg+xml;base64,[data]">

.avatar {
  background: url(conardLi.svg);
}
```
## 


https://cloud.tencent.com/developer/article/1352187