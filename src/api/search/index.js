/**
 * 导出和搜索相关的接口
 */
import axios from '../request'

/**
 * 获取搜索联想数据方法
 * @param {*} q {关键字}
 */
export const getSearchSuggestions = q => {
  const URL = '/app/v1_0/suggestion'
  return axios.get(URL, { params: { q } })
}

/**
 * 获取搜索结果
 * @param {Object} {page,per_page,q} {关键字}
 */
export const getSearchResults = data => {
  const URL = '/app/v1_0/search'
  return axios.get(URL, { params: data })
}

/**
 * 获取用户搜索历史
 * @param {Object} {page,per_page,q} {关键字}
 */
export const getSearchHistory = () => {
  const URL = '/app/v1_0/search/histories'
  return axios.get(URL)
}
