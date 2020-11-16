// 频道相关数据持久化模块
const state = {
  user_channels: [] // 未登录状态下用户的频道显示
}
const getters = {
  user_channels_getters (state) {
    return state.user_channels
  }
}
const mutations = {
  // 设置修改当前未登录用户的持久化频道数据
  set_user_channels_mutations (state, channels) {
    state.user_channels = channels
  }
}
const actions = {

}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
