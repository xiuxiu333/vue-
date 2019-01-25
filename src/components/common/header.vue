<template>
  <!-- <div class='commons'> -->
  <div class='header'>
    <div class='grid-content bg-purple'>
      <img src='../../assets/logo1.png'>
    </div>
    <div class='more-afer'>
      <div class='bg-purple-light'>
        <h1>威媒程序化平台</h1>
        <div class='line'></div>
      </div>
      <div class='behind'>
        <div class='home-people'>
          <img class='avatar' src='@/assets/9.jpg' alt>
          <span class='people-name'>{{info.firstName}}</span>
          <span class='people-role'>{{info.roleName}}</span>
          <i
            @click='loginOut'
            class='iconfont icon-logout out'
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: JSON.parse(localStorage.getItem('dspInfo'))
    }
  },
  methods: {
    loginOut () {
      // 退出登录：清除token
      this.$confirm('您确定要退出吗？', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 退出登录：清除token
          localStorage.removeItem('dspInfo')
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>
<style scoped>
  i{
    font-size: 20px;
  }
  .header {
    display: flex;
    background-color: #fff;
    font-size: 15px;
    height: 80px;
  }

/* logo */
.grid-content.bg-purple {
  width: 260px;
  display: flex;
  align-items: center;
}

.grid-content.bg-purple img {
  margin: 0 65px;
  height: 60px;
  /*width: 150px;*/
}

/* dsp后台管理加头像 登出的大盒子 */
.more-afer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.bg-purple-light {
  position: relative;
}

.bg-purple-light .line {
  position: absolute;
  top: 25%;
  left: 0;
  height: 50px;
  font-size: 15px;
  border-left: 1px solid #f3f3f3;
}

.bg-purple-light h1 {
  font-size: 28px;
  font-weight: 500;
  margin-left: 30px;
  padding: 0;
  line-height: 80px;
}

/* 头像 */
.behind .avatar {
  vertical-align: middle;
  border-radius: 50%;
  width: 45px;
  height: 45px;
}

.behind .people-name {
  font-size: 15px;
  margin: 0 15px;
}

.header .home-people {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 80px;
}

.home-people .people-role {
  height:20px;
  padding: 1px 6px;
  line-height: 20px;
  margin-right: 12px;
  border-radius: 10px;
  color: #fff;
  background-color: orange;
}
/* 登出 */
.behind .out {
  cursor: pointer;
  display: inline-block;
  font-size: 22px;
  margin-right: 50px;
}
</style>
