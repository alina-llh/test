import { reqGetCourse } from '@api/edu/course'
import { reqGetChapter } from '@api/edu/chapter'
import { reqGetLesson } from '@api/edu/lesson'
import { GET_COURSELIST, GET_CHAPTERLIST, GET_LESSONLIST } from './contants'
// 获取课程列表
function courseListSync (data) {
  return { type: GET_COURSELIST, data }
}
export function courseList () {
  return dispatch => {
    reqGetCourse().then((res) => {
      dispatch(courseListSync(res))
    })
  }
}
// 获取章节列表
function chapterListSync (data) {
  return { type: GET_CHAPTERLIST, data }
}
export function getChapterList (id) {
  return dispatch => {
    reqGetChapter(id).then((res) => {
      dispatch(chapterListSync(res.items))
    })
  }
}
// 获取课时列表
function lessonListSync (data) {
  return { type: GET_LESSONLIST, data }
}
export function getLessonList (id) {
  return dispatch => {
    return reqGetLesson(id).then((res) => {
      dispatch(lessonListSync({ res, id }))
    })
  }
}