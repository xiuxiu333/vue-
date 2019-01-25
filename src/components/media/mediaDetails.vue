<template>
  <div class="mediaDetails">
    <!-- 面包屑导航 -->
    <!-- Tabs栏 -->
    <div class="title">媒体详情<el-button type="text" icon="el-icon-edit" circle @click="toEdit"></el-button> </div>
    <div class="dateTab">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <!-- 基本信息的大盒子 -->
          <el-form label-width="130px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="媒体编号：" class="lag">{{mediaInfo.mediaCode}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="媒体名称：" class="lag">{{mediaInfo.name}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="城市：" class="lag">{{mediaInfo.cityName}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="线路：" class="lag">{{mediaInfo.routeName}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="站点：" class="lag">{{mediaInfo.stationName}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="媒体描述：" class="lag">{{mediaInfo.description}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="媒体所属套装：" class="lag">{{mediaInfo.packageOwned}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否独家媒体：" class="lag">{{mediaInfo.isExclusive ? '是' : '否'}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="媒体形式：" class="lag">{{mediaInfo.mediaForm}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="媒体类型：" class="lag">{{mediaInfo.type}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="刊例价：" class="lag">{{mediaInfo.mediaFee}}/4周</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="制作费：" class="lag">{{mediaInfo.fabricationFee}}/次</el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="媒体位置：" class="lag">{{mediaInfo.position}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="方向：" class="lag">{{mediaInfo.direct}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="位置描述：" class="lag">{{mediaInfo.area}}</el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="制作工艺：" class="lag">{{craft}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当前状态：" class="lag">{{MediaMaterialInfo.status?'活跃':'不活跃'}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="楼层：" class="lag">{{MediaMaterialInfo.floor}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="方向：" class="lag">{{MediaMaterialInfo.orientation?'横向':'纵向'}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="覆盖范围：" class="lag">{{MediaMaterialInfo.coverageArea}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="面数：" class="lag">{{MediaMaterialInfo.sides}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="亮灯时间：" class="lag">{{lightStart}}-{{lightEnd}}</el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="实际尺寸 宽(米)：" class="lag">{{MediaMaterialInfo.actualWidth}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="实际尺寸 高(米)：" class="lag">{{MediaMaterialInfo.actualHeight}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="设计尺寸 宽(米)：" class="lag">{{MediaMaterialInfo.designWidth}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设计尺寸 高(米)：" class="lag">{{MediaMaterialInfo.designHeight}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="可视尺寸 宽(米)：" class="lag">{{MediaMaterialInfo.visualWidth}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="可视尺寸 高(米)：" class="lag">{{MediaMaterialInfo.visualHeight}}</el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="日均客流量：(万)" class="lag">{{MediaMaterialInfo.passengerFlow}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="可成套装销售：" class="lag">{{MediaMaterialInfo.package?'是':'否'}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="销售单位：" class="lag">{{MediaMaterialInfo.saleUnit}}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="可售数量：" class="lag">{{MediaMaterialInfo.saleNum}}</el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="MR文件：" class="lag">
                  <el-button type="text" @click="downloadMR">点击下载</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="其他属性">
          <div class="other">
            <div class="otherTop">
              <span>媒体编号:</span> <span>{{mediaInfo.mediaCode}}</span>
            </div>
            <div class="otherBot">
              <div class="otherInfo">
                环境资料库
              </div>
              <div class="otherImg">
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
              </div>
            </div>
            <div class="otherBot">
              <div class="otherInfo">
                环境照片
              </div>
              <div class="otherImg">
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
              </div>
            </div>
            <div class="otherBot">
              <div class="otherInfo">
                平面图点位
              </div>
              <div class="otherImg">
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
                <div>
                  <img src="../../assets/9.jpg" alt="">
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="查看档期">查看档期</el-tab-pane>
      </el-tabs>
    </div>
    <a href="" id="download"></a>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        // 获取点击详情之后带过来的参数
        params: this.$route.query.mediaID,
        mediaInfo: {},
        MediaMaterialInfo: {},
        craft: '',
        lightEnd: '',
        lightStart: ''
      }
    },
    methods: {
      // 编辑
      toEdit () {
        this.$router.push({
          path: '/mediaInfoUpdate',
          query: {
            mediaID: this.params
          }
        })
      },
      // 文件媒体格式
      extend (v) {
        switch (v) {
          case 'xls':
            return 'application/vnd.ms-excel'
          case 'xlsx':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          case 'png':
            return 'image/png'
          case 'jpg':
            return 'image/jpeg'
          case 'doc':
            return 'application/msword'
          case 'docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          case 'pdf':
            return 'application/pdf'
          default:
            return ''
        }
      },
      // 下载MR文件
      downloadMR () {
        let fileType = this.MediaMaterialInfo.mr.substring(this.MediaMaterialInfo.mr.lastIndexOf('.') + 1)
        let fileExpandee = this.extend(fileType)
        console.log(fileExpandee)
        // png jpg pdf word excel
        this.$http({
          url: 'media/downloadMR',
          method: 'POST',
          dataType: 'JSON',
          responseType: 'blob',
          data: {
            mediaID: this.$route.query.mediaID ,
          }
        }).then(res => {
          let eleLink = document.getElementById('download')
          let blob = new Blob([res.data], {type: fileExpandee})
          let url = window.URL.createObjectURL(blob)
          eleLink.href = url
          eleLink.download = `MR.${fileType}`
          eleLink.click()
          window.URL.revokeObjectURL(url)
        }, error => {
          this.$message.error(error)
        })
      },
      // 获取该页面的所有数据
      getMediaDetails () {
        this.$http({
          url: 'media/profile',
          method: 'POST',
          dataType: 'JSON',
          data: {
            mediaID: this.params
          }
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
            this.craft = data.craft
            this.lightEnd = data.lightEnd
            this.lightStart = data.lightStart
            this.MediaMaterialInfo = data.MediaMaterialInfo ? data.MediaMaterialInfo : {}
            this.mediaInfo = data.mediaInfo ? data.mediaInfo : {}
          } else {
            this.$message.error(data.msg)
          }
        }, error => {
          this.$message.error(error)
        })
      }
    },
    created () {
      this.getMediaDetails()
    }
  }
</script>
<style scoped>
  .mediaDetails {
    font-size: 16px;
    margin:0 20px;
  }
  .title {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .mediaDetails ul {
    list-style: none;
    display: inline-block;
  }
  /*!* 面包屑导航 *!
  .mediaDetails .el-breadcrumb {
    padding: 25px 0;
    font-size: 18px;
  }
  .mediaDetails .dateTab {
    !* background-color: #fff; *!
    border-radius: 10px;
  }
  !* Tab栏  默认的border和box-shadow*!
  .mediaDetails .el-tabs--border-card {
    border: none;
    box-shadow: none;
    border-radius: 10px;
  }
  !* 去掉头部默认的bgc *!
  .mediaDetails .el-tabs--border-card>.el-tabs__header {
    background-color: #fff;
  }
  .mediaDetails .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    !*color: #555;*!
  }
  .mediaDetails .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    !*color: #555;*!
    !* background-color: #fff; *!
    background-color: #e8e8e8;
    border-radius: 10px;
  }
  .mediaDetails .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    border: none;
    margin: .1rem;
    color: #555;
    background-color: #fff;
    !*background-color: #e8e8e8;*!
    !*border-radius: 10px;*!
  }
  !* 卡片的内容 *!
  .mediaDetails .el-tabs--border-card>.el-tabs__content {
    padding: 0px;
  }
  !* 基本信息的大盒子 *!
  .mediaDetails .dateTab .basic {
    padding: 0 20px .5rem .3rem;
  }
  .mediaDetails .dateTab .basic .basic-top {
    font-size: 0.16rem;
    border-bottom: 1px solid #f4f4f4;
    padding: .15rem 0 .15rem .3rem;
    width: 85%;
    !* display: flex;
    justify-content: flex-end;
    padding: 20px 0; *!
  }
  .mediaDetails .dateTab .basic ul {
    padding: .2rem .3rem 0 .3rem;
    font-size: 0.14rem;
    color: #555;
    border-bottom: 1px dashed #f4f4f4;
  }
  .mediaDetails .dateTab .basic ul li {
    display: inline-block;
    width: 4rem;
    vertical-align: middle;
  }
  .mediaDetails .dateTab .basic ul li div{
    height: 100%;
    height: 0.6rem;
    margin-bottom: 0.2rem;
  }
  !* .mediaDetails .dateTab .basic .basicUl span{
    display: inline;
    width: 50%;
  } *!
  .mediaDetails .dateTab .basic .basicUl .spanL{
    width: 30%;
    height: 100%;
    text-align: right;
    vertical-align: top;
    display: inline-block;
    margin-right: 0.1rem;
  }
  .mediaDetails .dateTab .basic .basicUl .spanR{
    display: inline-block;
    height: 100%;
    width: 60%;
  }*/
  /* 其他属性 */
  .mediaDetails .dateTab .other {
    padding: 0 20px 50px 30px;
  }
  .mediaDetails .dateTab .other .otherTop {
    border-bottom: 1px solid #f1f1f1;
    padding: 20px;
  }
  .mediaDetails .dateTab .other .otherInfo {
    padding: 20px;
  }
  .mediaDetails .dateTab .other .otherImg {
    padding: 20px;
  }
  .mediaDetails .dateTab .other .otherImg div {
    width: 200px;
    height: 200px;
    margin-right: 100px;
    display: inline-block;
  }
  .mediaDetails .dateTab .other .otherImg div img {
    width: 100%;
    height: 100%;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
</style>
