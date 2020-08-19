import { GET_SUBJECT_LIST,GET_EDUSUBJECT_LIST } from './constants'

const initSubjectList = {
  total: 0, // 总数
  items: [] // 课程分类数据
}

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach(item=>{
        // 每一项加一个children
        item.children=[]
      })
      return action.data

    case GET_EDUSUBJECT_LIST:
      // 二级分类列表
      let children=action.data.items
      let parent=prevState.items
      // 如果存在则显示不存在则不显示
      children.length&& parent.forEach(item=>{
          if(item._id===children[0].parentId){
            item.children=children
          }
        })
    return {...prevState,
            items:parent
        }

    default:
      return prevState
  }
}

