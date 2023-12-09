<template>
  <div>
    <div id="container" ref="containerRef" @mousemove="handleMouseMove">
      <div id="thumbs" ref="thumbsRef">
        <div v-for="(block, index) in historyBlocks" :key="index"
          :class="['history-block', block.bgClass, { 'timeline-visible': block.timelineVisible, 'no-margin-right': index === historyBlocks.length - 1 }]"
          @click="handleHistoryBlockClick(index)" :style="{ width: `${block.width}px` }">
          <div class="cover"></div>
          <div class="year">{{ block.year }}</div>
          <div class="title" :style="{ width: `${block.titleWidth}px` }">
            {{ block.title }}
          </div>

          <div class="timeline" v-show="block.timelineVisible">
            <ul>
              <li v-for="year in block.timelineYears" :key="year">
                <a class="timelineYear" @click="handleClick(year)">{{ year }}</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    <div class="mainmap">
      <el-container width="1500px">
        <maps :mapData="selectedData" :yeardata="yeardata"></maps>
      </el-container>
    </div>

  </div>
</template>
  
<script>
import maps from "../components/map/map.vue"
export default {
  components: {
    maps
  },
  data() {
    return {
      selectedData: '',
      yeardata: '1946',
      viewport: 0,
      divWidth: 0,
      dataByYear: {
        1946: [
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
        1947: [
          { name: "美国", value: 243, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 179, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 66, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "英国", value: 59, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "印度尼西亚", value: 55, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "德国", value: 54, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "法国", value: 42, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "希腊", value: 32, event: "发生了大事", url: "src/assets/flags/GR.svg" },
          { name: "印度", value: 19, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "朝鲜", value: 17, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "意大利", value: 17, event: "发生了大事", url: "src/assets/flags/IT.svg" },
          { name: "波兰", value: 15, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "越南", value: 13, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "荷兰", value: 10, event: "发生了大事", url: "src/assets/flags/NL.svg" },
          { name: "加拿大", value: 10, event: "发生了大事", url: "src/assets/flags/CA.svg" },
        ],
        1948: [
          { name: "俄罗斯", value: 160, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 108, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 99, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "德国", value: 59, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "法国", value: 40, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "印度尼西亚", value: 33, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "希腊", value: 29, event: "发生了大事", url: "src/assets/flags/GR.svg" },
          { name: "英国", value: 25, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "意大利", value: 23, event: "发生了大事", url: "src/assets/flags/IT.svg" },
          { name: "捷克", value: 19, event: "发生了大事", url: "src/assets/flags/CZ.svg" },
          { name: "印度", value: 18, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "朝鲜", value: 17, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "波兰", value: 15, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "缅甸", value: 12, event: "发生了大事", url: "src/assets/flags/MM.svg" },
          { name: "越南", value: 11, event: "发生了大事", url: "src/assets/flags/VN.svg" },
        ],
        1949: [
          { name: "俄罗斯", value: 654, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 147, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "德国", value: 129, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "法国", value: 107, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "日本", value: 99, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "印度尼西亚", value: 98, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "朝鲜", value: 93, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "波兰", value: 63, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "印度", value: 59, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "希腊", value: 55, event: "发生了大事", url: "src/assets/flags/GR.svg" },
          { name: "英国", value: 50, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "越南", value: 50, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "捷克", value: 37, event: "发生了大事", url: "src/assets/flags/CZ.svg" },
          { name: "蒙古", value: 24, event: "发生了大事", url: "src/assets/flags/MN.svg" },
          { name: "匈牙利", value: 21, event: "发生了大事", url: "src/assets/flags/HU.svg" },
        ],
        1950: [
          { name: "俄罗斯", value: 797, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "朝鲜", value: 688, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "美国", value: 653, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 260, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "越南", value: 160, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "德国", value: 146, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "波兰", value: 93, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "英国", value: 80, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "法国", value: 69, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "印度尼西亚", value: 65, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "捷克", value: 64, event: "发生了大事", url: "src/assets/flags/CZ.svg" },
          { name: "韩国", value: 50, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "印度", value: 47, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "蒙古", value: 29, event: "发生了大事", url: "src/assets/flags/MN.svg" },
          { name: "瑞典", value: 28, event: "发生了大事", url: "src/assets/flags/SE.svg" },
        ],
        1951: [
          { name: "美国", value: 651, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 505, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "朝鲜", value: 431, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "俄罗斯", value: 422, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "德国", value: 132, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "印度", value: 123, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "英国", value: 82, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "法国", value: 76, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "埃及", value: 75, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "伊朗", value: 70, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "越南", value: 65, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "缅甸", value: 33, event: "发生了大事", url: "src/assets/flags/MM.svg" },
          { name: "巴基斯坦", value: 28, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "匈牙利", value: 28, event: "发生了大事", url: "src/assets/flags/HU.svg" },
          { name: "捷克", value: 27, event: "发生了大事", url: "src/assets/flags/CZ.svg" },
        ],
        1952: [
          { name: "美国", value: 945, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 685, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "朝鲜", value: 508, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "日本", value: 356, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "英国", value: 129, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "印度", value: 124, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "德国", value: 101, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "法国", value: 90, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "越南", value: 60, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "波兰", value: 51, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "奥地利", value: 35, event: "发生了大事", url: "src/assets/flags/AT.svg" },
          { name: "捷克", value: 35, event: "发生了大事", url: "src/assets/flags/CZ.svg" },
          { name: "巴基斯坦", value: 32, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "缅甸", value: 32, event: "发生了大事", url: "src/assets/flags/MM.svg" },
          { name: "蒙古", value: 29, event: "发生了大事", url: "src/assets/flags/MN.svg" },
        ],
        1953: [
          { name: "俄罗斯", value: 786, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 605, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "朝鲜", value: 468, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "日本", value: 216, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "德国", value: 190, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "印度", value: 158, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "英国", value: 135, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "法国", value: 121, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "波兰", value: 98, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "越南", value: 97, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "印度尼西亚", value: 51, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "匈牙利", value: 50, event: "发生了大事", url: "src/assets/flags/HU.svg" },
          { name: "罗马尼亚", value: 42, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "韩国", value: 39, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "捷克", value: 35, event: "发生了大事", url: "src/assets/flags/CZ.svg" },
        ],
        1954: [
          { name: "俄罗斯", value: 881, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 660, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "印度", value: 416, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "朝鲜", value: 243, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "德国", value: 233, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "越南", value: 233, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "法国", value: 194, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "印度尼西亚", value: 137, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "日本", value: 134, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "波兰", value: 101, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "英国", value: 95, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "瑞士", value: 91, event: "发生了大事", url: "src/assets/flags/CH.svg" },
          { name: "阿尔巴尼亚", value: 50, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "罗马尼亚", value: 50, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "缅甸", value: 46, event: "发生了大事", url: "src/assets/flags/MM.svg" },
        ],
        1955: [
          { name: "俄罗斯", value: 772, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 549, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "印度", value: 343, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "日本", value: 287, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "越南", value: 270, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "德国", value: 258, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "印度尼西亚", value: 173, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "波兰", value: 142, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "朝鲜", value: 141, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "英国", value: 133, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "法国", value: 117, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "捷克", value: 96, event: "发生了大事", url: "src/assets/flags/CZ.svg" },
          { name: "瑞士", value: 93, event: "发生了大事", url: "src/assets/flags/CH.svg" },
          { name: "埃及", value: 80, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "缅甸", value: 72, event: "发生了大事", url: "src/assets/flags/MM.svg" },
        ],
        1956: [
          { name: "埃及", value: 1049, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "俄罗斯", value: 892, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 595, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 335, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "英国", value: 321, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "印度", value: 267, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "匈牙利", value: 242, event: "发生了大事", url: "src/assets/flags/HU.svg" },
          { name: "越南", value: 214, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "印度尼西亚", value: 194, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "德国", value: 193, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "法国", value: 179, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "波兰", value: 166, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "朝鲜", value: 109, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "阿尔及利亚", value: 106, event: "发生了大事", url: "src/assets/flags/DZ.svg" },
          { name: "约旦", value: 104, event: "发生了大事", url: "src/assets/flags/JO.svg" },
        ],
        1957: [
          { name: "俄罗斯", value: 1321, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 1120, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "英国", value: 353, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "埃及", value: 319, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "日本", value: 307, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "叙利亚", value: 258, event: "发生了大事", url: "src/assets/flags/SY.svg" },
          { name: "法国", value: 199, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "印度", value: 196, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "匈牙利", value: 193, event: "发生了大事", url: "src/assets/flags/HU.svg" },
          { name: "印度尼西亚", value: 193, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "越南", value: 172, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "以色列", value: 159, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "德国", value: 155, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "波兰", value: 147, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "约旦", value: 142, event: "发生了大事", url: "src/assets/flags/JO.svg" },
        ],
        1958: [
          { name: "美国", value: 957, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 699, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "英国", value: 195, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "日本", value: 194, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "朝鲜", value: 179, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "越南", value: 134, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "黎巴嫩", value: 132, event: "发生了大事", url: "src/assets/flags/LB.svg" },
          { name: "伊拉克", value: 131, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "法国", value: 124, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "埃及", value: 108, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "德国", value: 108, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "印度尼西亚", value: 96, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "阿尔及利亚", value: 72, event: "发生了大事", url: "src/assets/flags/DZ.svg" },
          { name: "印度", value: 62, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "波兰", value: 61, event: "发生了大事", url: "src/assets/flags/PL.svg" },
        ],
        1959: [
          { name: "俄罗斯", value: 564, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 541, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "越南", value: 228, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "古巴", value: 180, event: "发生了大事", url: "src/assets/flags/CU.svg" },
          { name: "日本", value: 174, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "老挝", value: 162, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "印度", value: 162, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "德国", value: 156, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "朝鲜", value: 130, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "伊拉克", value: 117, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "波兰", value: 103, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "印度尼西亚", value: 72, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "蒙古", value: 67, event: "发生了大事", url: "src/assets/flags/MN.svg" },
          { name: "匈牙利", value: 64, event: "发生了大事", url: "src/assets/flags/HU.svg" },
          { name: "英国", value: 64, event: "发生了大事", url: "src/assets/flags/GB.svg" },
        ],
        1960: [
          { name: "美国", value: 1822, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 1103, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "古巴", value: 890, event: "发生了大事", url: "src/assets/flags/CU.svg" },
          { name: "俄罗斯", value: 878, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "越南", value: 452, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "老挝", value: 416, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "朝鲜", value: 329, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "印度", value: 255, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "印度尼西亚", value: 249, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "韩国", value: 210, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "阿尔及利亚", value: 202, event: "发生了大事", url: "src/assets/flags/DZ.svg" },
          { name: "法国", value: 164, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "德国", value: 162, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "蒙古", value: 140, event: "发生了大事", url: "src/assets/flags/MN.svg" },
          { name: "缅甸", value: 137, event: "发生了大事", url: "src/assets/flags/MM.svg" },
        ],
        1961: [
          { name: "美国", value: 1731, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "老挝", value: 1117, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "古巴", value: 865, event: "发生了大事", url: "src/assets/flags/CU.svg" },
          { name: "俄罗斯", value: 787, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "越南", value: 579, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "日本", value: 364, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "朝鲜", value: 228, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "印度尼西亚", value: 201, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "印度", value: 186, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "阿尔巴尼亚", value: 174, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "法国", value: 173, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "蒙古", value: 165, event: "发生了大事", url: "src/assets/flags/MN.svg" },
          { name: "阿尔及利亚", value: 155, event: "发生了大事", url: "src/assets/flags/DZ.svg" },
          { name: "缅甸", value: 133, event: "发生了大事", url: "src/assets/flags/MM.svg" },
          { name: "瑞士", value: 122, event: "发生了大事", url: "src/assets/flags/CH.svg" },
        ],
        1962: [
          { name: "美国", value: 1983, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "古巴", value: 1191, event: "发生了大事", url: "src/assets/flags/CU.svg" },
          { name: "越南", value: 794, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "印度", value: 603, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "老挝", value: 475, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "俄罗斯", value: 455, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 421, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "朝鲜", value: 319, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "阿尔及利亚", value: 247, event: "发生了大事", url: "src/assets/flags/DZ.svg" },
          { name: "印度尼西亚", value: 245, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "阿尔巴尼亚", value: 222, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "英国", value: 186, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "法国", value: 138, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "尼泊尔", value: 138, event: "发生了大事", url: "src/assets/flags/NP.svg" },
          { name: "巴西", value: 123, event: "发生了大事", url: "src/assets/flags/BR.svg" },
        ],
        1963: [
          { name: "美国", value: 1532, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "越南", value: 813, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "古巴", value: 667, event: "发生了大事", url: "src/assets/flags/CU.svg" },
          { name: "印度", value: 579, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "日本", value: 465, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "印度尼西亚", value: 429, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "俄罗斯", value: 380, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "朝鲜", value: 379, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "老挝", value: 347, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "阿尔巴尼亚", value: 223, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "阿尔及利亚", value: 202, event: "发生了大事", url: "src/assets/flags/DZ.svg" },
          { name: "柬埔寨", value: 159, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "法国", value: 155, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "英国", value: 152, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "巴基斯坦", value: 150, event: "发生了大事", url: "src/assets/flags/PK.svg" },
        ],
        1964: [
          { name: "美国", value: 1927, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "越南", value: 1408, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "老挝", value: 517, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "日本", value: 482, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "古巴", value: 391, event: "发生了大事", url: "src/assets/flags/CU.svg" },
          { name: "印度尼西亚", value: 295, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "巴西", value: 258, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "朝鲜", value: 249, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "柬埔寨", value: 213, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "阿尔巴尼亚", value: 209, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "巴拿马", value: 191, event: "发生了大事", url: "src/assets/flags/PA.svg" },
          { name: "俄罗斯", value: 190, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "英国", value: 155, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "法国", value: 144, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "印度", value: 144, event: "发生了大事", url: "src/assets/flags/IN.svg" },
        ],
        1965: [
          { name: "越南", value: 2403, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "美国", value: 1963, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 595, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "印度尼西亚", value: 560, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "印度", value: 449, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "老挝", value: 289, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "朝鲜", value: 286, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "俄罗斯", value: 276, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "柬埔寨", value: 266, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "巴基斯坦", value: 249, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "多米尼加", value: 246, event: "发生了大事", url: "src/assets/flags/DO.svg" },
          { name: "韩国", value: 142, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "英国", value: 126, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "埃及", value: 122, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "阿尔及利亚", value: 120, event: "发生了大事", url: "src/assets/flags/DZ.svg" },
        ],
        1966: [
          { name: "越南", value: 1348, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "美国", value: 874, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "印度尼西亚", value: 435, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "日本", value: 396, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "俄罗斯", value: 218, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "阿尔巴尼亚", value: 189, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "柬埔寨", value: 172, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "印度", value: 163, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "老挝", value: 145, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "巴基斯坦", value: 127, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "泰国", value: 88, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "加纳", value: 71, event: "发生了大事", url: "src/assets/flags/GH.svg" },
          { name: "法国", value: 63, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "罗马尼亚", value: 60, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "多米尼加", value: 58, event: "发生了大事", url: "src/assets/flags/DO.svg" },
        ],
        1967: [
          { name: "越南", value: 626, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "美国", value: 345, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 274, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "印度尼西亚", value: 271, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "阿尔巴尼亚", value: 240, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "印度", value: 229, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "缅甸", value: 165, event: "发生了大事", url: "src/assets/flags/MM.svg" },
          { name: "俄罗斯", value: 105, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "英国", value: 71, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "以色列", value: 68, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "老挝", value: 63, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "泰国", value: 62, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "柬埔寨", value: 59, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "巴基斯坦", value: 54, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "埃及", value: 42, event: "发生了大事", url: "src/assets/flags/EG.svg" },
        ],
        1968: [
          { name: "越南", value: 591, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "日本", value: 354, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "美国", value: 332, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "阿尔巴尼亚", value: 200, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "印度", value: 168, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "老挝", value: 151, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "法国", value: 127, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "以色列", value: 114, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "泰国", value: 101, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "印度尼西亚", value: 98, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "巴勒斯坦", value: 94, event: "发生了大事", url: "src/assets/flags/PS.svg" },
          { name: "巴基斯坦", value: 68, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "俄罗斯", value: 59, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "意大利", value: 58, event: "发生了大事", url: "src/assets/flags/IT.svg" },
          { name: "英国", value: 53, event: "发生了大事", url: "src/assets/flags/GB.svg" },
        ],
        1969: [
          { name: "日本", value: 414, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "美国", value: 304, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "印度", value: 227, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "巴勒斯坦", value: 226, event: "发生了大事", url: "src/assets/flags/PS.svg" },
          { name: "阿尔巴尼亚", value: 214, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "越南", value: 163, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "以色列", value: 161, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "俄罗斯", value: 130, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "泰国", value: 107, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "老挝", value: 99, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "英国", value: 83, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "尼泊尔", value: 79, event: "发生了大事", url: "src/assets/flags/NP.svg" },
          { name: "意大利", value: 78, event: "发生了大事", url: "src/assets/flags/IT.svg" },
          { name: "巴基斯坦", value: 70, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "澳大利亚", value: 53, event: "发生了大事", url: "src/assets/flags/AU.svg" },
        ],
        1970: [
          { name: "越南", value: 629, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "柬埔寨", value: 527, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "日本", value: 417, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "巴勒斯坦", value: 372, event: "发生了大事", url: "src/assets/flags/PS.svg" },
          { name: "美国", value: 369, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "朝鲜", value: 297, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "印度", value: 247, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "老挝", value: 220, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "阿尔巴尼亚", value: 200, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "以色列", value: 186, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "埃及", value: 138, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "几内亚", value: 130, event: "发生了大事", url: "src/assets/flags/GN.svg" },
          { name: "泰国", value: 109, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "约旦", value: 97, event: "发生了大事", url: "src/assets/flags/JO.svg" },
          { name: "罗马尼亚", value: 90, event: "发生了大事", url: "src/assets/flags/RO.svg" },
        ],
        1971: [
          { name: "越南", value: 731, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "美国", value: 422, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "朝鲜", value: 398, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "日本", value: 397, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "印度", value: 394, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "老挝", value: 339, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "巴勒斯坦", value: 211, event: "发生了大事", url: "src/assets/flags/PS.svg" },
          { name: "柬埔寨", value: 205, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "阿尔巴尼亚", value: 191, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "巴基斯坦", value: 138, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "罗马尼亚", value: 125, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "约旦", value: 119, event: "发生了大事", url: "src/assets/flags/JO.svg" },
          { name: "智利", value: 111, event: "发生了大事", url: "src/assets/flags/CL.svg" },
          { name: "英国", value: 88, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "韩国", value: 83, event: "发生了大事", url: "src/assets/flags/KR.svg" },
        ],
        1972: [
          { name: "越南", value: 1194, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "美国", value: 478, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "朝鲜", value: 420, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "日本", value: 329, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "柬埔寨", value: 284, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "阿尔巴尼亚", value: 220, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "老挝", value: 212, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "罗马尼亚", value: 151, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "以色列", value: 143, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "法国", value: 133, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "巴勒斯坦", value: 121, event: "发生了大事", url: "src/assets/flags/PS.svg" },
          { name: "英国", value: 119, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "印度", value: 116, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "埃及", value: 110, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "阿尔及利亚", value: 106, event: "发生了大事", url: "src/assets/flags/DZ.svg" },
        ],
        1973: [
          { name: "越南", value: 779, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "朝鲜", value: 505, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "柬埔寨", value: 431, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "日本", value: 428, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "美国", value: 394, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 285, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "以色列", value: 262, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "老挝", value: 243, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "阿尔巴尼亚", value: 215, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "法国", value: 154, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "罗马尼亚", value: 148, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "韩国", value: 132, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "墨西哥", value: 119, event: "发生了大事", url: "src/assets/flags/MX.svg" },
          { name: "埃及", value: 116, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "巴基斯坦", value: 116, event: "发生了大事", url: "src/assets/flags/PK.svg" },
        ],
        1974: [
          { name: "越南", value: 506, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "日本", value: 352, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "朝鲜", value: 347, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "柬埔寨", value: 315, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "俄罗斯", value: 277, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 245, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "阿尔巴尼亚", value: 209, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "以色列", value: 171, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "老挝", value: 166, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "罗马尼亚", value: 159, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "韩国", value: 153, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "印度", value: 139, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "巴勒斯坦", value: 137, event: "发生了大事", url: "src/assets/flags/PS.svg" },
          { name: "英国", value: 111, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "法国", value: 109, event: "发生了大事", url: "src/assets/flags/FR.svg" },
        ],
        1975: [
          { name: "越南", value: 248, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "日本", value: 246, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "俄罗斯", value: 245, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "朝鲜", value: 188, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "美国", value: 166, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "柬埔寨", value: 161, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "老挝", value: 124, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "罗马尼亚", value: 108, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "阿尔巴尼亚", value: 80, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "法国", value: 71, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "印度", value: 66, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "安哥拉", value: 64, event: "发生了大事", url: "src/assets/flags/AO.svg" },
          { name: "南斯拉夫", value: 62, event: "发生了大事", url: "src/assets/flags/nan.svg" },
          { name: "尼泊尔", value: 58, event: "发生了大事", url: "src/assets/flags/NP.svg" },
          { name: "伊朗", value: 58, event: "发生了大事", url: "src/assets/flags/IR.svg" },
        ],
        1976: [
          { name: "俄罗斯", value: 494, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 171, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "朝鲜", value: 122, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "美国", value: 98, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "埃及", value: 91, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "安哥拉", value: 69, event: "发生了大事", url: "src/assets/flags/AO.svg" },
          { name: "罗马尼亚", value: 56, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "阿尔巴尼亚", value: 55, event: "发生了大事", url: "src/assets/flags/AL.svg" },
          { name: "南斯拉夫", value: 49, event: "发生了大事", url: "src/assets/flags/nan.svg" },
          { name: "墨西哥", value: 47, event: "发生了大事", url: "src/assets/flags/MX.svg" },
          { name: "伊朗", value: 46, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "澳大利亚", value: 45, event: "发生了大事", url: "src/assets/flags/AU.svg" },
          { name: "意大利", value: 45, event: "发生了大事", url: "src/assets/flags/IT.svg" },
          { name: "越南", value: 45, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "法国", value: 43, event: "发生了大事", url: "src/assets/flags/FR.svg" },
        ],
        1977: [
          { name: "俄罗斯", value: 405, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 190, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "美国", value: 102, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "朝鲜", value: 95, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "南斯拉夫", value: 59, event: "发生了大事", url: "src/assets/flags/nan.svg" },
          { name: "法国", value: 57, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "苏丹", value: 57, event: "发生了大事", url: "src/assets/flags/SD.svg" },
          { name: "罗马尼亚", value: 55, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "索马里", value: 54, event: "发生了大事", url: "src/assets/flags/SO.svg" },
          { name: "越南", value: 51, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "英国", value: 47, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "伊朗", value: 40, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "埃及", value: 38, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "柬埔寨", value: 34, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "南非", value: 33, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
        ],
        1978: [
          { name: "俄罗斯", value: 732, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 355, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "越南", value: 337, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "美国", value: 214, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "朝鲜", value: 210, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "罗马尼亚", value: 165, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "柬埔寨", value: 142, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "南斯拉夫", value: 119, event: "发生了大事", url: "src/assets/flags/nan.svg" },
          { name: "古巴", value: 117, event: "发生了大事", url: "src/assets/flags/CU.svg" },
          { name: "泰国", value: 92, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "埃及", value: 90, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "伊朗", value: 80, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "索马里", value: 74, event: "发生了大事", url: "src/assets/flags/SO.svg" },
          { name: "法国", value: 69, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "英国", value: 56, event: "发生了大事", url: "src/assets/flags/GB.svg" },
        ],
        1979: [
          { name: "越南", value: 586, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "俄罗斯", value: 436, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 359, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 303, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "伊朗", value: 194, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "柬埔寨", value: 174, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "泰国", value: 165, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "朝鲜", value: 87, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "阿富汗", value: 80, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "英国", value: 77, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "法国", value: 63, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "罗马尼亚", value: 53, event: "发生了大事", url: "src/assets/flags/RO.svg" },
          { name: "埃及", value: 49, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "南斯拉夫", value: 48, event: "发生了大事", url: "src/assets/flags/nan.svg" },
          { name: "古巴", value: 45, event: "发生了大事", url: "src/assets/flags/CU.svg" },
        ],
        1980: [
          { name: "俄罗斯", value: 872, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 517, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "阿富汗", value: 427, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "伊朗", value: 369, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "日本", value: 365, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "越南", value: 271, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "泰国", value: 216, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "伊拉克", value: 197, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "波兰", value: 181, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "柬埔寨", value: 129, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "法国", value: 113, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "印度", value: 109, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "以色列", value: 101, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "英国", value: 98, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "朝鲜", value: 93, event: "发生了大事", url: "src/assets/flags/KP.svg" },
        ],
        1981: [
          { name: "俄罗斯", value: 496, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "美国", value: 459, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 315, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "伊朗", value: 184, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "波兰", value: 172, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "阿富汗", value: 166, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "泰国", value: 166, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "越南", value: 152, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "法国", value: 112, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "柬埔寨", value: 111, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "印度", value: 111, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "以色列", value: 110, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "南非", value: 107, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "埃及", value: 105, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "朝鲜", value: 100, event: "发生了大事", url: "src/assets/flags/KP.svg" },
        ],
        1982: [
          { name: "美国", value: 450, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 312, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "以色列", value: 294, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "俄罗斯", value: 275, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "黎巴嫩", value: 214, event: "发生了大事", url: "src/assets/flags/LB.svg" },
          { name: "阿根廷", value: 175, event: "发生了大事", url: "src/assets/flags/AR.svg" },
          { name: "英国", value: 169, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "伊朗", value: 160, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "伊拉克", value: 146, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "越南", value: 137, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "泰国", value: 119, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "印度", value: 118, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "阿富汗", value: 108, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "法国", value: 104, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "埃及", value: 98, event: "发生了大事", url: "src/assets/flags/EG.svg" },
        ],
        1983: [
          { name: "美国", value: 435, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 309, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 294, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "黎巴嫩", value: 178, event: "发生了大事", url: "src/assets/flags/LB.svg" },
          { name: "越南", value: 151, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "朝鲜", value: 127, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "法国", value: 124, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "乍得", value: 115, event: "发生了大事", url: "src/assets/flags/TD.svg" },
          { name: "以色列", value: 112, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "泰国", value: 110, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "英国", value: 110, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "阿富汗", value: 104, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "柬埔寨", value: 88, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "伊朗", value: 82, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "埃及", value: 79, event: "发生了大事", url: "src/assets/flags/EG.svg" },
        ],
        1984: [
          { name: "美国", value: 461, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 438, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "俄罗斯", value: 218, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "朝鲜", value: 150, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "法国", value: 131, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "黎巴嫩", value: 112, event: "发生了大事", url: "src/assets/flags/LB.svg" },
          { name: "越南", value: 108, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "伊朗", value: 97, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "泰国", value: 95, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "印度", value: 95, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "英国", value: 93, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "伊拉克", value: 81, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "德国", value: 78, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "南非", value: 76, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "巴西", value: 75, event: "发生了大事", url: "src/assets/flags/BR.svg" },
        ],
        1985: [
          { name: "美国", value: 415, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 358, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "南非", value: 221, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "俄罗斯", value: 214, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "朝鲜", value: 132, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "泰国", value: 115, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "越南", value: 114, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "法国", value: 105, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "英国", value: 103, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "黎巴嫩", value: 94, event: "发生了大事", url: "src/assets/flags/LB.svg" },
          { name: "伊拉克", value: 84, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "伊朗", value: 84, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "以色列", value: 81, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "柬埔寨", value: 76, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "阿富汗", value: 65, event: "发生了大事", url: "src/assets/flags/AF.svg" },
        ],
        1986: [
          { name: "美国", value: 388, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "南非", value: 250, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "俄罗斯", value: 225, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 209, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "伊朗", value: 98, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "法国", value: 90, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "英国", value: 90, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "利比亚", value: 87, event: "发生了大事", url: "src/assets/flags/LY.svg" },
          { name: "朝鲜", value: 86, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "伊拉克", value: 82, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "越南", value: 74, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "黎巴嫩", value: 70, event: "发生了大事", url: "src/assets/flags/LB.svg" },
          { name: "以色列", value: 67, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "阿富汗", value: 66, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "泰国", value: 65, event: "发生了大事", url: "src/assets/flags/TH.svg" },
        ],
        1987: [
          { name: "美国", value: 338, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 248, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 222, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "伊朗", value: 219, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "法国", value: 141, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "南非", value: 117, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "伊拉克", value: 115, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "朝鲜", value: 82, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "波兰", value: 80, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "阿富汗", value: 79, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "英国", value: 79, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "巴西", value: 74, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "韩国", value: 72, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "越南", value: 71, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "乍得", value: 70, event: "发生了大事", url: "src/assets/flags/TD.svg" },
        ],
        1988: [
          { name: "美国", value: 528, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 416, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 288, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "伊朗", value: 267, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "伊拉克", value: 174, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "南非", value: 170, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "英国", value: 131, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "阿富汗", value: 123, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "越南", value: 109, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "以色列", value: 106, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "印度", value: 103, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "朝鲜", value: 102, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "法国", value: 102, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "泰国", value: 85, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "巴西", value: 77, event: "发生了大事", url: "src/assets/flags/BR.svg" },
        ],
        1989: [
          { name: "美国", value: 376, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 240, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 225, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "朝鲜", value: 108, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "法国", value: 105, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "英国", value: 96, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "韩国", value: 90, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "伊朗", value: 88, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "南非", value: 83, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "阿富汗", value: 77, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "黎巴嫩", value: 74, event: "发生了大事", url: "src/assets/flags/LB.svg" },
          { name: "巴拿马", value: 70, event: "发生了大事", url: "src/assets/flags/PA.svg" },
          { name: "巴西", value: 69, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "越南", value: 69, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "波兰", value: 61, event: "发生了大事", url: "src/assets/flags/PL.svg" },
        ],
        1990: [
          { name: "美国", value: 373, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 277, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "伊拉克", value: 263, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "日本", value: 262, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "朝鲜", value: 127, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "法国", value: 126, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "南非", value: 121, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "伊朗", value: 120, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "英国", value: 119, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "以色列", value: 112, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "印度", value: 104, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "德国", value: 87, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "沙特阿拉伯", value: 83, event: "发生了大事", url: "src/assets/flags/SA.svg" },
          { name: "印度尼西亚", value: 82, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "泰国", value: 80, event: "发生了大事", url: "src/assets/flags/TH.svg" },
        ],
        1991: [
          { name: "美国", value: 298, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 236, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 209, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "伊拉克", value: 184, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "朝鲜", value: 120, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "法国", value: 110, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "伊朗", value: 100, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "科威特", value: 92, event: "发生了大事", url: "src/assets/flags/KW.svg" },
          { name: "以色列", value: 91, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "南非", value: 84, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "德国", value: 81, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "泰国", value: 72, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "埃及", value: 69, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "柬埔寨", value: 60, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "巴西", value: 57, event: "发生了大事", url: "src/assets/flags/BR.svg" },
        ],
        1992: [
          { name: "美国", value: 332, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 233, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "俄罗斯", value: 166, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "德国", value: 122, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "南非", value: 96, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "法国", value: 94, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "波斯尼亚和黑塞哥维那", value: 91, event: "发生了大事", url: "src/assets/flags/BA.svg" },
          { name: "朝鲜", value: 87, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "以色列", value: 80, event: "发生了大事", url: "src/assets/flags/IL.svg" },
          { name: "伊拉克", value: 70, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "英国", value: 68, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "越南", value: 64, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "巴西", value: 63, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "泰国", value: 63, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "韩国", value: 62, event: "发生了大事", url: "src/assets/flags/KR.svg" },
        ],
        1993: [
          { name: "美国", value: 360, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 250, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "波斯尼亚和黑塞哥维那", value: 189, event: "发生了大事", url: "src/assets/flags/BA.svg" },
          { name: "南非", value: 105, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "俄罗斯", value: 96, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "德国", value: 95, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "巴西", value: 86, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "法国", value: 83, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "韩国", value: 77, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "伊拉克", value: 75, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "泰国", value: 74, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "波兰", value: 71, event: "发生了大事", url: "src/assets/flags/PL.svg" },
          { name: "印度", value: 71, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "英国", value: 66, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "朝鲜", value: 61, event: "发生了大事", url: "src/assets/flags/KP.svg" },
        ],
        1994: [
          { name: "美国", value: 262, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 207, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "波斯尼亚和黑塞哥维那", value: 150, event: "发生了大事", url: "src/assets/flags/BA.svg" },
          { name: "南非", value: 99, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "俄罗斯", value: 89, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "巴西", value: 85, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "德国", value: 85, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "海地", value: 74, event: "发生了大事", url: "src/assets/flags/HT.svg" },
          { name: "泰国", value: 67, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "韩国", value: 64, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "法国", value: 62, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "朝鲜", value: 56, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "印度尼西亚", value: 50, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "埃及", value: 47, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "也门", value: 47, event: "发生了大事", url: "src/assets/flags/YE.svg" },
        ],
        1995: [
          { name: "美国", value: 270, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 241, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "波斯尼亚和黑塞哥维那", value: 208, event: "发生了大事", url: "src/assets/flags/BA.svg" },
          { name: "法国", value: 84, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "俄罗斯", value: 83, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "德国", value: 77, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "南非", value: 76, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "伊朗", value: 74, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "伊拉克", value: 67, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "巴西", value: 66, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "韩国", value: 59, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "英国", value: 53, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "朝鲜", value: 40, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "泰国", value: 40, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "越南", value: 40, event: "发生了大事", url: "src/assets/flags/VN.svg" },
        ],
        1996: [
          { name: "美国", value: 356, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 273, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "波斯尼亚和黑塞哥维那", value: 134, event: "发生了大事", url: "src/assets/flags/BA.svg" },
          { name: "法国", value: 127, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "伊拉克", value: 107, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "俄罗斯", value: 100, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "英国", value: 91, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "朝鲜", value: 79, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "伊朗", value: 78, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "巴西", value: 76, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "韩国", value: 76, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "德国", value: 75, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "泰国", value: 73, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "南非", value: 69, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "以色列", value: 64, event: "发生了大事", url: "src/assets/flags/IL.svg" },
        ],
        1997: [
          { name: "美国", value: 363, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 264, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "法国", value: 91, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "俄罗斯", value: 90, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "南非", value: 77, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "德国", value: 69, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "伊拉克", value: 67, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "泰国", value: 65, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "埃及", value: 60, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "墨西哥", value: 58, event: "发生了大事", url: "src/assets/flags/MX.svg" },
          { name: "英国", value: 58, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "朝鲜", value: 55, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "伊朗", value: 55, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "韩国", value: 53, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "意大利", value: 53, event: "发生了大事", url: "src/assets/flags/IT.svg" },
        ],
        1998: [
          { name: "美国", value: 327, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 228, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "印度尼西亚", value: 111, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "伊拉克", value: 97, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "俄罗斯", value: 87, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "法国", value: 84, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "韩国", value: 82, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "泰国", value: 79, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "伊朗", value: 69, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "南非", value: 64, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "英国", value: 61, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "德国", value: 58, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "印度", value: 57, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "埃及", value: 52, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "朝鲜", value: 43, event: "发生了大事", url: "src/assets/flags/KP.svg" },
        ],
        1999: [
          { name: "美国", value: 239, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 178, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "俄罗斯", value: 76, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "法国", value: 69, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "韩国", value: 63, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "科索沃", value: 61, event: "发生了大事", url: "src/assets/flags/nan.svg" },
          { name: "南非", value: 60, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "印度尼西亚", value: 57, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "巴西", value: 54, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "澳大利亚", value: 53, event: "发生了大事", url: "src/assets/flags/AU.svg" },
          { name: "泰国", value: 48, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "伊拉克", value: 44, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "德国", value: 43, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "英国", value: 42, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "古巴", value: 39, event: "发生了大事", url: "src/assets/flags/CU.svg" },
        ],
        2000: [
          { name: "美国", value: 299, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 239, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "俄罗斯", value: 90, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "澳大利亚", value: 87, event: "发生了大事", url: "src/assets/flags/AU.svg" },
          { name: "老挝", value: 86, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "德国", value: 72, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "韩国", value: 70, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "印度尼西亚", value: 69, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "法国", value: 67, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "伊拉克", value: 60, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "朝鲜", value: 56, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "泰国", value: 55, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "英国", value: 53, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "越南", value: 52, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "印度", value: 50, event: "发生了大事", url: "src/assets/flags/IN.svg" },
        ],
        2001: [
          { name: "美国", value: 233, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 172, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "俄罗斯", value: 78, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "韩国", value: 69, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "印度", value: 66, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "法国", value: 58, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "阿富汗", value: 53, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "德国", value: 53, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "巴西", value: 52, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "南非", value: 52, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "印度尼西亚", value: 48, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "泰国", value: 45, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "朝鲜", value: 44, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "阿根廷", value: 41, event: "发生了大事", url: "src/assets/flags/AR.svg" },
          { name: "巴基斯坦", value: 39, event: "发生了大事", url: "src/assets/flags/PK.svg" },
        ],
        2002: [
          { name: "美国", value: 227, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 156, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "韩国", value: 97, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "俄罗斯", value: 69, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "伊拉克", value: 64, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "德国", value: 52, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "阿富汗", value: 49, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "法国", value: 45, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "泰国", value: 44, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "印度", value: 43, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "印度尼西亚", value: 42, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "巴西", value: 41, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "南非", value: 36, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "伊朗", value: 31, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "越南", value: 30, event: "发生了大事", url: "src/assets/flags/VN.svg" },
        ],
        2003: [
          { name: "美国", value: 233, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "伊拉克", value: 138, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "日本", value: 125, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "法国", value: 76, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "伊朗", value: 56, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "俄罗斯", value: 53, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "韩国", value: 50, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "老挝", value: 46, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "印度", value: 45, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "英国", value: 36, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "德国", value: 33, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "泰国", value: 33, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "印度尼西亚", value: 29, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "巴西", value: 26, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "阿根廷", value: 25, event: "发生了大事", url: "src/assets/flags/AR.svg" },
        ],
        2004: [
          { name: "美国", value: 226, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 144, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "希腊", value: 132, event: "发生了大事", url: "src/assets/flags/GR.svg" },
          { name: "伊拉克", value: 106, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "印度", value: 64, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "俄罗斯", value: 63, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "印度尼西亚", value: 57, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "法国", value: 56, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "伊朗", value: 52, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "巴基斯坦", value: 50, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "朝鲜", value: 48, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "韩国", value: 47, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "德国", value: 46, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "阿富汗", value: 39, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "泰国", value: 39, event: "发生了大事", url: "src/assets/flags/TH.svg" },
        ],
        2005: [
          { name: "美国", value: 262, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 168, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "印度", value: 100, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "印度尼西亚", value: 87, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "俄罗斯", value: 84, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "英国", value: 84, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "韩国", value: 74, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "法国", value: 70, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "伊朗", value: 69, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "伊拉克", value: 67, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "德国", value: 60, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "泰国", value: 54, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "朝鲜", value: 52, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "蒙古", value: 45, event: "发生了大事", url: "src/assets/flags/MN.svg" },
          { name: "巴基斯坦", value: 42, event: "发生了大事", url: "src/assets/flags/PK.svg" },
        ],
        2006: [
          { name: "美国", value: 244, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 157, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "伊朗", value: 131, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "俄罗斯", value: 116, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "韩国", value: 83, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "印度", value: 68, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "中非", value: 68, event: "发生了大事", url: "src/assets/flags/CF.svg" },
          { name: "德国", value: 67, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "印度尼西亚", value: 62, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "法国", value: 57, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "英国", value: 56, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "巴基斯坦", value: 53, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "泰国", value: 52, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "伊拉克", value: 52, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "朝鲜", value: 49, event: "发生了大事", url: "src/assets/flags/KP.svg" },
        ],
        2007: [
          { name: "美国", value: 125, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 88, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "伊朗", value: 75, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "俄罗斯", value: 53, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "伊拉克", value: 48, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "朝鲜", value: 39, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "印度尼西亚", value: 39, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "英国", value: 37, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "法国", value: 30, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "韩国", value: 30, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "印度", value: 30, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "越南", value: 28, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "巴基斯坦", value: 26, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "泰国", value: 26, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "苏丹", value: 25, event: "发生了大事", url: "src/assets/flags/SD.svg" },
        ],
        2008: [
          { name: "美国", value: 218, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 149, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "俄罗斯", value: 103, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "朝鲜", value: 70, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "韩国", value: 63, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "法国", value: 62, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "印度", value: 62, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "伊朗", value: 58, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "泰国", value: 57, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "英国", value: 55, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "德国", value: 54, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "巴基斯坦", value: 52, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "越南", value: 47, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "印度尼西亚", value: 45, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "埃及", value: 40, event: "发生了大事", url: "src/assets/flags/EG.svg" },
        ],
        2009: [
          { name: "美国", value: 245, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 139, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "朝鲜", value: 91, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "韩国", value: 73, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "俄罗斯", value: 70, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "伊朗", value: 61, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "英国", value: 60, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "泰国", value: 54, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "印度", value: 51, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "越南", value: 51, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "阿富汗", value: 50, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "意大利", value: 48, event: "发生了大事", url: "src/assets/flags/IT.svg" },
          { name: "巴基斯坦", value: 43, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "巴西", value: 43, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "伊拉克", value: 41, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
        ],
        2010: [
          { name: "美国", value: 318, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 159, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "俄罗斯", value: 129, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "朝鲜", value: 127, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "韩国", value: 119, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "印度", value: 111, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "伊朗", value: 84, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "阿富汗", value: 75, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "印度尼西亚", value: 70, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "南非", value: 69, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "泰国", value: 68, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "德国", value: 66, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "法国", value: 62, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "巴基斯坦", value: 51, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "英国", value: 49, event: "发生了大事", url: "src/assets/flags/GB.svg" },
        ],
        2011: [
          { name: "美国", value: 376, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 219, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "利比亚", value: 155, event: "发生了大事", url: "src/assets/flags/LY.svg" },
          { name: "俄罗斯", value: 84, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "印度", value: 84, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "英国", value: 82, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "朝鲜", value: 73, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "韩国", value: 72, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "老挝", value: 66, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "泰国", value: 63, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "德国", value: 61, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "叙利亚", value: 56, event: "发生了大事", url: "src/assets/flags/SY.svg" },
          { name: "埃及", value: 55, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "阿富汗", value: 49, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "法国", value: 49, event: "发生了大事", url: "src/assets/flags/FR.svg" },
        ],
        2012: [
          { name: "美国", value: 355, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 193, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "英国", value: 186, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "叙利亚", value: 155, event: "发生了大事", url: "src/assets/flags/SY.svg" },
          { name: "俄罗斯", value: 111, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "伊朗", value: 91, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "老挝", value: 79, event: "发生了大事", url: "src/assets/flags/LA.svg" },
          { name: "朝鲜", value: 66, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "德国", value: 66, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "印度", value: 63, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "埃及", value: 59, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "法国", value: 57, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "泰国", value: 57, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "西班牙", value: 56, event: "发生了大事", url: "src/assets/flags/ES.svg" },
          { name: "韩国", value: 52, event: "发生了大事", url: "src/assets/flags/KR.svg" },
        ],
        2013: [
          { name: "美国", value: 372, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 186, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "俄罗斯", value: 129, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "埃及", value: 116, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "韩国", value: 107, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "德国", value: 94, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "英国", value: 93, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "叙利亚", value: 88, event: "发生了大事", url: "src/assets/flags/SY.svg" },
          { name: "巴西", value: 85, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "法国", value: 84, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "泰国", value: 82, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "印度", value: 74, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "印度尼西亚", value: 68, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "朝鲜", value: 66, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "巴基斯坦", value: 64, event: "发生了大事", url: "src/assets/flags/PK.svg" },
        ],
        2014: [
          { name: "美国", value: 338, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 216, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "俄罗斯", value: 133, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "德国", value: 117, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "英国", value: 85, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "巴西", value: 78, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "法国", value: 75, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "韩国", value: 75, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "印度", value: 74, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "巴基斯坦", value: 71, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "乌克兰", value: 71, event: "发生了大事", url: "src/assets/flags/UA.svg" },
          { name: "阿富汗", value: 64, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "泰国", value: 64, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "伊拉克", value: 56, event: "发生了大事", url: "src/assets/flags/TQ.svg" },
          { name: "印度尼西亚", value: 52, event: "发生了大事", url: "src/assets/flags/ID.svg" },
        ],
        2015: [
          { name: "美国", value: 627, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 280, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 277, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "法国", value: 186, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "英国", value: 179, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "巴基斯坦", value: 170, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "德国", value: 165, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "巴西", value: 147, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "泰国", value: 134, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "阿富汗", value: 133, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "印度尼西亚", value: 125, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "韩国", value: 111, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "希腊", value: 109, event: "发生了大事", url: "src/assets/flags/GR.svg" },
          { name: "印度", value: 104, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "叙利亚", value: 99, event: "发生了大事", url: "src/assets/flags/SY.svg" },
        ],
        2016: [
          { name: "美国", value: 342, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 146, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 134, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "德国", value: 91, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "英国", value: 78, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "法国", value: 77, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "叙利亚", value: 74, event: "发生了大事", url: "src/assets/flags/SY.svg" },
          { name: "阿富汗", value: 71, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "韩国", value: 71, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "印度", value: 65, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "泰国", value: 62, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "巴西", value: 57, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "土耳其", value: 50, event: "发生了大事", url: "src/assets/flags/TR.svg" },
          { name: "伊朗", value: 48, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "埃及", value: 47, event: "发生了大事", url: "src/assets/flags/EG.svg" },
        ],
        2017: [
          { name: "美国", value: 290, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "德国", value: 113, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "俄罗斯", value: 111, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 103, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "英国", value: 83, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "法国", value: 72, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "印度", value: 64, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "叙利亚", value: 54, event: "发生了大事", url: "src/assets/flags/SY.svg" },
          { name: "澳大利亚", value: 50, event: "发生了大事", url: "src/assets/flags/AU.svg" },
          { name: "巴基斯坦", value: 50, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "哈萨克斯坦", value: 48, event: "发生了大事", url: "src/assets/flags/KZ.svg" },
          { name: "巴西", value: 47, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "泰国", value: 46, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "越南", value: 46, event: "发生了大事", url: "src/assets/flags/VN.svg" },
          { name: "韩国", value: 45, event: "发生了大事", url: "src/assets/flags/KR.svg" },
        ],
        2018: [
          { name: "美国", value: 299, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 113, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "德国", value: 97, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "俄罗斯", value: 75, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "法国", value: 71, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "英国", value: 66, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "中非", value: 57, event: "发生了大事", url: "src/assets/flags/CF.svg" },
          { name: "印度", value: 51, event: "发生了大事", url: "src/assets/flags/IN.svg" },
          { name: "南非", value: 49, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
          { name: "印度尼西亚", value: 48, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "叙利亚", value: 43, event: "发生了大事", url: "src/assets/flags/SY.svg" },
          { name: "埃及", value: 41, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "阿富汗", value: 39, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "朝鲜", value: 39, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "泰国", value: 39, event: "发生了大事", url: "src/assets/flags/TH.svg" },
        ],
        2019: [
          { name: "美国", value: 183, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "俄罗斯", value: 69, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "日本", value: 65, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "法国", value: 47, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "德国", value: 42, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "英国", value: 42, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "巴西", value: 40, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "阿拉伯联合酋长国", value: 33, event: "发生了大事", url: "src/assets/flags/AE.svg" },
          { name: "意大利", value: 30, event: "发生了大事", url: "src/assets/flags/IT.svg" },
          { name: "埃及", value: 28, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "古巴", value: 26, event: "发生了大事", url: "src/assets/flags/CU.svg" },
          { name: "新加坡", value: 26, event: "发生了大事", url: "src/assets/flags/SG.svg" },
          { name: "朝鲜", value: 25, event: "发生了大事", url: "src/assets/flags/KP.svg" },
          { name: "巴基斯坦", value: 24, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "南非", value: 24, event: "发生了大事", url: "src/assets/flags/ZA.svg" },
        ],
        2020: [
          { name: "美国", value: 142, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 70, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "德国", value: 59, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "法国", value: 52, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "俄罗斯", value: 43, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "阿富汗", value: 34, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "英国", value: 32, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "中非", value: 28, event: "发生了大事", url: "src/assets/flags/CF.svg" },
          { name: "韩国", value: 26, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "伊朗", value: 26, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "埃及", value: 25, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "沙特阿拉伯", value: 22, event: "发生了大事", url: "src/assets/flags/SA.svg" },
          { name: "泰国", value: 22, event: "发生了大事", url: "src/assets/flags/TH.svg" },
          { name: "印度尼西亚", value: 22, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "古巴", value: 20, event: "发生了大事", url: "src/assets/flags/CU.svg" },
        ],
        2021: [
          { name: "美国", value: 163, event: "发生了大事", url: "src/assets/flags/US.svg" },
          { name: "日本", value: 66, event: "发生了大事", url: "src/assets/flags/JP.svg" },
          { name: "阿富汗", value: 48, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "俄罗斯", value: 41, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "德国", value: 36, event: "发生了大事", url: "src/assets/flags/DE.svg" },
          { name: "埃及", value: 27, event: "发生了大事", url: "src/assets/flags/EG.svg" },
          { name: "巴基斯坦", value: 27, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "巴西", value: 25, event: "发生了大事", url: "src/assets/flags/BR.svg" },
          { name: "印度尼西亚", value: 25, event: "发生了大事", url: "src/assets/flags/ID.svg" },
          { name: "古巴", value: 24, event: "发生了大事", url: "src/assets/flags/CU.svg" },
          { name: "法国", value: 22, event: "发生了大事", url: "src/assets/flags/FR.svg" },
          { name: "中非", value: 21, event: "发生了大事", url: "src/assets/flags/CF.svg" },
          { name: "韩国", value: 20, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "伊朗", value: 20, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "老挝", value: 19, event: "发生了大事", url: "src/assets/flags/LA.svg" },
        ],
        2022: [
          { name: "美国", value: 138, event: "霸权主义 种族主义 疫情乱象 枪支问题 强迫劳动 干涉欧亚内政", url: "src/assets/flags/US.svg" },
          { name: "印度尼西亚", value: 42, event: "中印友好关系 经济复苏 雅万高铁 巴厘岛", url: "src/assets/flags/ID.svg" },
          { name: "法国", value: 36, event: "经济复苏 备战巴黎奥运 就业市场  数字技术助力  可再生能源", url: "src/assets/flags/FR.svg" },
          { name: "日本", value: 35, event: "核污染水排海计划 经济面临多重压力 日元贬值  新一波疫情风险  ", url: "src/assets/flags/JP.svg" },
          { name: "德国", value: 33, event: "施泰因迈尔 电动汽车市场  下调今年经济增长预期", url: "src/assets/flags/DE.svg" },
          { name: "俄罗斯", value: 32, event: "发生了大事", url: "src/assets/flags/RU.svg" },
          { name: "韩国", value: 29, event: "发生了大事", url: "src/assets/flags/KR.svg" },
          { name: "英国", value: 29, event: "发生了大事", url: "src/assets/flags/GB.svg" },
          { name: "巴基斯坦", value: 25, event: "发生了大事", url: "src/assets/flags/PK.svg" },
          { name: "阿拉伯联合酋长国", value: 24, event: "发生了大事", url: "src/assets/flags/AE.svg" },
          { name: "柬埔寨", value: 24, event: "发生了大事", url: "src/assets/flags/KH.svg" },
          { name: "伊朗", value: 24, event: "发生了大事", url: "src/assets/flags/IR.svg" },
          { name: "阿富汗", value: 22, event: "发生了大事", url: "src/assets/flags/AF.svg" },
          { name: "沙特阿拉伯", value: 21, event: "发生了大事", url: "src/assets/flags/SA.svg" },
          { name: "巴西", value: 19, event: "发生了大事", url: "src/assets/flags/BR.svg" },
        ],
      },
      historyBlocks: [
        {
          bgClass: 'bg-46',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1946 - 1949',
          title: '',
          timelineYears: ['1946', '1947', '1948', '1949']
        },
        {
          bgClass: 'bg-50',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1950 - 1959',
          title: '',
          timelineYears: ['1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959']
        },
        {
          bgClass: 'bg-60',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1960 - 1969',
          title: '',
          timelineYears: ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969']
        },
        {
          bgClass: 'bg-70',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1970 - 1979',
          title: '',
          timelineYears: ['1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979']
        },
        {
          bgClass: 'bg-80',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1980 - 1989',
          title: '',
          timelineYears: ['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989']
        },
        {
          bgClass: 'bg-90',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '1990 - 1999',
          title: '',
          timelineYears: ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999']
        },
        {
          bgClass: 'bg-00',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '2000 - 2009',
          title: '',
          timelineYears: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009']
        },
        {
          bgClass: 'bg-10',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '2010 - 2019',
          title: '',
          timelineYears: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2009']
        },
        {
          bgClass: 'bg-20',
          width: 300,
          titleWidth: 260,
          timelineVisible: false,
          year: '2020 - 2022',
          title: '',
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
    handleClick(year) {
      console.log(year)
      this.yeardata = year;
      this.selectedData = this.dataByYear[year];
    },
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
a {
  text-decoration: none;
}

.block {
  margin-top: 20px;
}

.mainmap {
  margin-bottom: 60px;
  margin-top: 120px;
}

.demo-collapse {
  height: 570px;
}

body {
  background: #ddd;
}

#container {
  height: 120px;
  width: 98%;
  background-color: #ddd;
  overflow: hidden;
  position: fixed;
  top: 10px;
  left: 10px;
  /* overflow-x: scroll; */
  margin-bottom: 0em;
  display: inline-block;
  z-index: 100;
}

#thumbs {
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
  font-size: 60px;
  font-weight: 100;
  color: #FFF;
  cursor: pointer;
  box-shadow: 2px 5px 20px rgba(0, 0, 0, 0.8);
  transition: width 0.2s;
}

.no-margin-right {
  margin-right: null;
}

.cover {
  width: 100%;
  height: 100%;
  transition: background .5s;
  background: rgba(0, 0, 0, 0.8);
}

.cover:hover {
  width: 100%;
  height: 100%;
  transition: background .5s;
  background: rgba(0, 0, 0, 0.8);
}

.year {
  position: absolute;
  top: 0px;
  font-size: 30px;
  font-weight: 500;
  margin: 20px 30px;
}

.title {
  position: absolute;
  display: block;
  width: 200px;
  top: 50px;
  font-size: 15px;
  margin: 20px;
  text-align: left;
  white-space: normal;
  transition: width 0.2s;
}

.timeline {
  display: block;
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
  position: relative;
}

.timeline ul li:before {
  /* font-family: FontAwesome;
  font-style: normal;
  font-weight: normal; */
  border-color: rgba(255, 255, 255, 0.5);
  border: 1px solid;
  content: ' ';
  position: absolute;
  /* 控制圆形的垂直位置，写死高度 */
  bottom: -11px;
  /* margin-left: 10px; */
  transition: all 0.5s;
    /* 水平居中 */
  left: 50%;
  transform: translateX(-50%);
  height: 5px;
  width: 5px;
  border-radius: 50%;
}

.timeline ul li:after {
  content: '';
  position: absolute;
  /* 控制方框的高度，写死 */
  bottom: -9px;
  /* margin-left: -10px; */
  width: 36px;
  height: 2px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.5s;
  /* 水平居中 */
  left: 50%;
  transform: translateX(-50%);
}

.timelineYear,
.timelineYear:hover {
  text-decoration: none;
  color: #fff;
  transition: all 0.8s;
}

.timeline ul li:hover:before {
  /* content: '\f111'; */
  color: #ffffff;
  /* font-size: 18px; */
  /* transition: all 0.5s; */
  /* top: 29px; */
  /* margin-left: 9px */
}

.timeline ul li:hover:after {
  /* content: ''; */
  /* position: absolute; */
  /* top: 40px; */
  /* margin-left: -10px; */
  /* width: 36px; */
  /* height: 2px; */
  border: 1px solid #fff;
  /* transition: all 0.5s; */
}

.timeline ul li:hover .timelineYear {
  position: static;
  top: -10px;
}


.bg-66 {
  /* 背景图片 后面自己设计background: url(http://www.unido.org/uploads/tx_templavoila/history_07.jpg); */
  background-size: cover;
}

.bg-76 {
  /* background: url(http://austria-forum.org/attach/Wissenssammlungen/Bibliothek/Wien_mit_den_Augen_des_Adlers/Wien_der_Moderne/UNO-City,_Austria_Center_Vienna/dkaiser_hav_25.jpg); */
  background-size: cover;
}

.bg-86 {
  /* background: url('https://upload.wikimedia.org/wikipedia/commons/e/e8/Power_Plant_(Tianjin,_China).jpg'); */
  background-size: cover;
}

.bg-96 {
  /* background: url(http://www.oxfordbusinessgroup.com/sites/default/files/styles/chapter_header__710x233_/public/chapter_headers/ind1_2.png?itok=uxI_081i&c=af7608f5f35cf219c326e9b6e6a7d34c); */
  background-size: cover;
}

.bg-06 {
  /* background: url(http://www.3adi.org/tl_files/3ADIDocuments/Pictures/Greenshot_2014-01-08_18-32-54.jpg); */
  background-size: cover;
}

.bg-16 {
  /* background: url(https://i.dailymail.co.uk/i/pix/2012/07/23/article-0-142DF918000005DC-387_468x665.jpg); */
  background-size: cover;
}

.map {
  flex: 1;
}

#container {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
  