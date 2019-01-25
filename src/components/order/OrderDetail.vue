<template>
  <div id='OrderDetail'>
    <h1>订单详情</h1>
    <div class="content">
      <div class="p">当前订单状态：<span class="red">已定位</span></div>
      <div class="red p">有效期：{{time[0]}}小时{{time[1]}}分{{time[2]}}秒</div>
      <div  class="p">请上传客户签字盖章的合同，待销售审批、财务审批成功后，即可上刊。 </div>
      <div  class="p">
        <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      </div>
      <div class="red p">提示： 订位有效期为7*24小时，到期系统自动放位，随即冻结3*24小时不可预订该媒体</div>
    </div>
    <div class="content">
      <div class="title">客户详情</div>
      <el-form ref="form" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="公司名称：">
              {{data.clientName}}
              <!--<el-select v-model="clientID" @change="getClientDetailByID" filterable clearable placeholder="公司名称">-->
                <!--<el-option-->
                  <!--v-for="item in clientList"-->
                  <!--:key="item.clientid"-->
                  <!--:label="item.name"-->
                  <!--:value="item.clientid">-->
                <!--</el-option>-->
              <!--</el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地址：">
              {{data.address}}
              <!--<el-input-->
                <!--placeholder="请输入内容"-->
                <!--v-model="address"-->
                <!--:disabled="true">-->
              <!--</el-input>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="品牌：">
              {{data.brand}}
              <!--<el-input
                placeholder="品牌"
                v-model="brand"
                :disabled="clientID ? false : true">
              </el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="销售人员：">
              {{data.saleName}}
            <!--  <el-select v-model="salesID" :disabled="clientID ? false : true" filterable clearable placeholder="销售">
                <el-option
                  v-for="item in salesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="联系人：">
              {{data.contactName}}
             <!-- <el-select v-model="contactID" @change="getTelphone" :disabled="clientID ? false : true" filterable
                         clearable
                         placeholder="联系人">
                <el-option
                  v-for="item in contacts"
                  :key="item.contactID"
                  :label="item.name"
                  :value="item.contactID">
                </el-option>
              </el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话：">
              {{data.phone}}
              <!--<el-input
                placeholder="请输入内容"
                v-model="telephone"
                :disabled="true">
              </el-input>-->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form></div>
    <div class="content">
      <div class="title">订单详情</div>
      <el-table :data="data.bookingMediasSet" show-summary :summary-method="getSummaries">
        <el-table-column align="center" prop="mediacode" label="编号"></el-table-column>
        <el-table-column align="center" prop="cityName" label="城市"></el-table-column>
        <el-table-column align="center" prop="routeName" label="线路"></el-table-column>
        <el-table-column align="center" prop="rank" label="等级"></el-table-column>
        <el-table-column align="center" prop="stationName" label="站点"></el-table-column>
        <el-table-column align="center" prop="mediaForm" label="媒体形式"></el-table-column>
        <el-table-column align="center" prop="position" label="位置"></el-table-column>
        <el-table-column align="center" prop="startdate" label="开始时间"></el-table-column>
        <el-table-column align="center" prop="enddate" label="结束时间"></el-table-column>
        <el-table-column align="center" prop="periods" label="周期"></el-table-column>
        <el-table-column align="center" prop="mediafee" label="刊例总值(元)"></el-table-column>
        <el-table-column align="center" prop="discounts" label="折扣(%)"></el-table-column>
        <el-table-column align="center" prop="afterDiscount" label="折后总价(元)">
          <template slot-scope="scope">
            {{Number(scope.row.mediafee * scope.row.discounts /100)}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="fabricationfee" label="制作费(元)"></el-table-column>
        <el-table-column align="center" prop="totalFee" label="总计(元)">
          <template slot-scope="scope">
            {{Number((scope.row.mediafee * scope.row.discounts /100) + Number(scope.row.fabricationfee))}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content">
      <div class="title">付款要求</div>
      <div class="comm-title">媒体费</div>
      <el-form class="comm" ref="form" :inline="true" label-width="120px">
        <el-form-item label="付款类型：">
          <el-input size="mini" v-model="data.typePayOfMediaFee" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="支付比例(%)：">
          <el-input size="mini" v-model="data.radioPayOfMediaFee" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="付款时间：">
          <el-date-picker class="comm-data" size="mini" v-model="data.timePayOfMediaFee" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="付款金额(元)：">
          <el-input size="mini" v-model="data.payOfMediaFee" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <div class="comm-title">制作费</div>
      <el-form class="comm" ref="form" :inline="true" label-width="120px">
        <el-form-item label="付款类型：">
          <el-input size="mini" v-model="data.typePayOfMakeFee" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="支付比例(%)：">
          <el-input size="mini" v-model="data.radioPayOfMakeFee" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="付款时间：">
          <el-date-picker class="comm-data" size="mini" v-model="data.timePayOfMakeFee" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item  label="付款金额(元)：">
          <el-input size="mini" v-model="data.payOfMakeFee" placeholder=""></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="title">备注说明</div>
      <div class="remark">1.以上媒体非和上画费用均含税；赏花费为常规形式的上画费，如有创意发布，费用另计</div>
      <div class="remark">2.媒体具体发布点位除明确约定外，均以签约时雅仕维提供空位为准，灯箱套装不可选位</div>
      <div class="remark">3.本确认单一经签署，代表双方同意接受正式合同中的细节与条款，除非获得媒体公司书面同意，客户方不得单方面取消</div>
      <div class="remark">4.本确认书最终解释权归雅仕维公司所有</div>
    </div>
    <div class="content">
      <div class="title">合同管理</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  data () {
    return {
      id: this.$route.query.id,
      time: [23, 20, 20],
      fileList: [],
      mediaList: [],
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
      data: {},
    }
  },
  computed: {},
  methods: {
    //
    getInfo () {
      this.$http({
        url: '/booking/details',
        method: 'POST',
        dataType: 'JSON',
        data: {id: this.id}
      }).then(res => {
        let {data} = res
        console.log(data)
        if (data.status === 0) {
        this.data = data.data
        } else {
          this.$message.error(data.msg)
        }
      }, (error) => {
        this.$message.error(error)
      })
    },
    //  表格总计
    getSummaries (param) {
      const {columns, data} = param
      const sums = []
      let values = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        }
        if (column.property === 'periods') {
          values = data.map(item => Number(item.mediafee * item.discounts / 100))
        }
        if (column.property === 'afterDiscount') {
          values = data.map(item => Number(item.mediafee * item.discounts / 100))
        } else if (column.property === 'totalFee') {
          values = data.map(item => Number((item.mediafee * item.discounts / 100) + item.fabricationfee))
        } else {
          values = data.map(item => Number(item[column.property]))
        }
        if (column.property === 'mediafee' || column.property === 'afterDiscount' || column.property === 'fabricationfee' || column.property === 'totalFee') {
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
    // 上传图片
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除${ file.name }？`)
    }
  },
  components: {},
  created () {
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
#OrderDetail{
  padding: 0 30px;
  .content{
    background: white;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 20px;
    .p{
      margin: 10px 0;
    }
    .red{
      color: red;
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
  .title {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  }
}
</style>
