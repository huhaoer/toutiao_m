<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestionList"
      :key="index"
      @click="handleSuggestionClick(str)"
    >
      <!-- 搜索文字高亮显示 经过highLight方法处理 -->
      <div slot="title" v-html="highLight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash' // lodash工具库

export default {
  name: 'SearchSuggestion',
  components: {},
  data () {
    return {
      suggestionList: [] // 关键字数据列表
    }
  },
  props: {
    searchText: { // 传递给组件的搜索关键字
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // 输入内容时，使用防抖函数，在规定时间内触发该事件时重新计时
      handler: debounce(async function () {
        // 当监听到属性发生变化时 执行的函数
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestionList = data.options
      }, 200),
      immediate: true // 立即执行
    }
  },
  methods: {
    // 处理搜索文字高亮
    highLight (str) {
      const exp = new RegExp(this.searchText, 'gi') // 匹配正则 匹配当前输入关键字 全局匹配忽略大小写
      return str.replace(exp, `<span style="color:red">${this.searchText}</span>`)
    },

    // 点击联想建议的每个选项触发事件 向父组件触发当前点击事件，传递当前点击的关键字参数
    handleSuggestionClick (str) {
      this.$emit('onSuggestionSearch', str)
    }
  }
}
</script>

<style>

</style>
