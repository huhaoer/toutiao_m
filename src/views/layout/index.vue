<template>
  <div class='layout_container'>
      <router-view/>
    <van-tabbar v-model='active' route>
      <van-tabbar-item icon='home-o' to="/">首页</van-tabbar-item>
      <van-tabbar-item icon='search' to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon='friends-o' to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon='setting-o' to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>
</style>
