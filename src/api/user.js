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
export const getUserProfile = data => {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile',
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // },
    data
  })
}

// 更新个人头像
export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}

// 编辑用户资料
export const updateUser = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
