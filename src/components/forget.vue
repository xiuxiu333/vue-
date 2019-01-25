<template>
  <div class="forBody">
    <div class="forget">
      <div class="forgetTop">
        <div class="topImg">
          <img src="../assets/logo1.png" alt="">
        </div>
        <div class="line">|</div>
        <div class="topFont">威媒程序化平台</div>
      </div>
      <div class="form">
        <div class="formTop">
          <h1>忘&nbsp;记&nbsp;密&nbsp;码</h1>
          <div class="back">温馨提示:&nbsp;&nbsp;请输入邮箱,&nbsp;&nbsp;找回密码!</div>
        </div>
        <el-form :model="usersObj" status-icon :rules="rules" ref="usersObj" class="demo-ruleForm">
          <el-form-item >
            <el-input prefix-icon="iconfont myicon-shouji" type="text" placeholder='请输入邮箱' v-model="usersObj.email" auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item >
            <el-input class="provPut" placeholder='请输入验证码' v-model="usersObj.code"></el-input>
            <el-button class="provBtn" v-if="codeStatus" @click="getCode">获取验证码</el-button>
            <el-button class="provBtn" disabled v-else >{{num}}s后获取验证码</el-button>
          </el-form-item>
          <el-form-item >
            <el-input prefix-icon="iconfont myicon-password" type="password" placeholder='密码' v-model="usersObj.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input prefix-icon="iconfont myicon-password" type="password" placeholder='确认密码' v-model="usersObj.passwordAgain"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="passBtn" @click="resetPassWord">确&nbsp;&nbsp;定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      num: 60,
      codeStatus: true,
      // 设置用户名和密码
      usersObj: {
        code: '',
        email: '',
        password: '',
        passwordAgain: '',
        phone: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        pass: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    setTime () {
      if (this.num === 0) {
        this.num = 60
        this.codeStatus = true
      } else {
        this.num--
      }
    },
    getCode () {
      if (!this.usersObj.email) {
        this.$message({
          message: '请输入邮箱',
          type: 'warning'
        })
        return
      }
      this.codeStatus = false
      let t1
      clearInterval(t1)
      t1 = setInterval(this.setTime, 1000)
      this.$http({
        url: `/sendEmail`,
        method: 'POST',
        dataType: 'JSON',
        params: {
          email: this.usersObj.email
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.$message({
            message: '获取验证码成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          })
        }
      })
    },
    resetPassWord () {
      this.$http({
        url: 'forgetPassword',
        method: 'POST',
        dataType: 'JSON',
        data: this.usersObj
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.$message({
            message: '修改密码成功',
            type: 'success'
          })
          this.$route.push('/login')
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          })
        }
      })
    }
  },
  created () {
  }
}
</script>
<style scoped>
  .forBody {
    position: relative;
    height: 100%;
    background-image: url('../assets/logo.jpg');
    background-size: 100%;
  }

  .forget {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 7px;
  }

  .forgetTop {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    margin-left: 100px;
  }

  .forget .topFont {
    vertical-align: middle;
    color: #2e2e2e;
  }

  .forget .line {
    margin: 15px;
    color: #e7e6e7;
  }

  .forget div {
    font-size: 30px;
  }

  .forget .topImg {
    width: 200px;
    height: 83px;
  }

  .forget .topImg img {
    width: 100%;
    height: 100%;
  }

  .forget .form .formTop {
    text-align: center;
  }

  .forget .form h1 {
    font-size: 24px;
    font-weight: 500;
    color: #2e2e2e;
  }

  .forget .form .back {
    font-size: 14px;
    padding: 25px 0;
    color: #a0a0a0;
  }

  .forget .form {
    /* position: relative; */
    width: 415px;
    margin: 0 auto;
    padding: 35px 90px;
    background-color: #fff;
    border-radius: 10px;
  }

  .forget .el-form-item, .el-form-item__content {
    margin: .5px 0;
    margin-bottom: 10px;
  }

  .forget .el-form .el-input {
    width: 415px;
    font-size: 16px;
    border-radius: 10px;
  }

  .forget .el-form .el-input_inner {
    width: 415px;
    height: 50px;
  }

  /* 成功之后input的样式 */
  .forget .el-form-item.is-success .el-input__inner {
    border-color: #32beb5 !important;
    background-color: #fff;
  }

  .forget .form .provPut {
    width: 232px;
    height: 50px;
  }

  .forget .form .provBtn {
    width:156px;
    margin-left: 18px;
    font-size:16px;
    border-color: #32beb5;
    color: #32beb5;
  }

  .forget .form .passBtn {
    width: 415px;
    height: 50px;
    font-size:16px;
    background-color: #32beb5;
    color: #fff;
  }

  .forget .forgetBtn {
    font-size: 18px;
    position: absolute;
    top: 0;
    right: 0;
    color: #666666;
    text-decoration: underline
  }

  .forget .btn {
    width: 380px;
    margin: 0 auto;
    text-align: right;
    position: relative;
  }

  /* 验证不通过的样式 */
  .forget .form .el-form-item__error {
    font-size: 0.14rem !important;
  }
</style>
