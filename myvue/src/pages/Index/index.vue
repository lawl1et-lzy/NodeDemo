<template>
  <div class="wrapper">
    <v-header></v-header>
    <v-breadcrumb></v-breadcrumb>
    <!-- 子路由 -->
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
const VHeader = () => import('../../components/Header.vue')
const VFooter = () => import('../../components/Footer.vue')
const VBreadcrumb = () => import('../../components/Breadcrumb.vue')
export default {
  name: 'Index',
  components: {
    VHeader,
    VFooter,
    VBreadcrumb
  }
}
</script>

<style lang='scss' scoped>
.wrapper{
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
