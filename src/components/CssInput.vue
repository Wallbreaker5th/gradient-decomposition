<script>
import { ref } from 'vue';
import { rgb2hex, rgb2rgba } from '../utils/rgb';
import rgba from 'color-rgba';
import CheatSheet from './CheatSheet.vue';

export default {
  components: {
    CheatSheet,
  },
  props: {
    modelValue: {},
    palette: {
      default: () => ref([]),
    }
  },
  data() {
    return {
      code: '',
      gradientTypes: [
        {
          type: 'linear-gradient',
          name: '线性渐变',
          example: 'linear-gradient(to right, #000 0%, #fff 100%)',
        },
        {
          type: 'radial-gradient',
          name: '径向渐变',
          example: 'radial-gradient(at 50% 50%, #000 0%, #fff 100%)',
        },
        {
          type: 'repeating-linear-gradient',
          name: '重复线性渐变',
          example: 'repeating-linear-gradient(to right, #000 0px, #fff 5px, #000 10px)',
        },
        {
          type: 'repeating-radial-gradient',
          name: '重复径向渐变',
          example: 'repeating-radial-gradient(at 50% 50%, #000 0px, #fff 5px, #000 10px)',
        },
        {
          type: 'conic-gradient',
          name: '锥形渐变',
          example: 'conic-gradient(from 0deg, #000 0%, #fff 100%)',
        }
      ]
    }
  },
  emits: ['update:modelValue'],
  methods: {
    decompose(css) {
      // css is a string

      // preserve the content before the first `;`
      let background = css.split(';')[0];

      // separate the background into an array of strings
      // separated by the outermost `,`
      // e.g. "linear-gradient(135deg,rgba(31,175,255,0.3) 20%,transparent 22%),linear-gradient(to right,transparent 83%,rgba(31,175,255,0.3%) 85%),linear-gradient(to bottom,#83708D,#FCEDE6 30%,#FCEDE6 70%,#FFE4C7)" -> ["linear-gradient(135deg,rgba(31,175,255,0.3) 20%,transparent 22%)", "linear-gradient(to right,transparent 83%,rgba(31,175,255,0.3%) 85%)", "linear-gradient(to bottom,#83708D,#FCEDE6 30%,#FCEDE6 70%,#FFE4C7)"]

      let result = [];

      // enumerate through the array, counting the number of brackets
      let bracketCount = 0;
      let lastCommaIndex = 0;
      for (let i = 0; i < background.length; i++) {
        if (background[i] == '(') {
          bracketCount++;
        } else if (background[i] == ')') {
          bracketCount--;
        } else if (background[i] == ',' && bracketCount == 0) {
          result.push(background.substring(lastCommaIndex, i));
          lastCommaIndex = i + 1;
        }
      }
      if (lastCommaIndex < background.length) {
        result.push(background.substring(lastCommaIndex, background.length));
      }

      // strip the leading and trailing spaces
      for (let i = 0; i < result.length; i++) {
        result[i] = result[i].trim();
      }

      return {
        background: result,
        extra: css.split(';').slice(1).map(x => x.trim()).join(';\n')
      }
    },
    combine(cssList) {
      return cssList.background.join(',\n') + ';\n' + cssList.extra;
    },
    resetCode() {
      this.code = this.combine(this.modelValue);
    },
    insertCode(c) {
      let input = document.getElementById('input');
      let cursorLeft = input.selectionStart;
      let cursorRight = input.selectionEnd;
      let left = this.code.substring(0, cursorLeft);
      let middle = this.code.substring(cursorLeft, cursorRight);
      let right = this.code.substring(cursorRight, this.code.length);
      // if c is a string, replace the selected text with c
      // if c is an array of length 2, replace the selected text with c[0] + selected text + c[1]
      if (typeof c == 'string') {
        input.value = left + c + right;
        input.selectionStart = cursorLeft + c.length;
        input.selectionEnd = cursorLeft + c.length;
      } else if (c.length == 2) {
        input.value = left + c[0] + middle + c[1] + right;
        input.selectionStart = cursorLeft + c[0].length;
        input.selectionEnd = cursorLeft + c[0].length + middle.length;
      }
      this.value = input.value;
      input.focus();
    },
    replaceColorWithRGBA() {
      let input = document.getElementById('input');
      let cursorLeft = input.selectionStart;
      let cursorRight = input.selectionEnd;
      let left = this.code.substring(0, cursorLeft);
      let middle = this.code.substring(cursorLeft, cursorRight);
      let right = this.code.substring(cursorRight, this.code.length);
      let color = rgba(middle);
      if (color.length == 4) {
        input.value = left + rgb2rgba(color.slice(0, 3), color[3]) + right;
        input.selectionStart = cursorLeft;
        input.selectionEnd = cursorLeft + rgb2rgba(color.slice(0, 3), color[3]).length;
      }
      this.value = input.value;
      input.focus();
    }
  },
  computed: {
    decomposedCss() {
      return this.decompose(this.value);
    },
    value: {
      get() {
        return this.code;
      },
      set(value) {
        this.code = value;
        this.$emit('update:modelValue', this.decompose(value));
      }
    },
    colors() {
      let res = [
        {
          code: "transparent",
          color: 'rgba(255, 255, 255, 0)'
        },
        {
          code: "white",
          color: '#ffffff'
        },
        {
          code: "black",
          color: '#000000'
        },
      ];
      for (let i = 0; i < this.palette.length; i++) {
        res.push({
          code: rgb2hex(this.palette[i]),
          color: rgb2hex(this.palette[i])
        });
      }
      for (let i = 0; i < this.palette.length; i++) {
        res.push({
          code: rgb2rgba(this.palette[i], 0.5),
          color: rgb2rgba(this.palette[i], 0.5)
        });
      }
      return res;
    },
  },
  mounted() {
    this.resetCode();
  },
}
</script>

