## postion:sticky

- 粘性的，position:relative 和 position:fixed 的结合体---当元素在屏幕内，表现为 relative，就要滚出显示器屏幕的时候，表现为 fixed

```css
nav {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
```

随着页面的滚动，当导航距离上边缘 0 距离的时候，黏在了上边缘，表现如同 position:fixed。

特别适合导航的跟随定位效果

- 富有层次的滚动交互

  - 父级元素不能有任何 overflow:visible 以外的 overflow 设置，否则没有粘滞效果。因为改变了滚动容器（即使没有出现滚动条）。因此，如果你的 position:sticky 无效，看看是不是某一个祖先元素设置了 overflow:hidden，移除之即可。

  - 父级元素设置和粘性定位元素等高的固定的 height 高度值，或者高度计算值和粘性定位元素高度一样，也没有粘滞效果。

  - 同一个父容器中的 sticky 元素，如果定位值相等，则会重叠；如果属于不同父元素，且这些父元素正好紧密相连，则会鸠占鹊巢，挤开原来的元素，形成依次占位的效果。

  - sticky 定位，不仅可以设置 top，基于滚动容器上边缘定位；还可以设置 bottom，也就是相对底部粘滞。如果是水平滚动，也可以设置 left 和 right 值。

- 层次滚动

```html
<article>
  <section>
    <h4>网曝王宝强殴打马蓉</h4>
    <content>
      <p>12月2日，有网友爆料称...</p>
    </content>
    <footer>网友评论：...</footer>
  </section>
  <section>
    <h4>知情人爆料称马蓉闯入王宝强家拿剪刀对峙</h4>
    <content>
      <p>...</p>
    </content>
    <footer>网友评论：...</footer>
  </section>
  ...
</article>
```

```css
article h4,
h4 {
  position: sticky;
  top: 0;
  z-index: 1;
}
content {
  position: relative;
}
footer {
  position: sticky;
  bottom: 50vh;
  z-index: -1;
}
```

由于每一段短新闻都在 section 标签中，属于不同的父元素，因此，滚动的时候，后面的新闻标题才能把前面已经 sticky 定位的新闻标题推开，这是 sticky 定位天然的特性，无需任何 JavaScript 的帮助。

两个关键点：

- 定位用的 bottom，效果和 top 正好是对立的。设置 top 粘滞的元素随着往下滚动，是先滚动后固定；而设置 bottom 粘滞的元素则是先固定，后滚动；
- z-index:-1 让网友评论 footer 元素藏在了 content 的后面，于是才有了“犹抱琵琶半遮面”的效果
