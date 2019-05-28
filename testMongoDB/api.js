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

// 添加购物车数据
router.post('/api/cartConfirm', userControler.cartConfirm)

// 商品列表
router.post('/api/product', productControler.goodsList)

// 获取用户地址
router.post('/api/address', userControler.address)

// 设置用户默认地址
router.post('/api/setAddress', userControler.setAddress)

// 删除用户默认地址
router.post('/api/delAddress', userControler.delAddress)



module.exports = router;