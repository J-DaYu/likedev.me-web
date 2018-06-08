<template lang="html">
  <div>
    <div class="tab">
      <wired-button
        class="article-title"
        v-for="(tabItem, key) in tabs"
        :class="{ 'open': tab === key }"
        :key="key"
        @click="tab = key">
        {{tabItem}}
      </wired-button>
    </div>

    <div class="tab-content articles" :class="{ 'open': tab === 'articles' }">
      <wired-card
        elevation="3"
        v-for="(doc, index) in docs"
        :key="index" @click="loadMD(doc, true)">
        <a href="javascript:;">{{index}}. {{doc.name}}</a>
      </wired-card>
    </div>
    <div class="tab-content links" :class="{ 'open': tab === 'links' }">
      <wired-button
        v-for="(link, index) in links"
        :key="index">
        <a :href="link.url">
          {{link.title}} <br>
          <small>{{link.url}}</small>
        </a>
      </wired-button>
    </div>
    <div class="tab-content power" :class="{ 'open': tab === 'power' }">
      <div v-for="(power, index) in powers" :key="index">
        <wired-button>
          {{power}}
        </wired-button>
      </div>
    </div>

    <div class="markdown markdown-body" v-show="show">
      <a class="btn-close" @click="show = false">关闭</a>
      <div class="container" ref="markdown"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import axios from 'axios'
import docs from '@/docs.json'
import links from '@/links.json'
const powers = [
  'PSD to HTML', 'SPA', 'H5'
]
export default {
  name: 'home',
  data () {
    return {
      docs: docs,
      links: links,
      powers: powers,
      show: false,
      tab: 'articles',
      tabs: {
        articles: '文章',
        power: '做点啥',
        links: '链接'
      }
    }
  },
  methods: {
    loadMD (doc, show = false) {
      axios.get(doc.path)
        .then(({ data }) => {
          this.show = show
          this.$refs['markdown'].innerHTML = marked(data)
        })
    }
  }
}
</script>

<style lang="css">
.tab{
  padding-bottom: 15px;
  box-sizing: border-box;
}
.article-title{
  margin-right: 10px;
}
.article-title.open{
  background: #000;
  color: #fff;
}
.tab-content{
  visibility: hidden;
  height: 0px;
  overflow: hidden;
}
.tab-content.open{
  height: auto;
  visibility: visible;
}
.tab-content wired-button{
  margin: 0 15px 15px 0;
}

.articles{
  display: flex;
  flex-direction: column;
}
.articles wired-card{
  text-align: left;
  margin-bottom: 20px;
  padding: 5px 15px;
  cursor: pointer;
}
.markdown{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: rgba(255, 255, 255, 1);
  padding-bottom: 80px;
  box-sizing: border-box;
  padding: 15px;
  padding-bottom: 70px;
  z-index: 998;
}
.markdown a.btn-close{
  position: fixed;
  top: 60px;
  right: 0;
  margin: auto;
  width: 80px;
  height: 30px;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
}
.links a{
  text-align: left;
}

@media (max-width: 979px) {
  #app{
    padding-bottom: 70px;
  }
  .tab{
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    padding-top: 15px;
    padding-left: 10px;
    z-index: 99;
    display: flex;
  }
  .tab .article-title{
    flex: 1;
  }
}
</style>
