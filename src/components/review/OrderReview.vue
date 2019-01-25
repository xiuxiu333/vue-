<template>
  <div id='orderList'>
      <h1>订单审核</h1>

    <div class="search-info">
      <el-form class="form" label-width="130px">
        <div class="g-x-s">
          <el-form-item label="城市：">
            <el-cascader
              :clearable="true"
              :options="countryList"
              :show-all-levels="false" placeholder="请选择城市"
              v-model="formInline.cityID"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="formInline.status" clearable  placeholder="请选择状态">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属销售：">
            <el-select v-model="formInline.salesID" clearable  placeholder="请选择状态">
              <el-option
                v-for="item in salesList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间：">
            <el-date-picker
              class="dataArr"
              v-model="formInline.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="关键字：">
            <el-input v-model="formInline.keyword" placeholder="编号/品牌/名称/联系人/手机"></el-input>
          </el-form-item>
          <div class="checklistBtn">
            <el-button size='mini' type="primary" @click="getInfo()">筛选</el-button>
            <el-button size='mini'  type="primary" @click="reset">重置</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <dspTable class="table" @getList="getInfo" :tableType="true" :pageList="formInline" :tableColumnList="tableColumnList" :tableInfo="tableInfo"  @emitCurrentChange="CurrentChange" @emitHandleSizeChange="handleSizeChange"></dspTable>
  </div>
</template>

<script>
  import dspTable from '../common/dsp-table'
  export default {
    name: 'orderList',
    data () {
      return {
        countryList: [],
        salesList: [],
        statusList: [
          {name: '审核未通过', id: -2},
          {name: '已取消', id: -1},
          {name: '待审核', id: 0},
          {name: '已预定', id: 1},
          {name: '锁位待审核', id: 2},
          {name: '锁位', id: 3},
          {name: '上刊待审核', id: 7},
          {name: '上刊', id: 4},
          {name: '下刊', id: 5},
          {name: '已完成', id: 6},
        ],
        formInline: {
          cityID: [],
          time: [],
          salesID: '',
          status: '',
          keyword: '',
          // 当前页码
          currentPage: 1,
          // 每页显示的条数
          pageSize: 10,
          total: 1
        },
        tableInfo: [],
        tableColumnList: [
          {label: '订单编号', prop: 'name', width: ''},
          {label: '下单时间', prop: 'name', width: ''},
          {label: '城市', prop: 'name', width: ''},
          {label: '公司', prop: 'name', width: ''},
          {label: '发布品牌', prop: 'name', width: ''},
          {label: '联系人', prop: 'name', width: ''},
          {label: '所属销售', prop: 'name', width: ''},
          {label: '当前状态', prop: 'name', width: ''},
          {label: '操作', prop: 'name', width: ''}
        ]
      }
    },
    computed: {},
    methods: {
      // 搜索条件
      listOfSearchInfo () {
        this.$http({
          url: '/booking/listOfSearchInfo',
          method: 'POST',
          dataType: 'JSON',
          data: {}
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
            this.countryList = data.countryList
            this.salesList = data.salesList
          }
        })
      },
      // 重置
      reset () {
        this.formInline = {
          cityID: [],
          time: [],
          status: '',
          keyword: '',
          // 当前页码
          currentPage: 1,
          // 每页显示的条数
          pageSize: 20,
          total: 1
        }
      },
      getInfo () {
        this.formInline.endDate = this.formInline.time[1] ? this.formInline.time[1] : ''
        this.formInline.startDate = this.formInline.time[0] ? this.formInline.time[0] : ''
        this.$http({
          url: '/booking/list',
          method: 'POST',
          dataType: 'JSON',
          data: this.formInline
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
            this.countryList = data.countryList
            this.tableInfo = data.data.list
            this.formInline.total = data.data.count
          }
        })
      },
      // 点击当前页触发的函数
      CurrentChange (currentpage) {
        this.formInline.page = currentpage
        this.getInfo()
      },
      // 点击页容量触发的函数
      handleSizeChange (pagesize) {
        this.formInline.pageSize = pagesize
        this.getInfo()
      }
    },
    components: {dspTable},
    created () {
      this.listOfSearchInfo()
      this.getInfo()
    }
  }
</script>

<style lang="scss" scoped>
  #orderList{
    padding: 0 30px;
  }
  .search-info,.table{
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .el-form-item {
    margin-bottom: 10px;
    .dataArr{
      width: 234px;
    }
    .el-input {
      width: 234px;
    }
  }

  //横向居中
  .g-x-s {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap
  }
  .checklistBtn{
    margin-left: 130px;
    padding-top: 5px;
  }
</style>
