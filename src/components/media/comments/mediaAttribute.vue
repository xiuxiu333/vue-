<template>
  <div class="attribute">
    <!-- form表单 -->
    <el-form :model="attList" ref="attList" label-width="120px" size="small" class="demo-ruleForm">
      <el-row class="form-row-brand">
        <el-col :span="8">
          <el-form-item label="媒体编号:" prop="code">
            {{nextInfo.mediaCode}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="媒体名称:" prop="mediaName">
            {{nextInfo.mediaName}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row-brand">
        <el-col :span="8">
          <el-form-item label="制作工艺" prop="process" class="lag">
            <el-select v-model="attList.craftOfMake" placeholder="制作工艺">
              <el-option v-for="item in crafts" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row-brand">
        <el-col :span="8">
          <el-form-item label="状态" prop="type">
            <el-select v-model="attList.status" placeholder="活跃">
              <el-option label="活跃" :value="true"></el-option>
              <el-option label="不活跃" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row-brand">
        <el-col :span="8">
          <el-form-item label="楼层" prop="floor">
            <el-input-number v-model="attList.floor" :precision="0" :step="1" :max="10"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row-brand">
        <el-col :span="8">
          <el-form-item label="覆盖范围" prop="coverageArea">
            <el-input class="form-input" v-model="attList.coverageArea" placeholder="请输入覆盖范围"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="面数" prop="faceCount">
            <el-input-number v-model="attList.sides" :min="0" :step="1" :max="10"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row-brand">
        <el-col :span="4">
          <el-form-item label="亮灯时间" prop="lightTime">
            <el-time-select
              style="width: 150px"
              placeholder="起始时间"
              v-model="attList.lightStart"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:00',
                maxTime: attList.lightEnd
              }">
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="" prop="lightTime">
            <el-time-select
              style="width: 150px"
              placeholder="结束时间"
              v-model="attList.lightEnd"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:00',
                minTime: attList.lightStart
              }">
            </el-time-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="方向类型" prop="aspeType">
            <el-select v-model="attList.orientation" clearable  placeholder="方向类型">
              <el-option label="纵向" :value="false"></el-option>
              <el-option label="横向" :value="true"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row-brand">
        <el-col :span="8">
          <el-form-item label="实际尺寸宽:(米)" prop="factWidth">
            <el-input-number v-model="attList.actualWidth" :precision="2" :step="1" :min="0" :max="100"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际尺寸高:(米)" prop="factHight">
            <el-input-number v-model="attList.actualHeight" :precision="2" :step="1" :min="0" :max="100"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row-brand">
        <el-col :span="8">
          <el-form-item label="设计尺寸宽:(米)" prop="planWidth">
            <el-input-number v-model="attList.designWidth" :precision="2" :step="1" :min="0" :max="100"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设计尺寸高:(米)" prop="planHight">
            <el-input-number v-model="attList.designHeight" :precision="2" :step="1" :min="0" :max="100"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row-brand">
        <el-col :span="8">
          <el-form-item label="可视尺寸宽:(米)" prop="visualWidth">
            <el-input-number v-model="attList.visualWidth" :precision="2" :step="1" :min="0" :max="100"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="可视尺寸高:(米)" prop="visualHeight">
            <el-input-number v-model="attList.visualHeight" :precision="2" :step="1" :min="0" :max="100"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="日均客流量:(万)" prop="flow">
            <el-input-number v-model="attList.passengerFlow" :precision="2" :step="1" :max="9999"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row-brand">
        <el-col :span="8">
          <el-form-item label="可成套餐销售">
            <el-select v-model="attList.package" clearable  placeholder="可成套餐销售">
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="销售单位" prop="salesUnit">
            <el-input class="form-input" v-model="attList.saleUnit" placeholder="销售单位"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="form-row-brand">
        <el-col :span="8">
          <el-form-item label="可售数量" prop="salesNumber">
            <el-input class="form-input" v-model="attList.saleNum" placeholder="可售数量"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="请选择MR文件" prop="fileMr">
        <input type="file" @change="getFile($event)">
      </el-form-item>
      <el-form-item label="备注" prop="remarks" class="lag">
        <el-input type="textarea" v-model="attList.remark" placeholder="请输入备注描述"></el-input>
      </el-form-item>
    </el-form>
    <div class="attBtn">
      <el-button class="rightBtn" @click="goBaseInfo">上一步</el-button>
      <el-button class="rightBtn" @click="nextStep">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    nextInfo: {
      type: Object,
      default: () => {
        return {crafts: []}
      }
    },
    attList: {
      type: Object,
      default: () => {
        return {coveragArea: ''}
      }
    }
  },
  data () {
    return {
      lightEnd: '',
      lightStart: '',
      lightStartToEnd: [],
      crafts: this.nextInfo.crafts
    }
  },
  methods: {
    getFile (event) {
      let fileType = event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf('.') + 1)
      if (fileType !== 'xls' && fileType !== 'xlsx' && fileType !== 'png' && fileType !== 'jpg' && fileType !== 'doc' && fileType !== 'docx' && fileType !== 'pdf') {
        this.$message.error('请上传png、jpg、pdf、word、excel格式的文件')
        return false
      }
      this.file = event.target.files[0]
    },
    nextStep () {
      let formData = new FormData()
      if (!this.attList.lightStart && !this.attList.lightEnd) {
      } else if (this.attList.lightStart && this.attList.lightEnd) {
        this.lightStartToEnd = [this.attList.lightStart, this.attList.lightEnd]
        formData.append('lightStartToEnd', this.lightStartToEnd)
      } else {
        this.$message.error('请完善亮灯区间')
        return false
      }
      for (let i in this.attList) {
        formData.append(i, this.attList[i])
      }
      formData.append('mr', this.file)
      formData.append('mediaID', this.nextInfo.mediaID)
      this.$emit('saveInfo', formData)
    },
    goBaseInfo () {
      this.$emit('goBaseInfo')
    }
  }
}
</script>
<style lang="scss" scoped>

  .attribute {
    font-size: 14px;
    background: white;
    margin: 10px 20px;
    padding-top: 20px;
    padding-left: 30px;
    border-radius: 10px;
    .el-input-number--small .el-input-number__increase  i{
      font-size: 13px;
    }
    .el-icon-minus, .el-icon-plus{
      font-size: 13px;
      line-height: 30px;
    }
    .demo-ruleForm {
      /*width: 800px;*/
      /*margin: 0 auto;*/
    }
  }
  .attribute .el-input{
    width: 234px;
  }
  /* 面包屑导航 */
  .attribute .el-breadcrumb {
    padding: 25px 0;
    font-size: 18px;
  }

  .attribute .attForm {
    background-color: #fff;
    border-radius: 10px;
    padding: 40px;
  }

  .attribute .attForm .el-form {
    width: 800px;
    margin: 0 auto;
    padding-top: 30px;
  }

  .attribute .attBtn {
    text-align: center;
    padding: 70px;
  }

  .attribute .attBtn .el-button {
padding: 10px 40px;
    border:0;
    border-radius: 20px;

  }

  .attribute .attBtn .leftBtn {
    margin-right: 120px;
    background-color: #d0d0d0;
    color: #fff;
  }

  .attribute .attBtn .rightBtn {
    background-color: #07b1a6;
    color: #fff;
  }
</style>
