
import request from '@utils/request'

const BASE_URL = '/admin/edu/lesson'

// http://localhost:5000/admin/edu/lesson/get/:chapterId 所有章节课时
export function reqGetLesson (chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: 'GET'
  })
}

// http://localhost:5000/uploadtoken 七牛云管理
export function reqUploadtoken () {
  return request({
    url: `/uploadtoken`,
    method: 'GET'
  })
}

//http://localhost:5000/admin/edu/lesson/save 添加课时
export function addLesson (data) {
  return request({
    url: `${BASE_URL}/save`,
    method: 'post',
    data
  })
}
