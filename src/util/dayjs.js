/**
 * 处理dayjs库，进一步封装处理
 */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'

// 配置使用相对时间
dayjs.extend(relativeTime)

// 配置使用中文包
dayjs.locale('zh-cn')

// 将处理相对时间的方法做成全局过滤器提供给模板使用
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
