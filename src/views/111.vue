<template>
  <div class="cloud-wrap">
    <div
      ref="cloudEl"
      class="cloud-box"
      id="title"
      style="height: 200px; width: 200px"
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
    title: "",//传过来的id
    chartData: {},//数据
  },
  data() {
    return {
  //     chartData:  [
  //   {
  //     content_info: '数据1',
  //     frequency: 100,
  //     label_info: '良好'
  //   },
  //   {
  //     content_info: '数据2',
  //     frequency: 75,
  //     label_info: '一般'
  //   },
  //   {
  //     content_info: '数据3',
  //     frequency: 50,
  //     label_info: '差'
  //   }
  // ],
    chartData : {
      title: [
      {
        content_info: '数据1',
        frequency: 100,
        label_info: '良好'
      },
      {
        content_info: '数据2',
        frequency: 75,
        label_info: '一般'
      },
      {
        content_info: '数据3',
        frequency: 50,
        label_info: '差'
      }
      ]
    },
      id1: "title"
    //bgImg:
    //   "/Users/zhulinyu/Downloads/star.png",
    };
  },
  watch: {
  },
  mounted() {
    this.drawCloud(this.id1);
  },
  methods: {
    drawCloud(id1) {
      console.log(id1)
      var  myChart = echarts.init(document.getElementById(id1));
      var maskImage = new Image(); //可以根据图片形状生成有形状的词云图
      maskImage.src = this.bgImg;
      let arr = this.chartData[this.id1];
      let list = [];

      // arr.map((item) => {
      //   let obj = {};
      //   obj.name = item.content_info;
      //   obj.value = item.frequency;
      //   obj.label = item.label_info;
      //   list.push(obj);
      // });

      arr.map(item => {
        let obj = {
          name: item.content_info, 
          value: item.frequency,
          label: item.label_info 
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
        if (item.label == "不好") {
          item.color = 3;
        } else {
          if (index < length / 3 || index == length / 3) {
            item.color = 0;
          } else if (index < (length * 2) / 3 || index == (length * 2) / 3) {
            item.color = 1;
          } else {
            item.color = 2;
          }
        }
      });
      let option = {
        title: {
          text: this.title, //这里的参数是整个图标的标题 后面也可以加注释
          //   subtext: '888'
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
            name: "评价",
            type: "wordCloud",
            // maskImage: maskImage, // 图片形状
            //maskImage的横纵比为1:1
            keepAspect: false,
            sizeRange: [8, 18], //词云的文字字号范围，默认是[12, 60]。
            rotationRange: [0, 0], //数据翻转范围
            shape: "star",
            width: "180px", //词云的宽高，默认是 75%、80%。
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
            gridSize: 2, //每个词之间的间距。
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
