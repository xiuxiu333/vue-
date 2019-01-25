/**
 * @Author: Chaoying Hu
 * @Date: 2018/12/5 15:20
 *
 */
import axios from 'axios'
import {MessageBox, Loading} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.timeout = 30000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = '//192.168.0.88:8081/mediaLibrary/'
let loadingInstance = null
//请求拦截
axios.interceptors.request.use((config) => {
  loadingInstance = Loading.service({
    lock: true,
    spinner: 'g-el-icon-loading el-icon-loading',
    background: 'rgba(0, 0, 0, 0)',
    text: '数据加载中...'
  })
  config.headers['Authorization'] = localStorage.getItem('token')
  return config
})
axios.interceptors.response.use((response) => {
  // 以服务的方式调用的 Loading 需要异步关闭
  loadingInstance.close()
  if (response.data.code === -16) {
    MessageBox.alert('账号未登录，请重新登录', response.data.message, {
      confirmButtonText: '确定',
      callback: action => {
        location.href = window.location.origin + '/login'
      }
    })
  }
  if (response.data.code === -1) {
    MessageBox.alert('请完善信息', response.data.message, {
      confirmButtonText: '确定',
      callback: action => {
        location.href = window.location.origin + '/login'
      }
    })
  }
  return response
})
export function fetch (url, params, type) {
  return new Promise((resolve, reject) => {
    if (type === 'post') {
      axios.post(url, params)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    } else if (type === 'get') {
      axios.get(url, {params})
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      let baseURL
      if (url.slice(1, 8) === 'uloginc') {
        // baseURL = 'http://10.15.198.18:8015'
        // baseURL = 'http://39.107.202.87:8018'
        baseURL = 'https://www.labifenqi.com'
      } else {
        baseURL = 'http://10.15.68.219:5000'
        // baseURL = 'http://39.107.60.199:8078'
        // baseURL = 'https://www.labifenqi.com'
      }
      resolve(baseURL + url)
    }
  })
}
