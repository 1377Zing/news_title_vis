<template>
  <div class="cloud-wrap">
    <div
      ref="cloudEl"
      class="cloud-box"
      id="title"
      style="height: 450px; width: 950px"
    ></div>
  </div>
  <div id="title1"></div>
</template>

<script>
import * as echarts from "echarts";
//require('echarts-wordcloud')
import 'echarts-wordcloud';

export default {
 props: {
 	    msg: Array // 接收父组件ParentComponent传过来的数组
 	  },
  data() {
    return {
     //  msg: [
	    // { text: '我军', size: 1476 },
	    // { text: '北平', size: 2077 },
	    // { text: '蒋介石', size: 1424 },
	    // { text: '歼敌', size: 736 },
	    // { text: '翻身', size: 585 },
	    // { text: '民兵', size: 549 },
	    // { text: '地主', size: 506 },
	    // { text: '太行', size: 774 },
	    // { text: '冀鲁豫', size: 661 },
	    // { text: '牌价', size: 333 },
	    // { text: '游击', size: 925 },
	    // { text: '储蓄', size: 316 },
	    // { text: '解放区', size: 352 },
	    // { text: '折实', size: 313 },
	    // { text: '土地改革', size: 1147 },
	    // { text: '贫雇', size: 283 }
     //  ],
      id1: "title"
    };
  },
 watch: {
   msg(newValue) {
     this.drawCloud(newValue);
   },
 },
  mounted() {
    this.drawCloud(this.msg);
  },
  methods: {
    drawCloud(msg) {
      console.log(msg)
      var  myChart = echarts.init(document.getElementById("title"));
      var maskImage = new Image(); //可以根据图片形状生成有形状的词云图
      maskImage.src = this.bgImg;
      let arr = msg;
      let list = [];

      arr.map(item => {
        let obj = {
          name: item.text, 
          value: item.size,
          clickable: true // 可以点击
        }
        list.push(obj);
      })
      console.log(list)
      list.sort(function (a, b) {
        // return a - b; // 升序的顺序排列
        return a.value - b.value; // 降序的顺序排列
      });
      let colorList = ["#999999", "#666666", "#333333", "#FF060B"];
      let length = list.length;
      //按出现频率上色
      list.map((item, index) => {
          if (index < length / 3 || index == length / 3) {
            item.color = 0;
          } else if (index < (length * 2) / 3 || index == (length * 2) / 3) {
            item.color = 1;
          } else {
            item.color = 2;
          }
      });
      let option = {
        title: {
          //text: this.title, //这里的参数是整个图标的标题 后面也可以加注释
          left: "10%",
          textStyle: {
            fontSize: 12,
          },
        },
        tooltip: {
          show: true,
          confine:true,//限定在图表范围内
        },
        // backgroundColor:'#333944', // 画布背景色
        series: [
          {
            name: "频次",
            type: "wordCloud",
            // maskImage: maskImage, // 图片形状
            //maskImage的横纵比为1:1
            keepAspect: false,
            sizeRange: [40, 60], //词云的文字字号范围，默认是[12, 60]。
            rotationRange: [0, 0], //数据翻转范围
            //shape: "star",
            width: "600px", //词云的宽高，默认是 75%、80%。
            height: "100%",
            // drawOutOfBound: true, // 超出画布的词汇是否隐藏
            drawOutOfBound: false,
            color: "#fff",
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            // width: "100%",
            // height: "100%",
            gridSize: 20, //每个词之间的间距。
            // textPadding: 10,
            autoSize: {
              enable: true,
              minSize: 6,
            },
            textStyle: {
              normal: {
                fontFamily: "sans-serif",
                fontWeight: "bold",
                color: "#333", // 字体颜色
                color: function (params) {
                  // 字体颜色
                  return colorList[params.data.color];
                  // return 'rgb(' + [
                  //     Math.round(Math.random() * 160),
                  //     Math.round(Math.random() * 160),
                  //     Math.round(Math.random() * 160)
                  // ].join(',') + ')';
                },
              },
              emphasis: {
                // focus: 'self',
                textStyle: {
                  shadowBlur: 10,
                  shadowColor: "#333",
                },
              },
            },
            data: list,
          },
        ],
      };
      myChart.setOption(option,true);
      myChart.on("click", params => {
          let clickedWord = params.data.name;
          console.log(clickedWord);
          this.$emit("word-clicked", clickedWord);
        });
    },
  },
};
</script>

<style>
.cloud-wrap {
  width: 100%;
  height: 100%;
  background-position: center;
  /* background-image: url("/Users/zhulinyu/Downloads/star.png"); */
  background-repeat: no-repeat; 
  background-size:50%,
  /* background-image:'require(@/public/img/star .png)' ; */
}
.cloud-box {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
