import 'normalize.css/normalize.css'
import '@/styles/index.scss'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


import store from './store'


import router from './router'
import './router/permission'


import API from '@/api/index'
Vue.prototype.$API = API


import CategorySelect from '@/components/CategorySelect'
import HintButton from '@/components/HintButton';
Vue.component('CategorySelect', CategorySelect)
Vue.component(HintButton.name, HintButton);


import Vue from 'vue'
Vue.config.productionTip = false
import App from './App'

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    Vue.prototype.$ID = {}
  },
  render: h => h(App)
})
