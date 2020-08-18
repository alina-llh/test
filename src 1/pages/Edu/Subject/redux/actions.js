import { reqGetSubject,reqEduSubject } from '@api/edu/subject'

import { GET_SUBJECT_LIST,GET_EDUSUBJECT_LIST } from './constants'
/**
 * 获取/搜索 用户分页数据
 */
const getSubjectListSync = list => ({
  type: GET_SUBJECT_LIST,
  data: list
})

export const getSubjectList = (page, limit) => {
  return dispatch => {
    return reqGetSubject(page, limit).then(response => {
      dispatch(getSubjectListSync(response))
      return response.total
    })
  }
}

// 获取二级分类列表
const getEduSubjectListSync = list => ({
  type: GET_EDUSUBJECT_LIST,
  data: list
})

export const getEduSubjectList = (parentId) => {
  return dispatch => {
    return reqEduSubject(parentId).then(response => {
      dispatch(getEduSubjectListSync(response))
      return response.total
    })
  }
}
