<template>
  <div class="popup-content">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <div class="myChannel__title" slot="title">我的频道</div>
      <van-button
        type="danger"
        size="mini"
        round
        plain
        class="myChannel__btn"
        @click="isEditStatus = !isEditStatus"
        >{{ isEditStatus ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(uChannel, index) in userChannels"
        :key="uChannel.id"
        :text="uChannel.name"
        :icon="(isEditStatus && index !== 0) ? 'close' : ''"
        class="channel__item"
        :class="{ active: activeChannel === index}"
        @click="handleUserEditOrJump(uChannel, index)"
      />
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell center>
      <div class="channelSup__title" slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="rChannel in recommandChannels"
        :key="rChannel.id"
        :text="rChannel.name"
        class="channel__item"
        @click="handleAddChannel(rChannel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addChannels, deleteChannels } from '@/api/channel'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PopupContent',
  props: {
    userChannels: { // 传递过来的用户频道列表数据
      type: Array,
      required: true
    },
    activeChannel: { // 传递过来的当前高亮显示的频道索引值
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有的频道列表数据
      isEditStatus: false // 是否在编辑状态
    }
  },
  methods: {
    ...mapMutations({
      SET_USER_CHANNELS_MUTATIONS: 'channel/set_user_channels_mutations' // 未登录频道本地持久化
    }),
    /**
     * 获取所有的频道列表数据，然后推荐频道就是所有频道数据减去当前我的频道数据，使用计算属性
     */
    async getAllChannels () {
      const data = await getAllChannels()
      this.allChannels = data.data.channels // 赋值所有频道列表
    },
    /**
     * 点击下面的推荐频道，会添加到上面的用户频道，传递参数为当前点击的频道对象数据
     */
    async handleAddChannel (channel) {
      this.userChannels.push(channel)
      // 给用户频道添加这个数据，同时推荐频道是根据计算属性计算的出来的，所以会同时消是在推荐频道中

      if (this.NOW_USER_GETTERS.token) {
        // 用户已经登录 数据持久化到数据库接口  传入当前点击频道的id 和其对应的排序顺序，由于提前Push了数组,直接取长度即可
        await addChannels({
          channels: [
            {
              id: channel.id,
              seq: this.userChannels.length
            }
          ]
        })
      } else {
        // 数据持久化到本地存储
        this.SET_USER_CHANNELS_MUTATIONS([...this.userChannels])
      }
    },

    /**
     * 用户频道的每一个选项操作 编辑状态下删除 非编辑状态下跳转到对应页面
     * ind: 当前点击的选项索引值
     */
    handleUserEditOrJump (uChannel, ind) {
      if (this.isEditStatus && ind !== 0) {
        // 编辑状态且推荐频道是不能点击的
        this.deleteUserChannel(uChannel, ind)
      } else if (!this.isEditStatus) {
        // 点击频道跳转到对应的频道页面
        this.switchToChannel(ind)
      }
    },

    // 用户频道点击状态处理函数 删除频道
    async deleteUserChannel (uChannel, index) {
      // 如果点击删除的频道是当前激活频道之前的频道的话，那么对应的触发事件应该修改当前激活频道的active值,避免修改了索引值，但是频道不对应
      if (index <= this.activeChannel) {
        this.$emit('update-active', this.activeChannel - 1)
      }
      // 用户频道列表中删除该选项
      this.userChannels.splice(index, 1)

      if (this.NOW_USER_GETTERS.token) {
        // 已经登录，删除的频道持久化到数据库  传递当前点击删除频道的id
        await deleteChannels(uChannel.id)
      } else {
        // 未登录 删除后持久化到本地存储  避免修改引用，重新赋值为一个数据结构值
        this.SET_USER_CHANNELS_MUTATIONS([...this.userChannels])
      }
    },

    // 点击进入对应的用户频道
    switchToChannel (ind) {
      // 1.取消弹框显示 触发自定义事件
      this.$emit('close-modal')
      // 2. 根据点击的频道索引跳转到首页对应的界面
      this.$emit('update-active', ind)
    }
  },
  computed: {
    ...mapGetters({
      NOW_USER_GETTERS: 'user/now_user_getters' // 用户登录信息 vuex
    }),
    // 计算属性，通过当前用户列表和所有列表数据计算出剩余的列表为推荐列表
    recommandChannels () {
      return this.allChannels.filter(ac => {
        return !this.userChannels.find(uc => {
          return uc.id === ac.id
        })
      })
    }
  },
  created () {
    this.getAllChannels()
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
    margin-top: 20px;
  }
  .channelSup__btn {
    width: 50px;
  }
  .channel__item {
    width: 80px;
    height: 43px;
    position: relative;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      /deep/ .van-icon-close {
        font-size: 0.42667rem;
        position: absolute;
        top: -7px;
        right: -4px;
        color: #ccc;
      }
      /deep/ .van-grid-item__text {
        color: #222;
        font-size: 14px;
        margin-top: 0;//清除有图标时文字顶部的距离
      }
    }
  }

  // 高亮文字颜色样式
  .active {
    /deep/ .van-grid-item__text {
      color: rgb(214, 49, 49)!important;
    }
  }
}
</style>
