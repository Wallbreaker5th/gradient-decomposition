<script>
export default {
  props: {
    title: {
      type: String,
      default: "层 0"
    },
  },
}
</script>
<template>
  <el-card class="single-layer">
    <div style="flex-direction: row; display: flex; align-items: center;">
      <div style="margin-right: 20px; width: 3em;">
        <h3>{{title}}</h3>
      </div>
      <!-- slot -->
      <div style="flex-grow: 1;">
        <slot></slot>
      </div>
    </div>
  </el-card>
</template>
<style scoped>
.single-layer {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  max-width: 950px;
}
</style>
