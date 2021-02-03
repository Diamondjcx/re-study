# line-height

## 字面意思

"行高"：一行文字的高度，两行文字间基线的距离。英文格子中的四条线，底部第二条线就是基线

vertical-align：top、middle、baseline、bottom
第一条：顶线
第二条：中线
第三条：基线
第四条：底线

## line-height 与 line boxes 高度

若一个 div 不设置高度，直接填充文字就会有高度，是 line-height 的作用

line boxes:一行一个，取最高的行高

一个没有设置 height 属性的 div 的高度就是由一个一个 line boxes 的高度堆积而成的。

## 行高的垂直居中

行高还有一个特性，叫做垂直居中性。line-height 的最终表现是通过 line boxes 实现的，而无论 line boxes 所占据的高度是多少（无论比文字大还是比文字小），其占据的空间都是与文字内容公用水平中垂线的

## 在单行或多行或图片垂直居中的应用

1、单行文字的垂直居中对齐

网上说：把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中
把 line-height 设置为您需要的 box 的大小可以实现单行文字的垂直居中，height 多余的

2、多行文字的垂直居中

高度固定：直接使用 padding
高度不固定：使用 line-height，还要设置 display:inline-block 保持在一行上

```css
.mulit_line {
  line-height: 150px;
  border: 1px dashed #cccccc;
  padding-left: 5px;
}
.mulit_line span {
  display: -moz-inline-stack;
  display: inline-block;
  line-height: 1.4em;
  vertical-align: middle;
}
.mulit_line i {
  width: 0;
  display: -moz-inline-stack;
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
}
```

```html
<p class="mulit_line">
  <span style="font-size:12px;"
    >这里是高度为150像素的标签内的多行文字，文字大小为12像素。<br />这里是第二行，用来测试多行的显示效果。</span
  ><i>&nbsp;</i>
</p>
```

3、图片的垂直居中

```css
.zxx_ul_image {
  overflow: hidden;
  zoom: 1;
}
.zxx_ul_image li {
  float: left;
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  *font-size: 125px;
}
.zxx_ul_image li:after {
  content: ' ';
  vertical-align: middle;
}
.zxx_ul_image li img {
  vertical-align: middle;
}
```

```html
<ul class="zxx_ul_image">
  <li><img src="//image.zhangxinxu.com/image/study/s/s128/mm1.jpg" /></li>
  <li><img src="//image.zhangxinxu.com/image/study/s/s128/mm2.jpg" /></li>
  <li><img src="//image.zhangxinxu.com/image/study/s/s128/mm3.jpg" /></li>
  <li><img src="//image.zhangxinxu.com/image/study/s/s128/mm4.jpg" /></li>
  <li><img src="//image.zhangxinxu.com/image/study/s/s128/mm5.jpg" /></li>
  <li><img src="//image.zhangxinxu.com/image/study/s/s128/mm6.jpg" /></li>
</ul>
```

## 、行高在文章显示中的应用

一般社交型的网站都会有发博文或写日志的功能，其中发表后的文章显示也是有学问的，其中之一就是 line-height 行高。

```css
.article_box {
  line-height: 1.5;
}
```

1.5 则是先继承 1.5 这个值，遍历到了该标签再计算去 line-height 的像素值

## 使用行高代替高度避免 haslayout

类似 inline-block 属性的元素里如果有 block 属性的元素，如果该 block haslayout，则该标签会冲破外部 inline-block 的显示而宽度 100%显示，从使按钮自适应文字大小的效果失效，解决方法就是使用 line-height 代替 height。

```css
.out {
  display: inline-block;
  background: #a0b3d6;
  margin-top: 20px;
}
.in1 {
  display: block;
  height: 20px;
}
.in2 {
  display: block;
  line-height: 20px;
}
```

```html
<span class="out">
  <span class="in1">height:20px;</span>
</span>
<span class="out">
  <span class="in2">line-height:20px;</span>
</span>
```
