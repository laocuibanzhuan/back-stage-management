import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import app from './app'
import settings from './settings'
import user from './user'


const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
