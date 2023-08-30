<script>
import { UploadFilled } from '@element-plus/icons-vue'
import ColorThief from 'colorthief'
import $ from 'jquery'

export default {
  components: {
    UploadFilled,
  },
  data() {
    return {
      uploaded: false,
      imageData: '',
      palette: [],
    };
  },
  methods: {
    handleUpload(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        this.imageData = reader.result;
        this.uploaded = true;
      };
    },
    getColorPalette() {
      const colorThief = new ColorThief();
      const img = new Image();
      img.src = this.imageData;
      this.palette = colorThief.getPalette(img, 8);
    },
    rgb2hex(rgb) {
      return '#' + rgb.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
    },
  },
}
</script>
<template>
  <div>
    <div v-if="uploaded" style="display: flex; align-items: flex-end; flex-direction: row;">
      <div style="width:60%">
        <img :src="imageData" style="max-width: 100%; max-height: 400px;" />
      </div>
      <div
        style="margin: 20px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
        <el-button type="danger" @click="uploaded = false; palette = []" class="button">清除图片</el-button>
        <el-button type="primary" @click="getColorPalette" class="button">提取色卡</el-button>
      </div>
      <table style="margin: 20px;">
        <tr v-for="color in palette" style="width: 6em; text-align: center;">
          <td>
            <el-tooltip content="点击复制颜色代码" placement="left">
              <el-button
                :style="{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`, width: '30px', height: '30px', display: 'inline-block' }"
                @click="copyToClipboard(rgb2hex(color))">
              </el-button>
            </el-tooltip>
          </td>
          <td style="width: 6em; text-align: center;">
            {{ rgb2hex(color) }}
          </td>
        </tr>
      </table>
    </div>
    <el-upload class="upload-demo" drag :show-file-list="false" :auto-upload="false" :on-change="handleUpload" v-else>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将要用作参考的图片拖动至此或 <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png 文件
        </div>
      </template>
    </el-upload>
  </div>
</template>
<style scoped>
.button {
  margin: 10px;
  width: 6em;
}
</style>
