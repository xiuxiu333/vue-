// 列表展开关闭
export const collapse = ({commit}, collapse) => {
  commit('collapse', collapse)
}
// 存放vuex的核心处理函数
export const setPageTitle = ({commit}, pageTitle) => {
  // 对应mutation.js中的getMsg方法
  commit({
    type: 'setPageTitle',
    pageTitle
  })
}
export const addVisitedViews = ({commit}, view) => {
  commit('ADD_VISITED_VIEWS', view)
}
export const delVisitedViews = ({commit, state}, view) => {
  return new Promise((resolve) => {
    commit('DEL_VISITED_VIEWS', view)
    resolve([...state.visitedViews])
  })
}
export const delOthersViews = ({commit, state}, view) => {
  return new Promise((resolve) => {
    commit('DEL_OTHERS_VIEWS', view)
    resolve([...state.visitedViews])
  })
}
export const delAllViews = ({commit, state}) => {
  return new Promise((resolve) => {
    commit('DEL_ALL_VIEWS')
    resolve([...state.visitedViews])
  })
}
