<template>
  <div>
    <h1 class="title"> 渐变分解 </h1>

    <p>
      <s>众所周知，</s>萌娘百科中文歌声合成专区编辑团队常常在条目中使用 CSS 整花活。该工具可以将 CSS 背景分解为多个图层，方便观察和编辑。
    </p>

    <el-divider></el-divider>

    <ReferencePicture @update:palette="updatePalette"></ReferencePicture>

    <el-divider></el-divider>

    <el-checkbox v-model="triple">三套配色</el-checkbox>

    <div :style="{ display: triple ? 'block' : 'none' }">
      <TripleBox :palette="palette" :css="css"></TripleBox>
      <el-tabs>
        <el-tab-pane label="上">
          <LayersDisplay :palette="palette" @update:css="css[0] = $event"></LayersDisplay>
        </el-tab-pane>
        <el-tab-pane label="中">
          <LayersDisplay :palette="palette" @update:css="css[1] = $event"></LayersDisplay>
        </el-tab-pane>
        <el-tab-pane label="下">
          <LayersDisplay :palette="palette" @update:css="css[2] = $event"></LayersDisplay>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div :style="{ display: triple ? 'none' : 'block' }">
      <LayersDisplay :palette="palette" @update:css="css[0] = $event"></LayersDisplay>
    </div>

    <el-divider></el-divider>

    <p>
      Powered by <a href="https://vuejs.org/">Vue.js</a> + <a href="https://element-plus.org/">Element Plus</a> + <a href="https://github.com/lokesh/color-thief">Color Thief</a>.

      <br>

      Made by <a href="https://zh.moegirl.org.cn/User:%E7%A0%B4%E5%A3%81%E4%BA%BA%E4%BA%94%E5%8F%B7">破壁人五号</a>.

      <br>

      Special thanks to <a href="https://zh.moegirl.org.cn/User:%E7%A9%BA%E7%BF%8A/%E8%90%8C%E7%99%BEVC%E7%BC%96%E8%BE%91%E5%9B%A2%E9%98%9F">萌娘百科中文歌声合成专区编辑团队</a>
    </p>
  </div>
</template>

<script>
import LayersDisplay from './components/LayersDisplay.vue';
import ReferencePicture from './components/ReferencePicture.vue';
import TripleBox from './components/TripleBox.vue';

export default {
  components: {
    LayersDisplay,
    ReferencePicture,
    TripleBox,
  },
  data() {
    return {
      palette: [],
      triple: false,
      css: ['', '', ''],
    };
  },
  methods: {
    updatePalette(value) {
      this.palette = value;
    },
  },
}

</script>

<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
