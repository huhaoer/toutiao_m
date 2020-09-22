import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'// 引入vant组件库
import 'vant/lib/index.css'// 引入vant样式
import 'amfe-flexible'// 引入淘宝移动适配方案
import './style/reset.less'// 引入初始化样式

Vue.config.productionTip = false

Vue.use(Vant)// 使用vant组件库

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
