
import { COURSELEST, CHAPTERLIST, LESSONLIST } from './constants'
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
    default:
      return pervState;
  }
}