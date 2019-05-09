const express = require('express');
const router = express.Router();
const userControler = require('./controler/user.controler.js')
const productControler = require('./controler/product.controler.js')
// 用户登录
router.post('/api/signUp', userControler.usersave)

// 商品
router.post('/api/product', productControler.goodsList)

// 所有的用户
router.post('/api/allstudent', userControler.findAll)

module.exports = router;