<template>
	
	<div class="wordmain">
		  <el-container width="1480px">
		      <!-- <el-header height="100px" width="1480px">
				  <div class="info">
				  	1945年，第二次世界大战结束后，中华民国政府获得对台湾、澎湖群岛以及东北部分地区的控制权.
					<br>
					国共双方在政治、军事和经济等方面争夺控制地区和人民的支持。
					<br>
					国民党政府在西南地区、华中地区和大部分北方地区控制较为稳固，而中国共产党则主要控制着中原地区和山西、陕北等地。
				  	<br>
				  </div>
			  </el-header> -->
		      <el-container style="height: 800px;">
		        <el-main width="800px">
					<div class="words">
						<words @word-clicked="handleWordClicked" :msg="words2"></words>
					</div>
				</el-main>
				<el-aside width="420px" >
				<div class="chart">
					<div class="info">
					<charts :chartData="chartData"></charts>
					</div>
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
		   frequnce: []
	   },
      clickedWord: '',
		words2: [
		   //{ text: '苏修', size: 1888 },
		   { text: '苏修', size: 888 },
		   //{ text: '文化大革命', size: 4045 },
		   { text: '文革', size: 1445 },
		   //{ text: '公社', size: 2473 },
		   { text: '公社', size: 1073 },
		   { text: '反动派', size: 1090 },
		   { text: '贫下中农', size: 824 },
		   { text: '佐藤', size: 464 },
		   { text: '促生产', size: 444 },
		   { text: '亚非拉', size: 366 },
		   { text: '刚果', size: 660 },
		   { text: '腊斯克', size: 325 },
		   { text: '红卫兵', size: 309 },
		   { text: '日内瓦会议', size: 483 },
		   { text: '艾地', size: 296 },
		   // { text: '南越', size: 3363 },
		   { text: '南越', size: 1063 },
		   { text: '越南南方民族解放阵线', size: 650 },
		   { text: '老挝', size: 3107 }
		],
      wordData: [
     {'word': '苏修', 'descriptions': [], 'frequnce': [3, 0, 1888, 651, 3, 0, 0, 0, 0]},
     {'word': '文革', 'descriptions': [], 'frequnce': [0, 0, 4045, 1811, 28, 8, 7, 2, 0]},
     {'word': '公社', 'descriptions': [], 'frequnce': [1, 573, 2473, 937, 465, 12, 4, 3, 0]},
     {'word': '反动派', 'descriptions': [], 'frequnce': [249, 236, 1090, 423, 2, 0, 0, 0, 0]},
     {'word': '贫下中农', 'descriptions': [], 'frequnce': [0, 0, 824, 413, 0, 0, 0, 0, 0]},
     {'word': '佐藤', 'descriptions': [], 'frequnce': [0, 3, 464, 199, 2, 2, 1, 0, 0]},
     {'word': '促生产', 'descriptions': [], 'frequnce': [0, 0, 444, 225, 7, 5, 1, 1, 7]},
     {'word': '亚非拉', 'descriptions': [], 'frequnce': [0, 0, 366, 259, 15, 8, 1, 1, 0]},
     {'word': '刚果', 'descriptions': [], 'frequnce': [0, 0, 660, 2, 0, 7, 27, 36, 4]},
     {'word': '腊斯克', 'descriptions': [], 'frequnce': [0, 0, 325, 0, 0, 0, 0, 0, 0]},
     {'word': '红卫兵', 'descriptions': [], 'frequnce': [0, 0, 309, 28, 0, 0, 0, 0, 0]},
     {'word': '日内瓦会议', 'descriptions': [], 'frequnce': [0, 259, 483, 6, 13, 0, 0, 6, 0]},
     {'word': '艾地', 'descriptions': [], 'frequnce': [0, 71, 296, 1, 0, 0, 0, 0, 0]},
     {'word': '南越', 'descriptions': [], 'frequnce': [1, 322, 3363, 82, 3, 2, 1, 3, 0]},
     {'word': '越南南方民族解放阵线', 'descriptions': [], 'frequnce': [0, 1, 650, 127, 0, 0, 0, 0, 0]},
     {'word': '老挝', 'descriptions': [], 'frequnce': [0, 503, 3107, 1574, 170, 222, 211, 366, 83]},

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
      } else {
        console.log('未找到匹配的词描述');
      }
    },
  },
};
</script>

<style>
.words{
	width: 300px;
	height: 300px;
	margin-top: 80px;
	margin-left: 50px;
}
.chart{
	/* //background-color: pink; */
	
	height: 400px;
}
.info{
	/* //text-align: center; */
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