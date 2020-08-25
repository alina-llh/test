// 导入发送异步请求的request方法.项目中所有的异步请求都是调用request方法实现的
import request from '@utils/request'

const BASE_URL = '/admin/edu/course'

// http://localhost:5000/admin/edu/course

// 获取
export function reqGetCourseList () {
  return request({
    url: `${BASE_URL}`,
    method: 'GET'
  })
}