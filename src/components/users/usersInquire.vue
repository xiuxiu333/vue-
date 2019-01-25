<template>
  <div class="usersInquire">
    <div class="title"> 客户查询</div>
    <el-form class="form" >
      <div class="g-fen-x">
        <el-form-item>
          <el-input v-model="formInline.keyword" placeholder="请输入编号/品牌/名称" @change='getInquire' ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="getInquire" size="mini">筛选</el-button>
        </el-form-item>
      </div>
       <div class="g-x-s">
         <el-row>
           <el-col :span="8">
            <el-form-item>
              <el-select  v-model="formInline.salesID" clearable  placeholder="请选择所属销售">
                <el-option
                  v-for="item in salesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
           </el-col>
           <el-col :span="8">
            <el-form-item>
              <el-date-picker
                v-model="formInline.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
           </el-col>
           <el-col :span="8">
            <el-form-item>
              <el-select v-model="formInline.category" clearable  placeholder="请选择客户类型">
                <el-option
                  v-for="item in clientCategoryList"
                  :key="item.id"
                  :label="item.chineseName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
           </el-col>
           </el-row>
         <el-row>
           <el-col :span="8">
            <el-form-item>
              <el-cascader
                :options="countryList"
                :show-all-levels="false" placeholder="请选择城市"
                v-model="formInline.cityID"
              ></el-cascader>
            </el-form-item>
           </el-col>
           <el-col :span="8">
            <el-form-item>
              <el-select v-model="formInline.industryCategory1" clearable  placeholder="请选择所属行业">
                <el-option
                  v-for="item in industryCategoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
           </el-col>
           <el-col :span="8">
            <el-form-item>
              <el-select v-model="formInline.rank" clearable  placeholder="请选择客户等级">
                <el-option
                  v-for="item in clientRankList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
           </el-col>
         </el-row>
          </div>
    </el-form>
    <!-- 数据列表 -->
    <div  class="tableList">
      <div style="font-size:15px;color:#757575;width:100%;height:35px;border-bottom:1px solid #EBEEF5;">查询结果</div>
        <tableList style="margin-top:20px;" :pageList="formInline" :tableInfo="tableInfo" :type="type"
                @emitCurrentChange="CurrentChange" @emitHandleSizeChange="handleSizeChange">
        </tableList>
      </div>
  </div>
</template>
<script>
  import tableList from '../common/userTableList'
  export default {
    data () {
      return {
        salesList: [],
        clientCategoryList: [],
        clientRankList: [],
        industryCategoryList: [],
        countryList: [],
        // 客户编号、关键字查询
        formInline: {
          // 当前页码
          page: 1,
          // 每页显示的条数
          pageSize: 10,
          total: 1,
          category: '',
          cityID: [],
          time: [],
          industryCategory1: '',
          keyword: '',
          salesID: '',
          rank: ''
        },
        tableInfo: [],
        type: 1,
        countryList: []
      }
    },
    components: {
      tableList
    },
    methods: {
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
            this.countryList = data.countryList
            this.clientCategoryList = data.clientCategoryList
            this.clientRankList = data.clientRankList
            this.industryCategoryList = data.industryCategoryList
            this.salesList = data.salesList
          } else {
            this.$message.error(data.msg)
          }
        }, (error) => {
          this.$message.error(error)
        })
      },
      // 获取表格数据
      getInquire () {
        this.formInline.endDate = this.formInline.time[1] ? this.formInline.time[1] : ''
        this.formInline.startDate = this.formInline.time[0] ? this.formInline.time[0] : ''
        this.$http({
          url: 'client/list',
          method: 'POST',
          dataType: 'JSON',
          data: this.formInline
        }).then(res => {
          let {data} = res
          // console.log(data.status)
          if (data.status === 0) {
            this.tableInfo = data.list
            this.formInline.total = data.count
          } else {
            this.$message.error(data.msg)
          }
        }, (error) => {
          this.$message.error(error)
        })
      },
      // 点击当前页触发的函数
      CurrentChange (currentpage) {
        this.formInline.page = currentpage
        this.getInquire()
      },
      // 点击页容量触发的函数
      handleSizeChange (pagesize) {
        this.formInline.pageSize = pagesize
        this.getInquire()
      }
    },
    created () {
      this.getCondition()
    }
  }
</script>
<style lang="scss" scoped>
.el-row{
  width: 100%;
}
  .usersInquire{
    padding: 0 20px;
  }
  .usersInquire .title {
    font-size: 20px;
    padding: 25px;
    font-weight: bold;
    color: #333333;
  }
  .form, .tableList {
    background: white;
    padding: 30px 0 30px 44px;
    border-radius: 8px;
  }
  .tableList {
    margin-top: 20px;
  }
.usersInquire  .el-date-editor{
  width: 234px;
}
  .el-form-item {
    margin-bottom:10px;
    .el-input {
      width: 234px;
    }
  }
  .el-collapse {
    border-top: none;
  }
  .g-cen-x {
    display: flex;
    justify-content: center;
  }
  .margin-top {
    margin-top: 10px;
  }

  //横向居中
  .g-x-s {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 10px;
  }
  //横向
  .g-fen-x {
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
  }
/*}*/
/*按钮*/
.g-fen-x .el-button--primary{
  border: none;
}
</style>
