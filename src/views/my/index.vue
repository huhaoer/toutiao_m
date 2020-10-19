<template>
  <div class="my_container">
    <van-cell-group class="container_top" v-if="NOW_USER_GETTERS.token">
      <!-- 头像栏信息 -->
      <van-cell class="container_top--avatar" center :border="false">
        <van-image
          fit="fill"
          width="66"
          height="66"
          round
          :src="currentUserInfo.photo"
          slot="icon"
          class="avatar_img"
        />
        <div class="nickName" slot="title">{{ currentUserInfo.name }}</div>
        <van-button class="update-btn" size="small" round to="/"
          >编辑资料</van-button
        >
      </van-cell>

      <!-- 菜单栏 -->
      <van-grid :border="false" class="container_top--grid">
        <van-grid-item text="文字" class="grid_item">
          <div slot="text" class="item_wrap">
            <div class="count">{{ currentUserInfo.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="grid_item">
          <div slot="text" class="item_wrap">
            <div class="count">{{ currentUserInfo.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="grid_item">
          <div slot="text" class="item_wrap">
            <div class="count">{{ currentUserInfo.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="grid_item">
          <div slot="text" class="item_wrap">
            <div class="count">{{ currentUserInfo.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 未登录状态时显示的头部信息栏 -->
    <div class="container_top--nologin" v-else>
      <div class="nologin--wrap" @click="handleImageLogin">
        <img src="../../assets/image/phone.png" alt="" />
      </div>
      <div class="nologin--text">点击登录</div>
    </div>

    <!-- 收藏和历史 -->
    <van-grid :column-num="2" class="container_top--save mb-4">
      <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>

    <!-- 消息通知 小智 退出 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="mb-4" />
    <!-- 根据vuex获取当前用户信息，当前用户处于登录状态 显示退出按钮 -->
    <van-cell
      title="退出"
      class="cell_out"
      v-if="NOW_USER_GETTERS.token"
      @click="handleLogout"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getUserInfomation } from '@/api/user'

export default {
  name: 'My',
  data () {
    return {
      currentUserInfo: {} // 当前登录用户数据信息
    }
  },
  computed: {
    ...mapGetters({
      NOW_USER_GETTERS: 'user/now_user_getters'
    })
  },
  methods: {
    ...mapMutations({
      SET_NOW_USER_MUTATIONS: 'user/set_now_user_mutations'
    }),

    // 点击退出
    handleLogout () {
      // 弹框询问
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '确定退出登录吗?'
        })
        .then(() => {
          // 确定按钮
          this.SET_NOW_USER_MUTATIONS({}) // 设置为空对象 清除vuex的用户信息
        })
        .catch(() => {

        })
    },
    // 点击phone图标登录
    handleImageLogin () {
      this.$router.push('/login')
    },
    // 请求登录用户的个人信息
    async requestUserInfo () {
      const result = await getUserInfomation()
      console.log(result, '请求的用户个人信息')
      if (result.message === 'OK') {
        this.currentUserInfo = result.data
      }
    }
  },
  created () {
    this.requestUserInfo()
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
