/**
 * @Author: Chaoying Hu
 * @Date: 2018/12/5 15:28
 *
 */
import {fetch} from './config.js'

export default {
  //客户管理--列表页
  clientList (params) {
    return fetch(`client/list`, params, 'post')
  },
  //媒体管理列表--批量上传
  mediaBatchUpload (params) {
    return fetch(`/media/batchUpload`, params, 'post')
  },
  VerifyCode (params) {
    return fetch(`/user/VerifyCode?rcode=${params.rcode}`, params, '')
  }
}
