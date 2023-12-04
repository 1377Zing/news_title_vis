<template>
	
	<div class="wordmain">
		  <el-container width="1480px">
		<!--      <el-header height="100px" width="1480px">
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
		    { text: '细菌战', size: 540 },
		    { text: '基本建设', size: 574 },
			// { text: '抗美援朝', size: 1771 },
		    { text: '抗美援朝', size: 1071 },
		    { text: '农业社', size: 1085 },
		    { text: '高等学校', size: 438 },
		    { text: '高产', size: 749 },
		    { text: '被俘人员', size: 349 },
		    { text: '大跃进', size: 356 },
		    { text: '内蒙古', size: 527 },
		    { text: '第一届全国人大', size: 536 },
		    { text: '第二届政委会', size: 528 },
		    { text: '总路线', size: 302 },
		    { text: '反贪污', size: 264 },
		    { text: '世界和平理事会', size: 366 },
		    { text: '纳赛尔', size: 251 },
		    { text: '艾森豪威尔', size: 459 }
		],
      wordData: [
      {'word': '细菌战', 'descriptions':["审判日本细菌战犯就是审判一切战贩    真理报发表马耶夫斯基论文  1950-01-01"," 伯力续审讯日细菌战犯  苏法医专家委员会发表意见    痛斥日战犯违反科学的罪行  1950-01-01"," 苏联远东滨海军区军事法庭  宣读审讯日本细菌战犯判决书  1950-01-04"], 'frequnce': [5, 540, 10, 2, 3, 4, 8, 2, 0]},
      {'word': '基本建设', 'descriptions': [" 苏联基本建设计划的实践  1950-07-11  1950-07","东北区一九五零年工业基本建设的成就和经验  1951-01-26","交通银行开始办理基本建设投资拨款  1951-06-09"], 'frequnce': [0, 574, 92, 197, 82, 31, 24, 7, 1]},
      {'word': '抗美援朝', 'descriptions': [], 'frequnce': [0, 1771, 145, 205, 78, 32, 43, 46, 82]},
      {'word': '农业社', 'descriptions': [], 'frequnce': [1, 1085, 96, 41, 2, 11, 0, 4, 6]},
      {'word': '高等学校', 'descriptions': [], 'frequnce': [0, 438, 83, 31, 35, 10, 11, 11, 5]},
      {'word': '高产', 'descriptions': [], 'frequnce': [21, 749, 659, 405, 300, 252, 76, 51, 20]},
      {'word': '被俘人员', 'descriptions': [], 'frequnce': [0, 349, 9, 14, 8, 3, 0, 0, 0]},
      {'word': '大跃进', 'descriptions': [], 'frequnce': [0, 356, 135, 7, 0, 0, 1, 5, 0]},
      {'word': '内蒙古', 'descriptions': [], 'frequnce': [5, 527, 461, 191, 462, 517, 434, 496, 61]},
      {'word': '第一届全国人大', 'descriptions': [], 'frequnce': [0, 536, 0, 0, 0, 0, 1, 0, 0]},
      {'word': '第二届政委会', 'descriptions': [], 'frequnce': [0, 528, 0, 0, 0, 0, 0, 0, 0]},
      {'word': '总路线', 'descriptions': [], 'frequnce': [0, 302, 77, 75, 0, 0, 0, 0, 0]},
      {'word': '反贪污', 'descriptions': [], 'frequnce': [0, 264, 0, 4, 16, 22, 1, 0, 0]},
      {'word': '世界和平理事会', 'descriptions': [], 'frequnce': [0, 366, 64, 0, 0, 2, 0, 0, 0]},
      {'word': '纳赛尔', 'descriptions': [], 'frequnce': [0, 251, 128, 76, 8, 1, 2, 5, 0]},
      {'word': '艾森豪威尔', 'descriptions': [], 'frequnce': [1, 459, 274, 0, 0, 0, 0, 0, 0]},

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