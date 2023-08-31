<script>
import SingleLayer from './SingleLayer.vue';
import ColoredBox from './ColoredBox.vue';
import LayerCard from './LayerCard.vue';
import CssInput from './CssInput.vue';

export default {
  components: {
    SingleLayer,
    ColoredBox,
    LayerCard,
    CssInput,
  },
  props: {
    palette: {
      default: () => ref([]),
    }
  },
  data() {
    return {
      // css: "radial-gradient(at 50% 50%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.4)),linear-gradient(to right,transparent 45%,#000 45%,#000 55%,transparent 55%),linear-gradient(to right top, #fcff75 50%, #8af4ff calc(50% + 1px));color:#FFF",
      css: {
        background: [
          "radial-gradient(at 50% 50%,rgba(0,0,0,0) 40%,rgba(0,0,0,0.4))",
          "linear-gradient(to right,transparent 45%,#000 45%,#000 55%,transparent 55%)",
          "linear-gradient(to right top, #fcff75 50%, #8af4ff calc(50% + 1px))"
        ],
        extra: "color:#FFF"
      },
      width: 442,
      height: 20,
      borderwidth: 2,
      bordercolor: "#000000",
      borderRadius: 10,
      background: "#eeeeee",
      exampleText: "演唱",
      index: 0,
      isDisplayed: []
    };
  },
  methods: {
    onInputUpdated() {
      let old_length = this.isDisplayed.length;
      let new_length = this.css.background.length;
      while (old_length < new_length) {
        this.isDisplayed.push(true);
        old_length++;
      }
      while (old_length > new_length) {
        this.isDisplayed.pop();
        old_length--;
      }
    },
    displayAll() {
      for (let i = 0; i < this.isDisplayed.length; i++) {
        this.isDisplayed[i] = true;
      }
    },
    hideAll() {
      for (let i = 0; i < this.isDisplayed.length; i++) {
        this.isDisplayed[i] = false;
      }
    }
  },
  computed: {
    decomposedBackground() {
      let result = [];
      for (let i = 0; i < this.css.background.length; i++) {
        result.push({
          css: this.css.background[i],
          index: i + 1
        });
      }
      return result;
    },
    extraCss() {
      // all after the first `;`
      // trim the leading and trailing spaces of each part
      return this.css.extra;
    },
    combinedBackground() {
      let decomposed = this.css.background;
      let result = [];
      for (let i = 0; i < decomposed.length; i++) {
        if (this.isDisplayed[i]) {
          result.push(decomposed[i]);
        }
      }
      if (result.length == 0) {
        result = "transparent";
      } else {
        result = result.join(',\n');
      }
      return result;
    },
  },
  mounted() {
    this.onInputUpdated();
  }
}

</script>

<template>
  <!-- A input box -->
  <div>
    <p>在此输入渐变色的 CSS 代码</p>

    <CssInput v-model="css" @input="onInputUpdated()" :palette="palette"></CssInput>

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

    <div v-if="decomposedBackground.length == 0">
      <p>请在上方输入 CSS 代码</p>
    </div>
    <div v-else>
      <LayerCard title="总">
        <div style="display:flex; flex-direction: row; align-items: center; justify-content: space-between;">
          <ColoredBox :css="combinedBackground" :width="width" :height="height" :borderwidth="borderwidth"
            :bordercolor="bordercolor" :borderRadius="borderRadius" :background="background" :extraCss="extraCss"
            :exampleText="exampleText">
          </ColoredBox>
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <el-button type="primary" @click="displayAll()" style="margin: 5px 5px;" size="small">全部显示</el-button>
            <el-button type="primary" @click="hideAll()" style="margin: 5px 5px;" size="small">全部隐藏</el-button>
          </div>
        </div>
      </LayerCard>
      <SingleLayer v-for="layer in decomposedBackground" :css="layer.css" :index="layer.index" :key="layer.index"
        :extraCss="extraCss" :width="width" :height="height" :borderwidth="borderwidth" :bordercolor="bordercolor"
        :borderRadius="borderRadius" :background="background" :exampleText="exampleText">
        <el-switch v-model="isDisplayed[layer.index - 1]" active-text="显示" inactive-text="隐藏" inline-prompt></el-switch>
      </SingleLayer>
      <LayerCard title="其他">
        <pre style="break-word: break-all; white-space: pre-wrap;">{{ extraCss }}</pre>
      </LayerCard>
    </div>
  </div>
</template>
