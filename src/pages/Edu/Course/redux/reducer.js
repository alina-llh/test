import { COUSRSELIST } from './constants'

const initCourse = []
export default function courseList (prevState = initCourse, actions) {
  switch (actions.type) {
    case COUSRSELIST:
      return actions.data
    default:
      return prevState;
  }
}