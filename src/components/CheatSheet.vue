<script>
export default {
  emits: ['click:insert-code'],
  data() {
    return {
      distanceTypes: [
        "closest-side",
        "closest-corner",
        "farthest-side",
        "farthest-corner"
      ],
      backgroundPosition: [
        "top", "bottom", "left", "right", "center",
      ],
      repeatTypes: [
        "repeat",
        "repeat-x",
        "repeat-y",
        "no-repeat",
        "space",
        "round"
      ]
    }
  },
  methods: {
    insertCode(code) {
      this.$emit('click:insert-code', code);
    },
  },
}
</script>
<template>
  <div style="font-family: monospace;">
    <div class="row">
      <div class="left">
        <span @click="insertCode(['linear-gradient(', ')'])" class="clickable">linear-gradient</span>
        (
        <span @click="insertCode('to top left')" class="clickable">to top left</span>
        <el-button @click="insertCode('to top')" class="icon-button" title="to top">↑</el-button>
        <el-button @click="insertCode('to bottom')" class="icon-button" title="to bottom">↓</el-button>
        <el-button @click="insertCode('to left')" class="icon-button" title="to left">←</el-button>
        <el-button @click="insertCode('to right')" class="icon-button" title="to right">→</el-button>
        <el-button @click="insertCode('to top left')" class="icon-button" title="to top left">↖</el-button>
        <el-button @click="insertCode('to top right')" class="icon-button" title="to top right">↗</el-button>
        <el-button @click="insertCode('to bottom left')" class="icon-button" title="to bottom left">↙</el-button>
        <el-button @click="insertCode('to bottom right')" class="icon-button" title="to bottom right">↘</el-button>
        <el-button @click="insertCode('deg')" class="icon-button" title="x deg">°</el-button>
        ,
        white
        10<span @click="insertCode('px')" class="clickable">px</span>
        ,
        #66ccff 50<span @click="insertCode('%')" class="clickable">%</span>
        ,
        #0080ff <span @click="insertCode(['calc(', ' + 1px)'])" class="clickable">calc(</span>
        50% <span @click="insertCode(['calc(', ' + 1px)'])" class="clickable">+ 1px )</span>
        )
      </div>
      <div class="right">
        <div class="sample-block"
          style="background: linear-gradient(to top left, white 10px, #66ccff 50%, #0080ff calc(50% + 1px));"></div>
      </div>
    </div>
    <div class="row">
      <div class="left">
        <span @click="insertCode(['radial-gradient(', ')'])" class="clickable">radial-gradient</span>
        (
        <span @click="insertCode('ellipse')" class="clickable">ellipse</span>
        <el-button @click="insertCode('circle')" class="icon-button" title="circle"
          style="background: radial-gradient(circle closest-side at 50% 50%, black 50%, white 100%);width:25px;"></el-button>
        <el-button @click="insertCode('ellipse')" class="icon-button" title="ellipse"
          style="background: radial-gradient(ellipse closest-side at 50% 50%, black 50%, white 100%);width:25px;"></el-button>&ensp;

        <span @click="insertCode('farthest-side')" class="clickable">farthest-side</span>
        <el-button v-for="distance in distanceTypes" @click="insertCode(distance)" class="icon-button" :title="distance"
          :style="{ background: `radial-gradient(circle ${distance} at 30% 50%, black 2px, gray 3px, gray 100%, white calc(100% + 1px))`, border: '1px solid black', borderRadius: '0px' }"></el-button>

        at 
        <span class="tipped" title="圆心位置">50% 100%</span>
        <el-button v-for="position in backgroundPosition" @click="insertCode(position)" class="icon-button"
          :title="position"
          :style="{ background: `radial-gradient(circle closest-side at 50% 50%, black 50%, white 100%) ${position} / 50% 50% no-repeat, white` }"></el-button>
        , white, white 70% , #0080ff calc(70% + 1px) , #0080ff calc(100% - 1px) , #66ccff 100%
        )
        <span class="tipped" title="背景位置">25% 75%</span>
        <el-button v-for="position in backgroundPosition" @click="insertCode(position)" class="icon-button"
          :title="position"
          :style="{ background: `radial-gradient(circle closest-side at 50% 50%, black 50%, white 100%) ${position} / 50% 50% no-repeat, white` }"></el-button>

        /
        <span class="tipped" title="背景大小">21px 12px</span>&ensp;

        <span class="clickable" @click="insertCode('repeat')">repeat</span>&ensp;
        <span class="clickable" @click="insertCode('space')">space</span>
        <el-button v-for="repeat in repeatTypes" @click="insertCode(repeat)" class="icon-button" :title="repeat"
          :style="{ background: `radial-gradient(ellipse closest-side at 50% 50%, black calc(100% - 1px), white 100%) 35% 35% / 10px 7px ${repeat}, white`, width: '25px', height: '25px' }"></el-button>

      </div>
      <div class="right">
        <div class="sample-block"
          style="background: radial-gradient( ellipse farthest-side at 50% 100% , white, white 70%, #0080ff calc(70% + 1px), #0080ff calc(100% - 1px), #66ccff 100%) 25% 75% / 21px 12px repeat space, white;">
        </div>
      </div>
    </div>

    <small>
      可以参考 <a href="https://zh.moegirl.org.cn/User:JackBlock/CSS_background">U:JackBlock/CSS background</a>、<a href="https://zh.moegirl.org.cn/User:JackBlock/%E6%B8%90%E5%8F%98%E8%89%B2%E4%BD%BF%E7%94%A8">U:JackBlock/渐变色使用</a>。
    </small>
  </div>
</template>
<style scoped>
.clickable {
  color: darkblue;
  background-color: aliceblue;
  cursor: pointer;
}

.tipped {
  color: darkblue;
  background-color: aliceblue;
}

.icon-button {
  padding: 0px 2px;
  margin: 0px 2px;
  width: 20px;
  height: 20px;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.left {
  margin-right: 10px;
  flex-grow: 1;
}

.right {
  margin-left: 10px;
  width: 70px;
}

.sample-block {
  width: 50px;
  height: 30px;
  border: 1px solid black;
  margin: 10px;
}
</style>