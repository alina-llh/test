// 导入发送异步请求的request方法.项目中所有的异步请求都是调用request方法实现的
import request from '@utils/request'

const BASE_URL = '/admin/edu/course'

// 假设本地服务器接口还没写完.先使用mock
// const MOCK_URL = 'http://localhost:8888/admin/edu/subject'

// 获取课程列表 http://localhost:5000/admin/edu/course
export function reqGetCourse () {
  return request({
    url: `${BASE_URL}`,
    method: 'GET'
  })
}

