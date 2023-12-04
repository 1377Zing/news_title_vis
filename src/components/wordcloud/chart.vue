<template>
  <div>

    <!-- 图表 -->
    <div ref="chartContainer" style="width: 380px; height: 400px;" class="chartmain"></div>
	
  <div>
    <!-- 白色说明部分-->
		<el-table :data="chartData.description" style="width: 380px; height: 170px;">
		  <el-table-column width="300px" label="具体详情">
		    <template #default="{ row }">
		      <span>{{ row }}</span>
		    </template>
		  </el-table-column>
		</el-table>
	</div>

    <br>
  </div>
</template>

<script>
// 导入
import { ref, onMounted, watchEffect } from 'vue';
import * as echarts from 'echarts';

export default {
  name: 'Chart',
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },
  /* 在组件的 `setup` 函数中，定义了一个 `chartContainer` 的引用（ref），
  它将用于指向图表容器的 DOM 元素 */
  setup(props) {
    const chartContainer = ref(null);
    /* 使用 `echarts.init` 方法初始化了一个 ECharts 实例
     并将其绑定到 `chartContainer` 引用指向的 DOM 元素上 */
    onMounted(() => {
      const myChart = echarts.init(chartContainer.value);

      // 初始化图表
      const option = {
        xAxis: {
          type: 'category',
          data: ['40s', '50s','60s','70s','80s','90s','00s','10s','20s']
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            data: props.chartData.frequnce,
            type: 'line',
            smooth: false,
			color:'#FcED98'
          }
        ]
      };

      option && myChart.setOption(option);

      // 监听 chartData 变化，更新图表
      watchEffect(() => {
        myChart.setOption({
          series: [
            {
              data: props.chartData.frequnce
            }
          ]
        });
      });
    });

    return {
      chartContainer
    };
  }
};
</script>

<style scoped>
/* 定义图表容器的宽度和高度 */
.chartmain {
  width: 300px;
  height: 300px;
}
</style>