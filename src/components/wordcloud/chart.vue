<template>
  <div>
	  <div>1111</div>
    <div ref="chartContainer" style="width: 300px; height: 300px;" class="chartmain"></div>
	

  <el-table :data="chartData.description" style="width: 100%" class="tables">
    <el-table-column :label="chartData.word">
      <template #default="{ row }">
        <span>{{ row }}</span>
      </template>
    </el-table-column>
  </el-table>

	
	

  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue';
import * as echarts5 from 'echarts5';

export default {
  name: 'Chart',
  props: {
    chartData: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const chartContainer = ref(null);

    onMounted(() => {
      const myChart = echarts5.init(chartContainer.value);

      // 初始化图表
      const option = {
        xAxis: {
          type: 'category',
          data: ['46', '50','60','70','80','90','00','10','20']
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
.chartmain {
	margin-top: 100px;
    width: 300px;
    height: 200px;
    margin-left: 50px;

}
.tables{
	height: 180px;
	margin-left: 10px;
	width: 300px;
}

</style>