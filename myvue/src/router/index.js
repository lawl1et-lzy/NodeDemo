import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Goods from '@/pages/Goods'
import Cart from '@/pages/Cart'

import OrderConfirm from '@/pages/OrderConfirm'
import Address from '@/pages/OrderConfirm/address'

const Naotu = () => import('@/pages/Naotu')
const NaotuEditor = () => import('@/pages/NaotuEditor')

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
          name: 'Cart',
          component: Cart,
          meta: {
            title: 'Cart',
            breadcrumbName: '购物车'
          }
        },
        {
          path: 'orderconfirm',
          name: 'OrderConfirm',
          component: OrderConfirm,
          meta: {
            title: 'OrderConfirm',
            breadcrumbName: '确认订单页'
          },
          children: [
            {
              path: 'address',
              name: 'Address',
              component: Address,
              meta: {
                title: 'Address',
                breadcrumbName: '地址'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/naotu',
      name: 'Naotu',
      component: Naotu
    },
    {
      path: '/naotueditor/:id',
      name: 'NaotuEditor',
      component: NaotuEditor
    }
  ]
})
