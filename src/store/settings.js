const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const state = {
  showSettings: undefined,
  fixedHeader: false,
  sidebarLogo: false
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

