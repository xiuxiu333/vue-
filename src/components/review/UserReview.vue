<template>
  <div id='MediaReview'>
    <h1>客户审核</h1>
    <div class="top">
      <el-form :inline="true">
        <!-- 输入媒体名称城市 -->
          <el-form-item>
            <el-date-picker
              v-model="formInline.time"
              type="daterange"
              range-separator="至"
              start-placeholder="提交开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.checkIfPass" clearable  placeholder="请选择状态">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.sales" clearable  placeholder="所属销售">
            <el-option
              v-for="item in salesList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item>
            <el-input clearable placeholder="请输入编号、名称" v-model="formInline.keyword" class="input-with-select"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size='mini' type="primary" @click="getUserList">查找</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <div class="table-list">
        <el-table class="el-table-media" stripe :data="tableList" >
          <el-table-column label="序号" type="index" align="center" :index="indexMethod"></el-table-column>
          <el-table-column prop="code" label="编号" align="center"></el-table-column>
          <el-table-column prop="brand" label="品牌" align="center"></el-table-column>
          <el-table-column prop="name" label="公司" align="center" ></el-table-column>
          <el-table-column prop="indusCateName" label="行业" align="center"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="salesName" label="所属销售" align="center"></el-table-column>
          <el-table-column prop="cityName" label="城市" align="center"></el-table-column>
          <el-table-column prop="createdOn" width="160px" label="注册时间" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.createdOn | date}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="validity" label="保护期"  width="160px" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>{{scope.row.validity | date}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="validity" label="当前状态" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>{{scope.row.checkIfPass | checkIfPass}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.checkIfPass === 0 ? false : true" class="success-btn" type="text" size="mini" @click="checkPass(scope.row.id, 1)">通过</el-button>
              <el-button :disabled="scope.row.checkIfPass === 0 ? false : true" class="danger-btn" type="text" size="mini" @click="checkPass(scope.row.id, -1)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <!-- 分页 -->
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="CurrentChange"
          :current-page.sync="formInline.page"
          :page-size='formInline.pageSize'
          layout="total, prev, pager, next, jumper"
          :total='formInline.total'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import dspTable from '../common/table'
export default {
  name: 'MediaReview',
  data () {
    return {
      formInline: {
        keyword: '',
        status: '',
        time: [],
        // 当前页码
        currentPage: 1,
        // 每页显示的条数
        pageSize: 10,
        total: 1
      },
      tableList: [],
      tableColumnList: [
        {label: '编号', prop: 'name', width: ''},
        {label: '申请时间', prop: 'name', width: '', filter: 'date'},
        {label: '品牌', prop: 'name', width: ''},
        {label: '公司', prop: 'name', width: ''},
        {label: '行业', prop: 'name', width: ''},
        {label: '所属销售', prop: 'name', width: ''},
        {label: '城市', prop: 'name', width: ''},
        {label: '注册时间', prop: 'name', width: ''},
        {label: '有效期', prop: 'name', width: ''},
        {label: '当前状态', prop: 'name', width: ''},
        {label: '操作', prop: 'name', width: ''}
      ],
      statusList: [
        {name: '已通过', id: 1},
        {name: '未通过', id: -2},
        {name: '已取消', id: -1},
        {name: '待审核', id: 0}
      ],
      salesList: []
    }
  },
  computed: {},
  methods: {
      // 审核
      checkPass (id, status) {
        this.$http({
          url: 'client/checkPass',
          method: 'POST',
          dataType: 'JSON',
          data: {
            clientID: id,
            checkIfPass: status
          }
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
            switch (status) {
              case -1:
                this.$message.success('已拒绝该订单')
                break
              case -2:
                this.$message.success('已取消该订单')
                break
              case 1:
                this.$message.success('已通过该订单')
                break
            }
            // 刷新订单
            this.getUserList()
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
          this.salesList = data.salesList
        }
      })
    },
    // 获取客户列表的所有数据
    getUserList () {
      this.$http({
        url: 'client/list',
        method: 'POST',
        dataType: 'JSON',
        data: {
          checkIfPass: this.formInline.checkIfPass,
          keyword: this.formInline.keyword,
          pageSize: this.formInline.pageSize,
          page: this.formInline.currentPage,
          startEndDate: this.formInline.time
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.tableList = data.list
          this.formInline.total = data.count
        }
      })
    },
    // 表格序号
    indexMethod (index) {
      return index + 1
    },
    // 点击当前页触发的函数
    CurrentChange (currentpage) {
      this.formInline.page = currentpage
      this.getUserList()
    },
    // 点击页容量触发的函数
    handleSizeChange (pagesize) {
      this.formInline.pageSize = pagesize
      this.getUserList()
    }
  },
  components: {dspTable},
  created () {
    this.getCondition()
    this.getUserList()
  }
}
</script>

<style scoped>
  #MediaReview{
    padding: 0 30px;
  }
  .cell .el-button--text{
    padding: 0;
  }
  .top, .table{
    background: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
</style>
