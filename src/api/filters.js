/**
 * @Author: Chaoying Hu
 * @Date: 2018/12/10 11:42
 *
 */
function date (v) {
  if (v) {
    var time = new Date(v)
    return time.getFullYear() + '-' + changNum((time.getMonth() + 1)) + '-' + changNum(time.getDate())
  }
}

function months (v) {
  if (v) {
    var time = new Date(v)
    return time.getFullYear() + '年' + changNum((time.getMonth() + 1)) + '月'
  }
}

function day (v) {
  if (v) {
    var time = new Date(v)
    return time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日'
  }
}
function yyyy (v) {
  if (v) {
    var time = new Date(v)
    return time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate()
  }
}
function changNum (num) {
  if (num < 10) {
    return '0' + num
  }
  return num
}

function gender (v) {
  switch (v) {
    case 1:
      return '男'
    case 2:
      return '女'
    default:
      return ''
  }
}

function customerStatus (v) {
  switch (v) {
    case 1:
      return '有意向'
    case 2:
      return '无意向'
    case 3:
      return '合作'
    default:
      return ''
  }
}
function orderStatus (v) {
  switch (v) {
    case -2:
      return '审核未通过'
    case -1:
      return '已取消'
    case 0:
      return '待审核'
    case 1:
      return '已预订'
    case 2:
      return '锁位待审核'
    case 3:
      return '锁位'
    case 4:
      return '上刊'
    case 5:
      return '下刊'
    case 6:
      return '已完成'
    case 7:
      return '上刊待审核'
    default:
      return ''
  }
}
function checkIfPass (v) {
  switch (v) {
    case -2:
      return '审核未通过'
    case -1:
      return '已取消'
    case 0:
      return '待审核'
    case 1:
      return '已通过'
  }
}
export default {
  yyyy,
  day,
  date,
  months,
  gender,
  customerStatus,
  orderStatus,
  checkIfPass
}
