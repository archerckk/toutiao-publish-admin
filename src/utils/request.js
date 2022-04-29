/**
 * 基于 axios封装请求模块
 **/

import axios from 'axios'
import JsonBigInt from 'json-bigint'

// 我们通过这个实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 请求的基础路径
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      // console.log(data)
      return JsonBigInt.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      return data
    }
  }]
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const user = JSON.parse(window.localStorage.getItem(('user')))
  // console.log(user)
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器

export default request
// 谁要使用就加载 request 模块
