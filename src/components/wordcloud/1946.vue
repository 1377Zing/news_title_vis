<template>
	
	<div class="wordmain">
		  <el-container width="1480px">
		    <!--  <el-header height="100px" width="1480px">
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
	words2 :[
	  { text: '我军', size: 1476 },
	  { text: '北平', size: 2077 },
	  { text: '蒋介石', size: 1424 },
	  { text: '歼敌', size: 736 },
	  { text: '翻身', size: 585 },
	  { text: '民兵', size: 549 },
	  { text: '地主', size: 506 },
	  { text: '太行', size: 774 },
	  { text: '冀鲁豫', size: 661 },
	  { text: '牌价', size: 333 },
	  { text: '游击', size: 925 },
	  { text: '储蓄', size: 316 },
	  { text: '解放区', size: 352 },
	  { text: '折实', size: 313 },
	  { text: '土地改革', size: 1147 },
	  { text: '贫雇', size: 283 }
	],
      wordData: [
        {'word': '我军', 'descriptions': ["热中我军奋战两昼夜光复宁城歼蒋军千余即墨西北我歼蒋军一团  1946-10-01 ","豫北我军积极反击攻克窦公俘蒋伪官兵四十余  1946-10-01","罢战蒋军黄旅长一行抵太岳我军设宴压惊  1946-10-02"], 'frequnce': [1476, 269, 178, 233, 138, 175, 141, 92, 4]},
        {'word': '北平', 'descriptions': ["重庆二十四个人民团体宣言美军驻华侵犯中国主权北平六学生团体敦促美军立即撤退  1946-10-15","东北蒋军嫡系谭营长等  反对内战向我投诚南京北平蒋军官兵厌战自杀  1946-11-03 "," 北平美军殴打警察  1946-11-03 "], 'frequnce': [2077, 24, 19, 10, 39, 18, 6, 18, 0]},
        {'word': '蒋介石', 'descriptions': [], 'frequnce': [1424, 226, 165, 40, 9, 2, 0, 1, 0]},
        {'word': '歼敌', 'descriptions': [], 'frequnce': [736, 252, 609, 453, 50, 2, 0, 0, 0]},
        {'word': '翻身', 'descriptions': [], 'frequnce': [585, 90, 123, 81, 58, 18, 23, 20, 14]},
        {'word': '民兵', 'descriptions': [], 'frequnce': [549, 93, 304, 223, 210, 354, 77, 50, 6]},
        {'word': '地主', 'descriptions': [], 'frequnce': [506, 115, 190, 19, 8, 1, 1, 4, 1]},
        {'word': '太行', 'descriptions': [], 'frequnce': [774, 39, 23, 15, 89, 127, 110, 77, 20]},
        {'word': '冀鲁豫', 'descriptions': [], 'frequnce': [661, 3, 11, 7, 7, 6, 3, 1, 0]},
        {'word': '牌价', 'descriptions': [], 'frequnce': [333, 36, 6, 2, 2, 181, 11, 12, 6]},
        {'word': '游击', 'descriptions': [], 'frequnce': [925, 251, 1085, 805, 1768, 512, 70, 43, 5]},
        {'word': '储蓄', 'descriptions': [], 'frequnce': [316, 107, 22, 25, 221, 230, 86, 29, 2]},
        {'word': '解放区', 'descriptions': [], 'frequnce': [352, 47, 360, 549, 20, 9, 3, 5, 0]},
        {'word': '折实', 'descriptions': [], 'frequnce': [313, 34, 0, 0, 0, 0, 0, 0, 0]},
        {'word': '土地改革', 'descriptions': [], 'frequnce': [1147, 896, 400, 142, 401, 608, 651, 877, 98]},
        {'word': '贫雇', 'descriptions': [], 'frequnce': [283, 5, 2, 0, 0, 0, 0, 0, 0]},
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
.wordmain1946{
	background-color: rgba(193, 76, 59, 0.0);
	height:40rem;
}
.words{
        width: 800px;
        height: 600px;
        margin-top: 100px;
        /* margin-left: 20px; */
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