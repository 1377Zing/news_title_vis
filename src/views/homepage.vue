<template>
  <div class="main_world" style="overflow:hidden">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#c3a6a0"
      text-color="black"
      active-text-color="#fff"
      style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;height:50px ;"
    >
      <!-- 首页，个人中心，用户管理，蛋糕分类管理，蛋糕信息管理，系统管理，订单管理 -->
      <router-link to="/">
        <el-menu-item index="1">词云图</el-menu-item>
      </router-link>
      <router-link to="/map">
        <el-menu-item index="2">外交分布图</el-menu-item>
      </router-link>
      <router-link to="/dot">
        <el-menu-item index="3">点点图</el-menu-item>
      </router-link>
    </el-menu>

    <div class="maintime">
      <div id="boy"></div>
      <el-steps :active=date align-center>
        <el-step title="1946" description="" class="time1" @click="scrollToPosition(1946)"/>
      	<el-step title="1950" description="" class="time1" @click="scrollToPosition(1950)"/>
      	<el-step title="1960" description="" class="time1" @click="scrollToPosition(1960)"/>
      	<el-step title="1970" description="" class="time1" @click="scrollToPosition(1970)"/>
      	<el-step title="1980" description="" class="time1" @click="scrollToPosition(1980)"/>
      	<el-step title="1990" description="" class="time1" @click="scrollToPosition(1990)"/>
      	<el-step title="2000" description="" class="time1" @click="scrollToPosition(2000)"/>
      	<el-step title="2010" description="" class="time1" @click="scrollToPosition(2010)"/>
      	<el-step title="2020" description="" class="time1" @click="scrollToPosition(2020)"/>
      	
        </el-steps>
    </div>

    <div style="width: 1000px; height: 42.5rem; display: table;" >
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
const date = ref(1)
const showWord1946 = ref(true)
const showWord1950 = ref(false)
const showWord1960 = ref(false)
const showWord1970 = ref(false)
const showWord1980 = ref(false)
const showWord1990 = ref(false)
const showWord2000 = ref(false)
const showWord2010 = ref(false)
const showWord2020 = ref(false)

const scrollToPosition = (year) => {
  // 将所有年份的 showWord 变量设置为 false
  showWord1946.value = false
  showWord1950.value = false
  showWord1960.value = false
  showWord1970.value = false
  showWord1980.value = false
  showWord1990.value = false
  showWord2000.value = false
  showWord2010.value = false
  showWord2020.value = false

  // 根据选中的年份，将对应年份的 showWord 变量设置为 true
  if (year == '1946') {
    showWord1946.value = true
  } else if (year == '1950') {
    showWord1950.value = true
  } else if (year == '1960') {
    showWord1960.value = true
  } else if (year == '1970') {
    showWord1970.value = true
  } else if (year == '1980') {
    showWord1980.value = true
  } else if (year == '1990') {
    showWord1990.value = true
  } else if (year == '2000') {
    showWord2000.value = true
  } else if (year == '2010') {
    showWord2010.value = true
  } else if (year == '2020') {
    showWord2020.value = true
  }

  console.log(year)
}
</script>

<style>
.main_world{
	background-color:#c3a6a0;
}
a {
  text-decoration: none;
}

.wordmain {
  height: 40rem;
  margin-top: 30px;
}

.commain {
  width: 1480px;
  height: 45rem;
  background-color: #c3a6a0;
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


</style>
