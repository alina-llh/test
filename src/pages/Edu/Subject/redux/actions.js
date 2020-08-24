import { reqGetSubject, reqEduSubject, reqUpdateSubject, deleteSubject} from '@api/edu/subject'

import { GET_SUBJECT_LIST, GET_EDUSUBJECT_LIST, GET_UPDATESUBJECT_LIST ,GET_DELETESUBJECT_LIST} from './constants'
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

// 更新数据

const getUpdateSubjectListSync = data => ({
  type: GET_UPDATESUBJECT_LIST,
  data
})

export const getUpdateSubjectList = (title, parentId) => {
  return dispatch => {
    return reqUpdateSubject(title, parentId).then(response => {
      dispatch(getUpdateSubjectListSync({ parentId, title }))
      return response
    })
  }
}

// 删除数据
const delteSubjectListSync = data => ({
  type: GET_DELETESUBJECT_LIST,
  data
})

export const delteSubjectList = (id) => {
  return dispatch => {
    return deleteSubject(id).then(response => {
      dispatch(delteSubjectListSync(id))
      return response
    })
  }
}