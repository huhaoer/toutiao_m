<template>
  <div class="my_container">
    <van-cell-group class="container_top">
      <!-- 头像栏信息 -->
      <van-cell class="container_top--avatar" center :border="false" v-if="NOW_USER.token">
        <van-image
          fit="fill"
          width="66"
          height="66"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          slot="icon"
          class="avatar_img"
        />
        <div class="nickName" slot="title">昵称</div>
        <van-button class="update-btn" size="small" round to="/"
          >编辑资料</van-button
        >
      </van-cell>

      <!-- 未登录状态时显示的头部信息栏 -->
      <div class="container_top--nologin" v-else>
        <div class="nologin--wrap" @click="handleImageLogin">
          <img src="../../assets/image/phone.png" alt="">
        </div>
        <div class="nologin--text">
          点击登录
        </div>
      </div>

      <!-- 菜单栏 -->
      <van-grid :border="false" class="container_top--grid">
        <van-grid-item text="文字" class="grid_item">
          <div slot="text" class="item_wrap">
            <div class="count">12</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="grid_item">
          <div slot="text" class="item_wrap">
            <div class="count">12</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="grid_item">
          <div slot="text" class="item_wrap">
            <div class="count">12</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="grid_item">
          <div slot="text" class="item_wrap">
            <div class="count">12</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 收藏和历史 -->
    <van-grid :column-num="2" class="container_top--save mb-4">
      <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>

    <!-- 消息通知 小智 退出 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="mb-4" />
    <!-- 根据vuex获取当前用户信息，当前用户处于登录状态 显示退出按钮 -->
    <van-cell title="退出" class="cell_out" v-if="NOW_USER.token" @click="handleLogout" />
    {{ NOW_USER }}
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'My',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      NOW_USER: 'user/now_user_getters'
    })
  },
  methods: {
    ...mapMutations({
      CLEAR_NOW_USER: 'user/clear_now_user_mutations'
    }),

    // 点击退出
    handleLogout () {
      console.log(111)
      this.CLEAR_NOW_USER()// 清除vuex的用户信息
    },
    // 点击phone图标登录
    handleImageLogin () {
      this.$router.push('/login')
    }
  }

}
</script>

<style lang='less' scoped>
.my_container {
  .container_top {
    background-image: url("../../assets/image/banner.d43e3812.png");
    background-repeat: no-repeat;
    background-size: cover;
    &--avatar {
      background: unset;
      padding-top: 35px;
      padding-bottom: 16px;
      box-sizing: border-box;
      .avatar_img {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
      }
      .nickName {
        color: #fff;
        font-size: 16px;
        margin-left: 10px;
      }
      .update-btn {
        color: #666;
        height: 18px;
        font-size: 10px;
      }
    }

    &--nologin {
      height: 200px;
          background-image: url("../../assets/image/banner.d43e3812.png");
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .nologin--wrap {
        width: 66px;
        height: 66px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nologin--text {
        color: #fff;
        font-size: 14px;
        margin-top: 10px;
      }
    }

    &--grid {
      .grid_item {
        height: 65px;
        color: #fff;
        // 设置grid背景色为重置
        /deep/ .van-grid-item__content {
          background: unset;
        }
        .item_wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }

    &--save {
      /deep/ .toutiao {
        font-size: 22px;
        &-shoucang {
          color: #eb5253;
        }
        &-lishi {
          color: #ff9d1d;
        }
      }
    }
  }

  // 设置退出单元格文字居中
  .cell_out {
    text-align: center;
    color: #d86262;
  }

  // 下边距4px
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
