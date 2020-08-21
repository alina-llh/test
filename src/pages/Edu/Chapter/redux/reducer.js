import { GET_COURSELIST, GET_CHAPTERLIST, GET_LESSONLIST } from './contants'
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
    default:
      return prevsState;
  }
}