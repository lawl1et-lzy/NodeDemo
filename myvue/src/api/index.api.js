// import Vue from 'vue'
import axios from '../util/Api/Api.js'

const http = '/api'
class Api {
  static getGoods (data) {
    return axios({
      method: 'POST',
      url: `${http}/product`,
      data
    })
  }
}

export default Api
