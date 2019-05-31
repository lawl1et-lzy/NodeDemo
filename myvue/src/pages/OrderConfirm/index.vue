<template>
  <div class="wrap">
    <!-- 进度条 -->
    <div class="wrap-steps">
      <!-- 每一项 -->
      <div class="step" :class="{ 'active': item.selected }" v-for="(item, index) in stepsList" :key="index">
        <div class="step-title">{{ item.title }}</div>
      </div>
    </div>
    <!-- 子页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'OrderConfirm',
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
      ]
    }
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
}
</style>
