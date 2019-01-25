<template>
  <div id='MediaReview'>
    <h1>媒体审核</h1>
    <div class="top">
      <el-form :inline="true">
        <el-row>
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
            <el-input clearable placeholder="请输入编号、名称" v-model="formInline.keyword" class="input-with-select"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size='mini' type="primary" @click="getInfo">查找</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="table">
      <div class="table-list">
        <el-table class="el-table-media" stripe :data="tableList" >
          <el-table-column label="序号" type="index" align="center" :index="indexMethod"></el-table-column>
          <el-table-column prop="mediaCode" label="编号" align="center"></el-table-column>
          <el-table-column prop="createdOn" label="申请时间" align="center">
            <template slot-scope="scope">
              {{scope.row.createdOn | date}}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" align="center"></el-table-column>
          <el-table-column prop="cityName" label="城市" align="center"></el-table-column>
          <el-table-column prop="routeName" label="线路" align="center"></el-table-column>
          <el-table-column prop="stationName" label="站点" align="center"></el-table-column>
          <el-table-column prop="rank" label="等级" align="center"></el-table-column>
          <el-table-column prop="position" label="位置" align="center"></el-table-column>
          <el-table-column prop="packageOwned" label="所属套装" align="center"></el-table-column>
          <el-table-column prop="mediaForm" label="媒体形式" align="center"></el-table-column>
          <el-table-column prop="type" label="媒体类型" align="center"></el-table-column>
          <el-table-column prop="checkIfPass" label="当前状态" align="center">
            <template slot-scope="scope">
              {{scope.row.checkIfPass | checkIfPass}}
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
        checkIfPass: '',
        time: [],
        // 当前页码
        currentPage: 1,
        // 每页显示的条数
        pageSize: 10,
        total: 1
      },
      tableList: [],
      statusList: [
        {name: '已通过', id: 1},
        {name: '未通过', id: -1},
        {name: '已取消', id: -2},
        {name: '待审核', id: 0}
      ]
    }
  },
  computed: {},
  methods: {
    // 审核
    checkPass (id, status) {
      this.$http({
        url: '/media/checkPass',
        method: 'POST',
        dataType: 'JSON',
        data: {
          mediaID: id,
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
          this.getInfo()
        }
      })
    },
    getInfo () {
      this.$http({
        url: 'media/list',
        method: 'POST',
        dataType: 'JSON',
        data: {
          checkIfPass: this.formInline.checkIfPass,
          keyword: this.formInline.keyword,
          pageSize: this.formInline.pageSize,
          page: this.formInline.currentPage,
          startEndDate: this.formInline.time,
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.formInline.total = data.count
          this.tableList = data.list
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
    this.getInfo()
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
