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
	   { text: '疫情', size: 1822 },
	    { text: '高质量发展', size: 1265 },
	    { text: '防控', size: 1131 },
	    { text: '二十大', size: 375 },
	    { text: '百年', size: 910 },
	    { text: '冬奥', size: 737 },
	    { text: '新冠', size: 775 },
	    { text: '征程', size: 1426 },
	    { text: '奋斗', size: 1318 },
	    { text: '抗疫', size: 1323 },
	    { text: '复工', size: 717 },
	    { text: '视频', size: 517 },
	    { text: '十四五', size: 275 },
		],
      wordData: [
   {'word': '疫情', 'descriptions': [], 'frequnce': [5, 3, 1, 0, 8, 11, 507, 197, 1822]},
   {'word': '高质量发展', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 1, 643, 1265]},
   {'word': '防控', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 1, 7, 258, 211, 1131]},
   {'word': '二十大', 'descriptions': [], 'frequnce': [0, 0, 1, 0, 1, 4, 0, 0, 375]},
   {'word': '百年', 'descriptions': [], 'frequnce': [11, 59, 21, 20, 131, 440, 504, 521, 910]},
   {'word': '冬奥', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 17, 142, 102, 581, 737]},
   {'word': '新冠', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 2, 4, 775]},
   {'word': '征程', 'descriptions': [], 'frequnce': [0, 0, 0, 6, 10, 28, 64, 574, 1426]},
   {'word': '奋斗', 'descriptions': [], 'frequnce': [97, 371, 287, 583, 271, 267, 251, 1141, 1318]},
   {'word': '抗疫', 'descriptions': [], 'frequnce': [123, 108, 18, 4, 29, 68, 69, 33, 1323]},
   {'word': '复工', 'descriptions': [], 'frequnce': [98, 76, 16, 10, 25, 37, 39, 34, 717]},
   {'word': '视频', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 4, 5, 46, 289, 517]},
   {'word': '十四五', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 0, 2, 275]},

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