<script>
export default {
  props: ['modelValue'],
  data() {
    return {
      code: '',
    }
  },
  emits: ['update:modelValue'],
  methods: {
    decompose(css) {
      // css is a string

      // preserve the content before the first `;`
      background = css.split(';')[0];

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
    }
  },
  mounted() {
    this.resetCode();
  },
}
</script>

<template>
  <div class="css-input">
    <div style="flex-grow: 1">
      <pre>background: </pre>
      <el-input v-model="value" type="textarea" style="font-family: monospace"
        autosize="{ minRows: 3, maxRows: 20 }"></el-input>
    </div>
    <div class="tools">
      <el-button type="danger" @click="resetCode" size="small">整理代码</el-button>
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
