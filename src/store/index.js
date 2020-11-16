import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'// user模块
import channel from './modules/channel'// channel模块
import search from './modules/search'// 搜索search模块
import createPersistedState from 'vuex-persistedstate' // 持久化

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user,
    channel,
    search
  },
  plugins: [createPersistedState({
    storage: window.localStorage
    // reducer (val) {
    //   console.log(val, 'val')
    //   return {
    //     user: {
    //       user: val.user.now_user
    //     }
    //   }
    // }
  })]
})
