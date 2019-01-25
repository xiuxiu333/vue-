<template>
  <div id='mediaPlanInfo'>
    <div class="title">客户详情</div>
    <el-form ref="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="公司名称：">
            <el-select v-model="clientID" @change="getClientDetailByID" filterable clearable placeholder="公司名称">
              <el-option
                v-for="item in clientList"
                :key="item.clientid"
                :label="item.name"
                :value="item.clientid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址：">
            <el-input
              placeholder="请输入内容"
              v-model="address"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="品牌：">
            <el-input
              placeholder="品牌"
              v-model="brand"
              :disabled="clientID ? false : true">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="销售人员：">
            <el-select v-model="salesID" :disabled="clientID ? false : true" filterable clearable placeholder="销售">
              <el-option
                v-for="item in salesList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="联系人：">
            <el-select v-model="contactID" @change="getTelphone" :disabled="clientID ? false : true" filterable
                       clearable
                       placeholder="联系人">
              <el-option
                v-for="item in contacts"
                :key="item.contactID"
                :label="item.name"
                :value="item.contactID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话：">
            <el-input
              placeholder="请输入内容"
              v-model="telephone"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="title">发布媒体详情</div>
    <el-table :data="selectMediaLists">
      <el-table-column align="center" prop="mediaCode" label="编号"></el-table-column>
      <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
      <el-table-column align="center" prop="routeName" label="线路"></el-table-column>
      <el-table-column align="center" prop="rank" label="等级"></el-table-column>
      <el-table-column align="center" prop="stationName" label="站点"></el-table-column>
      <el-table-column align="center" prop="mediaForm" label="媒体形式"></el-table-column>
      <el-table-column align="center" prop="position" label="位置"></el-table-column>
      <el-table-column align="center" prop="type" label="媒体类型"></el-table-column>
      <el-table-column align="center" prop="packageOwned" label="所属套装"></el-table-column>
      <el-table-column align="center" prop="name" label="操作" width="250">
        <template slot-scope="scope">
          <el-date-picker class="data-arr" size="mini" v-model="scope.row.dateArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="warning" @click="createMediaPlan">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mediaPlanInfo',
  props: ['selectMediaLists'],
  data () {
    return {
      clientList: [],
      salesList: [],
      contacts: [],
      saleName: '',
      telephone: '',
      clientID: '',
      salesID: '',
      contactID: '',
      brand: '',
      planMedias: [],
      address: ''
    }
  },
  computed: {},
  methods: {
    // 清空
    reset () {
      this.salesList = []
      this.contacts = []
      this.telephone = ''
      this.clientID = ''
      this.salesID = ''
      this.contactID = ''
      this.brand = ''
    },
    // 取消
    cancel () {
      this.$emit('closeVisible', 'mediaPlanVisible')
      this.reset()
    },
    // 提交媒体计划
    createMediaPlan () {
      this.planMedias = []
      for (let i = 0; i < this.selectMediaLists.length; i++) {
        if (!this.telephone || !this.clientID || !this.salesID || !this.contactID || !this.brand || !this.selectMediaLists[i].dateArr || this.selectMediaLists[i].dateArr.length < 2) {
          this.$message.warning('请完善信息')
          return
        } else {
          this.planMedias.push({
            mediaID: this.selectMediaLists[i].id,
            mediaCode: this.selectMediaLists[i].mediaCode,
            mediaName: this.selectMediaLists[i].name,
            endDate: this.selectMediaLists[i].dateArr[1],
            startDate: this.selectMediaLists[i].dateArr[0]
          })
        }
      }
      this.$http({
        url: 'mediaPlan/create',
        method: 'POST',
        dataType: 'JSON',
        data: {
          clientID: this.clientID,
          salesID: this.salesID,
          address: this.address,
          contactID: this.contactID,
          brand: this.brand,
          planMedias: this.planMedias
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.$message.success('执行成功')
          this.$emit('clearSelectMediaLists')
          this.cancel()
          this.$router.push({
            path: '/mediaPlan'})
        } else {
          this.$message.error(data.msg)
        }
      }, (error) => {
        this.$message.error(error)
      })
    },
    getInfo () {
      this.$http({
        url: 'booking/newBooking',
        method: 'POST',
        dataType: 'JSON',
        data: {}
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.clientList = data.data.clientList
        } else {
          this.$message.error(data.msg)
        }
      }, (error) => {
        this.$message.error(error)
      })
    },
    // 根据客户ID获取品牌联系人等信息
    getClientDetailByID () {
      if (this.clientID) {
        this.$http({
          url: 'booking/getClientDetailByID',
          method: 'POST',
          dataType: 'JSON',
          data: {
            clientID: this.clientID
          }
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
            this.salesList = data.data.salesList
            this.contacts = data.data.contacts
            this.brand = data.data.clientInfo.brand
            this.address = data.data.clientInfo.address
            this.salesID = data.data.clientInfo.salesID
          } else {
            this.$message.error(data.msg)
          }
        }, (error) => {
          this.$message.error(error)
        })
      }
    },
    // 获取电话
    getTelphone () {
      if (this.contactID) {
        for (let i = 0; i < this.contacts.length; i++) {
          if (this.contactID = this.contacts[i].contactID) {
            this.telephone = this.contacts[i].telephone
            return
          }
        }
      }
    }
  },
  components: {},
  created () {
    this.getInfo()
  }
}
</script>
<style lang="scss" scoped>
  .title {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  #mediaPlanInfo .data-arr{
    width: 220px;
  }
  .el-button + .el-button {
    margin-left: 200px;
  }
  .footer{
    display: flex;
    justify-content: center;
    margin: 20px auto 0;
  }
</style>
