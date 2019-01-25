// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// 引入字体图标
import '@/assets/iconFonts/iconfont.css'
// 引入element
import ElementUI, {Loading, MessageBox, Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/reset.css'
import filters from '@/api/filters'
import store from '@/store/index'

// 设置全局的请求路由
axios.defaults.baseURL = '/mediaLibrary/'
let loadingInstance = null
// 加入请求拦截器：在拦截器请发送token的请求
axios.interceptors.request.use((config) => {
  loadingInstance = Loading.service({
    background: 'rgba(1, 1, 1, 0.2)',
    text: 'Loading...'
  })
  config.headers['Authorization'] = localStorage.getItem('dspInfo') ? JSON.parse(localStorage.getItem('dspInfo')).token : ''
  return config
})
axios.interceptors.response.use(
  (response) => {
    // 以服务的方式调用的 Loading 需要异步关闭
    loadingInstance.close()

    if (response.data.status === 0) {
    } else {
      if (response.data.msg) {
        Message.error(response.data.msg)
      }
      switch (response.data.status) {
        case -16:
          MessageBox.alert('账号未登录，请重新登录', response.data.message, {
            confirmButtonText: '确定',
            callback: action => {
              location.href = window.location.origin + '#/login'
            }
          });
          break
        case -1:
          MessageBox.alert('请完善信息', response.data.message, {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
          break
        case -12:
          MessageBox.alert('用户名或密码错误', response.data.message, {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
          break
        case -2:
          Message.error('抱歉，您没有该权限')
          break
        case -9:
          Message.error('数据格式不正确')
          break
      }
    }
    return response
  },
  (error) => {
    loadingInstance.close()
    Message.error(error.response.data)
    return Promise.reject(error.response.data)
  }
)
// 实现过滤器
for (var i in filters) {
  Vue.filter(i, filters[i])
}
// 把$http挂到axios的原型上
Vue.prototype.$http = axios
// 使用element
Vue.use(ElementUI)
// // 使用日历组件
// Vue.component('full-calendar', fullCalendar)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
})
