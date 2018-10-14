import Vue from 'vue'
import Router from 'vue-router'

import cart from '@/components/cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cart',
      //注意这里是单数形式
      component: cart
    }
  ]
})
