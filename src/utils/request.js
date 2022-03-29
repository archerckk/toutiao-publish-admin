/**
 * 基于 axios封装请求模块
 **/

import axios from 'axios'

// 我们通过这个实例
const request=axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求的基础路径
})
// 请求拦截器
// 响应拦截器

export default request
// 谁要使用就加载 request 模块
