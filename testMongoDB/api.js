const express = require('express');
const router = express.Router();
const userControler = require('./controler/users.controler.js')
const productControler = require('./controler/product.controler.js')
const naotuControler = require('./controler/naotu.controler.js')
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

// 获得订单列表
router.post('/api/getOrderList', userControler.getOrderList)

// 确认订单
router.post('/api/addOrderList', userControler.addOrderList)

// naotu
// getRootGuid
router.post('/api/naotu/get_root_guid', naotuControler.getRootGuid)

// addFile
router.post('/api/naotu/add_file', naotuControler.addFile)

// reName
router.post('/api/naotu/rename', naotuControler.reName)

// addDirectory
router.post('/api/naotu/add_directory', naotuControler.addDirectory)

// update
router.post('/api/naotu/update', naotuControler.update)

// del
router.post('/api/naotu/del', naotuControler.del)

// queryFile
router.post('/api/naotu/query_file', naotuControler.queryFile)

// queryDirectoty
router.post('/api/naotu/query_directory', naotuControler.queryDirectoty)

module.exports = router;