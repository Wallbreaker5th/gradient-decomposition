<script>
import SingleLayer from './SingleLayer.vue';
import ColoredBox from './ColoredBox.vue';
import LayerCard from './LayerCard.vue';

export default {
  components: {
    SingleLayer,
    ColoredBox,
    LayerCard,
  },
  data() {
    return {
      css: "radial-gradient(at 50% 50%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.4)),linear-gradient(to right,transparent 45%,#000 45%,#000 55%,transparent 55%),linear-gradient(to right top, #fcff75 50%, #8af4ff calc(50% + 1px));color:#FFF",
      width: 442,
      height: 20,
      borderwidth: 2,
      bordercolor: "#000000",
      borderRadius: 10,
      background: "#eeeeee",
      exampleText: "演唱",
      index: 0,
    };
  },
  methods: {
    decompose(css) {
      // css is a string

      // preserve the content before the first `;`
      css = css.split(';')[0];

      // separate the css into an array of strings
      // separated by the outermost `,`
      // e.g. "linear-gradient(135deg,rgba(31,175,255,0.3) 20%,transparent 22%),linear-gradient(to right,transparent 83%,rgba(31,175,255,0.3%) 85%),linear-gradient(to bottom,#83708D,#FCEDE6 30%,#FCEDE6 70%,#FFE4C7)" -> ["linear-gradient(135deg,rgba(31,175,255,0.3) 20%,transparent 22%)", "linear-gradient(to right,transparent 83%,rgba(31,175,255,0.3%) 85%)", "linear-gradient(to bottom,#83708D,#FCEDE6 30%,#FCEDE6 70%,#FFE4C7)"]

      let result = [];

      // enumerate through the array, counting the number of brackets
      let bracketCount = 0;
      let lastCommaIndex = 0;
      for (let i = 0; i < css.length; i++) {
        if (css[i] == '(') {
          bracketCount++;
        } else if (css[i] == ')') {
          bracketCount--;
        } else if (css[i] == ',' && bracketCount == 0) {
          result.push(css.substring(lastCommaIndex, i));
          lastCommaIndex = i + 1;
        }
      }
      if (lastCommaIndex < css.length) {
        result.push(css.substring(lastCommaIndex, css.length));
      }

      // strip the leading and trailing spaces
      for (let i = 0; i < result.length; i++) {
        result[i] = result[i].trim();
      }

      return result;
    },
  },
  computed: {
    decomposedCss() {
      let result = [];
      for (let i = 0; i < this.decompose(this.css).length; i++) {
        result.push({
          css: this.decompose(this.css)[i],
          index: i + 1
        });
      }
      return result;
    },
    extraCss() {
      // all after the first `;`
      // trim the leading and trailing spaces of each part
      return this.css.split(';').slice(1).map(x => x.trim()).join(';\n');
    }
  }
}

</script>

<template>
  <!-- A input box -->
  <div>
    <p>在此输入渐变色的 CSS 代码</p>

    <pre>background: </pre>
    <el-input v-model="css" type="textarea" placeholder="CSS 代码" style="font-family: monospace"></el-input>

    <el-collapse>
      <el-collapse-item title="更多设置">
        <el-form>
          <el-form-item label="宽度">
            <el-input-number v-model="width" :min="0" :max="1000" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="高度">
            <el-input-number v-model="height" :min="0" :max="1000" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="边框粗细">
            <el-input-number v-model="borderwidth" :min="0" :max="1000" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="边框圆角">
            <el-input-number v-model="borderRadius" :min="0" :max="1000" :step="1"></el-input-number>
          </el-form-item>

          <el-form-item label="边框颜色">
            <el-color-picker v-model="bordercolor"></el-color-picker>
          </el-form-item>
          <el-form-item label="背景颜色">
            <el-color-picker v-model="background"></el-color-picker>
          </el-form-item>
          <el-form-item label="示例文字">
            <el-input v-model="exampleText"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <el-divider></el-divider>

    <div v-if="decomposedCss.length == 0">
      <p>请在上方输入 CSS 代码</p>
    </div>
    <div v-else>
      <LayerCard title="总">
        <ColoredBox :css="css.split(';')[0]" :width="width" :height="height" :borderwidth="borderwidth"
          :bordercolor="bordercolor" :borderRadius="borderRadius" :background="background" :extraCss="extraCss"
          :exampleText="exampleText">
        </ColoredBox>
      </LayerCard>
      <SingleLayer v-for="layer in decomposedCss" :css="layer.css" :index="layer.index"
        :key="layer.index" :extraCss="extraCss" :width="width" :height="height" :borderwidth="borderwidth"
        :bordercolor="bordercolor" :borderRadius="borderRadius" :background="background" :exampleText="exampleText">
      </SingleLayer>
      <LayerCard title="其他">
        <pre style="break-word: break-all; white-space: pre-wrap;">{{ extraCss }}</pre>
      </LayerCard>
    </div>
  </div>
</template>
