<script>
import { ElCard } from 'element-plus';
import ColoredBox from './ColoredBox.vue';
import LayerCard from './LayerCard.vue';

export default {
  components: {
    ElCard,
    ColoredBox,
    LayerCard,
    LayerCard
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
  <div>
    <LayerCard :title="`层 ${index}`">
      <pre style="break-word: break-all; white-space: pre-wrap;">{{css}}</pre>
      <ColoredBox :css="css" :width="width" :height="height" :borderwidth="borderwidth" :bordercolor="bordercolor"
        :borderRadius="borderRadius" :background="background" :extraCss="extraCss" :exampleText="exampleText">
      </ColoredBox>
    </LayerCard>
  </div>
</template>
