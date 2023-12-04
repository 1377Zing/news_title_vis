<template>
	
	<div class="wordmain">
		  <el-container width="1480px">
	<!-- 	      <el-header height="100px" width="1480px">
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
		        <el-main width="1000px">
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
		    //{ text: '“三个代表”', size: 2814 },
			 { text: '“三个代表”', size: 814 },
			 //{ text: '非典', size: 1280 },
		     { text: '非典', size: 780 },
		     //{ text: '科学发展观', size: 2124 },
			 { text: '科学发展观', size: 724 },
		     { text: '共产党员先进性', size: 654 },
		     //{ text: '和谐社会构建', size: 1048 },
		     { text: '北京奥运会', size: 368 },
			 //{ text: '温家宝', size: 1793 },
		     { text: '温家宝', size: 693 },
			 //{ text: '科学发展观', size: 3838 },
		     { text: '科学发展观', size: 538 },
		     { text: '曹刚川', size: 241 },
		     { text: '吴仪', size: 323 },
		     { text: '全面建设小康社会', size: 239 },
		     { text: '打假', size: 249 },
		     { text: '法轮功', size: 320 },
		     { text: '乡镇企业', size: 60 },
		     { text: '小泉', size: 199 },
		],
      wordData: [
    {'word': '“三个代表”', 'descriptions': [], 'frequnce': [0, 3, 17, 4, 1, 1, 2814, 0, 0]},
    {'word': '非典', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 1280, 9, 4]},
    {'word': '科学发展观', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 2124, 294, 0]},
    {'word': '共产党员先进性', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 654, 1, 0]},
    {'word': '和谐社会构建', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 1, 1048, 87, 0]},
    {'word': '北京奥运会', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 368, 5, 0]},
    {'word': '温家宝', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 3, 77, 1793, 1059, 0]},
    {'word': '科学发展观', 'descriptions': [], 'frequnce': [2, 12, 6, 3, 8, 7, 3838, 1565, 3]},
    {'word': '曹刚川', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 8, 241, 0, 0]},
    {'word': '吴仪', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 206, 323, 0, 0]},
    {'word': '全面建设小康社会', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 239, 10, 0]},
    {'word': '打假', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 196, 249, 79, 1]},
    {'word': '法轮功', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 207, 320, 1, 0]},
    {'word': '乡镇企业', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 387, 582, 60, 3, 0]},
    {'word': '小泉', 'descriptions': [], 'frequnce': [0, 2, 2, 3, 6, 1, 199, 0, 0]},

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