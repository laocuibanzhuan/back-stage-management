import router from './index'
import { asyncRoutes, constantRoutes } from '@/router'


import { getInfo } from '@/api/user'
import user from '@/store/user'


const COMPUTE_VIABLE_ROUTES = function (asyncRoutes_ = asyncRoutes) {
  user.state.viableRoutes = asyncRoutes_.filter(item => {
    if (user.state.routes.indexOf(item.name) != -1) {
      if (item.children && item.children.length) {
        COMPUTE_VIABLE_ROUTES(item.children)
      }
      return true
    } else {
      return false
    }
  })
}
const mergeRoutes = function () {
  user.state.finallyRoutes = constantRoutes.concat(user.state.viableRoutes)//侧边栏的路由导航的显示值
  router.addRoutes(user.state.viableRoutes)
}


router.beforeEach(async (to, from, next) => {
  if (user.state.token) {
    if (user.state.name) {
      next()
    } else {
      let res = await getInfo()
      if (res.code == 20000) {
        Object.assign(user.state, res.data)
        if (!user.state.finallyRoutes) {
          COMPUTE_VIABLE_ROUTES()
          mergeRoutes()
        }
      }
      next('/')
    }
  } else {
    next()
  }
})
