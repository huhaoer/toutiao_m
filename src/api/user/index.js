/**
 * 导出和用户相关的接口
 */
import axios from '../request'

/**
 * 获取验证码
 * @param {*} data {mobile}
 */
export const getSmsCode = (data) => {
  const URL = `/app/v1_0/sms/codes/${data.mobile}`
  return axios.get(URL)
}

/**
 * 用户登录
 * @param {*} data {mobile,code}
 */
export const login = (data) => {
  const URL = '/app/v1_0/authorizations'
  return axios.post(URL, data)
}

/**
 * 获取用户自己的信息
 */
export const getUserInfomation = () => {
  const URL = '/app/v1_0/user'
  return axios.get(URL)
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  const URL = '/app/v1_0/user/channels'
  return axios.get(URL)
}
