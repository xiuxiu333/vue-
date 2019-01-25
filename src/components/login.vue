<template>
  <div class="loginBody">
    <div class="login">
      <div class="loginTop">
        <div class="topImg">
          <img src="../assets/logo1.png" alt="">
        </div>
        <div class="line">|</div>
        <div class="topFont">威媒程序化平台</div>
      </div>
      <div class="form">
        <el-form :model="userobj" status-icon :rules="rules" ref="userobj" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input prefix-icon="iconfont myicon-shouji" type="text" placeholder='请输入手机号' v-model="userobj.username"
                      auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="iconfont myicon-password" type="password" placeholder='密码' v-model="userobj.password"
                      auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="passBtn" @click="passValue('userobj')">登&nbsp;&nbsp;录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn"><a class="forgetBtn" href="javascript:void(0);" @click.default="forgetBtn">忘记密码?</a></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 设置用户名和密码
      userobj: {
        role: '',
        username: '',
        password: ''
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
        }]
      }
    }
  },
  methods: {
    // 用来提交登录的数据
    passValue (userobj) {
      this.$refs[userobj].validate((valid) => {
        if (valid) {
          this.$http({
            url: 'login',
            method: 'post',
            data: this.userobj
          }).then(res => {
            // console.log(res);
            //判断状态status的状态
            if (res.data.status === 0) {
              localStorage.setItem('dspInfo', JSON.stringify(res.data))
              // 如果成功，保存token
              this.$router.push('/myjob')
            } else {
              this.$message.error(res.data.msg)
            }
          }, (error) => {
            this.$message.error(error)
          })
        } else {
          return false
        }
      })
    },
    // 点击忘记密码触发的函数
    forgetBtn () {
      this.$router.push('/forget')
    }
  }
}
</script>
<style scoped>
  /* html, body, #app {
    width: 100%;
    height: 100%;
    background-color: #2d434c;
  } */
  .loginBody {
    position: relative;
    height: 100%;
    background-image: url('../assets/logo.jpg');
    background-size: cover;
  }

  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 7px;
  }

  .loginTop {
    display: flex;
    align-items: center;
    margin-bottom:70px;
  }

  .loginBody .topFont {
    vertical-align: middle;
    color: #2e2e2e;
  }

  .loginBody .line {
    margin: 0 15px;
    color: #e7e6e7;
  }

  .loginBody div {
    font-size: 30px;
  }

  .loginBody .topImg {
    width: 200px;
    height: 83px;
  }

  .loginBody .topImg img {
    width: 100%;
    height: 100%;
  }

  .loginBody .el-form {
    /* position: relative; */
    width: 415px;
    margin: 0 auto;
  }

  .loginBody .el-form .el-input {
    width: 415px;
    font-size: 16px;
    border-radius: 10px;
  }

  /* 成功之后input的样式 */
  .loginBody .el-form-item.is-success .el-input__inner {
    border-color: #32beb5 !important;
    background-color: #fff;
  }

  .loginBody .form .passBtn {
    width: 415px;
    height: 50px;
    font-size: 16px;
    background-color: #32beb5;
    color: #fff;
  }

  .loginBody .el-form-item, .el-form-item__content {
    text-align: center;
    margin: 8px 0;
    margin-bottom: 20px;
  }

  .loginBody .forgetBtn {
    font-size: 15px;
    position: absolute;
    top: 0;
    right: -16px;
    color: #666666;
    text-decoration: underline
  }

  .loginBody .btn {
    width: 380px;
    margin: 0 auto;
    text-align: right;
    position: relative;
  }

</style>
