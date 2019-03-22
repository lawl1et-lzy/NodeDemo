const express = require('express');
const router = express.Router();
const userControler = require('./controler/user.controler.js')

// 用户登录
router.post('/api/signUp', userControler.usersave)

module.exports = router;