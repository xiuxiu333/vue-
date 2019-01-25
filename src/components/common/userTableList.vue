<template>
  <div id='userTableList'>
    <div class="table">
      <div class="table-list">
        <el-table class="el-table-media" stripe :data="tableList">
          <el-table-column label="序号" type="index" align="center" :index="indexMethod"></el-table-column>
          <el-table-column prop="code" label="编号" align="center"></el-table-column>
          <el-table-column prop="brand" label="品牌" align="center"></el-table-column>
          <el-table-column prop="name" label="公司" align="center" ></el-table-column>
          <el-table-column prop="indusCateName" label="行业" align="center"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="salesName" label="所属销售" align="center"></el-table-column>
          <el-table-column prop="cityName" label="城市" align="center"></el-table-column>
          <el-table-column v-if="type === 1" prop="createdOn" width="160px" label="注册时间" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.createdOn | date}}</div>
            </template>
          </el-table-column>
          <el-table-column v-if="type === 1" prop="category" label="客户类型" align="center"></el-table-column>
          <el-table-column v-if="type === 1" prop="rank" label="客户等级" align="center"></el-table-column>
          <el-table-column prop="validity" label="保护期"  width="160px" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>{{scope.row.validity | date}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="seeDetails(scope.row)" type="text" size="mini">查看详情</el-button>
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
  props: [ 'pageList', 'type', 'tableInfo' ],
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
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
