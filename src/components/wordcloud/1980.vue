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
			 { text: '赵紫阳', size: 1167 },
		     //{ text: '赵紫阳', size: 2167 },
		     { text: '里根', size: 966 },
		     { text: '承包', size: 976 },
		     { text: '两伊战争', size: 773 },
		     { text: '专业户', size: 416 },
		     { text: '巴解', size: 524 },
		     { text: '民主德国', size: 354 },
		     { text: '集资', size: 287 },
		     { text: '社队', size: 250 },
		     { text: '阿富汗游击队', size: 271 },
		     { text: '个体户', size: 208 },
		     { text: '舒尔茨', size: 209 },
		     { text: '马岛', size: 211 },
		     { text: '印度支那', size: 0 },
		     { text: '王震', size: 466 },
		     { text: '谷牧', size: 405 },
		     { text: '欧盟', size: 4 },
		],
      wordData: [
    {'word': '赵紫阳', 'descriptions': [], 'frequnce': [0, 0, 0, 23, 1167, 0, 2, 0, 0]},
    {'word': '里根', 'descriptions': [], 'frequnce': [0, 0, 0, 1, 966, 7, 6, 3, 0]},
    {'word': '承包', 'descriptions': [], 'frequnce': [1, 8, 3, 0, 976, 265, 100, 66, 6]},
    {'word': '两伊战争', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 773, 53, 19, 1, 0]},
    {'word': '专业户', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 416, 25, 6, 6, 0]},
    {'word': '巴解', 'descriptions': [], 'frequnce': [0, 0, 39, 2, 524, 219, 15, 4, 0]},
    {'word': '民主德国', 'descriptions': [], 'frequnce': [8, 619, 55, 0, 354, 13, 0, 0, 0]},
    {'word': '集资', 'descriptions': [], 'frequnce': [11, 15, 1, 0, 287, 136, 34, 77, 5]},
    {'word': '社队', 'descriptions': [], 'frequnce': [0, 6, 84, 184, 250, 0, 0, 0, 0]},
    {'word': '阿富汗游击队', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 271, 8, 0, 0, 0]},
    {'word': '个体户', 'descriptions': [], 'frequnce': [0, 1, 0, 0, 208, 81, 22, 17, 1]},
    {'word': '舒尔茨', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 209, 8, 0, 13, 1]},
    {'word': '马岛', 'descriptions': [], 'frequnce': [0, 2, 0, 1, 211, 45, 7, 12, 0]},
    {'word': '印度支那', 'descriptions': [], 'frequnce': [0, 327, 220, 593, 0, 0, 1, 0, 0]},
    {'word': '王震', 'descriptions': [], 'frequnce': [10, 3, 0, 282, 466, 124, 12, 0, 0]},
    {'word': '谷牧', 'descriptions': [], 'frequnce': [0, 0, 0, 230, 405, 12, 5, 3, 0]},
    {'word': '欧盟', 'descriptions': [], 'frequnce': [0, 1, 6, 3, 4, 645, 972, 976, 136]},

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