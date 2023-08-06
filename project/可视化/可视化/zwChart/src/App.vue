<template>
  <div id="chart-demo">
    <h1>{{ msg }}</h1>
    <!-- bar chart -->
    <canvas id="canvas1" width="500" height="400"></canvas>
    <pre><code>
      barData: [
        {name:'Jan.',value:500},
        {name:'Mar.',value:600},
        {name:'May.',value:700},
        {name:'Jul.',value:800},
        {name:'Sep.',value:900},
        {name:'Nov.',value:1000}
      ],
      barOptions: {
        title: {
          text: 'Web Vistor',
          titleColor: '#00887C',
          align: 'left',
          x: 150,
          position: 'top'
        },
        toolTips: {
          show: ture,
          bgColor: '#333',
          fontColor: '#fff'
        },
        autoWidth: false,
        showValue: true,
        bgColor: '#fff',
        fillColor: '#00d000',
        contentColor: '#f2f2f2',
        yEqual: 7
      }
    </code></pre>
    <!-- pie chart -->
    <canvas id="canvas2" width="500" height="400"></canvas>
    <pre><code>
      pieData: [{
          name: 'positive',
          value: 33
      }, {
          name: 'negative',
          value: 44
      }, {
          name: 'abort',
          value: 5
      }],
      pieOptions: {
        title: {
          text: 'Support Part',
          titleColor: '#00887C',
          align: 'left',
          x: 150,
          position: 'top'
        },
        legend: {
          legendColor: '#00887C',
          legendTop: 40
        },
        legendColor: '#00887C',
        radius: 120
      }
    </code></pre>
  </div>
</template>

<script>
const { zwChart } = require('./components/zwChart.js');

export default {
  name: 'chartDemo',
  data () {
    return {
      msg: 'Welcome to zwChart',
      value: 0,
      barData: [
        {name:'Jan.',value:500},
        {name:'Mar.',value:600},
        {name:'May.',value:700},
        {name:'Jul.',value:800},
        {name:'Sep.',value:900},
        {name:'Nov.',value:1000}
      ],
      pieData: [{
          name: 'positive',
          value: 33
      }, {
          name: 'negative',
          value: 44
      }, {
          name: 'abort',
          value: 5
      }]
    }
  },
  mounted() {
    new zwChart('canvas1', 'bar', this.barData, {
        title: {
          text: 'Web Vistors',
          titleColor: '#00887C',
          align: 'left',
          x: 150,
          position: 'top'
        },
        colorList: ['red', 'green', 'blue'],
        toolTips: {
          show: true,
          bgColor: '#333',
          fontColor: '#fff'
        },
        autoWidth: false,
        showValue: true,
        bgColor: '#fff',
        fillColor: '#00d000',
        contentColor: '#f2f2f2',
        yEqual: 7
    });
    new zwChart('canvas2', 'pie', this.pieData, {
      title: {
        text: 'Support Part',
        titleColor: '#00887C',
        align: 'left',
        x: 150,
        position: 'top'
      },
      legend: {
        legendColor: '#00887C',
        legendTop: 40
      },
      legendColor: '#00887C',
      radius: 120
    });
  }
}
</script>

<style lang="scss">
#chart-demo {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px;
  h1, h2 {
    font-weight: normal;
  }
  pre {
    display: inline-block;
    width: 420px;
    height: 400px;
    vertical-align: top;
    background-color: #eaeefb;
    margin-left: 50px;
  }
}
</style>
