
<template>

 <el-container width="1450px">
 
       <el-main width="1100px">
        <div ref="Map" class="GlobalMap" ></div> 
 	   </el-main>
 	  
 	  
 	  <el-aside width="350px">

			  <div class="box-card">
			  <div class="year">
			  	{{yeardata}}
			  </div>
			  <div class="flag" >
			  	<img :src="flagurl" class="flag—image"/>
			  </div>
			  <div class="eventtext">
			  	<div class="country" >
			  		{{ country }}
			  	</div>
			  	<div class="bigevent">
			  		{{ currentEvent }}
			  	</div>
			  </div>
			  
		   
		   </div>
		
 	  </el-aside>
  
 </el-container>
 
  
</template>

<script>
import world from "../../assets/map/word.json";
import * as echarts5 from "echarts5";

export default {
   props: {
     mapData: {
       type: Array,
       required: true
     },
	 yeardata:String,
   },
   data() {
     return {
       data: [
    { name: "美国", value: 78, event: "发生了大事", url: "src/assets/flags/US.svg" },
    { name: "俄罗斯", value: 50, event: "发生了大事", url: "src/assets/flags/RU.svg" },
    { name: "日本", value: 26, event: "发生了大事", url: "src/assets/flags/JP.svg" },
    { name: "法国", value: 18, event: "发生了大事", url: "src/assets/flags/FR.svg" },
    { name: "印度尼西亚", value: 6, event: "发生了大事", url: "src/assets/flags/ID.svg" },
    { name: "巴勒斯坦", value: 5, event: "发生了大事", url: "src/assets/flags/PS.svg" },
    { name: "德国", value: 5, event: "发生了大事", url: "src/assets/flags/DE.svg" },
    { name: "西班牙", value: 5, event: "发生了大事", url: "src/assets/flags/ES.svg" },
    { name: "伊朗", value: 5, event: "发生了大事", url: "src/assets/flags/IR.svg" },
    ],
	   currentEvent: '',
       country:'',
	   flagurl:'',
     };
   },
  mounted() {
    this.Global();
    this.setDefaultData();//没有初始数据？？

  },
  watch: {
      mapData(newVal) {
        this.data = newVal;
        this.Global();
      }
    },
  methods: {   
    setDefaultData() {
    // 设置默认数据的逻辑，可以根据您的需求进行修改
    const defaultData = this.data[0]; // 假设您的数据数组不为空
    if (defaultData) {
      this.currentEvent = defaultData.event;
      this.country = defaultData.name;
      this.flagurl = defaultData.url;
    }  
  },
  handleMapClick(params) {
    if (!params.name) {
      const searchData = this.data.filter(item => item.name == params.name);

      if (searchData.length > 0) {
        this.currentEvent = searchData[0].event;
        this.country = searchData[0].name;
        this.flagurl = searchData[0].url;
      }
    }
    if (params.name) {
      const searchData = this.data.filter(item => item.name == params.name);

      if (searchData.length > 0) {
        this.currentEvent = searchData[0].event;
        this.country = searchData[0].name;
        this.flagurl = searchData[0].url;
      }
    }
  },
    
    Global() {
      var mycontractMap = echarts5.init(this.$refs.Map);

      this.$echarts5.registerMap("world", world);
 //11.28nyx补充修改完整
      let nameMap = {
        Afghanistan: "阿富汗",
        Singapore: "新加坡",
        Angola: "安哥拉",
        Albania: "阿尔巴尼亚",
        "United Arab Emirates": "阿联酋",
        Argentina: "阿根廷",
        Armenia: "亚美尼亚",
        "French Southern and Antarctic Lands": "法属南半球和南极领地",
        Australia: "澳大利亚",
        Austria: "奥地利",
        Azerbaijan: "阿塞拜疆",
        Burundi: "布隆迪",
        Belgium: "比利时",
        Benin: "贝宁",
        "Burkina Faso": "布基纳法索",
        Bangladesh: "孟加拉国",
        Bulgaria: "保加利亚",
        "The Bahamas": "巴哈马",
        "Bosnia and Herzegovina": "波斯尼亚和黑塞哥维那",
        Belarus: "白俄罗斯",
        Belize: "伯利兹",
        Bermuda: "百慕大",
        Bolivia: "玻利维亚",
        Brazil: "巴西",
        Brunei: "文莱",
        Bhutan: "不丹",
        Botswana: "博茨瓦纳",
        "Central African Republic": "中非共和国",
        Canada: "加拿大",
        Switzerland: "瑞士",
        Chile: "智利",
        China: "中国",
        "Ivory Coast": "象牙海岸",
        Cameroon: "喀麦隆",
        "Dem. Rep. Congo": "刚果民主共和国",
        "Republic of the Congo": "刚果共和国",
        Colombia: "哥伦比亚",
        "Costa Rica": "哥斯达黎加",
        Cuba: "古巴",
        "Northern Cyprus": "北塞浦路斯",
        Cyprus: "塞浦路斯",
        "Czech Republic": "捷克共和国",
        Germany: "德国",
        Djibouti: "吉布提",
        Denmark: "丹麦",
        "Dominican Republic": "多明尼加共和国",
        Algeria: "阿尔及利亚",
        Ecuador: "厄瓜多尔",
        Egypt: "埃及",
        Eritrea: "厄立特里亚",
        Spain: "西班牙",
        Estonia: "爱沙尼亚",
        Ethiopia: "埃塞俄比亚",
        Finland: "芬兰",
        Fiji: "斐济",
        "Falkland Islands": "福克兰群岛",
        France: "法国",
        Gabon: "加蓬",
        "United Kingdom": "英国",
        Georgia: "格鲁吉亚",
        Ghana: "加纳",
        Guinea: "几内亚",
        Gambia: "冈比亚",
        "Guinea Bissau": "几内亚比绍",
        Greece: "希腊",
        Greenland: "格陵兰",
        Guatemala: "危地马拉",
        "French Guiana": "法属圭亚那",
        Guyana: "圭亚那",
        Honduras: "洪都拉斯",
        Croatia: "克罗地亚",
        Haiti: "海地",
        Hungary: "匈牙利",
        Indonesia: "印度尼西亚",
        India: "印度",
        Ireland: "爱尔兰",
        Iran: "伊朗",
        Iraq: "伊拉克",
        Iceland: "冰岛",
        Israel: "以色列",
        Italy: "意大利",
        Jamaica: "牙买加",
        Jordan: "约旦",
        Japan: "日本",
        Kazakhstan: "哈萨克斯坦",
        Kenya: "肯尼亚",
        Kyrgyzstan: "吉尔吉斯斯坦",
        Cambodia: "柬埔寨",
        Kosovo: "科索沃",
        Kuwait: "科威特",
        Laos: "老挝",
        Lebanon: "黎巴嫩",
        Liberia: "利比里亚",
        Libya: "利比亚",
        "Sri Lanka": "斯里兰卡",
        Lesotho: "莱索托",
        Lithuania: "立陶宛",
        Luxembourg: "卢森堡",
        Latvia: "拉脱维亚",
        Morocco: "摩洛哥",
        Moldova: "摩尔多瓦",
        Madagascar: "马达加斯加",
        Mexico: "墨西哥",
        Macedonia: "马其顿",
        Mali: "马里",
        Myanmar: "缅甸",
        Montenegro: "黑山",
        Mongolia: "蒙古",
        Mozambique: "莫桑比克",
        Mauritania: "毛里塔尼亚",
        Malawi: "马拉维",
        Malaysia: "马来西亚",
        Namibia: "纳米比亚",
        "New Caledonia": "新喀里多尼亚",
        Niger: "尼日尔",
        Nigeria: "尼日利亚",
        Nicaragua: "尼加拉瓜",
        Netherlands: "荷兰",
        Norway: "挪威",
        Nepal: "尼泊尔",
        "New Zealand": "新西兰",
        Oman: "阿曼",
        Pakistan: "巴基斯坦",
        Panama: "巴拿马",
        Peru: "秘鲁",
        Philippines: "菲律宾",
        "Papua New Guinea": "巴布亚新几内亚",
        Poland: "波兰",
        "Puerto Rico": "波多黎各",
        "North Korea": "北朝鲜",
        Portugal: "葡萄牙",
        Paraguay: "巴拉圭",
        Qatar: "卡塔尔",
        Romania: "罗马尼亚",
      "the Russia Federation": "俄罗斯",
        Rwanda: "卢旺达",
        "Western Sahara": "西撒哈拉",
        "Saudi Arabia": "沙特阿拉伯",
        "Sudan": "苏丹",
        "S. Sudan": "南苏丹",
        Senegal: "塞内加尔",
        "Solomon Islands": "所罗门群岛",
        "Sierra Leone": "塞拉利昂",
        "El Salvador": "萨尔瓦多",
        Somaliland: "索马里兰",
        Somalia: "索马里",
        "Republic of Serbia": "塞尔维亚",
        Suriname: "苏里南",
        Slovakia: "斯洛伐克",
        Slovenia: "斯洛文尼亚",
        Sweden: "瑞典",
        Swaziland: "斯威士兰",
        Syria: "叙利亚",
        Chad: "乍得",
        Togo: "多哥",
        Thailand: "泰国",
        Tajikistan: "塔吉克斯坦",
        Turkmenistan: "土库曼斯坦",
        "East Timor": "东帝汶",
        "Trinidad and Tobago": "特里尼达和多巴哥",
        Tunisia: "突尼斯",
        Turkey: "土耳其",
        "United Republic of Tanzania": "坦桑尼亚",
        Uganda: "乌干达",
        Ukraine: "乌克兰",
        Uruguay: "乌拉圭",
        "the United States": "美国",
        Uzbekistan: "乌兹别克斯坦",
        Venezuela: "委内瑞拉",
        Vietnam: "越南",
        Vanuatu: "瓦努阿图",
        "West Bank": "西岸",
        Yemen: "也门",
        "South Africa": "南非",
        Zambia: "赞比亚",
        Korea: "韩国",
        Tanzania: "坦桑尼亚",
        Zimbabwe: "津巴布韦",
        Congo: "刚果",
        "Central African Rep.": "中非",
        Serbia: "塞尔维亚",
        "Bosnia and Herz.": "波黑",
        "Czech Rep.": "捷克",
        "W. Sahara": "西撒哈拉",
        "Lao PDR": "老挝",
        "Dem. Rep. Korea": "朝鲜",
        "Falkland Is.": "福克兰群岛",
        "Timor-Leste": "东帝汶",
        "Solomon Is.": "所罗门群岛",
        Palestine: "巴勒斯坦",
        "N. Cyprus": "北塞浦路斯",
        Aland: "奥兰群岛",
        "Fr. S. Antarctic Lands": "法属南半球和南极陆地",
        Mauritius: "毛里求斯",
        Comoros: "科摩罗",
        "Eq. Guinea": "赤道几内亚",
        "Guinea-Bissau": "几内亚比绍",
        "Dominican Rep.": "多米尼加",
        "Saint Lucia": "圣卢西亚",
        Dominica: "多米尼克",
        "Antigua and Barb.": "安提瓜和巴布达",
        "U.S. Virgin Is.": "美国原始岛屿",
        Montserrat: "蒙塞拉特",
        Grenada: "格林纳达",
        Barbados: "巴巴多斯",
        Samoa: "萨摩亚",
        Bahamas: "巴哈马",
        "Cayman Is.": "开曼群岛",
        "Faeroe Is.": "法罗群岛",
        "IsIe of Man": "马恩岛",
        Malta: "马耳他共和国",
        Jersey: "泽西",
        "Cape Verde": "佛得角共和国",
        "Turks and Caicos Is.": "特克斯和凯科斯群岛",
        "St. Vin. and Gren.": "圣文森特和格林纳丁斯",
        "Côte d'Ivoire":"科特迪瓦",
        "S. Geo. and S. Sandw. Is.": "南乔治亚岛和南桑威奇群岛",
        "São Tomé and Principe":"圣多美和普林西比",
        "Niue":"纽埃",
        "Fr. Polynesia":"法属波利尼西亚",
       "Tonga":"汤加",
       "Heard l. and McDonald ls.":"赫德岛和麦克唐纳群岛",
       "American Samoa":"美属萨摩亚",
       "Curaçao":"库拉索",
      };
  //11.28nyx修改完    
      let option = {
        // 鼠标悬浮提示框
        tooltip: {
          trigger: "item",
          borderColor: "#666", //区域边框颜色
		    textStyle: {
		      fontSize: 20, // 设置字体大小
		    },
          formatter: function (params) {
            if (params.name) {
              return (
				  params.name +
				  ' : ' + '被提及'+
				  (isNaN(params.value) ? 0 : parseInt(params.value)) + '次'
				  // '<br/>' + 
				  // '事件: ' + 
				  // '<br/>' + 
				  // (params.data.event ? params.data.event : 'N/A') // 显示 event
              );  
            }
          },
        },

        visualMap: {
          min: 0, //最小值
          max: 1000, //最大值
          orient: "horizontal", //图例排列方向
          // orient: "vertical", //图例模式
          left: 26,
          bottom: 20,
          showLabel: true, //显示图例文本
          precision: 0, //数据展示无小数点
          itemWidth: 12, //图例宽度
          itemHeight: 12, //图例高度
          textGap: 10, //图例间距
          inverse: false, //数据反向展示
          hoverLink: true, //鼠标悬浮
          inRange: {
            //选中图例后背景半透明
            color: ["rgba(102, 112, 224, 0.25)"],
            symbol: "rect", //更改图元样式
          },
          pieces: [
            {
              gt: 1001,
              label: ">400",
              color: "#ca8470",
            },
            {
              gte: 500,
              lte: 1000,
              label: "200-400",
              color: "#e4ae6d",
            },
            {
              gte: 100,
              lte: 499,
              label: "100-200",
              color: "#ebcb6b",
            },
            {
              gte: 10,
              lte: 99,
              label: "50-100",
              color: "#e0d669",
            },
            {
              gte: 1,
              lte: 9,
              label: "20-50",
              color: "#90b07e",
            },
            {
              lte: 0,
              label: "5-20",
              color: "#6ea797",
            },
          ],
          textStyle: {
            color: "black",
            fontSize: 14, //图元字体大小
            fontWeight: 500,
          },
        },

        series: [
          {
            type: "map",
            mapType: "world",
            zoom: 1.2, //地图大小
            roam: true, //禁止拖拽
            itemStyle: {
              normal: {
				areaColor: '#C1C1C1',
                borderWidth: 0.6, //边框宽度
                textStyle: {
                  color: "#fff", //默认文字颜色
                },
                borderColor: "#fff", //地图边框颜色
              },
              emphasis: {
                borderColor: '#A31212', //地图边框颜色
                areaColor: null, // 设置地图点击后的颜色
              },
            },
            select: {
              //地图选中颜色
              itemStyle: {
                borderColor: '#A31212', //地图边框颜色
                color: null, // 设置地图点击后的颜色
              },
            },
            label: {
              normal: {
                //静态的时候展示样式
                show: false, //是否显示地图名称
                textStyle: {
                  color: "#fff", //颜色
                  fontSize: 14, //文字大小
                  fontFamily: "Arial",
                },
              },
              emphasis: {
                //动态展示的样式
                color: "#fff",
              },
            },
            data: this.data,
            nameMap: nameMap,
       
          },
        ],
      };
      mycontractMap.setOption(option);
      window.addEventListener("resize", function () {
        mycontractMap.resize();
	
      });
	mycontractMap.on('click', this.handleMapClick); // 绑定地图板块的点击事件

    },

	
  },
};
</script>
<!-- 11.28农玉翔有调整-南美洲显示不完全 -->
<style lang="scss" scoped>
.GlobalMap {
  width: 1000px;
  height: 450px;
  margin-left: 100px;
}
.box-card{
	width: 232px;
	margin-left: 30px;
	margin-top: 50px;
}

.flag {
  width: 230px;
  display: outline-block; /* 保持容器大小与图像一致 */
  box-shadow: 0 0 10px black; /* 添加黑色边缘 */

}
.flag-image {
  width: 100%; /* 使图像填充整个容器 */
  height: auto; /* 保持宽高比 */
  vertical-align: bottom; /* 底部对齐 */
}

.country{
	font-size: 25px;
	float: left;
	font-weight: bold;
}
.bigevent{
	font-size: 20px;
}
.eventtext{
	width: 230px;
	margin-top: 20px;

}
.year{
	font-size:30px;
	margin-bottom: 10px;
	font-weight: bold;
}
</style>

