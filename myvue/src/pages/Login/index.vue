<template>
  <div class="login">
    <section class="form">
      <!-- 账号 -->
      <div class="form-item">
        <el-input v-model="account" placeholder="请输入内容" clearable></el-input>
      </div>
      <!-- 密码 -->
      <div class="form-item">
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      </div>
      <!-- submit -->
      <div class="form-item">
        <el-button type="primary" @click="login">Sign In</el-button>
      </div>
    </section>
  </div>
</template>

<script>
import Api from '@/api/index.api'
export default {
  name: 'Login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      let { userName, userPwd } = {
        userName: this.account,
        userPwd: this.password
      }
      Api.login({ userName, userPwd })
        .then(res => {
          let { response, data } = res
          if (!response.error_code) {
            this.$cookie.delete('user')
            this.$cookie.set('user', JSON.stringify(data))
            this.$message({
              message: '登录成功',
              center: true,
              duration: 2 * 1000,
              onClose: this.goback()
            })
          } else {
            this.$message({
              message: response.hint_message,
              center: true,
              duration: 2 * 1000
            })
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    goback () {
      this.$router.go(-1)
    }
  },
  created () {
    let user = JSON.parse(this.$cookie.get('user'))
    console.log('user', user)
    if (user) {
      this.goback()
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  display: flex;
  justify-content: center;
  align-items: center;
  .form{
    width: 900px;
    .form-item{
      margin: 10px;
    }
  }
}
</style>
