require('../db/model/user.model.js')
const Mongoose = require('mongoose');
const modelUser = Mongoose.model('user');
// const Promise = require('promise'); // 配合 Mongoose 使用

// Mongoose.Promise = Promise

// 判断是否存在
let isExistUserInfo = async (req) => {
  return modelUser.find({"username": req.body.username})
    .then(data => {
      if(data.length === 0) {
        return false
      } else {
        return true
      }
    })
    .catch(err => {
      console.log('isExistUserInfo', err)
    })
}

let usersave = async (req, res, next) => {
  let isExist = await isExistUserInfo(req)
  console.log('isExist', isExist)
  if(isExist) {
    res.jsonp({
      error_code: 1001,
      error_hint: '已经存在该用户'
    })
  } else {
    let userone = new modelUser(req.body) 
    userone.save((err, userone) => {
      if(err) {
        res.jsonp({
          error_code: 1002,
          error_hint: '保存失败'
        })
        return false
      }
      res.jsonp({
        error_code: 0,
        error_hint: '成功',
        data: userone
      })
    })
  }
}

module.exports = {
  usersave
}
