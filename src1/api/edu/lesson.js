import request from '@utils/request'

const BASE_URL = '/admin/edu/lesson'
// http://localhost:5000/admin/edu/lesson/get/:chapterId
// 获取讲师
export function reqGetLessonList (chapterId) {
  return request({
    // 注意: 如果url地址只写了路径, 会被项目中配置的proxy拦截,然后将本地服务器的主机名拼接上去.
    // 我们现在假设本地服务的接口还没有完成.要使用mock服务器.应该将mock服务的主机名直接写在url地址里面.这样proxy就不会拦截了
    url: `${BASE_URL}/get/${chapterId}`,
    method: 'GET'
  })
}