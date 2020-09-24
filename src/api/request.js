import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  timeout: 10000
//   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

axiosInstance.interceptors.request.use(config => {
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
