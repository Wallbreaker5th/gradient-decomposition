<template>
  <div>
    <h1 class="title"> 渐变分解 </h1>

    <p>
      <s>众所周知，</s>萌娘百科中文歌声合成专区编辑团队常常在条目中使用 CSS 整花活。该工具可以将 CSS 背景分解为多个图层，方便观察和编辑。
    </p>

    <el-divider></el-divider>

    <LayersDisplay></LayersDisplay>

    <el-divider></el-divider>

    <p>
      Powered by <a href="https://vuejs.org/">Vue.js</a> and <a href="https://element-plus.org/">Element Plus</a>.

      <br>

      Made by <a href="https://zh.moegirl.org.cn/User:%E7%A0%B4%E5%A3%81%E4%BA%BA%E4%BA%94%E5%8F%B7">破壁人五号</a>.

      <br>

      Special thanks to <a href="https://zh.moegirl.org.cn/User:%E7%A9%BA%E7%BF%8A/%E8%90%8C%E7%99%BEVC%E7%BC%96%E8%BE%91%E5%9B%A2%E9%98%9F">萌娘百科中文歌声合成专区编辑团队</a>
    </p>
  </div>
</template>

<script>
import LayersDisplay from './components/LayersDisplay.vue';

export default {
  components: {
    LayersDisplay
  }
}

</script>

<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
