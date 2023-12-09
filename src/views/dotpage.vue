<template>
	
	 <el-container >
		
		 	
		
	      <el-aside width="200px">
			  
			<!--  <div class="cata">
				<div @click="handleClick('农业')" class="cataitem">农业</div>
				<div @click="handleClick('农业')" class="cataitem">农业</div>
				<div @click="handleClick('科技')" class="cataitem">科技</div>
				<div @click="handleClick('经济')" class="cataitem">经济</div>
				<div @click="handleClick('外交')" class="cataitem">外交</div>
			  	</div> -->
				
				<el-row class="cata">
				  
				    <el-menu
				      
				      class="el-menu-vertical-demo"
					   background-color="#ce93d8"
					   text-color="#fff"
					   active-text-color="#fff"
					   style="position: fixed; top: 20px; left: 20px; width: 200px; z-index: 1000;height:300px ;"
				    >
				      <el-menu-item index="1" @click="handleClick('农业')">
				     <span>农业</span>
				      </el-menu-item>
						<el-menu-item index="2" @click="handleClick('科技')">
						<span>科技</span>
						 </el-menu-item>
						 
					<el-menu-item index="3" @click="handleClick('经济')">
					<span>经济</span>
					 </el-menu-item>
					 <el-menu-item index="4" @click="handleClick('外交')">
					 <span>外交</span>
					  </el-menu-item>
				    </el-menu>
			
				
				</el-row>
				
				
				
				
				
				
				
				
				
		  </el-aside>
		  
		  
		  
	      <el-main>
			  <div class="maind3">
			  	<div class="d3Chart"></div>
			  </div>
			   
		  </el-main>
		
	    </el-container>

	
	
   

</template>
<script>
    import * as d3 from 'd3';

	
    export default {
		data() {
		  return {
		      down:"false",
			  up:"false",
			  middle:"false",
			
		  };
		},
        mounted() {
			const startYear = 1947;
			const endYear = 1955;
			const filePaths = [];
			const posi="middle";
			this.middle="true";
			for (let year = startYear; year <= endYear; year++) {
			  for (let month = 1; month <= 12; month++) {
			    const monthString = month.toString().padStart(2, '0');
			    const filePath = `${year}-${monthString}.csv`;
			    filePaths.push(filePath);
			  }
			}
			this.handleFilesChange(filePaths,posi)


		
            // 数据——对应y轴的值——城市人口（万）
            //let dataList = [100, 105, 200, 250, 230]
            // 画布的参数
            let mapWidth = 10000;
            let mapHeight = 10000;
            let mapPadding = 30
            // 定义画布—— 宽 300 高 300 外边距 10px
            let map = d3.select(".d3Chart").append("svg").attr("width", mapWidth).attr("height", mapHeight).style("margin", "10px")
             map.style("fill", "#EBA281");
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
		handleClick (value){
		
		console.log(value) // 输出到控制台
		 const startYear = 1947;
		 const endYear = 1955;
		 const filePaths = [];
		 
		 for (let year = startYear; year <= endYear; year++) {
		   for (let month = 1; month <= 12; month++) {
		     const monthString = month.toString().padStart(2, '0');
		     const filePath = `${year}-${monthString}.csv`;
		     filePaths.push(filePath);
		   }
		 }
		 //console.log(this.down);
		 if(this.middle=="true"){
		 	let map = d3.select(".d3Chart").select("svg");
		 	map.selectAll("*").remove(); // 清空mapb
		 	const posi="up";
		 	this.up="true";
		 	this.middle="false";
		 	this.handleFilesChange(filePaths,posi)
		 }
		 else if (this.up=="false"){
		  	  const posi="up";
			  this.up="true";
			  this.middle="false";
			  this.handleFilesChange(filePaths,posi)
		  }
		  else if (this.down=="false"){
			  console.log(111)
			  const posi="down";
			  this.down="true";
			  this.middle="false";
			  this.handleFilesChange(filePaths,posi)
		  }
		  else if(this.down=='true'&&this.up=="true"){
			  let map = d3.select(".d3Chart").select("svg");
			  map.selectAll("*").remove(); // 清空mapb
			  const posi="middle";
			  this.middle="true";
			  this.up="false";
			  this.down="false";
			  this.handleFilesChange(filePaths,posi)
		  }
	

	  
		  
	},
	  async handleFilesChange(filePaths,posi) {
	    
	    let allFileData = [];
	    let offsetX = 0;
	   
	    for (let filePath of filePaths) {
	      try {
	        const response = await fetch(`src/assets/titles/${filePath}`);
	        const content = await response.text();
	
	        let lines = content.split("\n");
	        allFileData.push(lines);
			this.createCircles(lines, offsetX, posi);
	        offsetX += 10;
	
	      } catch (error) {
	        console.error(`Failed to read file: ${error}`);
	      }
	    }
	
	    console.log(allFileData);
	  },
	  createCircles(data, offsetX,posi) {  
	    let circles = [];
	   //console.log(posi);
	    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
	      let row = data[rowIndex].split(",");
	      let x = 100 + offsetX;
	      let r = 2;
	     if (posi=="up"){
			 //console.log(posi);
			let y = 320 - rowIndex * 5;
	      	let circle = this.drawCircle(x, y, r);
			circle.data = { line: row };
				
			circle.on("click", () => {
			  this.showClickedContent(circle.data.line, x, y);
			});
				
			circles.push(circle);
        }
	      if(posi=="down"){
			  //console.log(posi);
			let y = 360 + rowIndex * 5;
	      	let circle = this.drawCircle(x, y, r);
			circle.data = { line: row };
				
			circle.on("click", () => {
			  this.showClickedContent(circle.data.line, x, y);
			});
				
			circles.push(circle);
	    }
	      if (posi=="middle"){
			//console.log(posi);
			let y = data.length*5/2+300 - rowIndex * 5;
	      	let circle = this.drawCircle(x, y, r);
			circle.data = { line: row };
				
			circle.on("click", () => {
			  this.showClickedContent(circle.data.line, x, y);
			});
				
			circles.push(circle);
	    }
	    
	      
	    }
	  },
	 
	  drawCircle(cx, cy, r) {
	    let map = d3.select(".d3Chart").select("svg");
	    map.style("fill", "#EBA281");
	    let width = 10000;
	    let height = 10000;
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
	.active {
	  background-color: grey;
	}
	a{
	  text-decoration: none;
	}
	.cataitem{
		height: 40px;
	}
	.maind3{
		height: 700px;
		margin-top: 50px;
		background-color: "#EBA281";
	}
	.cata{
		margin-top: 20px;
		margin-left: 10px;
		width: 100px;
		text-align: center;
	}

</style>