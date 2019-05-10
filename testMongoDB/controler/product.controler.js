require('../db/model/goods.model.js')
const Mongoose = require('mongoose')
const modelProduct = Mongoose.model('product')

let goodsList = (req, res, next) => {
  console.log('req.body', req.body)
  let { pageSize, page, priceLevel, orderBy } = req.body

  let _page = parseInt(page)
  let _pageSize = parseInt(pageSize)
  let skip = _pageSize * (_page - 1)
  let _priceLevel = parseInt(priceLevel) // 价格区间
  let _orderBy = parseInt(orderBy) || 1 // 升降序
  let params = {}
  let priceGt = ''
  let priceLte = ''
  // let goods = modelProduct.find({}).skip(skip).limit(_pageSize)

  if(_priceLevel) {
    switch(_priceLevel) {
      case 0:
        break;
      case 1:
        priceGt = 0
        priceLte = 100
        break;
      case 2:
        priceGt = 100
        priceLte = 500
        break;
      case 3:
        priceGt = 500
        priceLte = 1000
        break;
      case 4:
        priceGt = 1000
        priceLte = 5000
        break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }
    
  return modelProduct.find(params).skip(skip).limit(_pageSize).sort({'salePrice': _orderBy})
    .then(data => {
      if(data.length === 0) {
        res.json({
          response: {
            error_code: 10001,
            error_message: '',
            hint_message: '暂无数据',
          }
        })
      } else {
        res.json({
          response: {
            error_code: 0,
            error_message: '',
            hint_message: '',
          },
          data: data
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  goodsList
}