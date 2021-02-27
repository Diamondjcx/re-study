> https://www.zhangxinxu.com/wordpress/2018/10/display-flex-css3-css/
# display:flex

块状： display: flex 
行内块： display: inline-flex

flex容器  flex子项

Flex布局相关属性分两拨，一波作用在flex容器上，还有一拨作用在flex子项上

## 作用在flex布局上的属性

- flex-direction

用来控制子项整体布局方向，是从左往右还是从右往左，是从上往下还是从下往上。

语法：flex-direction: row | row-reverse | column | column-reverse;

row
  默认值，显示为行。方向为当前文档水平流方向，默认情况下是从左往右。如果当前水平文档流方向是rtl（如设置direction:rtl），则从右往左。
row-reverse
  显示为行。但方向和row属性值是反的。
column
  显示为列。
column-reverse
  显示为列。但方向和column属性值是反的。
- flex-wrap

  单行显示还是多行显示，要不要换行
  
  语法：flex-wrap: nowrap | wrap | wrap-reverse;

  - nowrap:
    默认值，表示单行显示，不换行。很容易出现宽度溢出的场景
    - flex子项最小内容宽度min-content之和大于flex容器宽度，则内容溢出，表现和     white-space:nowrap类似。  
    - 如果flex子项最小内容宽度min-content之和小于flex容器宽度，则：
      - flex子项默认的fit-content宽度之和大于flex容器宽度，则flex子项宽度收缩，正好填满flex容器，内容不溢出。
      - flex子项默认的fit-content宽度之和小于flex容器宽度，则flex子项以fit-content宽度正常显示，内容不溢出。
  - wrap
    宽度不足换行显示
  - wrap-reverse
    宽度不足换行显示，但是是从下往上开始，也就是原本换行在下面的子项现在跑到上面。

- flex-flow

  flex-flow: <‘flex-direction’> || <‘flex-wrap’>

- justify-content

  justify-content属性决定了水平方向子项的对齐和分布方式

  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;

  flex-start
  默认值。逻辑CSS属性值，与文档流方向相关。默认表现为左对齐。

  flex-end
  逻辑CSS属性值，与文档流方向相关。默认表现为右对齐。

  center
  表现为居中对齐。

  space-between
  表现为两端对齐。between是中间的意思，意思是多余的空白间距只在元素中间区域分配。

  space-around
  around是环绕的意思，意思是每个flex子项两侧都环绕互不干扰的等宽的空白间距，最终视觉上边缘两侧的空白只有中间空白宽度一半。

  space-evenly
  evenly是匀称、平等的意思。也就是视觉上，每个flex子项两侧空白间距完全相等。

- align-items

  align-items中的items指的就是flex子项们，因此align-items指的就是flex子项们相对于flex容器在垂直方向上的对齐方式，大家是一起顶部对齐呢，底部对齐呢，还是拉伸对齐呢，类似这样

  align-items: stretch | flex-start | flex-end | center | baseline;

  stretch
  默认值。flex子项拉伸。在演示中我们可以看到白蓝径向渐变背景区域是上下贯穿flex容器的，就是因为flex子项的高度拉伸到容器高度导致。如果flex子项设置了高度，则按照设置的高度值渲染，而非拉伸。

  flex-start
  逻辑CSS属性值，与文档流方向相关。默认表现为容器顶部对齐。

  flex-end
  逻辑CSS属性值，与文档流方向相关。默认表现为容器底部对齐。

  center
  表现为垂直居中对齐。

  baseline
  表现为所有flex子项都相对于flex容器的基线（字母x的下边缘）对齐。

- align-content
  align-content可以看成和justify-content是相似且对立的属性，justify-content指明水平方向flex子项的对齐和分布方式，而align-content则是指明垂直方向每一行flex元素的对齐和分布方式。如果所有flex子项只有一行，则align-content属性是没有任何效果的。
  
  stretch
  默认值。每一行flex子元素都等比例拉伸。例如，如果共两行flex子元素，则每一行拉伸高度是50%。
  
  flex-start
  逻辑CSS属性值，与文档流方向相关。默认表现为顶部堆砌。
  
  flex-end
  逻辑CSS属性值，与文档流方向相关。默认表现为底部堆放。
  
  center
  表现为整体垂直居中对齐。
  
  space-between
  表现为上下两行两端对齐。剩下每一行元素等分剩余空间。
  
  space-around
  每一行元素上下都享有独立不重叠的空白空间。
  
  space-evenly
  每一行元素都完全上下等分。
## 作用在flex子项上的属性
- order

我们可以通过设置order改变某一个flex子项的排序位置。

order: <integer>; /* 整数值，默认值是 0 */

- flex-grow

flex-grow属性中的grow是扩展的意思，扩展的就是flex子项所占据的宽度，扩展所侵占的空间就是除去元素外的剩余的空白间隙。

flex-grow: <number>; /* 数值，可以是小数，默认值是 0 */

- flex-shrink

shrink是“收缩”的意思，flex-shrink主要处理当flex容器空间不足时候，单个元素的收缩比例。

flex-shrink: <number>; /* 数值，默认值是 1 */

- flex-basis

flex-basis定义了在分配剩余空间之前元素的默认大小。相当于对浏览器提前告知：浏览器兄，我要占据这么大的空间，提前帮我预留好。

语法：flex-basis: <length> | auto; /* 默认值是 auto */

- flex

flex属性是flex-grow，flex-shrink和flex-basis的缩写。

flex: none | auto | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

flex默认值等同于flex:0 1 auto；
flex:none等同于flex:0 0 auto；
flex:auto等同于flex:1 1 auto；

- align-self

align-self指控制单独某一个flex子项的垂直对齐方式，写在flex容器上的这个align-items属性，后面是items，有个s，表示子项们，是全体；这里是self，单独一个个体。

align-self: auto | flex-start | flex-end | center | baseline | stretch;