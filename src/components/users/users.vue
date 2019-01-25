<template>
  <div class="users">
    <!-- 客户管理 -->
    <div class="users-customer">
   <h1>客户列表</h1>

      <div class="cus-top">
        <!-- 搜索功能 -->
        <div class="term">
          <el-input placeholder="请输入编号/品牌/名称" v-model="form.search" class="input-with-select"></el-input>
          <el-button @click="getUserList" type="primary" size="mini">查询</el-button>
        </div>
        <el-form :inline="true" >
          <el-row>
          <el-col :span="8">
          <el-form-item >
            <el-select v-model="form.industry"  clearable placeholder="请选择客户行业">
              <el-option v-for="item in industryCategoryList" :label="item.name" :value="item.id"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <!-- 选择城市 -->
          <el-col :span="8">
          <el-form-item>
            <el-cascader
              :options="cityOptions"
              :show-all-levels="false" placeholder="请选择城市"
              v-model="form.cityID"
            ></el-cascader>
          </el-form-item>
          </el-col>
          <!-- 日期 -->
          <el-col :span="8">
          <el-form-item>
            <el-date-picker
              v-model="form.startDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- 用户列表 -->
    <div class="users-table">
      <div class="users-usertab">
        <span class="user-left"></span>

        <div class="user-right">
          <a href="javascript:;" class="table-lf">批量上传</a>
          <a href="javascript:;" @click="exportFile" class="table-gt">导出报表</a>
        </div>
      </div>
      <tableList class="tableList" :pageList="pageList" :tableInfo="tableInfo" :type="type"
                 @emitCurrentChange="CurrentChange" @emitHandleSizeChange="handleSizeChange"></tableList>
    </div>
    <a href="" download="" id="download"></a>
  </div>

</template>
<script>
  import tableList from '../common/userTableList'

  export default {
    data () {
      return {
        industryCategoryList:[],
        type: 2,
        tableInfo: [],
        // 日期控件
        // filters: {
        //     // column: {
        //       startDate: "",
        //       endDate: ""
        //     // }
        //   },
        pageList: {
          // 当前页码
          page: 1,
          // 每页显示的条数
          pageSize: 10,
          total: 1
        },
        // 设置当前表单中所有数据的数据源
        form: {
          industry: '',
          cityName: '',
          startDate: [],
          endDate: '',
          search: '',
          cityID: []
        },
        // 选择城市的级联先择期
        cityOptions: [],
        pickerBeginDateBefore: {
          disabledDate: (time) => {
          let beginDateVal = this.form.endDate
          if (beginDateVal) {
            return time.getTime() > new Date(beginDateVal) || time.getTime() > Date.now()
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
        pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.form.startDate
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal) || time.getTime() > Date.now()
          }
        }
      }
    }
    },
    components: {
      tableList
    },
    methods: {
      indexMethod (index) {
        return index + 1
      },
      // 导出
      exportFile () {
        this.$http({
          url: 'client/export',
          method: 'POST',
          dataType: 'JSON',
          responseType: 'blob',
          data: {
            cityID: this.form.cityID,
            industryCategory1: this.form.industry,
            endDate: this.form.startDate[1] ? this.form.startDate[1] : '',
            startDate: this.form.startDate[0] ? this.form.startDate[0] : '',
            keyword: this.form.search
          }
        }).then(res => {
        let eleLink = document.getElementById('download')
        let blob = new Blob([res.data], {type: 'application/excel'})
        let url = window.URL.createObjectURL(blob)
        eleLink.href = url
        eleLink.download = '客户列表.xls'
        eleLink.click()
        window.URL.revokeObjectURL(url)
      })
      },
      // 获取客户列表的所有数据
      getUserList () {
        this.$http({
          url: 'client/list',
          method: 'POST',
          dataType: 'JSON',
          data: {
            page: this.pageList.page,
            pageSize: this.pageList.pageSize,
            cityID: this.form.cityID,
            industryCategory1: this.form.industry,
            endDate: this.form.startDate[1] ? this.form.startDate[1] : '',
            startDate: this.form.startDate[0] ? this.form.startDate[0] : '',
            keyword: this.form.search
          }
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
          this.tableInfo = data.list
          this.pageList.total = data.count
        }
      })
      },
      // 获取条件
      getCondition () {
        this.$http({
          url: 'client/listOfSearchInfo',
          method: 'POST',
          dataType: 'JSON',
          data: {}
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
            this.cityOptions = data.countryList
            this.industryCategoryList = data.industryCategoryList
          }
        })
      },
      // 点击筛选按钮触发的事件
      filter () {
        console.log(this.form.endDate)
        this.$http({
          url: 'client/list',
          method: 'POST',
          data: {
            industryCategory1: this.form.industry,
            endDate: this.form.endDate,
            startDate: this.form.startDate
          }
        }).then(res => {
          console.log(1)
      })
      },
      // 点击查询按钮事件
      search () {

      },
      // 点击查看详情触发的事件
      seeDetails (e) {
        let clientID = e.id
        this.$router.push({
          path: '/usersDetails',
          name: 'UsersDetails',
          query: {
            clientID: clientID
          }
        })
      },
      // 点击当前页触发的函数
      CurrentChange (currentpage) {
        this.pageList.page = currentpage
        this.getUserList()
      },
      // 点击页容量触发的函数
      handleSizeChange (pagesize) {
        this.pageList.pageSize = pagesize
        this.getUserList()
      },
      // 点击编辑的函数
      edit () {
        this.editVisible = true
      },
      // 分配角色的弹出框的函数
      setRole () {
        this.roleVisible = true
      },
      // 删除的处理函数
      del () {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      }
    },
    created () {
      this.getCondition()
      this.getUserList()
    }
  }

</script>

<style scoped>

  /* 客户管理 */
  .users .users-customer {
    padding-left: 30px;
  }

  .users .users-customer .cus-top {
    background-color: #fff;
    border-radius: 10px;
    padding: 30px 0 30px 44px;
    margin-bottom: 30px;
  }
  /* 筛选按钮 */
  .users-customer .filter {
    background-color: #08b1a6;
    border-color: #08b1a6;
    border-radius: 10px;
    margin-left: .38rem;
  }
  /* 查询条件 */
  .users-customer .term {
    margin-bottom: 10px;
  }
  .input-with-select.el-input{
    width: 234px;
    margin-right: 30px;
  }
  .users-customer  .el-date-editor{
    width: 234px;
  }
  /* 查询按钮 */
  .users-customer .term .demand {
    background-color: #348ddf;
    border-radius: 10px;

  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: rgb(67, 191, 185);
  }
  /* 用户列表 */
  .users .users-table {
    margin-left: 30px;
    background-color: #fff;
    padding: 20px 45px 80px 45px;
    border-radius: 10px;
  }
  /* 用户列表的上部分 */
  .users .users-usertab {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f4f4f4;
    padding-bottom: 20px;
  }
  .users .user-left {
    font-size: 15px;
    font-weight: 700;
  }
  .users .users-usertab .user-right {
    font-size: 15px;
    padding-right: 20px;
  }
  .users .users-usertab .user-right a {
    color: #5bd3cd;
  }
  /* 批量上传 */
  .users .table-lf {
    margin-right: 30px;
  }
  /* 查看详情详情 */
  .users .users-table .aspect {
    color: #3399ff;
  }
  /* 角色框 */
  .users .el-form-item__content .el-select{
    width: 100%;
  }

</style>
