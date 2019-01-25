<template>
  <div id='userTableList'>
    <div class="table">
      <div class="table-list">
        <el-table class="el-table-media" stripe :data="tableList" >
          <el-table-column label="序号" type="index" align="center" :index="indexMethod"></el-table-column>
          <el-table-column v-for="(item,i) in tableColumnList" :key="i"  :prop="item.prop" :label="item.label" :width="item.width"  align="center">
            <template slot-scope="scope">
              <div>{{scope.row[item.prop]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <span v-if="tableType">
                <el-button :disabled="disabled(scope.row.id)" class="success-btn" type="text" size="mini" @click="checkPass(scope.row.id, 1)">通过</el-button>
                <el-button :disabled="disabled(scope.row.id)" class="danger-btn" type="text" size="mini" @click="checkPass(scope.row.id, -2)">拒绝</el-button>
              </span>
              <el-button type="text" size="mini" @click="checkPass(scope.row.id, -1)">取消订单</el-button>
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
    props: ['pageList', 'tableInfo', 'tableColumnList'],
    computed: {
      tableList () {
        return this.tableInfo
      }
    },
    methods: {
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
