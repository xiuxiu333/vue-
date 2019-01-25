<template>
  <div id='userTableList'>
    <div class="table">
      <div class="table-list">
        <el-table class="el-table-media" stripe :data="tableList" >
          <el-table-column label="序号" type="index" align="center" :index="indexMethod"></el-table-column>
          <el-table-column label="订单编号" prop="ordernumber" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="detail(scope.row.id)">{{scope.row.ordernumber}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="下单时间" width="160px" prop="ordernumber" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.createdon | date}}</div>
            </template>
          </el-table-column>
          <el-table-column label="城市" prop="cityName" align="center"></el-table-column>
          <el-table-column label="公司" prop="clientName" align="center"></el-table-column>
          <el-table-column label="发布品牌" prop="brand" align="center"></el-table-column>
          <el-table-column label="联系人" prop="contactName" align="center"></el-table-column>
          <el-table-column label="所属销售" prop="saleName" align="center"></el-table-column>
          <el-table-column label="当前状态" prop="status" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.status | orderStatus}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <span v-if="tableType">
                <el-button :disabled="disabled(scope.row.status)" class="success-btn" type="text" size="mini" @click="checkPass(scope.row.id, 1)">通过</el-button>
                <el-button :disabled="disabled(scope.row.status)" class="danger-btn" type="text" size="mini" @click="checkPass(scope.row.id, -2)">拒绝</el-button>
              </span>
              <el-button :disabled="scope.row.status === -1 ? true : false" type="text" size="mini" @click="checkPass(scope.row.id, -1)">取消订单</el-button>
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
          :current-page.sync="pageList.page"
          :page-size='pageList.pageSize'
          layout="total, prev, pager, next, jumper"
          :total='pageList.total'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userTableList',
  data () {
    return {}
  },
  props: ['pageList', 'tableInfo', 'tableColumnList','tableType'],
  computed: {
    tableList () {
      return this.tableInfo
    }
  },
  methods: {
    // pan
    disabled (status) {
      switch (status) {
        case 0:
          return false
        case 2:
          return false
        case 4:
          return false
        default:
          return true
      }
    },
    // 详情
    detail (id) {
      this.$router.push({
        path: '/orderDetail',
        name: 'OrderDetail',
        query: {
          id: id
        }
      })
    },
    // 通过
    checkPass (id, status) {
      this.$http({
        url: '/booking/checkPass',
        method: 'POST',
        dataType: 'JSON',
        data: {
          id: id,
          status: status
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          switch (status) {
            case -2:
              this.$message.success('已拒绝该订单')
              break
            case -1:
              this.$message.success('已取消该订单')
              break
            case 1:
              this.$message.success('已通过该订单')
              break
          }
        // 刷新订单
          this.$emit('getList')
        }
      })
    },
    // 表格序号
    indexMethod (index) {
      return index + 1
    },
    // 点击当前页触发的函数
    CurrentChange (currentpage) {
      this.$emit('emitCurrentChange', currentpage)
    },
    // 点击页容量触发的函数
    handleSizeChange (pagesize) {
      this.$emit('emitHandleSizeChange', pagesize)
    }
  }
}
</script>
<style scoped>
.cell .el-button--text{
  padding: 0;
}
</style>
