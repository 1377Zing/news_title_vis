<template>
	
	<div class="wordmain">
		  <el-container width="1480px">
		  <!--    <el-header height="100px" width="1480px">
				  <div class="info">
				  	1945年，第二次世界大战结束后，中华民国政府获得对台湾、澎湖群岛以及东北部分地区的控制权.
					<br>
					国共双方在政治、军事和经济等方面争夺控制地区和人民的支持。
					<br>
					国民党政府在西南地区、华中地区和大部分北方地区控制较为稳固，而中国共产党则主要控制着中原地区和山西、陕北等地。
				  	<br>
				  </div>
			  </el-header> -->
		      <el-container style="height: 480px;">
		        <el-main width="700px">
					<div class="words">
						<words @word-clicked="handleWordClicked" :msg="words2"></words>
					</div>
				</el-main>
				<el-aside width="700px" >
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
		  { text: '毛主席语录', size: 2865 },
		  { text: '四人帮', size: 699 },
		  { text: '超级大国', size: 590 },
		  { text: '华国锋', size: 564 },
		  { text: '印度支那', size: 593 },
		  { text: '第三世界', size: 954 },
		  { text: '扎伊尔', size: 397 },
		  { text: '吴德', size: 330 },
		  { text: '纪登奎', size: 297 },
		  { text: '农业学大寨', size: 285 },
		  { text: '朴正熙', size: 342 },
		  { text: '宾努', size: 438 },
		  { text: '白相国', size: 252 },
		  { text: '柬埔寨王国', size: 294 }
		],
      wordData: [
     {'word': '毛主席语录', 'descriptions': [], 'frequnce': [0, 1, 1775, 2865, 0, 0, 0, 0, 0]},
     {'word': '四人帮', 'descriptions': [], 'frequnce': [0, 0, 0, 699, 3, 0, 1, 0, 0]},
     {'word': '超级大国', 'descriptions': [], 'frequnce': [0, 0, 0, 590, 105, 4, 1, 0, 0]},
     {'word': '华国锋', 'descriptions': [], 'frequnce': [0, 0, 0, 564, 83, 0, 3, 0, 3]},
     {'word': '印度支那', 'descriptions': [], 'frequnce': [0, 327, 220, 593, 0, 0, 1, 0, 0]},
     {'word': '第三世界', 'descriptions': [], 'frequnce': [0, 0, 0, 954, 333, 68, 11, 1, 0]},
     {'word': '扎伊尔', 'descriptions': [], 'frequnce': [0, 0, 0, 397, 171, 124, 0, 0, 0]},
     {'word': '吴德', 'descriptions': [], 'frequnce': [0, 3, 32, 330, 0, 2, 1, 0, 0]},
     {'word': '纪登奎', 'descriptions': [], 'frequnce': [0, 0, 0, 297, 2, 0, 0, 0, 0]},
     {'word': '农业学大寨', 'descriptions': [], 'frequnce': [0, 0, 14, 285, 0, 0, 0, 0, 0]},
     {'word': '朴正熙', 'descriptions': [], 'frequnce': [0, 0, 88, 342, 0, 0, 2, 0, 0]},
     {'word': '宾努', 'descriptions': [], 'frequnce': [0, 0, 11, 438, 9, 0, 0, 0, 2]},
     {'word': '白相国', 'descriptions': [], 'frequnce': [0, 0, 0, 252, 0, 1, 0, 0, 0]},
     {'word': '柬埔寨王国', 'descriptions': [], 'frequnce': [0, 36, 74, 294, 0, 3, 3, 11, 3]},

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
	width: 700px;
	height: 300px;
	margin-top: 10px;
	margin-left: 50px;
}
.chart{
	//background-color: pink;
	
	height: 460px;
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