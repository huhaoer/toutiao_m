<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshLoading"
      :success-text="refreshSuccessText"
      success-duration="1500"
      animation-duration="500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="article in articleList"
          :key="article.art_id"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { articleRecommend } from '@/api/article'
import ArticleItem from '@/components/article-item' // 每一个文章列表组件
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      articleList: [], // 文章列表数据
      loading: false, // 是否在加载中
      finished: false, // 是否加载完毕
      timestamp: null, // 加载文章时的时间戳，第一次为0，下次加载时为上一次返回数据的时间戳
      refreshLoading: false, // 下拉刷新是否加载中
      refreshSuccessText: '' // 下拉刷新时显示的文本
    }
  },
  methods: {
    async onLoad () {
      // 列表滑动时触发的事件
      // 1.获取数据
      const data = await articleRecommend({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })

      console.log(data, 'data')

      // 2.设置据列表,每次加载回来以push方式进行添加
      this.articleList.push(...data.data.results)

      // 3.本次加载状态完成
      this.loading = false

      // 4.数据全部加载完成
      if (data.data.results.length > 0) {
        // 还有数据，将返回数据的timestamp赋值，然后根据timestamp请求下一页数据
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据，设置加载结束
        this.finished = true
      }
    },
    async onRefresh () {
      // 下拉刷新时触发的事件
      console.log('refresh')
      // 1.请求数据,下拉刷新时传递当前时间戳，请求最新数据
      const data = await articleRecommend({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })

      // 2.将下拉刷新请求的数据追加到数据列表前面
      const { results } = data.data
      this.articleList.unshift(...results)

      // 3.设置下拉加载loading结束
      this.refreshLoading = false

      // 4.下拉加载成功文字显示
      this.refreshSuccessText = `刷新成功,更新${results.length}条数据`
    }
  }
}
</script>

<style lang='less' scoped>
.article-list {
  // 将中间部分固定，内容超出时滚动，需要减去上面头部的距离和下面tabbar的底部距离
  position: fixed;
  top: 89px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>
