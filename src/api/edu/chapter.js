import request from '@utils/request'

const BASE_URL = '/admin/edu/chapter'

// http://localhost:5000/admin/edu/course

// 获取讲师
export function reqGetChapterList (courseId) {
  return request({
    url: `${BASE_URL}/1/5`,
    method: 'GET',
    params: {
      courseId
    }
  })
}

// http://localhost:5000/admin/edu/chapter/batchRemove 批量删除课程
export function delChapterList (idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: 'delete',
    data: {
      idList
    }
  })
}
