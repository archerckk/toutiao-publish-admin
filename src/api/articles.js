/*
* 文章模块api
*/

import request from '@/utils/request'

// 请求文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

// 请求文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const delArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 新建文章
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

// 获取指定文章
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 编辑文章
export const editArticle = (articleId, data, draft) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}

// 编辑文章
export const updateCommentStatus = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
