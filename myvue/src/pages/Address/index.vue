<template>
  <div class="wrap">
    <!-- 进度条 -->
    <div class="wrap-steps">
      <!-- 每一项 -->
      <div class="step" :class="{ 'active': item.selected }" v-for="(item, index) in stepsList" :key="index">
        <div class="step-title">{{ item.title }}</div>
      </div>
    </div>
    <!-- 地址列表 -->
    <div class="wrap-address">
      <div class="addr-title">
        SHIPPING ADDRESS
      </div>
      <div class="addr-list">
        <!-- item -->
        <div class="addr" :class="{ 'active': item.isDefault }" v-for="(item, index) in addressList" :key="index">
          <div class="addr-name">{{ item.userName }}</div>
          <div class="addr-detail">{{ item.streetName }}</div>
          <div class="tel">{{ item.tel }}</div>
          <div class="addr-footer">
            <div class="default" @click="handleDefaultAddress(item)">Default Address</div>
            <div class="del" @click="handleDelAddress(item)">
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../api/index.api'
export default {
  name: 'Address',
  data () {
    return {
      stepsList: [
        {
          title: 'Confirm Address',
          selected: true
        },
        {
          title: 'View Your Order',
          selected: false
        },
        {
          title: 'Make Payment',
          selected: false
        },
        {
          title: 'Order Confirmation',
          selected: false
        }
      ],
      addressList: []
    }
  },
  methods: {
    fetchAddress () {
      Api.getAddress()
        .then(res => {
          let { response, data } = res
          if (!response.error_code) {
            this.addressList = data
            let index = this.addressList.findIndex(item => {
              return item.isDefault
            })
            if (~index) {
              this.addressList.unshift(...this.addressList.splice(index, 1))
            }
          }
        })
        .catch(err => {
          console.log('fetchAddress err', err)
        })
    },
    // 设置默认的地址
    handleDefaultAddress (addr) {
      this.addressList.forEach(item => {
        if (addr.addressId === item.addressId) {
          item.isDefault = true
        } else {
          item.isDefault = false
        }
      })
      this.fetchSetDefaultAddress(addr.addressId)
    },
    // 设置默认地址接口
    fetchSetDefaultAddress (addressId) {
      Api.setDefaultAddress({addressId})
        .then(res => {
          let { response } = res
          if (!response.error_code) {
            this.$message({
              message: response.hint_message,
              center: true,
              duration: 2 * 1000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 删除地址
    handleDelAddress (addr) {
      Api.delAddress({addressId: addr.addressId})
        .then(res => {
          let { response } = res
          if (!response.error_code) {
            this.$message({
              message: response.hint_message,
              center: true,
              duration: 2 * 1000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchAddress()
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  width: 100%;
  padding: 0 10px 60px 10px;
  .wrap-steps{
    width: 100%;
    display: flex;
    color: #ccc;
    font-weight: 600;
    .step{
      position: relative;
      flex-basis: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 0;
      border-bottom: 4px solid #ccc;
      &::before{
        content: '';
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: #ccc;
        position: absolute;
        bottom: -9px;
        left: calc(50% - 7px);
      }
      &.active{
        color: red;
        border-bottom-color: red;
        &::before{
          background-color: red;
        }
      }
    }
  }
  .wrap-address{
    .addr-title{
      font-size: 26px;
      color: #ccc;
      font-weight: 600;
      margin-top: 30px;
    }
    .addr-list{
      display: flex;
      flex-wrap: wrap;
      .addr{
        width: 300px;
        border: 2px solid #ccc;
        padding: 10px;
        margin-top: 20px;
        margin-right: 20px;
        cursor: pointer;
        &.active,&:hover{
          border-color: red;
        }
        .tel{
          margin-top: 20px;
        }
        .addr-footer{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .default, .del {
            cursor: pointer;
          }
          .default{
            color: red;
          }
        }
      }
    }
  }
}
</style>
