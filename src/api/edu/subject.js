// 导入发送异步请求的request方法.项目中所有的异步请求都是调用request方法实现的
import request from '@utils/request'

const BASE_URL = '/admin/edu/subject'

// 假设本地服务器接口还没写完.先使用mock
// const MOCK_URL = 'http://localhost:8888/admin/edu/subject'

// 获取讲师
export function reqGetSubject (page, limit) {
  return request({
    // 注意: 如果url地址只写了路径, 会被项目中配置的proxy拦截,然后将本地服务器的主机名拼接上去.
    // 我们现在假设本地服务的接口还没有完成.要使用mock服务器.应该将mock服务的主机名直接写在url地址里面.这样proxy就不会拦截了
    url: `${BASE_URL}/${page}/${limit}`,
    method: 'GET'
  })
}

// http://localhost:5000/admin/edu/subject/get/:parentId 
// 获取二级分类ID
export function reqEduSubject (parentId) {
  return request({
    // 注意: 如果url地址只写了路径, 会被项目中配置的proxy拦截,然后将本地服务器的主机名拼接上去.
    // 我们现在假设本地服务的接口还没有完成.要使用mock服务器.应该将mock服务的主机名直接写在url地址里面.这样proxy就不会拦截了
    url: `${BASE_URL}/get/${parentId} `,
    method: 'GET'
  })
}

// http://localhost:5000/admin/edu/subject/save
// post 增加课程
export function reqAddSubject (title, parentId) {
  return request({
    // 注意: 如果url地址只写了路径, 会被项目中配置的proxy拦截,然后将本地服务器的主机名拼接上去.
    // 我们现在假设本地服务的接口还没有完成.要使用mock服务器.应该将mock服务的主机名直接写在url地址里面.这样proxy就不会拦截了
    url: `${BASE_URL}/save `,
    method: 'post',
    data: {
      title,
      parentId
    },
  })
}

// http://localhost:5000/admin/edu/subject/update
// put 更新数据
export function reqUpdateSubject (title, id) {
  return request({
    // 注意: 如果url地址只写了路径, 会被项目中配置的proxy拦截,然后将本地服务器的主机名拼接上去.
    // 我们现在假设本地服务的接口还没有完成.要使用mock服务器.应该将mock服务的主机名直接写在url地址里面.这样proxy就不会拦截了
    url: `${BASE_URL}/update `,
    method: 'put',
    data: {
      title,
      id
    },
  })
}

// 删除数据的请求 delete
// http://localhost:5000/admin/edu/subject/remove/:id

export function deleteSubject (id) {
  return request({
    // 注意: 如果url地址只写了路径, 会被项目中配置的proxy拦截,然后将本地服务器的主机名拼接上去.
    // 我们现在假设本地服务的接口还没有完成.要使用mock服务器.应该将mock服务的主机名直接写在url地址里面.这样proxy就不会拦截了
    url: `${BASE_URL}/remove/${id} `,
    method: 'delete',
  })
}

// http://localhost:5000/admin/edu/subject/get
export function getSubject () {
  return request({
    url: `${BASE_URL}`,
    method: 'get',
  })
}