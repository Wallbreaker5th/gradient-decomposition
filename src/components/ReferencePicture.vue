<script>
import { UploadFilled, Delete } from '@element-plus/icons-vue'
import ColorThief from 'colorthief'
import { rgb2hex, rgb2rgba } from '../utils/rgb';

export default {
  components: {
    UploadFilled,
    Delete,
  },
  data() {
    return {
      uploaded: false,
      imageData: '',
      paletteData: [],
      rgb2hex: rgb2hex,
      rgb2rgba: rgb2rgba,
      hoverColorSmall: [0, 0, 0],
      hoverColorLarge: [0, 0, 0],
    };
  },
  computed: {
    palette: {
      get() {
        return this.paletteData;
      },
      set(value) {
        this.paletteData = value;
        this.$emit('update:palette', value);
      },
    },
    canvas() {
      if (!this.uploaded) return null;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const img = new Image();
      img.src = this.imageData;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };

      return canvas;
    },
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
      this.palette = this.palette.concat(colorThief.getPalette(img, 8));
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
    },
    addColor(color) {
      this.palette.push(color);
      this.$emit('update:palette', this.palette);
    },
    removeOneColor(index) {
      this.palette.splice(index, 1);
    },
    onHoverAtPixel(x, y) {
      if (this.canvas) {
        const ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;

        // Handle small color (exact pixel)
        if (x >= 0 && x < canvasWidth && y >= 0 && y < canvasHeight) {
          const imageData = ctx.getImageData(x, y, 1, 1);
          this.hoverColorSmall = [imageData.data[0], imageData.data[1], imageData.data[2]];
        } else {
          this.hoverColorSmall = [0, 0, 0];
        }

        // Handle large color (5x5 average)
        const startX = Math.max(0, x - 2);
        const startY = Math.max(0, y - 2);
        const endX = Math.min(canvasWidth, x + 3);
        const endY = Math.min(canvasHeight, y + 3);
        const width = endX - startX;
        const height = endY - startY;

        if (width > 0 && height > 0) {
          const largeImageData = ctx.getImageData(startX, startY, width, height);
          let sumR = 0, sumG = 0, sumB = 0, count = 0;
          for (let i = 0; i < largeImageData.data.length; i += 4) {
            sumR += largeImageData.data[i];
            sumG += largeImageData.data[i + 1];
            sumB += largeImageData.data[i + 2];
            count++;
          }
          const avgR = Math.round(sumR / count);
          const avgG = Math.round(sumG / count);
          const avgB = Math.round(sumB / count);
          this.hoverColorLarge = [avgR, avgG, avgB];
        } else {
          this.hoverColorLarge = [0, 0, 0];
        }
      } else {
        this.hoverColorSmall = [0, 0, 0];
        this.hoverColorLarge = [0, 0, 0];
      }
    },
    onHover(event) {
      const rect = this.$refs.image.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const x = Math.floor((event.clientX - rect.left) * scaleX);
      const y = Math.floor((event.clientY - rect.top) * scaleY);
      this.onHoverAtPixel(x, y);
    },
    onMouseDown(event) {
      if (event.button === 0) {
        this.addColor(this.hoverColorSmall);
      } else if (event.button === 2) {
        this.addColor(this.hoverColorLarge);
      }
    },
  },
}
</script>
<template>
  <div>
    <div v-if="uploaded" style="display: flex; align-items: flex-end; flex-direction: row;">
      <div style="max-width:500px">
        <img :src="imageData" style="max-width: 100%; max-height: 400px;" @mousemove="onHover" @mousedown="onMouseDown"
          @contextmenu.prevent ref="image" />
      </div>
      <div
        style="margin: 10px; display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
        <div style="text-align: center;">
          点击鼠标左/右键<br>可加入色卡。
        </div>
        <div style="display: flex; width: 100px; height: 30px; margin-bottom: 10px; border: 1px solid #000;">
          <div
            :style="{ backgroundColor: `rgb(${hoverColorSmall[0]}, ${hoverColorSmall[1]}, ${hoverColorSmall[2]})`, width: '50%', height: '100%' }">
          </div>
          <div
            :style="{ backgroundColor: `rgb(${hoverColorLarge[0]}, ${hoverColorLarge[1]}, ${hoverColorLarge[2]})`, width: '50%', height: '100%' }">
          </div>
        </div>
        <el-button type="danger" @click="uploaded = false; palette = []" class="button">清除图片</el-button>
        <el-button type="primary" @click="getColorPalette" class="button">提取色卡</el-button>
      </div>
      <div style="text-align: center;" v-if="palette.length > 0">
        点击色块或代码即可复制。
        <table style="margin: 10px;">
          <tr v-for="(color, index) in palette" style="width: 6em;">
            <td>
              <el-button
                :style="{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`, width: '30px', height: '30px', display: 'inline-block' }"
                @click="copyToClipboard(rgb2hex(color))">
              </el-button>
            </td>
            <td style="width: 5em;">
              <el-button text @click="copyToClipboard(rgb2hex(color))" style="width: 5em;">{{ rgb2hex(color)
                }}</el-button>
            </td>
            <td style="width: 11em;">
              <el-button text @click="copyToClipboard(rgb2rgba(color, 1.0))" style="width: 11em;">{{ rgb2rgba(color,
                1.0)
                }}</el-button>
            </td>
            <td>
              <el-button type="danger" @click="removeOneColor(index)" title="删除" circle>
                <el-icon>
                  <Delete />
                </el-icon>
              </el-button>
            </td>
          </tr>
        </table>
      </div>
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
