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
