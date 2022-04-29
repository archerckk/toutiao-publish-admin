import request from '@/utils/request'

/*
* 图片模块api
*/

// 上传图片
export const imageUpload = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}
