require('../db/model/goods.model.js')
const Mongoose = require('mongoose')
const modelProduct = Mongoose.model('product')

let findAll = (req, res, next) => {
  return modelProduct.find({})
    .then((data, doc) => {
      if(data.length === 0) {
        res.json({
          error_code: 0,
          hint_message: '暂无数据',
          data
        })
      } else {
        res.json({
          error_code: 0,
          hint_message: '',
          data
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  findAll
}