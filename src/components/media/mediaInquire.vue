<template>
  <div id="medianInquire">
    <h1>媒体查询</h1>
    <div class="median-header">
      <el-row :gutter="20" type="flex" class="row-bg" justify="center">
        <el-col :span="6">
          <el-input v-model="form.keyword" placeholder="请输入站点、编号等关键字"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="getInfo()" size="mini" style="margin-top: 5px;">搜索</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" class="row-bg" justify="center">
        <el-col :span="6">
          <span class="keywords-list hand" v-for=" (item , i) in keywordsList" :key="i" @click="form.keyword=item">{{item}}</span>
        </el-col>
        <el-col :span="6">
        </el-col>
      </el-row>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="时间">
          <el-date-picker
            size="small"
            v-model="form.startEndDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="城市">
          <el-radio-group v-model="form.cityID" size="mini" @change="listRoute">
            <el-radio-button v-for="item in list.cityList" :label="item.value" :key="item.value">{{item.label}}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="线路" v-if="form.cityID">
          <el-checkbox-group v-model="form.routeID" size="mini" @change="listStation">
            <el-checkbox-button v-for="item in list.routerList" :label="item.id" :key="item.id">{{item.name}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="等级" size="mini" v-if="form.routeID.length>0">
          <el-checkbox-group v-model="form.stationRank" size="mini" @change="getInfo()">
            <el-checkbox-button v-for="item in list.stationRankList" :label="item.id" :key="item.id">
              {{item.name}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="站点" v-if="form.routeID.length>0">
          <el-checkbox-group v-model="form.stationID" size="mini" @change="getInfo()">
            <el-checkbox-button v-for="item in list.stationList" :label="item.id" :key="item.id">{{item.name}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="形式">
          <el-checkbox-group v-model="form.mediaForm" size="mini" @change="getInfo()">
            <el-checkbox-button v-for="item in list.formList" :label="item.id" :key="item.id">{{item.formName}}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="更多" name="1">
          <div>
            <el-form label-position="left" label-width="100px">
              <el-form-item label="状态">
                <el-checkbox-group v-model="form.status" size="mini" @change="getInfo()">
                  <el-checkbox-button v-for="item in list.statusList" :label="item.id" :key="item.id">
                    {{item.name}}
                  </el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="方向">
                <el-checkbox-group v-model="form.direct" size="mini" @change="getInfo()">
                  <el-checkbox-button v-for="item in list.directList" :label="item.id" :key="item.id">
                    {{item.directName}}
                  </el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="位置">
                <el-checkbox-group v-model="form.position" size="mini" @change="getInfo()">
                  <el-checkbox-button v-for="item in list.PositionList" :label="item.id" :key="item.id">{{item.name}}
                  </el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="median-header median-content">
      <div>
        <p>媒体列表</p>
        <p style="text-align: right">
          <el-button size="mini" type="primary" @click="type = !type">切换</el-button>
        </p>
      </div>
      <div v-if="type">
        <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column align="center" label="序号" type=index :index="indexMethod"></el-table-column>
          <el-table-column align="center" prop="mediaCode" label="编号">
            <template slot-scope="scope">
              <el-button type="text" @click="seeDetails(scope.row)">{{scope.row.mediaCode}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
          <el-table-column align="center" prop="routeName" label="线路"></el-table-column>
          <el-table-column align="center" prop="rank" label="等级"></el-table-column>
          <el-table-column align="center" prop="stationName" label="站点"></el-table-column>
          <el-table-column align="center" prop="mediaForm" label="媒体形式"></el-table-column>
          <el-table-column align="center" prop="position" label="位置"></el-table-column>
          <el-table-column align="center" prop="type" label="媒体类型"></el-table-column>
          <el-table-column align="center" prop="packageOwned" label="所属套装"></el-table-column>
          <el-table-column align="center" prop="statu" label="状态"></el-table-column>
          <el-table-column align="center" prop="name" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="seeSchedule(scope.row)">查看档期</el-button>
              <el-button type="text">订位</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="form.page"
            :page-size='form.pageSize'
            layout="total, prev, pager, next, jumper"
            :total='form.rowCount'>
          </el-pagination>
        </div>
      </div>
      <div v-else>
        <calendars :scheduleList="scheduleList" :monthLengths="monthLengths"></calendars>
      </div>
    </div>
    <div v-if="type" class="footer" :class="[$store.state.isCollapse ? 'collapse-width' : 'notcollapse-width']">
      <div></div>
      <div>
        已选择<span class="chooseNum">{{selectMediaLists.length}}</span>个媒体资源
      </div>
      <el-button size="mini" @click="bookMedia" type="warning">立即定位</el-button>
      <el-button size="mini" type="warning" @click="addMediaPlan">+加入媒体计划</el-button>
    </div>
    <el-dialog title="确认订单信息" top="20px" :visible.sync="localtionVisible" width="1300px" :close-on-click-modal="false">
      <booking @closeVisible="closeVisible" @clearSelectMediaLists="clearSelectMediaLists"  :mediaList="selectMediaLists"></booking>
    </el-dialog>
    <el-dialog title="加入媒体计划" :visible.sync="mediaPlanVisible" width="1300px" :close-on-click-modal="false">
      <mediaPlanInfo @closeVisible="closeVisible" @clearSelectMediaLists="clearSelectMediaLists" :selectMediaLists="selectMediaLists"></mediaPlanInfo>
    </el-dialog>
    <el-dialog title="订位成功" :visible.sync="successVisible" :close-on-click-modal="false">
      <bookingSuccess :active="active" :steps="steps"></bookingSuccess>
    </el-dialog>
  </div>
</template>

<script>
import calendars from '../calender/calendarTable'
import booking from '../calender/components/booking'
import mediaPlanInfo from './comments/mediaPlanInfo'
import bookingSuccess from './comments/bookingSuccess'
export default {
  name: 'medianInquire',
  data () {
    return {
      active: 1,
      steps: [
        {title: '加入媒体计划', status: 'success'},
        {title: '审核', status: 'success'},
        {title: '订位', status: 'success'},
        {title: '提交确认单审批', status: 'success'},
        {title: '锁位', status: 'success'},
        {title: '上传盖章合同', status: 'success'},
        {title: '审批', status: 'success'},
        {title: '上刊', status: ''}
      ],
      successVisible: false,
      selectMediaLists: [],
      mediaPlanVisible: false,
      localtionVisible: false,
      planNum: 0,
      monthLengths: 1,
      scheduleList: [],
      type: true,
      list: {
        PositionList: [],
        cityList: [],
        directList: [],
        formList: [],
        list: [],
        stationRankList: [],
        typeList: [],
        routerList: [],
        stationList: [],
        statusList: [
          {name: '空闲', id: 0},
          {name: '定位', id: 1},
          {name: '锁位', id: 2},
          {name: '在刊', id: 3},
          {name: '禁售', id: 4}
        ]
      },
      tableData: [],
      activeName: 1,
      keywordsList: ['西直门换乘', '角门西包柱 ', '人民大学C口'],
      form: {
        keyword: '',
        cityID: '',
        direct: [],
        mediaForm: [],
        routeID: [],
        stationID: [],
        stationRank: [],
        position: [],
        status: [],
        page: 1,
        pageSize: 10,
        rowCount: 0
      },
      endDate: '',
      startDate: ''
    }
  },
  methods: {
    // 关闭弹框
    closeVisible (data) {
      this[data] = false
    },
    // 清空选定媒体
    clearSelectMediaLists () {
      this.handleSelectionChange([])
      this.getInfo()
    },
    // 加入媒体计划
    addMediaPlan () {
      if (this.selectMediaLists.length < 1) {
        this.$confirm('请选择媒体', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return false
      }
      this.mediaPlanVisible = true
    },
    // 立即定位
    bookMedia () {
      if (this.selectMediaLists.length < 1) {
        this.$confirm('请选择媒体', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return false
      }
      this.localtionVisible = true
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
    },
    indexMethod (index) {
      return index + 1
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
          this.list.PositionList = data.PositionList
          this.list.cityList = data.cityList
          this.list.directList = data.directList
          this.list.formList = data.formList
          this.list.stationRankList = data.stationRankList
          this.list.typeList = data.typeList
        } else {
          this.$message.error(data.msg)
        }
      }, (error) => {
        this.$message.error(error)
      })
    },
    // 表格多选
    handleSelectionChange (val) {
      this.selectMediaLists = []
      for (let i = 0; i < val.length; i++) {
        let item = val[i]
        item.dataArr = []
        item.afterDiscount = val[i].mediaFee * item.discounts / 100
        item.totalFee = item.afterDiscount + item.fabricationFee
        this.selectMediaLists.push(item)
      }
    },
    // 站点
    listStation () {
      this.getInfo()
      this.$http({
        url: '/media/listStation',
        method: 'POST',
        dataType: 'JSON',
        data: {
          routeID: this.form.routeID
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.list.stationList = data.stationList
        }
      })
    },
    // 线路
    listRoute () {
      this.getInfo()
      this.$http({
        url: '/media/listRoute',
        method: 'POST',
        dataType: 'JSON',
        data: {
          cityID: this.form.cityID
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.list.routerList = data.routeList
        }
      })
    },
    // 分页器
    handleSizeChange (val) {
      this.form.pageSize = val
      this.getInfo()
    },
    handleCurrentChange (val) {
      this.form.page = val
      this.getInfo()
    },
    getList () {
      this.$http({
        url: '/media/list',
        method: 'POST',
        dataType: 'JSON',
        data: this.form
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.tableData = data.list
          this.form.rowCount = data.count
        } else {
          this.$message.error(data.msg)
        }
      },(error) => {
        this.$message.error(error)
      })
    },
    getInfo () {
      this.getList()
      this.getScheduleList()
    }, //  日历列表
    getScheduleList () {
      this.$http({
        url: 'media/scheduleList',
        method: 'POST',
        dataType: 'JSON',
        data: this.form
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          data.list.list ? this.scheduleList = data.list.list : []
        } else {
          this.$message.error(data.msg)
        }
      }, (error) => {
        this.$message.error(error)
      })
    }
  },
  components: {
    calendars,
    booking,
    mediaPlanInfo,
    bookingSuccess
  },
  created () {
    this.getCondition()
  }
}
</script>

<style lang="scss" scoped>
  .chooseNum {
    color: #fd4747;
    margin: 0 5px;
  }
 #medianInquire {
   .el-collapse {
     border-top: 1px solid #f1f3f8;
     border-bottom: 1px solid #f1f3f8;
   }
   .el-collapse-item__wrap {
     border-bottom: 1px solid #f1f3f8;
   }
   h1{
     padding-left: 30px;
   }
   .footer {
     background: #f9f9f9;
     border-top: solid 1px #d1dbe5;
     border-left: solid 1px #d1dbe5;
     border-right: solid 1px #d1dbe5;
     border-radius: 10px;
     z-index: 1000;
     position: fixed;
     bottom: 0;
     box-sizing: padding-box;
     margin-left: 30px;
     padding: 10px;
     display: flex;
     justify-content: space-around;
     align-items: center;
     &.collapse-width{
       width: calc(100% - 289px + 136px);
     }
     &.notcollapse-width{
       width: calc(100% - 289px);
     }
   }
   .hand {
     cursor: pointer;
   }
   .el-form-item {
     margin-bottom: 5px;
   }

   .el-row {
     margin-bottom: 10px;
   }

   .el-row:last-child {
     margin-bottom: 0;
   }

   .median-header {
     background: white;
     margin: 0 20px 20px 30px;
     border-radius: 10px;
     padding: 20px 30px 20px;
   }
   .median-content{
     margin-bottom: 60px;
   }
   .keywords-list {
     font-size: 10px;
     color: #409eff;
     margin: 5px;
   }
 }
</style>
