<template>
  <div class="search-result">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell
          v-for="article in list"
          :key="article.art_id"
          :title="article.title"
        />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [], // 渲染的文章结果列表数据
      loading: false, // 加载中效果
      finished: false, // 是否加载完毕
      page: 1, // 当前页码
      per_page: 20 // 每一页查询数量
    }
  },
  props: {
    searchText: { // 搜索关键字
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 1.请求数据
      const { data } = await getSearchResults({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      })

      // 2.数据赋值
      this.list.push(...data.results)

      // 3.关闭loading
      this.loading = false

      // 4.判断是否还有数据
      if (data.results.length > 0) {
        // 有数据
        this.page++
      } else {
        // 没数据
        this.finished = true
      }
    }
  }
}
</script>

<style lang='less' scoped>
// 将顶部输入框显示在最上面，不随页面滚动，需要固定下面的搜索结果界面，让他超出滚动
// 修改fix定位为absolute定位,fix定位会出现滑动bug

.search-result {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: calc(100% - 54px);
    margin-top: 54px;
    overflow-y: auto;
}
</style>
