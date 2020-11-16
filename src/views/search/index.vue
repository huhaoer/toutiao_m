<template>
  <div class="search">
      <!-- 搜索栏 -->
      <!-- <form action="/" class="search-header"> -->
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            @focus="onFocus"
            shape="round"
            background="#3196fa"
            class="search-header"
        />
        <!-- </form> -->
      <!-- /搜索栏 -->
      <!-- 搜索结果 -->
        <search-result
          v-if="isSearchResult"
          :search-text="searchText"
        />
      <!-- /搜索结果 -->

      <!-- 联想输入 -->
        <search-suggestion
          v-else-if="searchText"
          :search-text="searchText"
          @onSuggestionSearch="onSearch"
        />
      <!-- /联想输入 -->

      <!-- 搜索历史 -->
       <search-history
          v-else
          :history-list="historyList"
          @onHistorySearch="onSearch"
          @onHistoryListChange="historyList = $event"
       />
      <!-- /搜索历史 -->
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      searchText: '', // 输入框关键字
      isSearchResult: false, // 是否有搜索结果
      historyList: [] // 搜索历史数据列表
    }
  },
  components: {
    SearchResult,
    SearchSuggestion,
    SearchHistory
  },
  computed: {
    ...mapGetters({
      HISTORY_LIST: 'search/history_list_getters'
    })
  },
  watch: {
    historyList () {
      // 通过监听传递的历史记录数据的变化进行持久化  1.点击全部删除时，主动触发父组件函数，将数组变为空数组  2.点击删除某一项时，会通过索引修改当前数组
      this.HISTORY_LIST_MUTATIONS([...this.historyList]) // 数据持久化
    }
  },
  methods: {
    ...mapMutations({
      HISTORY_LIST_MUTATIONS: 'search/set_history_list_mutations'
    }),

    //   输入框进行关键字搜索时触发  1.回车键进行搜索  2.点击联想关联字搜索
    onSearch (keyWord) {
      // 1.修改当前输入框关键字
      this.searchText = keyWord

      // 2.触发显示结果组件页面
      this.isSearchResult = true

      // 3.每次点击搜索后记录当前关键字
      const _index = this.historyList.indexOf(keyWord)// 当前关键字是否在历史列表中
      if (_index !== -1) {
        this.historyList.splice(_index, 1) // 如果当前历史数组中有当前输入的关键字，那么获取下标索引从数组中删除该项
      }
      // 在数组开头添加一项
      this.historyList.unshift(keyWord)

      // 4.保存到vuex中 避免同一引用，重新创建一个数组
      // this.HISTORY_LIST_MUTATIONS([...this.historyList])
    },

    // 点击输入框旁边的取消搜索按钮 为了避免直接访问的/search页面，不适用返回上一页，使用返回首页
    onCancel () {
      this.$router.push({
        name: 'Home'
      })
    },

    // 获得焦点时触发
    onFocus () {
      this.isSearchResult = false // 隐藏搜索结果页面
    },

    // 初始判断用户是否登录 加载本地搜索历史还是请求线上搜索历史记录
    async getLocalOrOnline () {
      // 1.判断是否登录
      // 登录了 获取线上记录  只能获取线上的历史记录但是无法删除，只使用本地的记录
      // const { data } = await getSearchHistory()
      // 未登录 获取本地缓存   免同一引用，重新创建一个数组
      this.historyList = [...this.HISTORY_LIST]
    }
  },
  created () {
    this.getLocalOrOnline()
  }
}
</script>

<style lang='less' scoped>
.search {
    .search-header {
        /deep/ .van-search__action {
            color: #fff;
            border-radius: 30px;
            &:active {
                background-color: rgba(255, 255, 255, .1);
            }
        }
    }
}
</style>
