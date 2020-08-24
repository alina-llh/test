import {
  reqGetSubject, reqEduSubject, reqUpdateSubject, deleteSubject
} from '@api/edu/subject'

import {
  SUBJRCTLIST, EDUSUBJCTLIST, UPDATESUBJECT, DELETESUBJECT
} from './constants'
/**
 * 获取/搜索 用户分页数据
 */
const getSubjectListSync = list => ({
  type: SUBJRCTLIST,
  data: list
})

// 获取课程数据列表
export const getSubjectList = (page, limit) => {
  return dispatch => {
    return reqGetSubject(page, limit).then(response => {
      dispatch(getSubjectListSync(response))
      return response.total
    })
  }
}
const getEdujectListSync = list => ({
  type: EDUSUBJCTLIST,
  data: list
})
// 获取二级课程数据列表
export const getEdujectList = (parentId) => {
  return dispatch => {
    return reqEduSubject(parentId).then(response => {
      dispatch(getEdujectListSync(response))
      return response.total
    })
  }
}

// 更新页面发送请求
const getUpdateSubjectSync = data => ({
  type: UPDATESUBJECT,
  data
})
// 更新一级二级课程数据列表
export const getUpdateSubject = (title, id) => {
  return dispatch => {
    return reqUpdateSubject(title, id).then(response => {
      dispatch(getUpdateSubjectSync({ title, id }))
      return response
    })
  }
}
// 删除页面发送请求
const deleteSubjectSync = data => ({
  type: DELETESUBJECT,
  data
})
// 删除一级二级课程数据列表
export const getDeleteSubject = (id) => {
  return dispatch => {
    return deleteSubject(id).then(response => {
      dispatch(deleteSubjectSync(id))
      return response
    })
  }
}

