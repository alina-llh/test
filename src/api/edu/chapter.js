
// 导入发送异步请求的request方法.项目中所有的异步请求都是调用request方法实现的
import request from '@utils/request'

const BASE_URL = '/admin/edu/chapter'

// 假设本地服务器接口还没写完.先使用mock
// const MOCK_URL = 'http://localhost:8888/admin/edu/subject'

// 获取章节列表 http://localhost:5000/admin/edu/chapter/:page/:limit 
export function reqGetChapter (courseId) {
  return request({
    url: `${BASE_URL}/1/5`,
    method: 'GET',
    params: {
      courseId
    }
  })
}

// 批量删除多个章节 http://localhost:5000/admin/edu/chapter/batchRemove
export function reqDelChapter (idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: 'delete',
    data: {
      idList
    }
  })
}