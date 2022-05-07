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

// 请求图片
export const getImage = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 收藏图片
export const collectImage = (imageID, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageID}`,
    data: {
      collect
    }
  })
}

// 删除素材
export const deleteImage = imageID => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageID}`
  })
}
