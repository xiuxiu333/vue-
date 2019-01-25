<template>
  <div class="home">
    <el-container class="layout-container">
      <el-header style="height: 80px">
        <my-header></my-header>
      </el-header>
      <!-- 内容 -->
      <el-container>
        <el-aside class="content-main" width="auto" style="background: #2f3245">
          <el-menu
            unique-opened
            text-color="#fff"
            background-color="#2f3245"
            active-text-color="#43bfb9"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :collapse="isCollapse">
            <el-menu-item @click="open" index="1">
              <i :class = "['iconfont',isCollapse ? 'icon-zhankai' : 'icon-shouqi']" ></i>
              <span slot="title">{{isCollapse ? '展开' : '收起'}}</span>
            </el-menu-item>
          </el-menu>
          <el-menu
            unique-opened
            router
            text-color="#fff"
            background-color="#2f3245"
            active-text-color="#43bfb9"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :collapse="isCollapse">
            <el-menu-item index="/" class="myjob">
              <i class="el-icon-menu"></i>
              <span slot="title">我的工作台</span>
            </el-menu-item>
            <el-submenu index="1" v-if="client">
              <template slot="title">
                <i class="iconfont icon-renwu"></i>
                <span>客户管理</span>
              </template>
              <el-menu-item index="/users" v-if=" type === 1|| info.CLIENT.CLIENT_LIST">
                客户列表
              </el-menu-item>
              <el-menu-item index="/usersAdd" v-if="type === 1 || info.CLIENT.CLIENT_NEW">
                新增客户
              </el-menu-item>
              <el-menu-item index="/usersInquire" v-if="type === 1 || info.CLIENT.CLIENT_SEARCH">
                客户查询
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2" v-if="media">
              <template slot="title">
                <i class="iconfont icon-guanli-copy"></i>
                <span>媒体管理</span>
              </template>
              <el-menu-item class="menu-li" index="/media" v-if="type === 1 || info.MEDIA.MEDIA_LIST">
                媒体列表
              </el-menu-item>
              <el-menu-item index="/mediaAdd" v-if="type === 1 || info.MEDIA.MEDIA_NEW">
                新增媒体
              </el-menu-item>
              <el-menu-item index="/mediaInquire" v-if="type === 1 || info.MEDIA.MEDIA_SEARCH">
                媒体查询
              </el-menu-item>
              <el-menu-item index="/mediaPlan" v-if="type === 1 || info.MEDIA.MEDIA_PLAN">
                媒体计划
            </el-menu-item>
            </el-submenu>
            <el-submenu index="4" v-if="order">
              <template slot="title">
                <i class="iconfont icon-guanli-copy"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="/orderList" v-if="type === 1 || info.ORDER.ORDER_LIST">
                订单列表
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5" v-if="check">
              <template slot="title">
                <i class="iconfont icon-guanli-copy"></i>
                <span>审核管理</span>
              </template>
              <el-menu-item index="/orderReview" v-if="type === 1 || info.CHECK.CHECK_ORDER">
               订单审核
              </el-menu-item>
              <el-menu-item index="/mediaReview" v-if="type === 1 || info.CHECK.CHECK_ORDER">
                媒体审核
              </el-menu-item>
              <el-menu-item index="/userReview" v-if="type === 1 || info.CHECK.CHECK_ORDER">
                客户审核
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3" v-if="sys">
              <template slot="title">
                <i class="iconfont icon-kehuguanli"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="/permission" v-if="type === 1 || info.SYS.SYS_USER">
                权限管理
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- rightside -->
        <el-main class="content-main">
          <div class="tags">
            <tags-view></tags-view>
          </div>
          <div class="main">
            <app-main></app-main>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TagsView from './common/ScrollPane/TagsView'
import AppMain from './common/ScrollPane/AppMain'
import MyHeader from '@/components/common/header.vue'

export default {
  data () {
    return {
      // menusList: []
      isCollapse: true,
      type: JSON.parse(localStorage.getItem('dspInfo')).type,
      info: JSON.parse(localStorage.getItem('dspInfo')).privilege ? JSON.parse(localStorage.getItem('dspInfo')).privilege : {},
      sys: false,
      media: false,
      order: false,
      check: false,
      client: false
    }
  },
  components: {
    TagsView,
    AppMain,
    MyHeader
  },
  methods: {
    open () {
      this.isCollapse = !this.isCollapse
      this.$store.dispatch('collapse', {isCollapse: this.isCollapse})
    },
    // 登出的事件函数
    loginOut () {
      // 退出登录：清除token
      this.$confirm('您确定要退出吗？', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 退出登录：清除token
          window.localStorage.removeItem('token')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    },
    myjobs () {
      this.$router.push('/myjob')
    },
    limited (keys) {
      let that = this
      let key = keys.toLowerCase()
      for (let i in this.info[keys]) {
        if (this.info[keys][i]) {
          that[key] = true
        }
      }
    },
    judge () {
      if (this.type === 1) {
        this.sys = true
        this.media = true
        this.client = true
        this.order = true
        this.check = true
      } else {
        this.limited('CLIENT')
        this.limited('MEDIA')
        this.limited('SYS')
        this.limited('ORDER')
        this.limited('CHECK')
      }
    }
  },
  created () {
    this.judge()
  }
}
</script>
<style lang="scss">
  .home{
    .el-menu {
      border: none;
      .el-menu-item [class^=el-icon-] {
        width: 18px;
      }
      .el-menu-item, .el-submenu__title{
        i {
          color: #43bfb9;
        }
        .el-submenu__icon-arrow {
          color: #fff;
        }
      }
       .el-menu-item.is-active, .el-menu-item:focus, .el-menu-item:hover{
         background: rgb(38, 40, 55)!important;
      }
      .el-submenu__title:hover, .el-submenu__title:hover *, .is-opened .el-submenu__title{
        background: linear-gradient(#53dad3, #4cb6df);
        color: #fff;
        i{
          color: #fff;
        }
      }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
  }
</style>
<style lang="scss" scoped>
  .layout-container {
    width: 100%;
    /*height: 100%;*/
    min-height: 100%;
  }
  .home .el-header {
    padding: 0;
  }

  i {
    color: #fff;
  }

  /*侧边栏*/
  .el-container {
    .content-main{
      height: calc(100vh - 80px);
    }
  }

  .home .el-main {
    padding: 0px !important;
  }
  .tags {
    position: fixed;
    width: 100%;
    background:  #edf2fc;
    z-index: 1000;
  }
  .main{
    margin-top: 50px;
  }
</style>
