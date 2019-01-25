<template>
  <div class='mediaPlan'>
    <div class="title">媒体计划列表</div>
    <div class="content">
      <div class="content-item" v-for="(item, i) in list" :key="i">
        <div class="item-name">{{item.clientName}}</div>
        <el-table :data="item.medias" stripe  @selection-change="handleSelectionChange(item.clientName)">
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column  width="" label="媒体编号" prop="mediacode" align="center"></el-table-column>
          <el-table-column  width="" label="城市" prop="cityName" align="center"></el-table-column>
          <el-table-column  width="" label="线路" prop="routeName" align="center"></el-table-column>
          <el-table-column  width="" label="等级" prop="rank" align="center"></el-table-column>
          <el-table-column  width="" label="站点" prop="stationName" align="center"></el-table-column>
          <el-table-column  width="" label="媒体形式" prop="mediaForm" align="center"></el-table-column>
          <el-table-column  width="" label="媒体类型" prop="type" align="center"></el-table-column>
          <el-table-column  width="" label="所属套餐" prop="packageOwned" align="center"></el-table-column>
          <el-table-column  width="" label="位置" prop="position" align="center"></el-table-column>
          <el-table-column  width="" label="所属销售" prop="" align="center">
            <template slot-scope="scope">
              <div>{{item.saleName}}</div>
            </template>
          </el-table-column>
          <el-table-column  width="" label="开始时间" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.startdate|date}}</div>
            </template>
          </el-table-column>
          <el-table-column  width="" label="结束时间" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.enddate|date}}</div>
            </template>
          </el-table-column>
          <el-table-column  width="" label="操作" prop="" align="center">
            <template slot-scope="scope">

            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mediaPlan',
  data () {
    return {
      tableData: [{name: 1}],
      lableList: [
        {lable: '媒体编号', prop: 'name', width: ''}
      ],
      list: []
    }
  },
  computed: {},
  methods: {
    getList () {
      this.$http({
        url: 'mediaPlan/list',
        method: 'POST',
        dataType: 'JSON',
        data: {
          page: 1,
          pageSize: 20
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.list = data.data.list ? data.data.list : []
        }
      })
    },
    handleSelectionChange (clientName, val) {
    }
  },
  components: {},
  created () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.mediaPlan{
  padding:0 30px;
  font-size: 14px;
  .title {
    font-size: 20px;
    /*margin-bottom: 10px;*/
    font-weight: bold;
    line-height: 70px;
  }
  .content{
    margin: 0 0 20px;
    padding: 20px 10px;
    background: white;
    border-radius: 15px;
    .content-item +  .content-item{
     margin-top: 20px;
    }
    .item-name{
      font-weight: bold;
      margin-left: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
