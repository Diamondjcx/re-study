// sdk or 类sdk模块开发
((vm, factory) => {     // =>  模块化
  if (typeof define === 'function' && define.amd) {
      define(() => {
          return factory(vm);
      });
  } else if (typeof exports === 'object') {
      module.exports = factory;
  } else {
      vm.zwChart = factory(vm);
  }
})(this, vm => {
  /**
   * zwChart - 图表本体对象
   * @param {*} canvas 
   * @param {*} type 
   * @param {*} data 
   * @param {*} options 
   */
  function zwChart(canvas, type, data, options) {
      // 1. 图表容器处理
      // 生成容器
      this.canvas = document.getElementById(canvas);
      // 获取context内容
      this.ctx = this.canvas.getContext('2d');
      
      // 2. 图表宽度边距等距离初始化
      // 根据设备计算DPI
      // => 面试点：DPI是什么? 告诉浏览器应使用多少屏幕实际像素来绘制单个CSS像素
      this.dpi = window.devicePixelRatio || 1;
      // <canvas>可能在视网膜屏幕上显得太模糊。
      // 使用window.devicePixelRatio确定应添加多少额外的像素密度以使图像更清晰。
      // 添加像素密度
      this.width = this.canvas.width * this.dpi;
      this.height = this.canvas.height * this.dpi;

      // 预留自动调节宽度开关
      this.autoWidth = false;

      // 初始化图表边距
      // * 此处可以放开从外面配置
      this.topPadding = 50 * this.dpi;
      this.leftPadding = 50 * this.dpi;
      this.rightPadding = 0 * this.dpi;
      this.bottomPadding = 50 * this.dpi;

      // 3. 图表 类型 | 数据 | 组件 初始化
      // 图表类型初始化
      this.type = type;
      // 图表数据初始化
      this.data = data;
      this.tipData = null;
      this.dataLength = this.data.length;
      this.options = options;
      // 初始化计算data之和
      this.totalValue = this.getTotalValue();

      // 4. 图表展现初始化
      // 是否展示图表数据
      this.valueShow = true;
      
      // 鼠标位置信息
      this.mouse = {};

      // 5. 图表x轴、y轴配置
      this.yEqual = options.yEqual || 5;
      // y轴间距初始化
      this.yLength = 0;
      // x轴间距初始化
      this.xLength = 0;
      // y轴数据间隔初始化
      this.yInterval = 0;
      // y轴长度间隔
      this.yRatio = 0;

      // 6. 图表颜色设置
      // 颜色列表
      // * 可以放开外部传入
      this.colorList = ['#1E9FFF', '#13CE66', '#F7BA2A', '#FF4949', '#72f6ff', '#199475', '#e08031', '#726dd1'];
      // 背景颜色
      this.bgColor = '#ffffff';
      // 填充颜色
      this.fillColor = '#00d100';
      // 轴颜色
      this.axisColor = '#666666';
      // tip颜色
      this.tipColor = options.toolTips && options.toolTips.bgColor || '#333333';
      this.tipFontColor = options.toolTips && options.toolTips.fontColor || '#fff';
      // 图形填充颜色
      this.contentColor = options.contentColor || '#f2f2f2';
      // 标题颜色
      this.titleColor = options.title.titleColor || '#000000';
      // 图例颜色
      this.legendColor = (options.legend && options.legend.legendColor) || '#000000';

      // 7. 组件展示
      // 标题展示
      this.title = options.title || '';
      // 标题位置
      this.titleX = options.title.x || 0;
      this.titleY = options.title.y || 0;
      // 标题对齐方式
      this.titleAlign = options.title.align || 'left';
      // 标题position方式
      this.titlePosition = options.title.position || 'top';
      // 展示tooltip
      this.toolTipsShow = options.toolTips && options.toolTips.show || true
      // radius
      this.radius = 100 * this.dpi;
      this.innerRadius = 70 * this.dpi;
      // 图例位置
      this.legendTop = (options.legend && options.legend.legendTop) || 40 * this.dpi;

      // 8. 初始化整体配置
      this.init(options);

      // 9. 补充事件配置
      // * 可以补充更多鼠标交互配置
      this.toolTipsShow && this.listenMouseEvent();
  }
  zwChart.prototype = {
      init (options) {
          // 有值判断
          if (this.dataLength === 0) {
              return false;
          }
          // 外部配置判断
          if (options) {
              // 列出涉及位置配置项
              let positionPart = [
                'topPadding', 'leftPadding', 'rightPadding', 'bottomPadding',
                'radius', 'innerRadius', 
                'legendTop'
              ];
              // 读取每项配置
              for (let key in options) {
                  if (key === 'colorList' && Array.isArray(options[key])) {
                      // 补充外部传入颜色
                      this[key] = options[key].concat(this[key])
                  } else if (positionPart.indexOf(key) > -1) {
                      // 涉及位置距离的配置项，需要处理密度
                      this[key] = options[key] * this.dpi;
                  } else {
                      this[key] = options[key];
                  }
              }
          }

          // 知识点：dom节点如何动态调整大小？
          // 面试题：offsetWidth | clientWidth | scrollWidth
          // offsetWidth = border + scrollbar + padding + width
          // clientWidth = padding + width
          // scrollWidth 表示了整体的宽度，包含可视区域 + 非可视区域
          if (options.autoWidth) {
              // 设置宽度属性大小
              this.canvas.setAttribute(
                'style',
                'width:' + this.canvas.parentNode.offsetWidth + 'px;height:' + this.canvas.parentNode.offsetHeight + 'px;'
              )

              // 动态跟随父容器大小，更新宽度数据
              this.width
                = this.canvas.width
                = this.canvas.parentNode.offsetWidth * this.dpi;
              
              this.height
                = this.canvas.height 
                = this.canvas.parentNode.offsetHeight * this.dpi;
          } else {
              this.canvas.setAttribute(
                'style',
                'width:' + this.canvas.width + 'px;height:' + this.canvas.height + 'px;'
              );

              // 动态跟随父容器大小，更新宽度数据
              this.canvas.width *= this.dpi;
              this.canvas.height *= this.dpi;
          }

          this.drawChart(options);
      },

      // 绘制图表区域
      drawChart (options) {
        if (this.type === 'bar') {
          // XY轴单位长度 - 这里写死10的间隔
          // * 可以拓展成用户可配置gap
          this.yLength = Math.floor(
            (this.height - this.topPadding - this.bottomPadding - 10) / this.yEqual // y轴格数
          );
          this.xLength = Math.floor(
            (this.width - this.leftPadding - this.rightPadding - 10) / this.dataLength
          );
          
          // 计算y轴间隔
          this.yInterval = this.getYInterval(this.data);
          // y轴比例
          this.yRatio = this.yLength / this.yInterval;
          // 绘制模块
          this.drawBlock(options);
        } 
        if (this.type === 'pie') {
          // 绘制饼图
          this.drawPie();
        }
      },

      // 分别绘制各个模块
      drawBlock (options) {
          // 柱状图背景颜色
          this.ctx.fillStyle = this.bgColor;
          // 填充区域
          this.ctx.fillRect(0, 0, this.width, this.height);
          // 绘制坐标轴
          this.drawAxis();
          // 绘制数据刻度与数值
          this.drawPoint(options);
          // 绘制标题
          this.drawTitle();
          // 绘制图
          this.drawBlockChart();
      },

      // update pie chart
      drawPie () {
          // 基础背景样式填充
          this.ctx.fillStyle = this.bgColor;
          this.ctx.fillRect(0, 0, this.width, this.height);

          // 图例
          this.drawLegend();
          // 标题
          this.drawTitle();
          // 饼图本身
          this.drawPieChart();
      },

      drawAxis () {
        // 设置路径初始点(左上)
        this.ctx.beginPath();
        // 坐标颜色
        this.ctx.strokeStyle = this.axisColor;
        // 绘制y轴
        // * 此处可拓展配置 y轴刻度边距
        this.ctx.moveTo(
          this.leftPadding + 0.5,
          this.height - this.bottomPadding + 0.5
        );
        this.ctx.lineTo(
          this.leftPadding + 0.5,
          this.topPadding  + 0.5
        );

        // 同理，绘制x轴
        this.ctx.moveTo(
          this.leftPadding + 0.5,
          this.height - this.bottomPadding + 0.5
        );
        this.ctx.lineTo(
          this.width - this.rightPadding - 0.5,
          this.height - this.bottomPadding + 0.5
        );

        // 开始绘制
        this.ctx.stroke();
      },
      
      // 刻度绘制
      drawPoint (options) {
          // 开始绘制数值
          this.ctx.beginPath();
          // 字体
          this.ctx.font = 12 * this.dpi + 'px Microsoft YaHei';
          // 居中方式
          this.ctx.textAlign = 'center';
          // 字体颜色
          this.ctx.fillStyle = this.axisColor;

          // 绘制x轴刻度
          for (let i = 0; i < this.dataLength; i++) {
            let name = this.data[i].name;
            // 距离x轴原点距离
            let xlen = this.xLength * (i + 1);

            // 绘制x轴上的分割刻度 - x轴不变，y轴向下画5
            // * 可拓展刻度长度
            this.ctx.moveTo(
              this.leftPadding + xlen + 0.5,
              this.height - this.bottomPadding + 0.5
            );
            this.ctx.lineTo(
              this.leftPadding + xlen + 0.5,
              this.height - this.bottomPadding + 5.5
            );
            
            // 刻度文字
            this.ctx.textAlign = "center";
            // 位置 = 左边距 + 第N项距离左侧边距 - 二分之个单元格长度
            this.ctx.fillText(
              name,
              this.leftPadding + xlen - this.xLength / 2,
              this.height - this.bottomPadding + 25
            );
          }
          this.ctx.stroke();

          // 绘制y轴 —— 根据data计算得出的间隔和间距
          for (let i = 0; i < this.yEqual; i++) {
            // y轴数据间隔
            let y = this.yInterval * (i + 1);
            // y轴实际距离
            let ylen = this.yLength * (i + 1);

            // 1. 先画刻度
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.axisColor;
            
            // y轴不变，x轴向左画5
            this.ctx.moveTo(
              this.leftPadding + 0.5,
              this.height - this.bottomPadding - ylen + 0.5
            );
            this.ctx.lineTo(
              this.leftPadding - 5 + 0.5,
              this.height - this.bottomPadding - ylen + 0.5
            );
            this.ctx.stroke();
            // y轴展示数值
            // * 可拓展y轴展示数字的边距
            this.ctx.fillText(
              y, this.leftPadding - 40,
              this.height - this.bottomPadding - ylen + 5
            );

            // 2. 开始画标准线
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.contentColor;
            
            // 纵向不变，横轴跨越整个content - 外刻度
            this.ctx.moveTo(
              this.leftPadding + 0.5,
              this.height - this.bottomPadding - ylen + 0.5
            );
            this.ctx.lineTo(
              this.width - this.rightPadding - 0.5,
              this.height - this.bottomPadding - ylen + 0.5
            );
            this.ctx.stroke();
          }
      },

      // 绘制标题
      drawTitle () {
          if (this.title) {
              let left = 0;
              // 开始绘制标题
              this.ctx.beginPath();
              
              // 标题样式
              this.ctx.fillStyle = this.titleColor;
              this.ctx.font = 16 * this.dpi + 'px Microsoft YaHei';

              // 标题水平位置
              this.ctx.textAlign = this.titleAlign;
              if (this.titleAlign === 'left') {
                  left = this.titleX;
              } else if (this.titleAlign === 'center') {
                  left = this.width / 2;
              } else {
                  left = this.width;
              }

              // 标题垂直位置
              if (this.titlePosition === 'bottom' && this.bottomPadding >= 40) {
                  this.ctx.fillText(
                    this.title.text,
                    left,
                    this.height - 5
                  )
              } else {
                  this.ctx.fillText(
                    this.title.text,
                    left,
                    this.topPadding / 2 + 5
                  )
              }
          }
      },

      drawLegend () {
          for (let i = 0; i < this.dataLength; i++) {
              // 取色值
              this.ctx.fillStyle = this.colorList[i];
              // 绘制图例方框
              // * 可拓展图例形状与大小、位置
              this.ctx.fillRect(10, this.legendTop + 15 * i * this.dpi, 20, 11);
              // 图例文字样式
              this.ctx.fillStyle = this.legendColor;
              this.ctx.font = 12 * this.dpi + 'px Microsoft YaHei';
              this.ctx.textAlign = 'left';
              // 书写文字
              this.ctx.fillText(this.data[i].name, 35, this.legendTop + 10 + 15 * i * this.dpi);
          }
      },

      // 绘制图表区域
      drawBlockChart () {
          // 绘制颜色
          this.ctx.fillStyle = this.fillColor;
          this.ctx.strokeStyle = this.fillColor;
          for (let i = 0; i < this.data.length; i++) {
              // 开始绘制
              // 左侧距离 = 左边距 + 第几个 + offset
              // * 可拓展外部传入offset配置
              this.data[i].left = this.leftPadding + this.xLength * (i + 0.25);
              // 上侧距离 = 高度 - 上边距 - 数值 * 距离数值比
              this.data[i].top = this.height - this.bottomPadding - this.data[i].value * this.yRatio;
              // 右侧距离 = 左边距 + 第几个 + offset + 柱子宽度
              // * 可拓展柱子宽度配置
              this.data[i].right = this.leftPadding + this.xLength * (i + 0.25 + 0.5);
              // * 底部距离 = 高度 - 底部边距
              this.data[i].bottom = this.height - this.bottomPadding;
              // 填充柱子区域
              this.ctx.fillRect(
                  this.data[i].left,
                  this.data[i].top,
                  this.data[i].right - this.data[i].left,
                  this.data[i].bottom - this.data[i].top
              );
              // 绘制柱顶数值
              if (this.valueShow) {
                // 数值样式
                this.ctx.font = 12 * this.dpi + 'px Arial';
                this.ctx.textAlign = "center"
                // 写值
                this.ctx.fillText(
                    this.data[i].value,
                    (this.data[i].left + this.data[i].right)/2,
                    this.data[i].top - 5
                );
              }
          }
      },

      drawPieChart () {
          // 固定关键点
          let x = this.width / 2,
              y = this.height / 2,
              x1 = 0,
              y1 = 0;

          for (let i = 0; i < this.dataLength; i++) {
              // 样式
              this.ctx.beginPath();
              this.ctx.fillStyle = this.colorList[i];
              // 移动到圆心
              this.ctx.moveTo(x, y);
              // 还记得角度值么
              // 面试考点：
              // 0度角是 -Math.PI / 2
              // 90度角是 0
              // 180度是 Math.PI / 2
              // 360度是 3Math.PI / 2
              // 起点 第一个是0度角，后续的为前一个的终点
              this.data[i].start
                = i === 0 
                  ? -Math.PI / 2 
                  : this.data[i - 1].end;

              // 终点 起点 + 当前值 / 总值 * 2pi
              this.data[i].end
                = this.data[i].start + this.data[i].value / this.totalValue * 2 * Math.PI;
              
              // 开始绘制弧线
              this.ctx.arc(x, y, this.radius, this.data[i].start, this.data[i].end);
              this.ctx.closePath();
              this.ctx.fill();

              // 开始绘制数值展示
              if(this.valueShow){
                  // 绘制外连线
                  this.ctx.strokeStyle = this.colorList[i];
                  // 找到中间点
                  this.data[i].middle = (this.data[i].start + this.data[i].end) / 2;
                  // 找到中间点坐标
                  // 还记得三角函数吗
                  x1 = Math.ceil(Math.abs(this.radius * Math.cos(this.data[i].middle)));
                  y1 = Math.floor(Math.abs(this.radius * Math.sin(this.data[i].middle)));

                  // 连线分为四个象限
                  if (this.data[i].middle <= 0) {
                      this.ctx.textAlign = 'left';
                      // 绘制拐点线
                      // * 可以拓展拐点距离圆距离
                      this.ctx.moveTo(x + x1, y - y1);
                      this.ctx.lineTo(x + x1 + 10, y - y1 - 10);
                      this.ctx.moveTo(x + x1 + 10, y - y1 - 10);
                      this.ctx.lineTo(x + x1 + this.radius / 2, y - y1 - 10);
                      this.ctx.stroke();
                      this.ctx.fillText(this.data[i].value, x + x1 + 5 + this.radius / 2, y - y1 - 5);
                  } else if (this.data[i].middle > 0 && this.data[i].middle <= Math.PI / 2) {
                      this.ctx.textAlign = 'left';
                      this.ctx.moveTo(x + x1, y + y1);
                      this.ctx.lineTo(x + x1 + 10, y + y1 + 10);
                      this.ctx.moveTo(x + x1 + 10, y + y1 + 10);
                      this.ctx.lineTo(x + x1 + this.radius / 2, y + y1 + 10);
                      this.ctx.stroke();
                      this.ctx.fillText(this.data[i].value, x + x1 + 5 + this.radius / 2, y + y1 + 15);
                  } else if (this.data[i].middle > Math.PI / 2 && this.data[i].middle < Math.PI) {
                      this.ctx.textAlign = 'right';
                      this.ctx.moveTo(x - x1, y + y1);
                      this.ctx.lineTo(x - x1 - 10, y + y1 + 10);
                      this.ctx.moveTo(x - x1 - 10, y + y1 + 10);
                      this.ctx.lineTo(x - x1 - this.radius / 2, y + y1 + 10);
                      this.ctx.stroke();
                      this.ctx.fillText(this.data[i].value, x - x1 - 5 - this.radius / 2, y + y1 + 15);
                  } else {
                      this.ctx.textAlign = 'right';
                      this.ctx.moveTo(x - x1, y - y1);
                      this.ctx.lineTo(x - x1 - 10, y - y1 - 10);
                      this.ctx.moveTo(x - x1 - 10, y - y1 - 10);
                      this.ctx.lineTo(x - x1 - this.radius / 2, y - y1 - 10);
                      this.ctx.stroke();
                      this.ctx.fillText(this.data[i].value, x - x1 - 5 - this.radius / 2, y - y1 - 5);
                  }
              }
          }

          // prepare for ring chart
          // if (this.type === 'ring') {
          //     this.ctx.beginPath();
          //     this.ctx.fillStyle = this.bgColor;
          //     this.ctx.arc(x, y, this.innerRadius, 0, Math.PI * 2);
          //     this.ctx.fill();
          // }
      },

      // 绘制tip
      drawTip () {
        // this.ctx.save();
        // 是否开启tip
        if (this.tipData) {
          this.ctx.beginPath();
          // 外框样式
          this.ctx.fillStyle = this.tipColor;
          this.ctx.strokeStyle = this.tipColor;
          //* 可拓展tip的相对偏移位置
          this.ctx.fillRect(
            this.mouse.mouseX + 20,
            this.mouse.mouseY + 20,
            120,
            50
          );

          // 文字样式
          this.ctx.font = 12 * this.dpi + 'px Arial';
          this.ctx.fillStyle = this.tipFontColor;
          // 书写文字
          // * 可拓展文字位置
          this.ctx.fillText(
            this.tipData.name + ':' + this.tipData.value,
            this.mouse.mouseX + 80,
            this.mouse.mouseY + 50
          );
          this.ctx.textAlign = 'center';
        }
        // this.ctx.restore();
      },

      // 监听鼠标事件
      listenMouseEvent () {
        this.canvas.addEventListener('mousemove', event => {
          // 面试题：offsetX | offsetY | clientX | clientY | pageX | pageY | screenX | screenY
          // offsetX、offsetY: 鼠标相对于事件源元素（srcElement）的X,Y坐标
          // clientX、clientY: 鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条。
          // pageX、pageY: 类似于event.clientX、event.clientY，但它们使用的是文档坐标而非窗口坐标。这2个属性不是标准属性，但得到了广泛支持。IE事件中没 有这2个属性
          // screenX、screenY: 鼠标相对于用户显示器屏幕左上角的X,Y坐标。
          this.mouse.mouseX = event.offsetX * this.dpi;
          this.mouse.mouseY = event.offsetY * this.dpi;

          // 通过位置计算tip
          this.getTipData(this.mouse.mouseX, this.mouse.mouseY);
          // 清空容器区域
          this.ctx.clearRect(0, 0, this.width, this.height);
          // 重新绘图
          this.drawChart(this.options);
          // 绘制tip
          this.drawTip();
        })
      },

      // 根据数据计算y轴间隔
      getYInterval (data) {
        let arr = data.slice(0);
        let max = 0;
        // 获取最大值并排序
        // if (data[0] && data[0].value) {
        arr.map(item => {
          if(item.value > max) max = item.value;
        })
        // 向上去整（进一）
        // 面试题：取整方式 —— 去尾、向上、四舍五入、向下
        // parseInt 去尾
        // Math.round 向上取整
        // Math.floor 四舍五入
        // Math.ceil 向下取整
        let len = Math.ceil(max / this.yEqual);
        let pow = len.toString().length - 1;

        arr.sort((a, b) => {
            return -(a.value - b.value);
        });
        // } else {
          // // data党 => 多种数据结构支持
          // * 可拓展多种数据结构支持
          // arr.forEach(each => {
          //   if(Math.max.apply(null, each.data) > max) {
          //     max = Math.max.apply(null, each.data)
          //   };
          // })
          // let len = Math.ceil(max / this.yEqual);
          // let pow = len.toString().length - 1;

          // arr.sort((a, b) => {
          //     return -(a - b);
          // });
        // }
        pow = pow > 2 ? 2 : pow;
        return Math.ceil(
          len / Math.pow(10, pow)
        ) * Math.pow(10, pow);
      },

      // 计算数据之和
      getTotalValue () {
          let total = 0;
          for (let i = 0; i < this.dataLength; i++) {
              total += this.data[i].value;
          }
          return total;
      },

      // 计算tip展示数值
      getTipData (mouseX, mouseY) {
        let tipData = null;
        for (let i = 0; i < this.data.length; i++) {
          // 计算柱状图位置以及tip
          // * 此处可以拓展其他类型图表
          if (this.type === 'bar') {
            if (mouseX >= this.data[i].left && mouseX <= this.data[i].right && mouseY <= this.data[i].bottom && mouseY >= this.data[i].top) {
              tipData = {};
              tipData.name = this.data[i].name;
              tipData.value = this.data[i].value;
            }
          }
        }
        this.tipData = tipData;
      }
  }
  return zwChart;
});
