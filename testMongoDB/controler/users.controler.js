require('../db/model/users.model.js')
const Mongoose = require('mongoose');
const modelUser = Mongoose.model('user');
// const Promise = require('promise'); // 配合 Mongoose 使用

// 判断是否存在
let hasUserInfo = async (param) => {
  return modelUser.findOne(param)
    .then(data => {
      if(data) {
        return data
      } else {
        return false
      }
    })
    .catch(err => {
      console.log('hasUserInfo', err)
    })
}

// 登录请求
let login = async (req, res, next) => {
  let { userName, userPwd } = req.body
  if(!userName) {
    res.json({
      response: {
        error_code: 10001,
        error_message: '',
        hint_message: '用户名不能为空',
      }
    })
  }
  if(!userPwd) {
    res.json({
      response: {
        error_code: 10002,
        error_message: '',
        hint_message: '密码不能为空',
      }
    })
  }
  let reqParam = {
    userName,
    userPwd
  }
  
  let _hasUserInfo = await hasUserInfo(reqParam) // 查询是否有登录信息
  if(_hasUserInfo) { // 输出
    let { userName, userId } = _hasUserInfo
    // 写入 cookie
    res.cookie("user", JSON.stringify({ userName, userId }), {
      path: '/',
      maxAge: 1000 * 3600
    })
    res.json({
      response: {
        error_code: 0,
        error_message: '',
        hint_message: '',
      },
      data: { userName, userId }
    })
  } else {
    res.json({
      response: {
        error_code: 10003,
        error_message: '',
        hint_message: '用户尚未注册',
      }
    })
  }
}

// 注册
let register = async (req, res, next) => {
  let { userName, userPwd } = req.body
  if(!userName) {
    res.json({
      response: {
        error_code: 10001,
        error_message: '',
        hint_message: '用户名不能为空',
      }
    })
  }
  if(!userPwd) {
    res.json({
      response: {
        error_code: 10002,
        error_message: '',
        hint_message: '密码不能为空',
      }
    })
  }
  let reqParam = {
    userName,
    userPwd
  }
  let _hasUserInfo = await hasUserInfo(reqParam) // 查询是否有登录信息

  if(_hasUserInfo) {
    res.json({
      response: {
        error_code: 10004,
        error_message: '',
        hint_message: '您已注册，请登录',
      }
    })
  } else {
    let user = new modelUser(reqParam)
    user.save()
      .then(data => {
        let { userName, userId } = data
        // 写入 cookie
        res.cookie("user", JSON.stringify({ userName, userId }), {
          path: '/',
          maxAge: 1000 * 3600
        })
        res.json({
          response: {
            error_code: 0,
            error_message: '',
            hint_message: '',
          }
        })
      })
      .catch(err => {
        res.json({
          response: {
            error_code: 10005,
            error_message: err,
            hint_message: '注册失败',
          }
        })
      })
  }
}

// 登出
let loginOut = async (req, res, next) => {
  res.cookie('user', '', {
    path:"/",
    maxAge:-1
  })
}

module.exports = {
  login,
  register
}
