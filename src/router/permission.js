import router from './index'


import { getInfo } from '@/api/user'
import user from '@/store/user'


router.beforeEach(async (to, from, next) => {
  if (user.state.token) {
    if (user.state.name) {
      next()
    } else {
      let res = await getInfo()
      if (res.code == 20000) {
        Object.assign(user.state, res.data)
      }
      next()
    }
  } else {
    next()
  }
})
