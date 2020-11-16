// 搜索相关数据持久化模块
const state = {
  history_list: [] // 搜索历史记录
}
const getters = {
  history_list_getters (state) {
    return state.history_list
  }
}
const mutations = {
  set_history_list_mutations (state, history) {
    state.history_list = history
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
