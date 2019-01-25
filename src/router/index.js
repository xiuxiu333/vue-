import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('@/components/login')
const Forget = () => import('@/components/forget')
const Home = () => import('@/components//home')

const Media = () => import('@/components/media/media')
const MediaAdd = () => import('@/components/media/mediaAdd')
const MediaInfoUpdate = () => import('@/components/media/mediaInfoUpdate')
const MediaInquire = () => import('@/components/media/mediaInquire')
const MediaPlan = () => import('@/components/media/mediaPlan')
const MediaDetails = () => import('@/components/media/mediaDetails')
const MediaSchedule = () => import('@/components/media/mediaSchedule')
const mediaAllCalendar = () => import('@/components/media/mediaAllCalendar')

const User = () => import('@/components/users/users')
const UsersAdd = () => import('@/components/users/usersAdd')
const UsersInquire = () => import('@/components/users/usersInquire')
const UsersDetails = () => import('@/components/users/usersDetails')
const Permission = () => import('@/components/permission/permission')

const OrderList = () => import('@/components/order/orderList')
const OrderDetail = () => import('@/components/order/OrderDetail')

const OrderReview = () => import('@/components/review/OrderReview')
const MediaReview = () => import('@/components/review/MediaReview')
const UserReview = () => import('@/components/review/UserReview')
// 引入我的工作台子组
const Myjob = () => import('@/components/workbench/myjob')

Vue.use(Router)
// 在vue中使用路由
var router = new Router({
  routes: [
    // 登录login
    {path: '/login', name: 'Login', component: Login},
    // 忘记密码
    {path: '/forget', name: 'Forget', component: Forget},
    {
      path: '/home',
      alias: '/',
      component: Home,
      children: [
        // 客户列表
        {path: '/users', name: 'User', component: User, meta: {title: '客户列表'}},
        // 新增客户
        {path: '/usersAdd', name: 'UsersAdd', component: UsersAdd, meta: {title: '新增客户'}},
        // 客户详情
        {name: 'UsersDetails', path: '/usersDetails', component: UsersDetails, meta: {title: '客户详情'}},
        // 客户查询
        {path: '/usersInquire', name: 'UsersInquire', component: UsersInquire, meta: {title: '客户查询'}},
        // 媒体
        {path: '/media', name: 'Media', component: Media, meta: {title: '媒体列表'}},
        {path: '/mediaDetails', name: 'MediaDetails', component: MediaDetails, meta: {title: '媒体详情'}},
        {path: '/mediaInfoUpdate', name: 'MediaInfoUpdate', component: MediaInfoUpdate, meta: {title: '编辑媒体详情'}},
        {path: '/mediaSchedule', name: 'MediaSchedule', component: MediaSchedule, meta: {title: '媒体档期查看'}},
        {path: '/mediaAllCalendar', name: 'mediaAllCalendar', component: mediaAllCalendar, meta: {title: '媒体档期总表'}},
        {path: '/mediaAdd', name: 'MediaAdd', component: MediaAdd, meta: {title: '新增媒体'}},
        {path: '/mediaInquire', name: 'MediaInquire', component: MediaInquire, meta: {title: '媒体查询'}},
        {path: '/mediaPlan', name: 'MediaPlan', component: MediaPlan, meta: {title: '媒体计划'}},
        // 权限管理
        {path: '/permission', name: 'Permission', component: Permission, meta: {title: '权限管理'}},
        {path: '/myjob', alias: '/', name: 'Myjob', component: Myjob, meta: {title: '我的工作台'}},
        // 订单
        {path: '/orderList', name: 'OrderList', component: OrderList, meta: {title: '订单列表'}},
        {path: '/orderDetail', name: 'OrderDetail', component: OrderDetail, meta: {title: '订单详情'}},
        // 审核
        {path: '/orderReview', name: 'OrderReview', component: OrderReview, meta: {title: '订单审核'}},
        {path: '/mediaReview', name: 'MediaReview', component: MediaReview, meta: {title: '媒体审核'}},
        {path: '/userReview', name: 'UserReview', component: UserReview, meta: {title: '客户审核'}}
      ]
    }
  ]
})
// 设置一个全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 只需要判断to就可以
  if (to.path === '/login' || to.path === '/forget') {
    // 如果请求的是login可以被访问
    next()
  } else {
    // 请求的不是Login，就是判断有没有token
    // 得到token
    if (localStorage.getItem('dspInfo')) {
      next()
    } else {
      router.push('/login')
    }
  }
})
// 把router暴露给外界
export default router
