import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/token'
import { resetRouter, asyncRoutes, constantRoutes } from '@/router'
import router from '@/router'


export const COMPUTE_VIABLE_ROUTES = function (asyncRoutes_ = asyncRoutes) {
  state.viableRoutes = asyncRoutes_.filter(item => {
    if (state.routes.indexOf(item.name) != -1) {
      if (item.children && item.children.length) {
        COMPUTE_VIABLE_ROUTES(item.children)
      }
      return true
    } else {
      return false
    }
  })
}
export const mergeRoutes = function () {
  state.finallyRoutes = constantRoutes.concat(state.viableRoutes)//侧边栏的路由导航的显示值
  router.addRoutes(state.viableRoutes)
}


const getDefaultState = () => {
  return {
    token: getToken(),
    name: undefined,
    avatar: undefined,
    routes: undefined,
    roles: undefined,
    buttons: undefined,
    viableRoutes: undefined,
    finallyRoutes: undefined
  }
}
const state = getDefaultState()


const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_OTHER: (state, otherInfo) => {
    Object.assign(state, otherInfo)
  }
}

const actions = {
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const res = await login({ username: username.trim(), password: password })
    if (res.code == 20000) {
      commit('SET_TOKEN', res.data.token)
      setToken(res.data.token)
      return true
    } else {
      return false
    }
  },

  async getInfo({ commit, state }) {
    const res = await getInfo(state.token)
    if (res.code == 20000) {
      commit('SET_OTHER', res.data)
      COMPUTE_VIABLE_ROUTES()
      mergeRoutes()
      return true
    } else {
      return Promise.reject(new Error('认证失败，请重新登录'))
    }
  },

  async logout({ commit, state }) {
    const res = await logout(state.token)
    if (res.code == 20000) {
      removeToken()
      resetRouter()
      commit('RESET_STATE')
    } else {
      return Promise.reject(new Error('失败，请重新尝试'))
    }
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
