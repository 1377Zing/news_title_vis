<template>
<div class="main_world">
		<el-menu
		    :default-active="activeIndex"
		    class="el-menu-demo"
		    mode="horizontal"
		    background-color="#c3a6a0"
		    text-color="black"
		    active-text-color=" #fff"
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

	

		  <div class="maintime">
		  				  
		  				  <div id="boy">
		  				  	<!-- <el-image style="width: 100px; height: 100px" :src="imageUrl" :fit="fit" /> -->
		  				  </div>   
		  				<el-steps :active=date align-center>
		  				    <el-step title="1946" description="" class="time1"/>
		  					<el-step title="1950" description="" class="time1"/>
		  					<el-step title="1960" description="" class="time1"/>
		  					<el-step title="1970" description="" class="time1"/>
		  					<el-step title="1980" description="" class="time1"/>
		  					<el-step title="1990" description="" class="time1"/>
		  					<el-step title="2000" description="" class="time1"/>
		  					<el-step title="2010" description="" class="time1"/>
		  					<el-step title="2020" description="" class="time1"/>
		  				  </el-steps>
		  	<button @click="scrollToPosition1" class="timeline1"></button>
		  	<button @click="scrollToPosition2" class="timeline2"></button>
		  	<button @click="scrollToPosition3" class="timeline3"></button>
		  	<button @click="scrollToPosition4" class="timeline4"></button>
		  	<button @click="scrollToPosition5" class="timeline5"></button>
		  	<button @click="scrollToPosition6" class="timeline6"></button>
		  	<button @click="scrollToPosition7" class="timeline7"></button>
		  	<button @click="scrollToPosition8" class="timeline8"></button>
		  	<button @click="scrollToPosition9" class="timeline9"></button>
		  </div>
		  
          <div style="width:13320px; height: 42.5rem; display: table;">

            <div style="display: table-cell;" class="commain">
				
				<div id="word4">
					
                <word1946></word1946>
				
				</div>
            </div>
			
            <div style="display: table-cell;" class="commain" >
				<div id="word5">
               <word1950></word1950>
			   
			   </div>
            </div>
			
			<div style="display: table-cell;" class="commain" >
				<div id="word6">
			   <word1960></word1960>
			   </div>
			</div>
			
			<div style="display: table-cell;" class="commain" >
				<div id="word7">
			   <word1970></word1970>
			   </div>
			</div>
			
			<div style="display: table-cell;" class="commain" >
				<div id="word8">
			   <word1980></word1980>
			   </div>
			</div>
			
			<div style="display: table-cell;" class="commain" >
				<div id="word9">
			   <word1990></word1990>
			   </div>
			</div>
			
			<div style="display: table-cell;" class="commain" >
				<div id="word0">
			   <word2000></word2000>
			   </div>
			</div>
			
			<div style="display: table-cell;" class="commain" >
				<div id="word1">
			   <word2010></word2010>
			   </div>
			</div>
			
			<div style="display: table-cell;" class="commain" >
				<div id="word2">
			   <word2020></word2020>
			   </div>
			</div>
 </div>
</div>
	
</template>

<script setup>
import { ref } from 'vue'
import word1946 from "../components/wordcloud/1946.vue"
import word1950 from "../components/wordcloud/1950.vue"
import word1960 from "../components/wordcloud/1960.vue"
import word1970 from "../components/wordcloud/1970.vue"
import word1980 from "../components/wordcloud/1980.vue"
import word1990 from "../components/wordcloud/1990.vue"
import word2000 from "../components/wordcloud/2000.vue"
import word2010 from "../components/wordcloud/2010.vue"
import word2020 from "../components/wordcloud/2020.vue"

const activeIndex = ref('1')
const date=ref(1);
const imageUrl=ref("src/assets/wordcloud/boyy1.gif");
const imagePosition = ref(9.5) 

// const elMenu = document.querySelector('.el-menu-item');
		
// window.addEventListener('scroll', function() {
// 	 // 判断鼠标是否位于窗口最上方
// 	const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
// 	if (scrollTop === 0) {
// 	// 当鼠标位于窗口最上方时，显示el-menu
// 	 elMenu.style.display = 'block';
// 	} else {
// 	// 当鼠标不位于窗口最上方时，隐藏el-menu
// 	elMenu.style.display = 'none';
// 	}
// });


