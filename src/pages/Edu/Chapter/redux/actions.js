import { reqGetCourseList } from '@api/edu/course'
import { reqGetChapterList, delChapterList } from '@api/edu/chapter'
import { reqGetLessonList, delLessonList } from '@api/edu/lesson'
import { COURSELEST, CHAPTERLIST, LESSONLIST,DELERECHAPTER, DELERELESSON } from './constants'
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
      dispatch(LessonListSync({ response, id }))
    })
  }
}

// 删除章节
function delChapterListSync (data) {
  return { type: DELERECHAPTER, data }
}
// 删除课时
function delLessonListSync (data) {
  return { type: DELERELESSON, data }
}

// 批量删除章节
export function delChapterLists (idList) {
  return dispatch => {
    return delChapterList(idList).then(response => {
      dispatch(delChapterListSync(idList))
    })
  }
}
// 批量删除课时
export function delLessonLists (idList) {
  return dispatch => {
    return delLessonList(idList).then(response => {
      dispatch(delLessonListSync(idList))
    })
  }
}

