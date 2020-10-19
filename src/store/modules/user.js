const state = {
  now_user: {} // 当前登录的用户
}
const getters = {
  now_user_getters (state) {
    return state.now_user
  }
}
const mutations = {
  // 设置修改当前登录user
  set_now_user_mutations (state, user) {
    state.now_user = user
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
