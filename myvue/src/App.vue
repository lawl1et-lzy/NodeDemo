<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang=scss>
@import './style/reset.scss';
#app{
  height: 100%;
  width: 100%;
}
</style>
