<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumb"
        :key="index"
        :to="{ path: item.path }">
        {{ item.breadcrumbName }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    breadcrumb () {
      let routeMatched = this.$route.matched
      let routeMatchedList = []
      routeMatched.forEach((item, index) => {
        let breadcrumb = {}

        breadcrumb.path = item.path
        breadcrumb.name = item.name
        breadcrumb.breadcrumbName = item.meta.breadcrumbName

        routeMatchedList.push(breadcrumb)
      })
      return routeMatchedList
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb{
  background-color: #F8F9FF;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
</style>
