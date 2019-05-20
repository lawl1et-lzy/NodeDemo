// import Vue from 'vue'
import axios from '../util/Api/Api.js'

const http = '/api'
class Api {
  // 登录
  static login (data) {
    return axios({
      method: 'POST',
      url: `${http}/login`,
      data
    })
  }
  // 注册
  static register (data) {
    return axios({
      method: 'POST',
      url: `${http}/register`,
      data
    })
  }
  // 商品
  static getGoods (data) {
    return axios({
      method: 'POST',
      url: `${http}/product`,
      data
    })
  }
  // 购物车数据
  static getCartList (data) {
    return axios({
      method: 'POST',
      url: `${http}/cartList`,
      data
    })
  }
  // 加入购物车
  static addCart (data) {
    return axios({
      method: 'POST',
      url: `${http}/cartAdd`,
      data
    })
  }
  // 删除购物车数据
  static delCart (data) {
    return axios({
      method: 'POST',
      url: `${http}/cartDel`,
      data
    })
  }
}

export default Api
