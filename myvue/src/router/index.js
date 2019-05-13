import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Home from '@/pages/Home'
import Goods from '@/pages/Goods'
import Cart from '@/pages/Cart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: 'Index',
        breadcrumbName: 'Index'
      },
      children: [
        {
          path: 'goods',
          name: 'Goods',
          component: Goods,
          meta: {
            title: 'Goods',
            breadcrumbName: 'Goods'
          }
        },
        {
          path: 'home',
          name: 'Home',
          component: Home,
          meta: {
            title: 'Home',
            breadcrumbName: 'Home'
          }
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart,
          meta: {
            title: 'Cart',
            breadcrumbName: 'Cart'
          }
        }
      ]
    }
  ]
})
