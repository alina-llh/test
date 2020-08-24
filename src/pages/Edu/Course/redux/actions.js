import { reqGetCourse } from '@api/edu/course'
import { COURSE_ALL} from './constans'
function getCourseAllListSync (data) {
  return { type: COURSE_ALL, data }
}
export function getCourseAllList() {
  return dispatch => {
   return reqGetCourse().then(req => {
      dispatch(getCourseAllListSync(req))
    })
  }
}