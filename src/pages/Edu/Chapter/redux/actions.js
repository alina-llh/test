import { reqGetCourse } from '@api/edu/course'
import { reqGetChapter, reqDelChapter } from '@api/edu/chapter'
import { reqGetLesson, reqDelLesson, } from '@api/edu/lesson'
import { GET_COURSELIST, GET_CHAPTERLIST, GET_LESSONLIST, DEL_CHAPTERLIST, DEL_LESSONLIST } from './contants'
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

// 批量删除课程 课时
function delChapterListSync (data) {
  return { type: DEL_CHAPTERLIST, data }
}
function delLessonListSync (data) {
  return { type: DEL_LESSONLIST, data }
}
export function delChapterList (id) {
  return dispatch => {
    return reqDelChapter(id).then((res) => {
      dispatch(delChapterListSync(id))
    })
  }
}
export function delLessonList (id) {
  return dispatch => {
    return reqDelLesson(id).then((res) => {
      dispatch(delLessonListSync(id))
    })
  }
}