<template>
	
	<el-menu
	    :default-active="3"
	    class="el-menu-demo"
	    mode="horizontal"
	    background-color="#fff"
	    text-color="black"
	    active-text-color="#d65942"
	    style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;height:50px ;"
	>
	    <!-- 首页，个人中心，用户管理，蛋糕分类管理，蛋糕信息管理，系统管理，订单管理 -->
	    <router-link to='/'>
	        <el-menu-item index="1">词云图</el-menu-item>
	    </router-link>
	    <router-link to='/map'>
	        <el-menu-item index="2">外交分布图</el-menu-item>
	    </router-link>
		<router-link to='/dot'>
		    <el-menu-item index="3">点点图</el-menu-item>
		</router-link>
	</el-menu>
    <div class="d3Chart"></div>

</template>
<script>
    import * as d3 from 'd3';

	
    export default {
        mounted() {
	
			
			//读取文件
			// const filePaths =
			// ['1946-10.csv','1946-11.csv','1946-12.csv',
			//  '1947-01.csv','1947-02.csv','1947-03.csv','1947-04.csv','1947-05.csv','1947-06.csv','1947-07.csv','1947-08.csv','1947-09.csv','1947-10.csv','1947-11.csv','1947-12.csv']
			//const filePaths=
			//['1947-01.csv','1947-02.csv','1947-03.csv','1947-04.csv','1947-05.csv','1947-06.csv','1947-07.csv','1947-08.csv','1947-09.csv','1947-10.csv','1947-11.csv','1947-12.csv']
			//const filePaths =['1947-01.csv']
			const startYear = 1947;
			const endYear = 1948;
			const filePaths = [];
			
			for (let year = startYear; year <= endYear; year++) {
			  for (let month = 1; month <= 12; month++) {
			    const monthString = month.toString().padStart(2, '0');
			    const filePath = `${year}-${monthString}.csv`;
			    filePaths.push(filePath);
			  }
			}
			this.handleFilesChange(filePaths)


    
            //点点生成
			let labelList = [];
			for (let year = 1947; year <= 2022; year++) {
			   labelList.push(year.toString());
			}
			
		
            // 数据——对应y轴的值——城市人口（万）
            //let dataList = [100, 105, 200, 250, 230]
            // 画布的参数
            let mapWidth = 10000;
            let mapHeight = 5000;
            let mapPadding = 30
            // 定义画布—— 宽 300 高 300 外边距 10px
            let map = d3.select(".d3Chart").append("svg").attr("width", mapWidth).attr("height", mapHeight).style("margin", "10px")
            
            //定义x轴比例尺（序数段比例尺）
            let scaleX = d3.scaleBand().domain(labelList).range([0, mapWidth - mapPadding * 2])

            //定义Y轴比例尺（线性比例尺）——最大值为画布高度-2*画布内边距,最小值为0（0放在第二位，因为y轴正方向是反的）
            //let scaleY = d3.scaleLinear().domain([0, d3.max(dataList)]).range([mapHeight - 2 * mapPadding, 0]);
			
			
            //定义x y 轴
            let axisX = d3.axisBottom(scaleX)
            //let axisY = d3.axisLeft(scaleY)
			
			
            // 绘制x y 轴
            map.append('g').attr("transform", `translate(${mapPadding},${mapHeight - mapPadding})`).call(axisX);
            //map.append('g').attr("transform", "translate(" + mapPadding + "," + mapPadding + ")").call(axisY);
						
        },
	methods: {
	  async handleFilesChange(filePaths) {
	    let allFileData = [];
	    let offsetX = 0;
	
	    for (let filePath of filePaths) {
	      try {
	        const response = await fetch(`src/assets/titles/${filePath}`);
	        const content = await response.text();
	
	        let lines = content.split("\n");
	        allFileData.push(lines);
	
	        this.createCircles(lines, offsetX);
	        offsetX += 10;
	
	      } catch (error) {
	        console.error(`Failed to read file: ${error}`);
	      }
	    }
	
	    console.log(allFileData);
	  },
	  createCircles(data, offsetX) {
	    let circles = [];
	
	    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
	      let row = data[rowIndex].split(",");
	      let x = 100 + offsetX;
	      let y = 4950 - rowIndex * 5;
	      let r = 2;
	
	      let circle = this.drawCircle(x, y, r);
	      circle.data = { line: row };
	
	      circle.on("click", () => {
	        this.showClickedContent(circle.data.line, x, y);
	      });
	
	      circles.push(circle);
	    }
	  },
	  drawCircle(cx, cy, r) {
	    let map = d3.select(".d3Chart").select("svg");
	    let width = 10000;
	    let height = 5000;
	    let randomOffsetX = Math.random() * width;
	    let randomOffsetY = Math.random() * height;
	
	    let circle = map
	      .append("circle")
	      .attr("class", "circle")
	      .attr("cx", randomOffsetX)
	      .attr("cy", randomOffsetY + 50)
	      .attr("r", r)
	      .style("fill", "black")
	      .on("mouseover", function () {
	        d3.select(this).transition().duration(10).attr("r", r * 3);
	      })
	      .on("mouseout", function () {
	        d3.select(this).transition().duration(200).attr("r", r);
	      });
	
	    circle
	      .transition()
	      .duration(cx * 20)
	      .attr("cx", cx)
	      .attr("cy", cy)
	      .attr("r", r);
	
	    return circle;
	  },
	showClickedContent(content, x, y) {
	  let map = d3.select(".d3Chart").select("svg");
	
	  let rectWidth = 150;
	  let rectHeight = 100;
	
	  let rect = map
	    .append("rect")
	    .attr("class", "highlight-rect")
	    .attr("x", x - rectWidth / 2)
	    .attr("y", y - rectHeight / 2)
	    .attr("width", rectWidth)
	    .attr("height", rectHeight)
	    .style("fill", "black")
	    .style("stroke", "black")
	    .style("stroke-width", 2);
	
	  let foreignObject = map
	    .append("foreignObject")
	    .attr("x", x - rectWidth / 2)
	    .attr("y", y - rectHeight / 2)
	    .attr("width", rectWidth)
	    .attr("height", rectHeight);
	
	  let div = foreignObject
	    .append("xhtml:div")
	    .style("font-weight", "bold")
	    .style("font-size", "15px")
	    .style("color", "white")
	    .style("width", "100%")
	    .style("height", "100%")
	    .style("word-wrap", "break-word"); // 或者使用 white-space: pre-wrap;
	
	  let contentLines = content.map(line => `<div>${line}</div>`);
	
	  div.html(contentLines.join(""));
	
	  // 移除方框和文本
	  setTimeout(() => {
	    rect.remove();
	    foreignObject.remove();
	  }, 2000);
	}
	}
    }
</script>
<style scoped>
	
	a{
	  text-decoration: none;
	}
</style>