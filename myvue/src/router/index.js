import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Goods from '@/pages/Goods'
import Cart from '@/pages/Cart'
import Address from '@/pages/Address'

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
        breadcrumbName: '首页'
      },
      children: [
        {
          path: 'goods',
          name: 'Goods',
          component: Goods,
          meta: {
            title: 'Goods',
            breadcrumbName: '商品列表'
          }
        },
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: {
            title: 'Login',
            breadcrumbName: '登录页'
          }
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart,
          meta: {
            title: 'Cart',
            breadcrumbName: '购物车'
          }
        },
        {
          path: 'address',
          name: 'address',
          component: Address,
          meta: {
            title: 'Address',
            breadcrumbName: '收货地址'
          }
        }
      ]
    }
  ]
})
