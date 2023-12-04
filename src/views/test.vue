<template>
  <div id="app">111
    <div id="main" ref="chart"></div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud'; // Import the word cloud module

export default {
  name: 'ChartComponent',
  setup() {
    const chartOptions = ref({
      series: [
        {
          type: 'wordCloud',
          shape: 'circle',
          keepAspect: false,
          left: 'center',
          top: 'center',
          width: '700px',
          height: '800px',
          right: null,
          bottom: null,
          sizeRange: [12, 60],
          rotationRange: [-90, 90],
          rotationStep: 45,
          gridSize: 8,
          drawOutOfBound: false,
          shrinkToFit: false,
          layoutAnimation: true,
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              textShadowBlur: 10,
              textShadowColor: '#333'
            }
          },
          data: [
            {
              name: 'Word1',
              value: 50,
              textStyle: {}
            },
            {
              name: 'Word2',
              value: 30,
              textStyle: {}
            },
            {
              name: 'Word3',
              value: 20,
              textStyle: {}
            },
            {
              name: 'Word4',
              value: 15,
              textStyle: {}
            },
            {
              name: 'Word5',
              value: 10,
              textStyle: {}
            },
            {
              name: 'Word6',
              value: 5,
              textStyle: {}
            }
          ]
        }
      ]
    });

    onMounted(() => {
      const chart = echarts.init(document.getElementById('main'));
      chart.setOption(chartOptions.value);
    });

    return {
      chartOptions
    };
  }
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
#main{
  width: 700px;
  height: 800px;
}
</style>