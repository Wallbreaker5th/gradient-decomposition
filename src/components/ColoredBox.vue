<script>
export default {
  props: {
    css: {
      type: String,
      default: "#66ccff"
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
    }
  },
  computed: {
    frontStyle() {
      return {
        width: this.width + "px",
        height: this.height + "px",
        border: this.borderwidth + "px solid " + this.bordercolor,
        borderRadius: this.borderRadius + "px",
        background: this.css,
      }
    },
    backStyle() {
      return {
        width: this.width + 16 + "px",
        height: this.height + 16 + "px",
        borderRadius: this.borderRadius + 8 + "px",
        backgroundColor: this.background,
      }
    }
  },
}
</script>

<template>
  <div>
    <div :style="backStyle" style="font-size: 14px;" class="back">
      <table align="center">
        <tr>
          <td :style="[frontStyle, extraCss]" class="front">
            <span style="display:inline-block;">
              <b>{{ exampleText }}</b>
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* front should lay at the center */
.back {
  display: flex;
  justify-content: center;
  align-items: center;
}

.front {
  font-size: 12px;
  padding: 2px;
  border: 2px;
  border-style: solid;
  border-radius: 10px;
  background: #FFFFFF;
  color: #000000;
}

table {
  font-size: 89%;
  text-align: center;
  line-height: 1.3em;
  margin: auto;
  border-collapse: separate !important;
  display: table;
  width: 100% !important;
  max-width: 450px;
  border-spacing: 2px;
}

b{
  font-weight: bold;
}
</style>
