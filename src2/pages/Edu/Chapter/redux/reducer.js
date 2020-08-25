import { GET_COURSELIST, GET_CHAPTERLIST, GET_LESSONLIST, DEL_CHAPTERLIST, DEL_LESSONLIST } from './contants'
const initState = {
  courseList: [],
  chapterList: []
}
export default function chapter (prevsState = initState, actions) {
  switch (actions.type) {
    case GET_COURSELIST:
      return { ...prevsState, courseList: actions.data };
    // 
    case GET_CHAPTERLIST:
      actions.data.forEach(item => {
        item.children = []
      });
      return { ...prevsState, chapterList: actions.data };
    case GET_LESSONLIST:
      const newState = [...prevsState.chapterList]
      newState.forEach(item => {
        if (item._id === actions.data.id) {
          item.children = actions.data.res
        }
      })
      return { ...prevsState, chapterList: newState };
    case DEL_CHAPTERLIST://批量删除章节
      const newChapter = [...prevsState.chapterList]
      console.log(actions);
      const newChapterList = newChapter.filter(item => {
        if (actions.data.indexOf(item._id) > -1) {
          return false
        }
        return true
      })
      return { ...prevsState, chapterList: newChapterList }
    case DEL_LESSONLIST://删除课时
      const newChapters = [...prevsState.chapterList]
      newChapters.forEach(item => {
        item.children = item.children.filter(items => {
          if (actions.data.indexOf(items._id) > -1) {
            return false
          }
          return true
        })
      })
      return {
        ...prevsState, chapterList: newChapters
      }
    default:
      return prevsState;
  }
}