const express = require('express');
const router = express.Router();
const userControler = require('./controler/user.controler.js')
const productControler = require('./controler/product.controler.js')
// 用户登录
router.post('/api/signUp', userControler.usersave)

// root
router.post('/api/product', productControler.findAll)

// 所有的用户
router.post('/api/allstudent', userControler.findAll)

module.exports = router;