require('../db/model/naotu.model.js')
const Mongoose = require('mongoose');
const modelNaotu = Mongoose.model('naotu');

// ADD
let add = async (req, res, next) => {
  let { id, value = '' } = req.body
  if(!id) {
    res.json({
      response: {
        error_code: 10001,
        error_message: '',
        hint_message: 'id不为空',
      }
    })
    return
  }
  let rp = {
    id,
    value
  }
  let naotu = new modelNaotu(rp)
  naotu.save()
    .then(data => {
        res.json({
          response: {
            error_code: 0,
            error_message: '',
            hint_message: '',
          },
          data
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

// update
let update = async (req, res, next) => {
  let { id, value } = req.body
  if(!id) {
    res.json({
      response: {
        error_code: 10001,
        error_message: '',
        hint_message: 'id不为空',
      }
    })
  }
  let isExist = await modelNaotu.findOne({id})
  if(isExist) {
    isExist.value = value
    isExist.save()
    .then(doc => {
      res.json({
        response: {
          error_code: 0,
          error_message: '',
          hint_message: '添加成功',
        }
      })
    })
    .catch(err => {
      res.json({
        response: {
          error_code: 10001,
          error_message: '',
          hint_message: err,
        }
      })
    })
  } else {
    add(req, res, next)
  }
}

// delete
let del = async (req, res, next) => {
  let { id } = req.body
  if(!id) {
    res.json({
      response: {
        error_code: 10001,
        error_message: '',
        hint_message: 'id不为空',
      }
    })
  }
  let rp = {
    id
  }
  modelNaotu.remove(rp)
    .then(doc => {
      res.json({
        response: {
          error_code: 0,
          error_message: '',
          hint_message: '删除成功',
        }
      })
    })
    .catch(err => {
      res.json({
        response: {
          error_code: 10001,
          error_message: '',
          hint_message: err,
        }
      })
    })
}

// find
let query = async(req, res ,next) => {
  let { id } = req.body
  let rp = {}
  if(id) {
    rp.id = id
  }
  modelNaotu.find(rp)
    .then(data => {
      res.json({
        response: {
          error_code: 0,
          error_message: '',
          hint_message: '',
        },
        data
      })
    })
    .catch(err => {
      res.json({
        response: {
          error_code: 10001,
          error_message: '',
          hint_message: err,
        }
      })
    })
}

module.exports = {
  add,
  update,
  del,
  query
}