<template>
   <div>
	<div class="main_world" style="overflow:hidden">
     <div class="yearword">
     	{{yearword}}
     </div>
	  <div style="width: 1000px; height: 40rem; display: table;" >
	    <word1946 v-if="showWord1946" />
	    <word1950 v-if="showWord1950" />
	    <word1960 v-if="showWord1960" />
	    <word1970 v-if="showWord1970" />
	    <word1980 v-if="showWord1980" />
	    <word1990 v-if="showWord1990" />
	    <word2000 v-if="showWord2000" />
	    <word2010 v-if="showWord2010" />
	    <word2020 v-if="showWord2020" />
	  </div>
 
	  
    <div id="container" ref="containerRef" @mousemove="handleMouseMove">
      <div id="thumbs" ref="thumbsRef">
        <div
      v-for="(block, index) in historyBlocks"
      :key="index"
      :class="['history-block', block.bgClass, { 'timeline-visible': block.timelineVisible, 'no-margin-right': index === historyBlocks.length - 1 }]"
      @click="handleHistoryBlockClick(index)"
      :style="{ width: `${block.width}px` }"
    >
          <div class="cover"></div>
          <div class="year">{{ block.year }}</div>
          <div class="title" :style="{ width: `${block.titleWidth}px` }">
            {{ block.title }}
          </div>
       
        </div>
      </div>
	  
	  
	  
	</div>
	
	
	  
    </div>
	
	
	
	
  </div>
</template>
  
<script>
import word1946 from "../components/wordcloud/1946.vue"
import word1950 from "../components/wordcloud/1950.vue"
import word1960 from "../components/wordcloud/1960.vue"
import word1970 from "../components/wordcloud/1970.vue"
import word1980 from "../components/wordcloud/1980.vue"
import word1990 from "../components/wordcloud/1990.vue"
import word2000 from "../components/wordcloud/2000.vue"
import word2010 from "../components/wordcloud/2010.vue"
import word2020 from "../components/wordcloud/2020.vue"

