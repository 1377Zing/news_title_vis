<template>
	
	<div class="wordmain">
		  <el-container width="1480px">

		     <el-container style="height: 800px;">
		        <el-main width="1000px">
					<div class="words">
						<words @word-clicked="handleWordClicked" :msg="words2"></words>
					</div>
				</el-main>
				<el-aside width="420px" >
				<div class="chart">
			
					<charts :chartData="chartData"></charts>
				
				</div>
				</el-aside>
		      </el-container>
		    </el-container>
	</div>
</template>

<script>
import words from "../wordcloud/words.vue"
import charts from "../wordcloud/chart.vue"
export default {
  components: {
    words,charts
  },
  data() {
    return {
      chartData: {
		   description: [],
		   frequnce: [],
		    word:[],
	   },
      clickedWord: '',
		words2: [
		  { text: '乔石', size: 875 },
		  { text: '波黑', size: 1286 },
		  //{ text: '波黑', size: 2286 },
		  { text: '欧共体', size: 591 },
		  { text: '克林顿', size: 553 },
		  { text: '十五大', size: 399 },
		  { text: '下岗职工', size: 349 },
		  { text: '香港回归', size: 360 },
		  { text: '车臣', size: 274 },
		  { text: '外汇牌价', size: 180 },
		  { text: '邓小平理论', size: 194 },
		  { text: '沪市', size: 175 },
		  { text: '深市', size: 171 },
		  { text: '独联体', size: 218 },
		  { text: '澳门回归', size: 182 },
		  { text: '电脑', size: 652 },
		  { text: '海峡两岸', size: 311 },
		  { text: '陈慕华', size: 499 },
		  { text: '迟浩田', size: 393 }
		],
      wordData: [
    {'word': '乔石', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 182, 875, 0, 12, 0]},
    {'word': '波黑', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 1286, 40, 46, 9]},
    {'word': '欧共体', 'descriptions': [], 'frequnce': [0, 0, 0, 1, 264, 591, 0, 0, 0]},
    {'word': '克林顿', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 553, 96, 31, 0]},
    {'word': '十五大', 'descriptions': [], 'frequnce': [0, 2, 0, 2, 8, 399, 18, 4, 0]},
    {'word': '下岗职工', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 349, 145, 2, 0]},
    {'word': '香港回归', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 360, 36, 44, 35]},
    {'word': '车臣', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 274, 99, 6, 0]},
    {'word': '外汇牌价', 'descriptions': [], 'frequnce': [14, 4, 1, 0, 0, 180, 0, 0, 0]},
    {'word': '邓小平理论', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 194, 56, 3, 0]},
    {'word': '沪市', 'descriptions': [], 'frequnce': [40, 9, 0, 0, 1, 175, 11, 4, 0]},
    {'word': '深市', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 171, 1, 1, 0]},
    {'word': '独联体', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 218, 69, 12, 2]},
    {'word': '澳门回归', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 182, 62, 42, 3]},
    {'word': '电脑', 'descriptions': [], 'frequnce': [0, 1, 0, 0, 261, 652, 461, 87, 2]},
    {'word': '海峡两岸', 'descriptions': [], 'frequnce': [0, 1, 1, 0, 161, 311, 202, 122, 8]},
    {'word': '陈慕华', 'descriptions': [], 'frequnce': [0, 0, 0, 249, 499, 104, 2, 5, 2]},
    {'word': '迟浩田', 'descriptions': [], 'frequnce': [0, 0, 0, 4, 14, 393, 287, 0, 0]},

      ]
    };
  },
  methods: {
    handleWordClicked(word) {
      this.clickedWord = word;
      console.log(word);
      
      // 查找匹配的词对应的描述
      const foundWord = this.wordData.find(item => item.word === this.clickedWord);
      if (foundWord) {
        console.log(foundWord.frequnce);
	     this.chartData.description=foundWord.descriptions;
		 this.chartData.frequnce=foundWord.frequnce;
		  this.chartData.word=foundWord.word;
      } else {
        console.log('未找到匹配的词描述');
      }
    },
  },
};
</script>

<style>
.words{
	width: 800px;
	height: 600px;
	margin-top: 100px;
}
.chart{
        /* background-color: pink; */
        width: 380px;
        height: 400px;
        /* margin-left: 0px; */
        margin-top: 20px;
        }

.info{
	//text-align: center;
	font-size: 18px;
	color: black;
	background-color: rgba(255, 255, 255, 0.2);
	border-width: 2px;
	border-style: solid;
	border-radius: 10px;
	border-color: rgba(255, 255, 255, 0.2);
	line-height: 1.5;
	padding: 0 6px;
	margin-top: 10px;
	display: inline-block;

}
</style>