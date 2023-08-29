<script>
import { ElCard } from 'element-plus';
import ColoredBox from './ColoredBox.vue';

export default {
  components: {
    ElCard,
    ColoredBox
  },
  props: {
    css: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 442
    },
    height: {
      type: Number,
      default: 20
    },
    borderwidth: {
      type: Number,
      default: 2
    },
    bordercolor: {
      type: String,
      default: "#000000"
    },
    borderRadius: {
      type: Number,
      default: 10
    },
    background: {
      type: String,
      default: "#eeeeee"
    },
    extraCss: {
      type: String,
      default: ""
    },
    exampleText: {
      type: String,
      default: "演唱"
    },
    index: {
      type: Number,
      default: 0
    },
  },
}
</script>
<template>
  <div class="single-layer">
    <el-card>
      <div style="flex-direction: row; display: flex; align-items: center;">
        <div style="margin-right: 20px; width: 3em;">
          <h3>层 {{ index }}</h3>
        </div>
        <div>
          <pre>{{ css }}</pre>
          <ColoredBox :css="css" :width="width" :height="height" :borderwidth="borderwidth" :bordercolor="bordercolor"
            :borderRadius="borderRadius" :background="background" :extraCss="extraCss" :exampleText="exampleText">
          </ColoredBox>
        </div>
      </div>
    </el-card>
  </div>
</template>
<style scoped>
.single-layer {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