export default {
  components: {
    word1946,word1950,word1960,word1970,word1980,word1990,word2000,word2010,word2020
  },
  data() {
    return {
	  yearword:"111",
	  showWord1946:true,
	  showWord1950:false,
	  showWord1960:false,
	  showWord1970:false,
	  showWord1980:false,
	  showWord1990:false,
	  showWord2000:false,
	  showWord2010:false,
	  showWord2020:false,
	  activeIndex:1,
	  date:1,
      viewport: 0,
      divWidth: 0,
      historyBlocks: [
        {
          bgClass: 'bg-46',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1946 - 1949',
          title: '国共内战激烈，政治冲突导致社会剧变，最终共产党胜利，新中国成立。',
          timelineYears: ['1946', '1947', '1948', '1949']
        },
        {
          bgClass: 'bg-50',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1950 - 1959',
          title: '社会主义建设起步，改革土地制度，朝鲜战争参与，国内经济文化变革。',
          timelineYears: ['1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959']
        },
        {
          bgClass: 'bg-60',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1960 - 1969',
          title: '文化大革命爆发，深刻影响政治、经济、文化，社会动荡不安。',
          timelineYears: ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969']
        },
        {
          bgClass: 'bg-70',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1970 - 1979',
          title: '文革结束，邓小平推动经济改革和对外开放，社会逐步恢复稳定。',
          timelineYears: ['1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979']
        },
        {
          bgClass: 'bg-80',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1980 - 1989',
          title: '改革开放政策全面实行，经济特区成立，思想文化大解放。',
          timelineYears: ['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989']
        },
        {
          bgClass: 'bg-90',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1990 - 1999',
          title: '市场经济体制建立，国际地位提升，城市化与现代化快速推进。',
          timelineYears: ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999']
        },
        {
          bgClass: 'bg-00',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '2000 - 2009',
          title: '经济高速增长，国际影响力显著提升，2008年北京奥运会举办。',
          timelineYears: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009']
        },
        {
          bgClass: 'bg-10',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '2010 - 2019',
          title: '科技创新成重点，国家综合国力增强，社会政策和经济结构调整。',
          timelineYears: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2009']
        },
        {
          bgClass: 'bg-20',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '2020 - 2022',
          title: '全面建设社会主义现代化国家，强调创新、可持续发展、改善民生，推动国家发展迈向更高水平。',
          timelineYears: ['2020', '2021', '2022']
        },
        // Add more history block data as needed
      
      ]
    };
  },
  
  
  
  mounted() {
    this.$nextTick(() => {
      this.viewport = this.$refs.containerRef.offsetWidth;
      this.divWidth = this.$refs.thumbsRef.offsetWidth;
    });
  },
  
  
  
  methods: {
    handleMouseMove(event) {
    const tb = this.$refs.thumbsRef;
      if (tb) {
    // 注意这里要检查 event 是否存在
    if (event) {
      tb.style.left = `${((this.viewport - this.divWidth) * ((event.pageX / this.viewport).toFixed(3))).toFixed(1)}px`;
           }
        }
            },
    handleHistoryBlockClick(index) {
		console.log(index)
	this.showWord1946= false
	this.showWord1950 = false
	this.showWord1960= false
	this.showWord1970= false
	this.showWord1980 = false
	this.showWord1990 = false
	this.showWord2000 = false
	this.showWord2010= false
	this.showWord2020 = false
	
	// 根据选中的年份，将对应年份的 showWord 变量设置为 true
	if (index==0) {
	  this.showWord1946= true;
	  this.yearword="1946-1949";
	} else if (index==1) {
	 this.showWord1950= true;
	 this.yearword="1950-1959";
	} else if (index==2) {
	  this.showWord1960= true;
	  this.yearword="1960-1969";
	} else if (index==3) {
	  this.showWord1970= true;
	  this.yearword="1970-1979";
	} else if (index==4) {
	  this.showWord1980= true;
	  this.yearword="1980-1989";
	} else if (index==5) {
	  this.showWord1990 = true;
	  this.yearword="1990-1999";
	} else if (index==6) {
	  this.showWord2000 = true;
	  this.yearword="2000-2009";
	} else if (index==7) {
	  this.showWord2010= true;
	  this.yearword="2010-2019";
	} else if (index==8) {
	  this.showWord2020= true;
	  this.yearword="2020-2022";
	}
		
    //点击大块的动画,实现第一个页面的数据切换
      this.historyBlocks.forEach((block, i) => {
        block.width = i === index ? 516 : 276;
        block.titleWidth = i === index ? 480 : 240;
        block.timelineVisible = i === index;
      });

      setTimeout(() => {
        this.handleMouseMove(); // 等待动画或异步操作完成后再更新位置
      }, 100);
    },

   
  },


  
};
 </script>

<style scoped>
/* /* *{margin: 0;padding: 0;} */
.main_world{
	background-color:#c3a6a0;
	margin-top: 100px;

}
a {
  text-decoration: none;
}

.wordmain {
  height: 41rem;
  margin-top: 30px;
}


#boy {
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 8rem;
  left: 9.5rem;
  height: 5rem;
  z-index: 9999;
}

.maintime {
  color: black;
  font-size: 20px;
  position: fixed;
  bottom: 1rem;
  width: 92rem;
  background-color:#c3a6a0;
  z-index: 9999;
}

body {
  background: #ddd;
} 
#container
{
height: 120px;
width: 98%;
background-color: #ddd;
overflow: hidden;
position: fixed;
top:10px;
left:10px;
/* overflow-x: scroll; */
  margin-bottom: 0em;
  display: inline-block;
}

#thumbs
{
background-color: #ddd;
position: absolute;
top: 0px;
left: 0px;
height: 100%;
width: auto;
overflow: hidden;
white-space: nowrap;
padding: 0px 100px;
}

