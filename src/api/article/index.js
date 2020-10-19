/**
 * 导出和文章相关的接口
 */
import axios from '../request'

/**
 * 频道新闻推荐
 * @param {*} data {channel_id,timestamp,with_top}
 */
export const articleRecommend = (data) => {
  const URL = '/app/v1_1/articles'
  return axios.get(URL, { params: data })
}
