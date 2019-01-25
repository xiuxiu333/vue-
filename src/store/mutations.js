export const collapse = (state, view) => {
  state.isCollapse = view.isCollapse
}
// 存储订单列表tab
export const setOrderListTab = (state, view) => {
  state.orderListTab = view.activeName
  state.orderList = {currentPage: 1, pageSize: 20}
}
export const setOrderList = (state, view) => {
  state.orderList = {currentPage: view.currentPage, pageSize: view.pageSize}
}
// 改版store中各种状态的地方
export const ADD_VISITED_VIEWS = (state, view) => {
  if (state.visitedViews.some(v => v.name === view.name || !view.name)) return
  state.visitedViews.push({
    name: view.name,
    path: {path: view.path, query: view.query},
    title: view.meta.title
  })
  if (!view.meta.noCache) {
    state.cachedViews.push(view.name)
  }
}
export const DEL_VISITED_VIEWS = (state, view) => {
  for (const [i, v] of state.visitedViews.entries()) {
    if (v.path.path === view.path.path || v.path.path === view.path) {
      state.visitedViews.splice(i, 1)
      break
    }
  }
  for (const i of state.cachedViews) {
    if (i === view.name) {
      const index = state.cachedViews.indexOf(i)
      state.cachedViews.splice(index, 1)
      break
    }
  }
}
export const DEL_OTHERS_VIEWS = (state, view) => {
  for (const [i, v] of state.visitedViews.entries()) {
    if (v.path === view.path) {
      state.visitedViews = state.visitedViews.slice(i, i + 1)
      break
    }
  }
  for (const i of state.cachedViews) {
    if (i === view.name) {
      const index = state.cachedViews.indexOf(i)
      state.cachedViews = state.cachedViews.slice(index, i + 1)
      break
    }
  }
}
export const DEL_ALL_VIEWS = (state) => {
  state.visitedViews = []
  state.cachedViews = []
}
export const setPageTitle = (state, payload) => {
  state.pageTitle = payload.pageTitle
}
