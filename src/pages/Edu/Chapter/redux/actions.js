import { reqGetCourseList } from '@api/edu/course'
import { reqGetChapterList } from '@api/edu/chapter'
import { reqGetLessonList } from '@api/edu/lesson'
import { COURSELEST, CHAPTERLIST, LESSONLIST } from './constants'
// 获取所有课程列表
function CourseListSync (data) {
  return { type: COURSELEST, data }
}
export function CourseList () {
  return dispatch => {
    reqGetCourseList().then(response => {
      dispatch(CourseListSync(response))
    })
  }
}

// 获取章节列表
function chapterListSync (data) {
  return { type: CHAPTERLIST, data }
}
export function chapterList (chapterId) {
  return dispatch => {
    return reqGetChapterList(chapterId).then(response => {
      dispatch(chapterListSync(response.items))
    })
  }
}

// 章节子列表
function LessonListSync (data) {
  return { type: LESSONLIST, data }
}
export function LessonList (id) {
  return dispatch => {
    return reqGetLessonList(id).then(response => {
      dispatch(LessonListSync({response, id}))
    })
  }
}
