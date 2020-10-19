import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'// 引入vant组件库
import 'vant/lib/index.css'// 引入vant样式
import 'amfe-flexible'// 引入淘宝移动适配方案
import './style/index.less'// 引入总体样式 在index.less中导入字体和初始化以及其他使用的样式
import './util/dayjs'// 处理相对时间的封装 提供全局过滤器

Vue.config.productionTip = false

Vue.use(Vant)// 使用vant组件库

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
