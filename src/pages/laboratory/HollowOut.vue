<template lang="html">
  <div>
    <div>
      左右: <input type="range" v-model="offsetLeft" min="-30" max="170">
      上下: <input type="range" v-model="offsetTop" min="-60" max="80">
      圆角: <input type="range" v-model="radius" min="0" max="50">
      旋转: <input type="range" v-model="rotate" min="0" max="360">
    </div>
    <div class="card">
      <div class="background">
        <div class="hollow-out" :style="{ transform: `rotate(${rotate}deg)`, borderRadius: radius + '%', left: offsetLeft + 'px', top: offsetTop + 'px' }"></div>
      </div>
      <div class="thumb" :style="{ transform: `rotate(${rotate}deg)`, borderRadius: radius + '%', left: (Number(offsetLeft) + 5) + 'px', top: offsetTop + 'px' }">{{offsetTop}},{{offsetLeft}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hollow-out',
  data () {
    return {
      offsetTop: -60,
      offsetLeft: -30,
      radius: 0,
      rotate: 0
    }
  }
}
</script>

<style lang="css">
*{
  /* transition: all ease .15s; */
}
[type="range"]{
  display: inline-block;
  margin-right: 20px;
}
.card{
  width: 200px;
  height: 80px;
  margin-top: 50px;
  margin-left: 30px;
  position: relative;
}
.background{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
/* 通过 定位 确定镂空的位置 */
.background .hollow-out{
  display: block;
  content: '';
  width: 0;
  height: 0;
  background: transparent;
  border-width: 30px;
  border-style: solid;
  border-color: transparent;
  border-radius: 50%;
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  margin: auto;
  box-shadow: 0 0 0px 200px #000;
}
.thumb{
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 1);
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 50%;
  z-index: 2;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
