
import { COURSELEST, CHAPTERLIST, LESSONLIST, DELERECHAPTER, DELERELESSON } from './constants'
const initChapter = {
  coureslist: [],//课程
  chapterlist: []//课程章节
}
export default function chapter (pervState = initChapter, action) {
  switch (action.type) {
    case COURSELEST:
      return {
        ...pervState,
        coureslist: action.data
      };
    case CHAPTERLIST:
      action.data.forEach(item => {
        item.children = []
      });
      return {
        ...pervState,
        chapterlist: action.data
      };
    case LESSONLIST:
      const newPervstate = [...pervState.chapterlist]
      newPervstate.forEach(item => {
        if (item._id === action.data.id) {
          item.children = action.data.response
        }
      })
      return {
        ...pervState,
        chapterlist: newPervstate
      };
    // 批量删除课程
    case DELERECHAPTER:
      const chapters = [...pervState.chapterlist]
      const newChapters = chapters.filter(item => {
        if (action.data.indexOf(item._id) > -1) {
          return false
        }
        return true
      })
      return {
        ...pervState,
        chapterlist: newChapters
      }
    // 批量删除章节
    case DELERELESSON:
      let lessonChapters = [...pervState.chapterlist]
      lessonChapters.forEach(item => {
        item.children = item.children.filter(item => {
          if (action.data.indexOf(item._id) > -1) {
            return false
          }
          return true
        })
      })
      return {
        ...pervState,
        chapterlist: lessonChapters
      }


    default:
      return pervState;
  }
}