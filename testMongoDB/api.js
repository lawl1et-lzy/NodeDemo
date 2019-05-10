const express = require('express');
const router = express.Router();
const userControler = require('./controler/users.controler.js')
const productControler = require('./controler/product.controler.js')
// 用户登录
router.post('/api/login', userControler.login)
router.post('/api/register', userControler.register)

// 商品
router.post('/api/product', productControler.goodsList)


module.exports = router;