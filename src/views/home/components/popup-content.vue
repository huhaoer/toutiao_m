<template>
  <div class="popup-content">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <div class="myChannel__title" slot="title">我的频道</div>
      <van-button type="danger" size="mini" round plain class="myChannel__btn"
        >编辑</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell center>
      <div class="channelSup__title" slot="title">频道推荐</div>
      <van-button type="danger" size="mini" round plain class="channelSup__btn"
        >编辑</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'PopupContent',
  data () {
    return {}
  }
}
</script>

<style lang='less' scoped>
.popup-content {
  padding-top: 54px;
  .myChannel__title {
    font-size: 16px;
    color: #333;
  }
  .myChannel__btn {
    width: 50px;
  }
  .channelSup__title {
    font-size: 16px;
    color: #333;
  }
  .channelSup__btn {
    width: 50px;
  }
}
</style>
