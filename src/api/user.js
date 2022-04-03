/*
* 用户模块api
 */

// 登录请求
import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取个人信息
export const getUserProfile = (data) => {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile',
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODA0Mzc4MTQsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.JUr1sN5ltb-9F0Uz1yveFIsrsj0DK_XapeR456IqDZY'
    },
    data
  })
}