const scrollToPosition1=()=> {
	    const targetElement = document.getElementById('word4');
	    const targetimg = document.getElementById('boy');
	    if (targetElement) {
	    	date.value=1;
	    	imageUrl.value="src/assets/wordcloud/boy1.gif";
	    	imagePosition.value =0.5;
	    	targetimg.style.transform = `translateX(${imagePosition.value}rem)`; // 修改图片的水平位置
	    	targetimg.style.transition = "transform 3s ease-out"; 
	        targetElement.scrollIntoView({
	        behavior: 'auto', // 平滑滚动
	        left: targetElement.offsetLeft,
	    	
	      });
	    }
	  }	  
const scrollToPosition2=()=> {
	  	    const targetElement = document.getElementById('word5');
			const targetimg = document.getElementById('boy');
	  	    if (targetElement) {
				date.value=2;
				imageUrl.value="src/assets/wordcloud/boyy2.gif";
				imagePosition.value =9.5;
				targetimg.style.transform = `translateX(${imagePosition.value}rem)`; // 修改图片的水平位置
				targetimg.style.transition = "transform 3s ease-out"; 
	  	        targetElement.scrollIntoView({
	  	        behavior: 'auto', // 平滑滚动
	  	        left: targetElement.offsetLeft,
				
	  	      });
	  	    }
	  	  }
const scrollToPosition3=()=> {
	  	    const targetElement = document.getElementById('word6');
	  	   const targetimg = document.getElementById('boy');
	  	   if (targetElement) {
	  	   	date.value=3;
	  	   	imageUrl.value="src/assets/wordcloud/boyy1.gif";
	  	   	imagePosition.value =18;
	  	   	targetimg.style.transform = `translateX(${imagePosition.value}rem)`; // 修改图片的水平位置
	  	   	targetimg.style.transition = "transform 3s ease-out"; 
	  	       targetElement.scrollIntoView({
	  	       behavior: 'auto', // 平滑滚动
	  	       left: targetElement.offsetLeft,
	  	   	
	  	     });
	  	   }
	  	  }

const scrollToPosition4=()=> {
	  	    const targetElement = document.getElementById('word7');
	  	    const targetimg = document.getElementById('boy');
	  	    if (targetElement) {
	  	    	date.value=4;
	  	    	imageUrl.value="src/assets/wordcloud/boyy2.gif";
	  	    	imagePosition.value =28;
	  	    	targetimg.style.transform = `translateX(${imagePosition.value}rem)`; // 修改图片的水平位置
	  	    	targetimg.style.transition = "transform 3s ease-out"; 
	  	        targetElement.scrollIntoView({
	  	        behavior: 'auto', // 平滑滚动
	  	        left: targetElement.offsetLeft,
	  	    	
	  	      });
	  	    }
	  	  }
const scrollToPosition5=()=> {
	  	    const targetElement = document.getElementById('word8');
	  	   const targetimg = document.getElementById('boy');
	  	   if (targetElement) {
	  	   	date.value=5;
	  	   	imageUrl.value="src/assets/wordcloud/boyy1.gif";
	  	   	imagePosition.value =37;
	  	   	targetimg.style.transform = `translateX(${imagePosition.value}rem)`; // 修改图片的水平位置
	  	   	targetimg.style.transition = "transform 3s ease-out"; 
	  	       targetElement.scrollIntoView({
	  	       behavior: 'auto', // 平滑滚动
	  	       left: targetElement.offsetLeft,
	  	   	
	  	     });
	  	   }
	  	  }
const scrollToPosition6=()=> {
	  	    const targetElement = document.getElementById('word9');
	  	    const targetimg = document.getElementById('boy');
	  	    if (targetElement) {
	  	    	date.value=6;
	  	    	imageUrl.value="src/assets/wordcloud/boyy2.gif";
	  	    	imagePosition.value =47;
	  	    	targetimg.style.transform = `translateX(${imagePosition.value}rem)`; // 修改图片的水平位置
	  	    	targetimg.style.transition = "transform 3s ease-out"; 
	  	        targetElement.scrollIntoView({
	  	        behavior:'auto', // 平滑滚动
	  	        left: targetElement.offsetLeft,
	  	    	
	  	      });
	  	    }
	  	  }
const scrollToPosition7=()=> {
	  	    const targetElement = document.getElementById('word0');
	  	   const targetimg = document.getElementById('boy');
	  	   if (targetElement) {
	  	   	date.value=7;
	  	   	imageUrl.value="src/assets/wordcloud/boyy1.gif";
	  	   	imagePosition.value =56;
	  	   	targetimg.style.transform = `translateX(${imagePosition.value}rem)`; // 修改图片的水平位置
	  	   	targetimg.style.transition = "transform 3s ease-out"; 
	  	       targetElement.scrollIntoView({
	  	       behavior:'auto', // 平滑滚动
	  	       left: targetElement.offsetLeft,
	  	   	
	  	     });
	  	   }
	  	  }
