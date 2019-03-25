<template>
  <div>
    Homepage
  </div>
</template>

<script>
import axios from '@/util/Api/Api.js'
export default {
  name: 'Index',
  mounted () {
    let data = {
      'username': 'lawliet9',
      'password': '123123'
    }
    let url = `${this.http}/signUp`
    axios({
      method: 'POST',
      url: url,
      data
    })
      .then(res => {
        console.log('Axios res', res)
      })
      .catch(err => {
        console.log('Axios err', err)
      })
  }
}
</script>

<style scoped>

</style>
