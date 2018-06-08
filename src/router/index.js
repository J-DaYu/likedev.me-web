import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('@/pages/Home')
const HollowOut = () => import('@/pages/laboratory/HollowOut.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/lab/hollow-out',
      name: 'HollowOut',
      component: HollowOut
    }
  ]
})