const scrollToPosition8=()=> {
	  	    const targetElement = document.getElementById('word1');
	  	   const targetimg = document.getElementById('boy');
	  	   if (targetElement) {
	  	   	date.value=8;
	  	   	imageUrl.value="src/assets/wordcloud/boyy2.gif";
	  	   	imagePosition.value =65;
	  	   	targetimg.style.transform = `translateX(${imagePosition.value}rem)`; // 修改图片的水平位置
	  	   	targetimg.style.transition = "transform 3s ease-out"; 
	  	       targetElement.scrollIntoView({
	  	       behavior: 'auto', // 平滑滚动
	  	       left: targetElement.offsetLeft,
	  	   	
	  	     });
	  	   }
	  	  }
const scrollToPosition9=()=> {
	  	    const targetElement = document.getElementById('word2');
	  	   const targetimg = document.getElementById('boy');
	  	   if (targetElement) {
	  	   	date.value=9;
	  	   	imageUrl.value="src/assets/wordcloud/boyy1.gif";
	  	   	imagePosition.value =75;
	  	   	targetimg.style.transform = `translateX(${imagePosition.value}rem)`; // 修改图片的水平位置
	  	   	targetimg.style.transition = "transform 3s ease-out"; 
	  	       targetElement.scrollIntoView({
	  	       behavior: 'auto', // 平滑滚动
	  	       left: targetElement.offsetLeft,
	  	   	
	  	     });
	  	   }
	  	  }


</script>

<style>
	a{
	  text-decoration: none;
	}
	.wordmain{
		   //background-color: aquamarine;
		   height:40rem;
		   margin-top: 30px;
	}
	.commain{
		width: 1480px;
		height:45rem;
	    background-color: #c3a6a0;
  
	}
	#boy{
		width: 50px;
		height: 50px;
		position: fixed;
		bottom: 8rem;
		left: 9.5rem;
		height: 5rem;
		z-index: 9999;
	}
	  .maintime{
		color: black;
		 font-size: 20px;
		 position: fixed;
		 bottom: 1rem;
		 //left: 5rem;
		 height: 5rem;
		width: 92rem;
		background-color:#c3a6a0;
		z-index: 9999;
	}

	.timeline1{
		  color: black;
		  font-size: 20px;
		  position: fixed;
		  bottom: 2rem;
		  left: 4rem;
		  height: 4rem;
		  width: 2rem;
		  z-index: 999;
		 opacity: 0; 
	}
	.timeline2{
		 color: black;
		  font-size: 20px;
		  position: fixed;
		  bottom: 2rem;
		  left: 15rem;
		  height: 4rem;
		  width: 2rem;
		  z-index: 999;
		 opacity: 0;
	}
	.timeline3{
		 color: black;
		  font-size: 20px;
		  position: fixed;
		  bottom: 2rem;
		  left: 27.5rem;
		  height: 4rem;
		  width: 2rem;
		  z-index: 999;
		  opacity: 0;
	}
	
	.timeline4{
		 color: black;
		  font-size: 20px;
		  position: fixed;
		  bottom: 2rem;
		  left: 37rem;
		  height: 4rem;
		  width: 2rem;
		  z-index: 999;
		  opacity: 0;
	}
	
	.timeline5{
		 color: black;
		  font-size: 20px;
		  position: fixed;
		  bottom: 2rem;
		  left: 46.5rem;
		  height: 4rem;
		  width: 2rem;
		  z-index: 999;
		  opacity: 0;
	}
	
	
	.timeline6{
		 color: black;
		  font-size: 20px;
		  position: fixed;
		  bottom: 2rem;
		  left: 56rem;
		  height: 4rem;
		  width: 2rem;
		  z-index: 999;
		  opacity: 0;
	}
	.timeline7{
		 color: black;
		  font-size: 20px;
		  position: fixed;
		  bottom: 2rem;
		  left: 65.5rem;
		  height: 4rem;
		  width: 2rem;
		  z-index: 999;
		  opacity: 0;
	}
	.timeline8{
		 color: black;
		  font-size: 20px;
		  position: fixed;
		 bottom: 2rem;
		 left: 75rem;
		 height: 4rem;
		 width: 2rem;
		  z-index: 999;
		  opacity: 0;
	}
	.timeline9{
		 color: black;
		  font-size: 20px;
		  position: fixed;
		 bottom: 2rem;
		 left: 84rem;
		 height: 4rem;
		 width: 2rem;
		  z-index: 999;
		  opacity: 0;
	}
	

</style>