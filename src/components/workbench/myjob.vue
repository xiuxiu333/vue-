<template>
  <div class="myjob">
    <div class="myjob-top">
      <span class="span-top">快捷导航</span>
    </div>
    <div class="myjob-content">
      <!-- 内容的上半部分 屏幕小于1400 -->
      <ul class="content-top clearfix" v-show="show">
        <li class="content-fast">
          <a href="javascript:;" @click="jumpp('/mediaInquire')">
            <img class="fast-img" src="@/assets/icon/媒体查询.png" alt="">
            <span class="fast-span">媒体查询</span>
          </a>
        </li>
        <li class="content-fast">
          <a href="javascript:;"  @click="jumpp('/usersInquire')">
            <img class="fast-img" src="@/assets/icon/客户查询.png" alt="">
            <span class="fast-span">客户查询</span>
          </a>
        </li>
        <li class="content-fast">
          <a href="javascript:;" @click="jumpp('/usersAdd')">
            <img class="fast-img" src="@/assets/icon/新增客户.png" alt="">
            <span class="fast-span">新增客户</span>
          </a>
        </li>
        <li class="content-fast">
          <a href="javascript:;" @click="jumpp('/mediaAdd')">
            <img class="fast-img" src="@/assets/icon/新增媒体.png" alt="">
            <span class="fast-span">新增媒体</span>
          </a>
        </li>
        <li class="content-fast">
          <a href="javascript:;" @click="jumpp()">
            <img class="fast-img" src="@/assets/icon/新增订单.png" alt="">
            <span class="fast-span">新增订单</span>
          </a>
        </li>
        <li class="content-fast">
          <a href="javascript:;" @click="jumpp()">
            <img class="fast-img" src="@/assets/icon/订单查询.png" alt="">
            <span class="fast-span">订单查询</span>
          </a>
        </li>
        <li class="content-fast">
          <a href="javascript:;"  @click="jumpp()">
            <img class="fast-img" src="@/assets/icon/待审核客户.png" alt="">
            <span class="fast-span">待审核客户</span>
            <span class="fast-info" style="right: 115px;">20</span>
          </a>
        </li>
        <li class="content-fast">
          <a href="javascript:;" @click="jumpp()">
            <img class="fast-img" src="@/assets/icon/待审核媒体.png" alt="">
            <span class="fast-span">待审核媒体</span>
            <span class="fast-info" style="right: 102px;">20</span>
          </a>
        </li>
        <li class="content-fast">
          <a href="javascript:;" @click="jumpp()">
            <img class="fast-img" src="@/assets/icon/待审核订单.png" alt="">
            <span class="fast-span">待审核订单</span>
            <span class="fast-info" style="right: 105px;">20</span>
          </a>
        </li>
      </ul>
      <!-- 下面的消息提醒 -->
      <div class="remind">
        <span class="remind-span">消息提醒</span>
        <div class="system">
          <div class="system-top">
            <span class="sys-span">系统通知</span>
            <div class="status">
              <span class="left">锁位成功!</span> <span class="right">NEW</span>
            </div>
            <div class="footer">
              <span class="footer-l">恭喜您<span>雅仕维</span>已锁位成功</span>
              <div class="footer-r">
                <span>2018-10-21</span> <span class="time">12:20</span>
              </div>
            </div>
          </div>
          <div class="system-info">
            <span class="info-span">消息提醒</span>
            <div class="info-f">
              <span class="info-fl">您以成功注册DSP系统,登录密码为<span>123456.</span>如忘了密码请点击忘记密码</span>
              <div class="info-fr">
                <span>2018-10-21</span> <span class="time">12:20</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: true,
        hide: false,
        info: JSON.parse(localStorage.getItem('dspInfo')).privilege
      }
    },
    methods: {
      // 我的工作台中点击订单查询的事件
      jumpOrder () {
        this.$router.push('/order')
      },
      jumpp (v) {
        if (v) {
          this.$router.push(v)
        } else {
          this.$message(
            {
              showClose: true,
              message: '拼命开发中'
            })
        }
      },
      // 我的工作台中点击新增客户
      jumpUsers () {
        this.$router.push('/usersAdd')
      }
    }
  }

</script>


<style scoped>
  i {
    font-size: 20px;
  }
  /* 清除浮动 */
  .clearfix:after {
    visibility: hidden;
    clear: both;
    display: block;
    content: ".";
    height: 0
  }

  .clearfix {
    *zoom: 1
  }

  /* 快捷导航 */
  .myjob .myjob-top .span-top {
    display: block;
    padding: 20px 0 0 20px;

    font-size: 18px;
    font-weight: 600;
    border: 1px solid #eee;
  }

  /* 内容 */
  .myjob .myjob-content {
    margin-top: 15px;
    margin-left: 15px;
  }

  /* 每个模块的样式 */
  .content-top{
   /* display: flex;
    flex-wrap: wrap;*/
  }
  .myjob .myjob-content .content-top .content-fast {
    position: relative;
    /* display: inline-block; */
    float: left;
    background-color: #fff;
    border-radius: 8px;
    margin: 10px;
    width: 18%;
    height: 150px;
  }
  .myjob .myjob-content .content-top .content-fast a {
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 30px;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .myjob .myjob-content .content-top span {
    display: block;
  }

  .myjob .myjob-content .content-top .fast-span {
    font-size: 15px;
    color: #4bbbe9;
  }

  /* 字体图标 */
  .myjob .myjob-content .content-top .fast-img {
    width: 60px;
    height: 60px;
  }
  /* 内容的中间部分的消息 */
  .myjob .content-top .content-fast .fast-info {
    position: absolute;
    top: 5px;
    font-size: 15px;
    border-radius: 50%;
    line-height: 30px;
    color: #fff;
    width: 30px;
    height: 30px;
    top: 50px;
    text-align: center;
    background-color: orange;
  }


  /* 消息提醒 */
  .myjob .myjob-content .remind {
    margin-left: 15px;
    margin-bottom: 65px;
  }

  .myjob .myjob-content .remind-span {
    padding: 20px 0;
    display: block;
    font-size: 15px;
    font-weight: 600;
  }

  .myjob .myjob-content .system {
    padding: 30px 0 0 30px;
    width: 60%;
    font-size: 15px;
    color: #2f2f2f;
    border-radius: 10px;
    background-color: #fff;
  }

  .myjob .system .system-top {
    padding-right: 30px;
  }


  .myjob .system .sys-span {
    font-size: 15px;
    font-weight: 600;
  }

  .myjob .system .status {
    padding: 20px 0;
  }



  .myjob .system .status .left {
    font-size: 15px;
    color: #ff9938;
    margin-right: 20px;
  }

  .myjob .system .status .right {
    font-size: 12px;
    color: #fff;
    background-color: #f33630;
    border-radius: 20px;
    padding: 2px;
  }

  .myjob .system .footer {
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;
    border-bottom: 1px solid #f1f1f1;
  }

  .myjob .system .footer-r {
    color: #9a9a9a;
  }
  .myjob .system .footer-r .time {
    margin-left: 20px;
  }




  .myjob .system .system-info {
    padding: 30px 0 40px 0;
    margin-right: 30px;
  }

  .myjob .system .system-info .info-span {
    color: #989898;
  }



  .myjob .system .info-f {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .myjob .system .info-fr {
    color: #9a9a9a;
  }
  .myjob .system .info-fr .time {
    margin-left: 20px;
  }



</style>
