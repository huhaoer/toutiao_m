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

/**
 * 获取文章详情
 * @param {*} articleId {文章id}
 */
export const getArticleDetail = (articleId) => {
  const URL = `/app/v1_0/articles/${articleId}`
  return axios.get(URL)
}
