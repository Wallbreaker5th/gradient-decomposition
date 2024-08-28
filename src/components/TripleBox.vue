<script>
export default {
  props: {
    css: {
      type: Array,
      default: ["#66ccff", "#66ccff", "#66ccff"]
    },
  }
}
</script>

<template>
  <div style="background-color: #fdfdfd; font-size: 14px;">
    <table align="center">
      <tr>
        <td :style="'background:' + css[0]" class="colored-td">
          <span style="display:inline-block;">
            <b> 演唱 </b>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          演唱
        </td>
      </tr>
      <tr>
        <td :style="'background:' + css[1]" class="colored-td">
          <span style="display:inline-block;">
            <b> UP主 </b>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          UP主
        </td>
      </tr>
      <tr>
        <td :style="'background:' + css[2]" class="colored-td">
          <span style="display:inline-block;">
            <b> 链接 </b>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          链接
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
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

.colored-td {
  font-size: 12px;
  padding: 2px;
  border: 2px;
  border-style: solid;
  border-radius: 10px;
}

b {
  font-weight: bold;
}
</style>
