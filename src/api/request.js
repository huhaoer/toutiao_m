import axios from 'axios'
import store from '@/store' // 在非组件模块中引入store 和组件中的this.$sotre是同一个东西
import JSONbig from 'json-bigint' // 处理js数字溢出

const axiosInstance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  timeout: 10000,
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      // 转换成功 返回结果
      return JSONbig.parse(data)
    } catch (error) {
      // 转换失败 axios内部会使用JSON.parse()进行转换
      return data
    }
  }]
})

// 请求拦截器 添加认证请求头
axiosInstance.interceptors.request.use(config => {
  const { token } = store.state.user.now_user // 从user模块中解析出state数据
  if (token) {
    // 如果有token值就添加上请求头
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

axiosInstance.interceptors.response.use(response => {
  return response.data
}, err => {
  return Promise.reject(err)// 如果有错误的话 得到的数据是自己返回的selfMsg对象 而不是返回的response数据
})
export default axiosInstance
