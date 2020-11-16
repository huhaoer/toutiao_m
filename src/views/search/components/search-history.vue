<template>
  <div class="search-history">
    <van-cell title="搜索历史" center>
        <div v-if="isShowDelete">
            <span @click="onDeleteAll">全部删除</span>
            <span class="suggestion__comolete" @click="isShowDelete = false">完成</span>
        </div>
        <van-icon name="delete" v-else @click="isShowDelete = true"/>
    </van-cell>
    <van-cell
        :title="history"
        v-for="(history, index) in historyList"
        :key="index"
        @click="handleHistoryClick(history, index)"
    >
        <van-icon name="close" v-if="isShowDelete"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    historyList: { // 历史记录数组
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isShowDelete: false // 是否展示删除图标
    }
  },
  methods: {
    // 点击每一项历史记录 传递当前点击项内容和索引
    handleHistoryClick (his, ind) {
      console.log(his, ind)
      if (this.isShowDelete) {
        //   删除状态下点击每一项才是删除，否则是进行搜索
        this.historyList.splice(ind, 1) // 根据当前传递的索引值，删除数据列表中的这一项，改变了传递过来的数据值，在父组件中进行持久化
        return
      }

      // 非删除状态下，点击进入搜索
      this.$emit('onHistorySearch', his) // 触发父组件函数，传递当前点击的内容文字进行搜索
    },

    // 点击全部删除按钮
    onDeleteAll () {
      // 不能直接修改父组件传递的引用类型(数组 对象)。但是可以修改某一项，不能直接赋值修改  主动触发父组件事件，让父组件更改
      this.$emit('onHistoryListChange', []) // 主动触发事件，修改传递为空数组
    }
  }
}
</script>

<style lang='less' scoped>
.search-history {
    .suggestion__comolete {
        margin-left: 10px;
    }
}
</style>
