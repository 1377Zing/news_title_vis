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
	  { text: '习近平', size: 5934 },
	  { text: '一带一路', size: 1757 },
	  { text: '十八大', size: 890 },
	  { text: '世博', size: 1013 },
	  { text: '张德江', size: 688 },
	  { text: '王毅', size: 991 },
	  { text: '新常态', size: 631 },
	  { text: '十二五', size: 539 },
	  { text: '俞正声', size: 556 },
	  { text: '大数据', size: 618 },
	  { text: '十九大', size: 573 },
	  { text: '走转改', size: 404 },
	  { text: '互联网+', size: 1798 },
	  { text: '全面从严治党', size: 372 },
	  { text: '中企', size: 366 },
	  { text: '小微企业', size: 304 },
	  { text: '供给侧', size: 388 },
	  { text: '精准扶贫', size: 544 },
	  { text: '改革开放', size: 1045 },
		],
      wordData: [
      {'word': '习近平', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 274, 5934, 1839]},
      {'word': '一带一路', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 0, 1757, 222]},
      {'word': '十八大', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 2, 4, 4, 890, 0]},
      {'word': '世博', 'descriptions': [], 'frequnce': [0, 0, 0, 1, 0, 94, 322, 1013, 10]},
      {'word': '张德江', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 5, 69, 688, 0]},
      {'word': '王毅', 'descriptions': [], 'frequnce': [0, 3, 0, 3, 0, 2, 32, 991, 644]},
      {'word': '新常态', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 0, 631, 0]},
      {'word': '十二五', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 3, 539, 0]},
      {'word': '俞正声', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 1, 1, 24, 556, 0]},
      {'word': '大数据', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 1, 0, 618, 115]},
      {'word': '十九大', 'descriptions': [], 'frequnce': [1, 0, 0, 0, 4, 5, 1, 573, 11]},
      {'word': '走转改', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 0, 404, 0]},
      {'word': '互联网+', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 79, 239, 1798, 181]},
      {'word': '全面从严治党', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 0, 372, 54]},
      {'word': '中企', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 22, 75, 4, 366, 54]},
      {'word': '小微企业', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 0, 304, 96]},
      {'word': '供给侧', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 0, 388, 15]},
      {'word': '精准扶贫', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 0, 0, 0, 544, 77]},
      {'word': '改革开放', 'descriptions': [], 'frequnce': [0, 0, 0, 0, 162, 583, 447, 1045, 153]},

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