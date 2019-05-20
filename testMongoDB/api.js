const express = require('express');
const router = express.Router();
const userControler = require('./controler/users.controler.js')
const productControler = require('./controler/product.controler.js')
// 登录
router.post('/api/login', userControler.login)

// 注册
router.post('/api/register', userControler.register)

// 用户购物车数据
router.post('/api/cartList', userControler.cartList)

// 添加购物车数据
router.post('/api/cartAdd', userControler.cartAdd)

// 删除购物车数据
router.post('/api/cartDel', userControler.cartDel)

// 商品列表
router.post('/api/product', productControler.goodsList)


module.exports = router;