<template>
  <div class="css-input">
    <div style="flex-grow: 1">
      <p>在此输入渐变色的 CSS 代码</p>
      <pre>background: </pre>
      <el-input v-model="value" type="textarea" style="font-family: monospace" :autosize="{ minRows: 3, maxRows: 20 }"
        id="input"></el-input>
      <el-collapse>
          <el-collapse-item title="CheatSheet" style="width: 800px;">
            <CheatSheet @click:insert-code="insertCode"></CheatSheet>
          </el-collapse-item>
      </el-collapse>
    </div>
    <div class="tools" style="display: flex; flex-direction: column; justify-content: flex-start;">
      <el-button type="danger" @click="resetCode" size="small">整理代码</el-button>
      <el-collapse style="width: 140px;">
        <el-collapse-item title="插入颜色">
          <!-- <el-color-picker @click="insertCode('transparent')" v-model="transparent" show-alpha
            size="small"></el-color-picker> -->
          <div>
            <div v-for="color in colors" style="display: inline-block;">
              <el-button @click="insertCode(color.code)" size="small"
                :style="{ background: `linear-gradient(${color.color}, ${color.color}), linear-gradient(45deg, #ddd 25%, white 25%, white 50%, #ddd 50%, #ddd 75%, white 75%)` }"></el-button>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="插入渐变">
          <div>
            <div v-for="gradient in gradientTypes" style="display: inline-block;">
              <el-button @click="insertCode([gradient.type + '(', ')'])" size="small" :title="gradient.name"
                :style="{ background: gradient.example }"></el-button>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="其他工具">
          <div>
            <el-button @click="replaceColorWithRGBA" size="small" title="将选中颜色变为 RGBA">RGBA</el-button>
            <el-button @click="insertCode(['calc(', ' + 1px)'])" size="small" title="将选中位置后移一像素">抗锯齿</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style scoped>
.css-input {
  display: flex;
  flex-direction: row;
}

.css-input .tools {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
