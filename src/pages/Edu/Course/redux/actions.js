import { COUSRSELIST } from './constants'
import { reqGetCourseList } from '@api/edu/course'
function getCourseListSync (data) {
  return { type: COUSRSELIST, data }
}
export function getCourseList () {
  return dispatch => {
    return reqGetCourseList().then(res => {
      dispatch(getCourseListSync(res))
    })
  }
}