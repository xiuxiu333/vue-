<template>
  <div class="manage">
    <div class="media-customer">
      <!-- 面包屑导航 -->
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/media' }">媒体管理</el-breadcrumb-item>
      </el-breadcrumb>  -->
      <h1>媒体列表</h1>
      <div class="media-top">
        <el-form :inline="true" ref="form" :model="form">
            <el-form-item>
              <el-select v-model="mediaForm" clearable  placeholder="请选择媒体形式">
                <el-option v-for="item in list.formList" :label="item.formName" :value="item.id"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="type" clearable  placeholder="请选择媒体类型">
                <el-option v-for="item in list.typeList" :label="item.typeName" :value="item.id"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入媒体名称/媒体位置" v-model="form.keyword" class="input-with-select"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="med-search" @click="getMediaList">搜索</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 媒体列表 -->
    <div class="media-mediatab">
      <div class="media-tab">
        <span class="media-left">媒体列表</span>
        <div class="media-right">
          <a href="javascript:;" class="table-lf">批量上传</a>
          <a href="javascript:;" @click="exportFile" class="table-gt">导出报表</a>
        </div>
      </div>
      <!-- 数据列表 -->
      <!-- @current-change="handleCurrentChange" -->
      <el-table stripe highlight-current-row class="el-table-media" :data="mediaList" :header-cell-style="{background:'#f3f3f3'}">
        <el-table-column label="序号" type="index" align="center" :index="indexMethod"></el-table-column>
        <el-table-column prop="mediaCode" label="编号" align="center">
          <template slot-scope="scope">
            <a href="javascript:;" @click="seeDetails(scope.row)"> {{scope.row.mediaCode}} </a>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="媒体名称" align="center"></el-table-column>
        <el-table-column prop="cityName" label="城市" align="center"></el-table-column>
        <el-table-column prop="routeName" label="线路" align="center"></el-table-column>
        <el-table-column prop="stationName" label="站点" align="center"></el-table-column>
        <el-table-column prop="rank" label="等级" align="center"></el-table-column>
        <el-table-column prop="position" label="位置" align="center"></el-table-column>
        <el-table-column prop="packageOwned" label="所属套装" align="center"></el-table-column>
        <el-table-column prop="mediaForm" label="媒体形式" align="center"></el-table-column>
        <el-table-column prop="type" label="媒体类型" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <a href="javascript:;" @click="seeSchedule(scope.row)">查看档期</a>
            <a href="javascript:;"> 定位 </a>
            <a href="javascript:;"> 放位 </a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="CurrentChange"
          :current-page.sync="form.page"
          :page-size="form.pageSize"
          layout="prev, pager, next, jumper, total"
          :total="form.rowCount">
        </el-pagination>
      </div>
    </div>
    <a href="" download="" id="download"></a>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mediaList: [],
      // 开关的状态
      // value2: true,
      // 当前页码
      currentPage: 1,
      // 每页显示的条数
      pageSize: 10,
      total: 1,
      val: 1,
      // 新增媒体的弹框
      dialogFormVisible: false,
      // 点击每行时的弹框
      mediaVisible: false,
      formLabelWidth: '120px',
      // 时间组件的双向绑定
      time: '',
      mediaForm: '',
      type: '',
      form: {
        page: 1,
        pageSize: 10,
        rowCount: 0,
        keyword: ''
      },
      list: {
        formList: [],
        typeList: []
      },
      cityID: [],
      cityOptions: []
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    // 导出
    exportFile () {
      this.$http({
        url: 'media/export',
        method: 'POST',
        dataType: 'JSON',
        responseType: 'blob',
        data: {
          mediaForm: this.mediaForm ? [this.mediaForm] : [],
          type: this.form.type,
          keyword: this.form.keyword,
          // cityID: this.cityID
        }
      }).then(res => {
        let eleLink = document.getElementById('download')
        let blob = new Blob([res.data], {type: 'application/excel'})
        let url = window.URL.createObjectURL(blob)
        eleLink.href = url
        eleLink.download = '媒体列表.xls'
        eleLink.click()
        window.URL.revokeObjectURL(url)
      })
    },
    // 获取媒体信息列表所有的数据
    getMediaList () {
      this.$http({
        url: 'media/list',
        method: 'POST',
        dataType: 'JSON',
        data: {
          page: this.form.page,
          pageSize: this.form.pageSize,
          rowCount: this.form.rowCount,
          mediaForm: this.mediaForm ? [this.mediaForm] : [],
          type: this.type,
          keyword: this.form.keyword
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.form.rowCount = data.count
          this.mediaList = data.list
        }
      })
    },
    // 获取条件
    getCondition () {
      this.$http({
        url: '/media/listOfSearchInfo',
        method: 'POST',
        dataType: 'JSON',
        data: {}
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.list.formList = data.formList
          this.list.typeList = data.typeList
          // this.cityOptions = data.countryList
        }
      })
    },
    // 点击当前页触发的函数
    CurrentChange (currentpage) {
      this.form.page = currentpage
      this.getMediaList()
    },
    // 点击页容量触发的函数
    handleSizeChange (pagesize) {
      this.form.pageSize = pagesize
      this.getMediaList()
    },
    // 点击查看详情触发的函数
    seeDetails (e) {
      this.$router.push({
        path: '/mediaDetails',
        name: 'MediaDetails',
        query: {
          mediaID: e.id
        }
      })
    },
    // 点击查看档期触发的函数
    seeSchedule (e) {
      this.$router.push({
        path: '/mediaAllCalendar',
        query: {
          mediaID: e.id,
          mediaCode: e.mediaCode,
          mediaName: e.name
        }
      })
    }
  },
  created () {
    this.getCondition()
    this.getMediaList()
  }
}
</script>
<style scoped>
  ul {
    list-style: none;
  }

  em {
    font-style: normal;
  }

  .manage {
    padding: 0 40px 20px 30px;
  }
  /* 表单字体的大小 */
  .manage .el-form-item__content {
    line-height: 40px;
    font-size: 14px;
  }

  /* 面包屑导航 */
  .manage .media-customer h1 {
    padding: 25px 0 35px 0;
    font-size: 20px;
  }

  .manage .media-top {
    padding: 30px 0 0 45px;
    border-radius: 10px;
    background-color: #fff;
  }

  .manage .media-top .el-form-item {
    margin: 0 60px 30px 0;
  }

  .manage .el-input__icon {
    line-height: 20px;
    margin-right: 20px;
  }

  .manage .el-button {
    /*line-height: 0;*/
    /*width: 1rem;*/
    /*height: .30rem;*/
    /*font-size: 0.13rem;*/
    /*color: #fff;*/
    /*border-radius: 5px;*/
    /*border: none !important;*/
  }

  /* 品牌的右margin */
  .manage .media-top .brand {
    margin-right: 150px;
  }

  /* 日期 */
  .manage .el-date-editor--datetimerange.el-input__inner {
    width: 270px;
    padding-right: 0;
    margin-right: 50px;
    font-size: 14px;
  }

  .manage .el-input__icon.el-range__close-icon {
    line-height: 32px;
  }

  /* 日期中的- */
  .manage .el-date-editor .el-range-separator {
    line-height: 25px
  }

  .manage .el-date-editor .el-range-input {
    font-size: 16px;
    line-height: 40px;
  }

  .manage .med-search {
    background-color: #409eff;
    color: #fff;
    font-size: 12px;
    border: none;
  }

  /* 媒体列表 */
  .manage .media-mediatab {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px 45px 80px 45px;
    margin-top: 30px;
    border-radius: 10px;
  }

  /* 用户列表的上部分 */
  .manage .media-tab {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f4f4f4;
    padding-bottom: 20px;
  }

  .manage .media-left {
    font-size: 18px;
    font-weight: 700;
  }

  .manage .media-tab .media-right {
    font-size: 14px;
    padding-right: 20px;
  }

  .manage .media-tab .media-right a {
    color: #5bd3cd;
  }

  /* 批量上传 */
  .manage .table-lf {
    margin-right: 30px;
  }
  /* 档期和操作的字体颜色 */
  .manage .media-mediatab .el-table .cell a {
    color: #3399ff;
  }

  /* 弹出框内容 */
  .manage .el-dialog-medias .form-content {
    display: flex;
  }

  /* 上图盒子 */
  .manage .el-dialog-medias .el-form-top .form-role {
    flex: 2;
    width: 300px;
    height: 200px;
  }

  /* 上img */
  .manage .el-dialog-medias .el-form-top .img-role {
    width: 100%;
    height: 100%;
  }

  /* 下图盒子 */
  .manage .el-dialog-medias .el-form-top .form-svg {
    width: 100%;
    height: 240px;
  }

  /* 下img */
  .manage .el-dialog-medias .el-form-top .img-svg {
    width: 100%;
    height: 100%;
  }

  /* 内容    /* 第一张图加文字的大盒子 */
  .manage .el-dialog-medias .el-form-top .form-content {
    display: flex;
  }

  /* 媒体信息介绍 */
  .manage .el-dialog-medias .el-form-top .form-content .role-content {
    flex: 1;
  }
  .manage .el-dialog .el-form-top .category ul li {
    display: flex;
  }

  .manage .el-dialog .el-form-top .category ul span {
    flex: 1;
    margin-left: 15px;
  }

  .manage .el-dialog .el-form-top .category ul em {
    flex: 1;
  }

  /* 左右箭头 */
  .manage .el-pagination button {
    border: 1px solid #eee;
    border-radius: 6px;
    min-width: 30.5px;
  }

  .manage .el-pagination .btn-prev {
    padding-right: 5px;
    margin-right: 5px;
  }

  .manage .el-pagination .btn-next {
    padding-left: 5px;
    margin-left: 5px;
  }

  .manage .el-pagination__editor .el-input_inner {
    width: 40px !important;
  }

  .el-pagination__editor.el-input .el-input__inner {
    width: 30px;
  }
</style>
