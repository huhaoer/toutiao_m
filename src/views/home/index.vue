<template>
  <div class="home_container">
    <!-- S 导航栏头部 -->
    <header class="home__header">
      <van-nav-bar class="header__navbar">
        <van-button
          type="info"
          slot="title"
          round
          size="small"
          icon="search"
          to="/search"
          class="search__button"
          >搜索</van-button>
          <span slot="left" class="header__navbar--left">Layoung</span>
      </van-nav-bar>
    </header>
    <!-- E 导航栏头部 -->

    <!-- S 主体内容tab -->
    <div class="home__main">
      <van-tabs v-model="active" class="home__main--tabs">
        <van-tab
          :title="channel.name"
          v-for="channel in channels"
          :key="channel.id"
        >
          <article-list :channel="channel" />
        </van-tab>
        <!-- tabs页面的右侧插槽，用于占位显示最后一个选项出来 -->
        <div slot="nav-right" class="hanbao-placeholder"></div>
        <!-- tabs页面的右侧插槽，用于显示汉堡按钮菜单 -->
        <div slot="nav-right" class="hanbao-button" @click="isShowPop = true">
          <van-icon name="bars" />
        </div>
      </van-tabs>
    </div>
    <!-- E 主体内容tab -->

    <!-- S popup弹出层，不属于该结构中，严格来说应该属于body节点 -->
    <div class="popup__wrap">
      <van-popup
        v-model="isShowPop"
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '100%' }"
        get-container="body"
      >
        <!-- 避免组件结构复杂冗余，单独封装popup组件内部弹窗为一个组件 -->
        <!-- 使用$emit触发自定义事件时，可以在模板行间事件使用$event接收传递的参数 -->
        <popup-content
          :userChannels="channels"
          @close-modal="isShowPop = false"
          @update-active="active = $event"
          :active-channel="active"
        />
      </van-popup>
    </div>
    <!-- E popup弹出层-->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import PopupContent from './components/popup-content'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      active: 0, // 当前选中的tab显示页下标
      channels: [], // 用户频道数据
      isShowPop: false // 是否展示弹出层
    }
  },
  components: {
    ArticleList,
    PopupContent
  },
  computed: {
    ...mapGetters({
      NOW_USER_GETTERS: 'user/now_user_getters', // 用户登录信息 vuex
      USER_CHANNELS_GETTERS: 'channel/user_channels_getters' // 未登录时本地存储的频道信息 vuex
    })
  },
  methods: {
    /**
     * 获取用户频道列表数据 根据是否登录进行判断获取对应数据
     */
    async getUserChannels () {
      let channels = [] // 要渲染的频道列表
      if (this.NOW_USER_GETTERS.token) {
        // 用户已经登陆 正常接口请求数据，根据携带的token值返回数据
        const result = await getUserChannels()
        channels = result.data.channels
      } else {
        // 未登录
        if (this.USER_CHANNELS_GETTERS.length > 0) {
          // 有本地缓存数据
          channels = this.USER_CHANNELS_GETTERS
        } else {
          // 本地没有缓存
          // 接口请求数据，未登录时没有token值会自动返回推荐的频道
          const result = await getUserChannels()
          channels = result.data.channels
        }
      }
      this.channels = channels
    }
  },
  created () {
    this.getUserChannels()
  }
}
</script>

<style lang='less' scoped>
.home_container {
  .home__header {
    height: 45px;
    width: 100%;
    .header__navbar {
      background-color: #3196fa;
      /deep/ .van-nav-bar__title {
        max-width: none;
        margin-left: 100px;
      }
      &--left {
        color: #fff;
        font-size: 16px;
      }
      .search__button {
        width: 250px;
        background-color: #5babfb;
        .van-icon-search {
          color: #fff;
        }
      }
    }
  }
  .home__main--tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      height: 3px;
      width: 15px;
      background-color: #3296fa;
      bottom: 20px;
    }
    .hanbao-placeholder {
      width: 33px;
      flex-shrink: 0; //不参与缩放 避免flex布局设置宽度不起作用
    }
    .hanbao-button {
      position: fixed;
      right: 0;
      width: 33px;
      height: 44px;
      background-color: #fff;
      opacity: 0.8;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-icon-bars {
        font-size: 24px;
      }
    }
  }
}
</style>
