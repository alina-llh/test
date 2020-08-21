import {
  SUBJRCTLIST,
  EDUSUBJCTLIST,
  UPDATESUBJECT,
  DELETESUBJECT
} from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细user数据
};

export default function subjectList (prevState = initSubjectList, action) {
  switch (action.type) {
    case SUBJRCTLIST://列表展现数据
      action.data.items.forEach(item => {
        item.children = []
      })
      return action.data;
    case EDUSUBJCTLIST://二级列表展现数据
      let children = action.data.items
      let parent = prevState.items
      children.length && parent.forEach(item => {
        // 如果当前项的父元素ID===二级展现数据的父元素Id
        if (item._id === children[0].parentId) {
          item.children = children
        }
      })
      return {
        ...prevState,
        items: parent
      }
    // 更新数据
    case UPDATESUBJECT:
      console.log(action, prevState)
      prevState.items.forEach(item => {

        // 如果当前id===action里的id
        if (item._id === action.data.id) {
          item.title = action.data.title
          return
        }
        item.children.forEach(setItem => {
          console.log(setItem)
          if (setItem._id === action.data.id) {
            setItem.title = action.data.title
            return
          }
        })
      })
      return {
        ...prevState
      }
    // 删除数据
    case DELETESUBJECT:
      const newItems = [...prevState.items]
      newItems.forEach((item, index) => {
        if (item._id === action.data) {
          newItems.splice(index, 1)
        }
        item.children.forEach((childrenItem, index) => {
          if (childrenItem._id === action.data) {
            item.children.splice(index, 1)
          }
        })
      })
      return {
        ...prevState,
        items: newItems
      }
    default:
      return prevState;
  }
}