.history-block {
  height: 100%;
  width: 200px;
  background-color: #cdcdcd;
  margin: 0 -2px;
  border-right: 1px solid #fff;
  display: inline-block;
  font-family: 'roboto condensed', sans-serif;
  font-size:60px;
  font-weight: 100;
  color: #FFF;
  cursor: pointer;
  box-shadow: 2px 5px 20px rgba(0,0,0,0.8);
  transition: width 0.2s;
}
.no-margin-right {
  margin-right: null;
}
.cover {
  width: 100%;
  height: 100%;
  transition: background .5s;
  background: rgba(0,0,0,0.8);
}

.cover:hover {
  width: 100%;
  height: 100%;
  transition: background .5s;
  background: rgba(0,0,0,0.8);
}

.year {
  position: absolute;
    top: 0px;
    font-size: 30px;
  font-weight:500;
    margin: 20px 30px;
}

.title {
  position: absolute;
  display: block;
  width: 200px;
    top: 50px;
    font-size: 15px;
    margin: 20px;
    text-align:left;
  white-space: normal;
  transition: width 0.2s;
}

.timeline {
  display:block;
  position: absolute;
  bottom: 20px;
    font-size: 20px;
    margin: 20px;
  transition: display 0.8s;
} 

.timeline-visible .timeline {
  display: block;
}

.timeline ul {
margin: 0;
padding: 0;
list-style-type: none;
text-align: center;
}
/* 给ul绑定点击事件，获取li的年分实现数据切换，可以用于第二三个界面 */
.timeline ul li {
  display: list-item;
  font-size: 15px;
  font-weight: 100;
  padding: 0px 5px;
}

.timeline ul li {
  display: inline;
  font-size: 15px;
  font-weight: 100;
  padding: 0px 5px;
}

.timeline ul li:before {
  font-family: FontAwesome;
  font-style: normal;
  font-weight: normal;
  color: rgba(255,255,255,0.5);
  content: '\f10c';
  position: absolute;
  top: 30px;
  margin-left:10px;
  transition: all 0.5s;
}

.timeline ul li:after {
  content: '';
  position: absolute;
  top: 40px;
  margin-left:-10px;
  width: 36px;
  height:2px;
  border: 1px solid rgba(255,255,255,0.5);
  transition: all 0.5s;
}

.timelineYear, .timelineYear:hover {
  text-decoration: none;
  color: #fff;
  transition: all 0.8s;
}

.timeline ul li:hover:before {
  content: '\f111';
  color: #ffffff;
  font-size: 18px;
  transition: all 0.5s;
  top: 29px;
  margin-left:9px
}

.timeline ul li:hover:after {
  content: '';
  position: absolute;
  top: 40px;
  margin-left:-10px;
  width: 36px;
  height:2px;
  border: 1px solid #fff;
  transition: all 0.5s;
}

.timeline ul li:hover .timelineYear {
  position: static;
  top:-10px;
}


.bg-46 {
/* background: url(../assets/bg/1946.png) ; */
    background-size: cover;

}

.bg-50 {
  /* background: url(../assets/bg/1946.png) ; */
  background-size:cover;
}

.bg-60 {
  /* background: url(../assets/bg/1946.png) ; */
  background-size:cover;
}

.bg-70 {
  /* background: url(../assets/bg/1946.png) ; */
  background-size:cover;
}

.bg-80 {
  background: url(../assets/bg/2023.png);
  background-size:cover;
}

.bg-90 {
  background: url(../assets/bg/2023.png);
  background-size:cover;
}

.bg-00 {
  background: url(../assets/bg/2023.png);
  background-size:cover;
}

.bg-10 {
  background: url(../assets/bg/2023.png);
  background-size:cover;
}

.bg-20 {
 background: url(../assets/bg/2023.png); 
  background-size:cover;
}
  </style>
  