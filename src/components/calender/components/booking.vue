<template>
  <div id='booking'>
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
    <div class="title">订单详情</div>
    <el-table :data="mediaList" show-summary :summary-method="getSummaries">
      <el-table-column align="center" prop="mediaCode" label="编号"></el-table-column>
      <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
      <el-table-column align="center" prop="routeName" label="线路"></el-table-column>
      <el-table-column align="center" prop="rank" label="等级"></el-table-column>
      <el-table-column align="center" prop="stationName" label="站点"></el-table-column>
      <el-table-column align="center" prop="mediaForm" label="媒体形式"></el-table-column>
      <el-table-column align="center" prop="position" label="位置"></el-table-column>
      <el-table-column align="center" prop="name" label="时间" width="250">
        <template slot-scope="scope">
          <el-date-picker class="data-arr" size="mini" v-model="scope.row.dateArr" type="daterange" range-separator="至" :picker-options="pickerOptions"
                          start-placeholder="开始日期" end-placeholder="结束日期" @change="checkData(scope.row.dateArr,scope.$index)"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="periods" label="周期(四周)"></el-table-column>
      <el-table-column align="center" prop="mediaFee" label="刊例总值(元)">
        <template slot-scope="scope">
          {{scope.row.mediaFee}}
        </template>
      </el-table-column>
      <el-table-column align="center" width="120" prop="discount" label="折扣(%)">
        <template slot-scope="scope">
          <el-input-number size="mini" v-model="scope.row.discounts" :precision="0" :step="1" :min="0"
                           :max="100"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="afterDiscount" label="折后总价(元)">
        <template slot-scope="scope">
          {{Number(scope.row.mediaFee * scope.row.discounts /100) * scope.row.periods}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="fabricationFee" label="制作费(元)">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.fabricationFee"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="totalFee" label="总计(元)">
        <template slot-scope="scope">
          {{Number((scope.row.mediaFee * scope.row.discounts /100) * scope.row.periods + scope.row.fabricationFee)}}
        </template>
      </el-table-column>
    </el-table>
    <div class="title">付款要求</div>
    <div class="comm-title">媒体费</div>
    <el-form class="comm" ref="form" :inline="true" label-width="120px">
      <el-form-item label="付款类型：">
        <el-input size="mini" v-model="typePayOfMediaFee" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="支付比例(%)：">
        <el-input size="mini" v-model="radioPayOfMediaFee" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="付款时间：">
        <el-date-picker class="comm-data" size="mini" v-model="timePayOfMediaFee" :picker-options="pickerOptions" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="付款金额(元)：">
        <el-input size="mini" v-model="payOfMediaFee" placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <div class="comm-title">制作费</div>
    <el-form class="comm" ref="form" :inline="true" label-width="120px">
      <el-form-item label="付款类型：">
        <el-input size="mini" v-model="typePayOfMakeFee" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="支付比例(%)：">
        <el-input size="mini" v-model="radioPayOfMakeFee" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="付款时间：">
        <el-date-picker class="comm-data" size="mini" v-model="timePayOfMakeFee" type="date" :picker-options="pickerOptions" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item  label="付款金额(元)：">
        <el-input size="mini" v-model="payOfMakeFee" placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <div class="comm-title">备注说明</div>
    <div class="remark">1.以上媒体非和上画费用均含税；赏花费为常规形式的上画费，如有创意发布，费用另计</div>
    <div class="remark">2.媒体具体发布点位除明确约定外，均以签约时雅仕维提供空位为准，灯箱套装不可选位</div>
    <div class="remark">3.本确认单一经签署，代表双方同意接受正式合同中的细节与条款，除非获得媒体公司书面同意，客户方不得单方面取消</div>
    <div class="remark">4.本确认书最终解释权归雅仕维公司所有</div>
    <div class="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="checkMediaIfAvailable" type="warning">确定</el-button>
    </div>
    <el-dialog
      width="400"
      title="提示"
      :visible.sync="innerVisible"
      append-to-body>
      <div v-for="(item,i) in lockMedias">媒体编号为{{item.mediaCode}}在该段时间内被锁定，请重新选择时间或媒体</div>
      <div v-for="(item,i) in orderMedias">媒体编号为{{item.mediaCode}}在该段时间内被预定，请重新选择时间或媒体，或选择排队</div>
      <span slot="footer" class="dialog-footer">
         <el-button @click="innerVisible = false">取 消</el-button>
         <el-button type="primary" @click="innerVisible = false">确 定</el-button>
     </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'booking',
  props: ['mediaList'],
  data () {
    return {
      orderMedias:[],
      lockMedias:[],
      innerVisible: false,
      clientList: [],
      salesList: [],
      contacts: [],
      saleName: '',
      telephone: '',
      clientID: '',
      salesID: '',
      contactID: '',
      brand: '',
      address: '',
      bookingMediasSet: [],
      totalAfterDiscount: 0,
      totalFabricationFee: 0,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      totalFee: '',  //总价格(double)
      payOfMediaFee: '',   //媒体费的付款金额(double)
      radioPayOfMediaFee: '',  //媒体费的支付比例(double)
      timePayOfMediaFee: '',  //媒体费的支付时间
      typePayOfMediaFee: '',  //媒体费的支付类型(string)
      payOfMakeFee: '',   //制作费的付款金额
      radioPayOfMakeFee: '',  //制作费的支付比列
      timePayOfMakeFee: '',
      typePayOfMakeFee: '',
    }
  },
  watch: {
    mediaList: {
      handler: function (newVal) {
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    // 判断时间差
    checkData (time,index) {
      if(time && time.length > 0){
        let days = Math.abs(new Date(time[1]) - new Date(time[0])) / 1000 / 60 / 60 / 24; //把差的毫秒数转换为天数
        if (days / 28 >= 1 && days % 28 === 0) {
          this.mediaList[index].periods = days / 28
        } else {
          this.$confirm('至少应预定一整个周期', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          this.mediaList[index].dateArr = []
          this.mediaList[index].periods = 1
        }
      } else {
        this.mediaList[index].dateArr = []
        this.mediaList[index].periods = 1
      }
    },
    getSummaries (param) {
      const {columns, data} = param
      const sums = []
      let values = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        // periods
        if (column.property === 'periods') {
          values = data.map(item => {
            if (item.dataArr && item.dataArr > 0) {
              let days = Math.abs(new Date(item.dataArr[1]) - new Date(item.dataArr[0])) / 1000 / 60 / 60 / 24 / 28;
              return days
            }
          })
        }
        if (column.property === 'afterDiscount') {
          values = data.map(item => Number(item.mediaFee * item.discounts / 100) * item.periods)
        } else if (column.property === 'totalFee') {
          values = data.map(item => Number((item.mediaFee * item.discounts / 100 ) * item.periods + item.fabricationFee))
        } else {
          values = data.map(item => Number(item[column.property]))
        }
        if (column.property === 'mediaFee' || column.property === 'afterDiscount' || column.property === 'fabricationFee' || column.property === 'totalFee') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    // 清空
    reset () {
      this.salesList = []
      this.contacts = []
      this.telephone = ''
      this.clientID = ''
      this.salesID = ''
      this.contactID = ''
      this.brand = ''
      this.bookingMediasSet = []
      this.orderMedias = []
      this.lockMedias = []
    },
    // 取消
    cancel () {
      this.$emit('closeVisible', 'localtionVisible')
      this.reset()
    },
    // 下单前校验
    checkMediaIfAvailable () {
      this.bookingMediasSet = []
      for (let i = 0; i < this.mediaList.length; i++) {
        if (!this.telephone || !this.clientID || !this.salesID || !this.contactID || !this.brand || !this.mediaList[i].dateArr || this.mediaList[i].dateArr.length < 2) {
          this.$message.warning('请完善信息')
          return
        } else {
          this.bookingMediasSet.push({
            mediaID: this.mediaList[i].id,
            mediaCode: this.mediaList[i].mediaCode,
            mediaName: this.mediaList[i].name,
            discounts: this.mediaList[i].discounts,
            fabricationFee: this.mediaList[i].fabricationFee,
            endDate: this.mediaList[i].dateArr[1],
            startDate: this.mediaList[i].dateArr[0]
          })
        }
      }
      this.$http({
        url: 'booking/checkMediaIfAvailable',
        method: 'POST',
        dataType: 'JSON',
        data: {
          clientID: this.clientID,
          salesID: this.salesID,
          contactID: this.contactID,
          brand: this.brand,
          totalFee: this.totalFee,
          payOfMediaFee: this.payOfMediaFee,
          radioPayOfMediaFee: this.radioPayOfMediaFee,
          timePayOfMediaFee: this.timePayOfMediaFee,
          payOfMakeFee: this.payOfMakeFee,
          radioPayOfMakeFee: this.radioPayOfMakeFee,
          timePayOfMakeFee: this.timePayOfMakeFee,
          typePayOfMakeFee: this.typePayOfMakeFee,
          bookingMediasSet: this.bookingMediasSet
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.newBooking()
        } else if (data.status == -14) {
          this.orderMedias = []
          this.lockMedias = []
          this.innerVisible = true
          this.lockMedias = data.data.lockMedias
          this.orderMedias = data.data.orderMedias
        }
      })
    },
    // 保存新增数据
    newBooking () {
      this.$http({
        url: 'booking/createBooking',
        method: 'POST',
        dataType: 'JSON',
        data: {
          clientID: this.clientID,
          salesID: this.salesID,
          contactID: this.contactID,
          brand: this.brand,
          totalFee: this.totalFee,
          payOfMediaFee: this.payOfMediaFee,
          radioPayOfMediaFee: this.radioPayOfMediaFee,
          timePayOfMediaFee: this.timePayOfMediaFee,
          payOfMakeFee: this.payOfMakeFee,
          radioPayOfMakeFee: this.radioPayOfMakeFee,
          timePayOfMakeFee: this.timePayOfMakeFee,
          typePayOfMakeFee: this.typePayOfMakeFee,
          bookingMediasSet: this.bookingMediasSet
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.$message.success('预定成功')
          this.cancel()
          this.$emit('clearSelectMediaLists')
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
        }
      })
    },
    // 根据客户ID获取品牌联系人等信息
    getClientDetailByID () {
      this.salesList = []
      this.contacts = []
      this.telephone = ''
      this.salesID = ''
      this.contactID = ''
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
          if (this.contactID === this.contacts[i].contactID) {
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
<style lang="scss">
  #booking {
    .data-arr {
      width: 208px;
    }
  }
</style>
<style lang="scss" scoped>
  #booking {
    .el-input-number--mini {
      width:100px ;
      .el-input-number__decrease,.el-input-number__increase {
        width: 20px;
        font-size: 12px;
      }
    }
    .comm{
      .el-input {
        width: 140px;
      }
    }
    .comm-title{
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .remark{
      font-weight: bold;
      font-size: 12px;
      color: #2e2e2e;
    }
  }
  .title {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .media-info {
    margin-right: 20px;
  }

  .center {
    display: block;
    margin: 0 auto;
  }

  .el-button + .el-button {
    margin-left: 200px;
  }

  .footer {
    display: flex;
    justify-content: center;
    margin: 40px auto 0;
  }
</style>
