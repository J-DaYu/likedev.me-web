<template lang="html">
  <div class="markdown-body">
    <input type="text" v-model="input" maxlength="1">
    <canvas id="canvas" style="display: none;"></canvas>
    <div class="word"></div>
    <pre id="pre"></pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: 'A'
    }
  },
  watch: {
    input (old, newVal) {
      this.shadow()
    }
  },
  methods: {
    shadow () {
      let wordWidth = 30
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `20px Georgia`
      ctx.fillText(this.input, 10, wordWidth)

      let imgData = ctx.getImageData(1, 1, wordWidth, wordWidth + 5)
      // console.log(imgData.data, imgData.width, imgData.height, imgData.data.length)
      // ctx.putImageData(imgData, 1, wordWidth)

      let shadow = []
      let column = imgData.data.length / imgData.height

      // 行
      for (let i = 0; i < imgData.data.length; i += column) {
        let y = parseInt(i / column) * 4
        let x = 0
        // 列
        for (let j = i; j < i + column; j += 4) {
          x += 4
          let opacity = (imgData.data[j + 3] / 255).toFixed(2)
          shadow.push(`${x}px ${y}px 0 rgba(0, 0, 0, ${opacity})`)
          // shadow.push(x + 'px ' + y + 'px 0 rgba(0, 0, 0, ' + (opacity) + ')')
        }
      }

      let word = document.querySelector('.word')
      word.style.boxShadow = shadow.join(',')
      let html = `.word{
        width: 3px;
        height: 3px;
        box-shadow: ${shadow.join(',\n\t\t')}
      }`
      document.querySelector('#pre').innerHTML = html
    }
  },
  mounted () {
    this.shadow()
  }
}
</script>

<style lang="css">
.word{
  width: 3px;
  height: 3px;
}
pre{
  float: right;
  max-height: 400px;
  min-width: 800px;
}
</style>
