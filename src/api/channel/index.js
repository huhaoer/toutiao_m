/**
 * 导出和频道相关的接口
 */
import axios from '../request'

/**
 * 获取所有的频道列表数据
 * @param {*} data {mobile}
 */
export const getAllChannels = () => {
  const URL = '/app/v1_0/channels'
  return axios.get(URL)
}

/**
 * 添加对应频道列表
 * @param {*} data channels :[{id , seq}]
 */
export const addChannels = data => {
  const URL = '/app/v1_0/user/channels'
  return axios({
    method: 'PATCH',
    url: URL,
    data
  })
}

/**
 * 删除频道数据
 * @param {*} data {channelId 频道id}
 */
export const deleteChannels = channelId => {
  const URL = `/app/v1_0/user/channels/${channelId}`
  return axios({
    method: 'DELETE',
    url: URL
  })
}
