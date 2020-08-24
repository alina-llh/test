import { COURSE_ALL } from './constans'
const initCourseList = []
export default function courseList (prevState = initCourseList, actions) {
  switch (actions.type) {
    case COURSE_ALL:
      return actions.data
    default:
      return prevState;
  }
}