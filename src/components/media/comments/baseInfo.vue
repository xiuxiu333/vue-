<template>
  <div class="mediaAdd">
    <div class="base-form">
      <el-form :model="baseinfoList" :rules="rules" ref="baseinfoList" label-width="130px" size="small" class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="媒体编号:" class="lag is-required" >
              <el-input v-if="type===2" class="form-input" v-model="baseinfoList.mediaCode" placeholder="请输入媒体编号"></el-input>
              <span v-else>{{baseinfoList.mediaCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="媒体名称:" class="lag is-required">
              <el-input  v-if="type===2" class="form-input" v-model="baseinfoList.name" placeholder="请输入媒体名称"></el-input>
              <span v-else>{{baseinfoList.name}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="form-row-brand ">
          <el-col :span="8">
            <el-form-item label="城市" class="mini is-required">
              <el-cascader
                :options="lists.countryList"
                :show-all-levels="false" placeholder="请选择城市"
                v-model="baseinfoList.cityID"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="线路" class="mini is-required">
              <el-select v-model="baseinfoList.routeID" placeholder="请选择线路" :disabled="!baseinfoList.cityID">
                <el-option v-for="item in routerList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="form-row-brand">
          <el-col :span="8">
            <el-form-item label="站点" class="mini is-required">
              <el-select v-model="baseinfoList.stationID" clearable :disabled="!baseinfoList.cityID && !baseinfoList.routeID"  placeholder="请选择站点名称">
                <el-option v-for="item in stationList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="form-row-brand ">
          <el-col :span="16">
            <el-form-item label="媒体描述" class="lag is-required">
              <el-input type="textarea" v-model="baseinfoList.description" placeholder="请输入媒体描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="form-row-brand">
          <el-col :span="8">
            <el-form-item label="媒体套装" class="is-required">
              <el-select v-model="baseinfoList.packageOwned" clearable  placeholder="媒体套装">
                <el-option v-for="item in lists.packageList" :label="item.packageName" :value="item.id"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="独家媒体" class="is-required">
              <el-select v-model="baseinfoList.isExclusive" placeholder="独家媒体">
                <el-option v-for="item in isExclusiveList" :label="item.name" :value="item.id"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="form-row-brand">
          <el-col :span="8">
            <el-form-item label="媒体形式" class="is-required">
              <el-select v-model="baseinfoList.mediaForm" clearable  placeholder="媒体形式">
                <el-option v-for="item in lists.formList" :label="item.formName" :value="item.id"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="媒体类型" class="is-required">
              <el-select v-model="baseinfoList.type" clearable  placeholder="媒体类型">
                <el-option v-for="item in lists.typeList" :label="item.typeName" :value="item.id"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="form-row-brand">
          <el-col :span="8" >
            <el-form-item label="期刊价格:(元/月)" prop="periodicalPrice" class="mini is-required" label-width="150px">
              <el-input-number v-model="baseinfoList.mediaFee" :precision="2" :step="1000" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制作费：(元/次)" class="mini is-required">
              <el-input-number v-model="baseinfoList.fabricationFee" :precision="2" :step="1000" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="form-row-brand">
          <el-col :span="8">
            <el-form-item label="媒体位置" class="is-required">
              <el-select v-model="baseinfoList.position" clearable  placeholder="媒体位置">
                <el-option v-for="item in lists.PositionList" :label="item.name" :value="item.id"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="方向">
              <el-select v-model="baseinfoList.direct" clearable  placeholder="方向">
                <el-option v-for="item in lists.directList" :label="item.directName" :value="item.id"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="form-row-brand">
          <el-col :span="16">
            <el-form-item label="位置描述">
              <el-input type="textarea" :rows="2" class="form-input" v-model="baseinfoList.area"
                        placeholder="请输入媒体位置描述"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-button class="rightBtn" @click="goList">取消</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button @click="nextStep" class="rightBtn">下一步</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isExclusiveList: [
        {name: '是', id: true},
        {name: '否', id: false}
      ],
      lists: {
        PositionList: [],
        countryList: [],
        directList: [],
        formList: [],
        typeList: [],
        packageList: []
      },
      routerList: [],
      stationList: [],
      rules: {
        city: [
          {type: 'string', message: '请输入城市', trigger: 'change'}
        ],
        line: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        site: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        desc: [
          {required: true, message: '请填写活动形式', trigger: 'blur'}
        ]
      },
      // 图片上传
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  props: {
    baseinfoList: {
      type: Object,
      default: () => {
        return {cityID: []}
      }
    },
    type: {
      type: Number,
      default: 2
    }
  },
  computed: {
    cityID () {
      return this.baseinfoList.cityID
    },
    routeID () {
      return this.baseinfoList.routeID
    }
  },
  watch: {
    cityID (newValue, oldValue) {
      console.log(newValue === oldValue)
      if (newValue !== oldValue) {
        this.baseinfoList.routeID = ''
        this.baseinfoList.stationID = ''
        this.listRoute()
      }
    },
    routeID (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.listStation()
      }
    }
  },
  methods: {
    // 获取信息
    getNew () {
      this.$http({
        url: '/media/new',
        method: 'POST',
        dataType: 'JSON',
        data: {}
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.lists = data
        }
      })
    },
    // 站点
    listStation () {
      this.$http({
        url: '/media/listStation',
        method: 'POST',
        dataType: 'JSON',
        data: {
          routeID: this.baseinfoList.routeID ? [this.baseinfoList.routeID] : []
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.stationList = data.stationList
        }
      })
    },
    // 线路
    listRoute () {
      this.$http({
        url: '/media/listRoute',
        method: 'POST',
        dataType: 'JSON',
        data: {
          cityID: this.cityID[2] ? this.cityID[2] : ''
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.routerList = data.routeList
        }
      })
    },
    // 点击下一步调用的函数
    nextStep () {
      this.baseinfoList.cityID = this.cityID
      this.$emit('goNext', this.baseinfoList)
    },
    // 上一步
    goList () {
      this.$router.push('/media')
    }
  },
  created () {
    this.getNew()
    if (this.cityID) {
      this.listRoute()
    }
    if (this.routeID) {
      this.listStation()
    }
  }
}
</script>

<style scoped>
  /* 面包屑导航 */
  .mediaAdd .el-breadcrumb {
    padding: 25px 0;
    font-size: 18px;
  }
  .mediaAdd .base-form {
    /* margin: 0 auto; */
    background-color: #fff;
    border-radius: 10px;
    padding-left: 40px;
    width: 90%;
  }
  .mediaAdd .el-input{
    width: 234px;
   font-size: 10px;
 }
  .mediaAdd .base-form .el-form {
    /*width: 800px;*/
    /*margin: 0 auto;*/
    padding-top: 30px;
  }
  .mediaAdd  .el-cascader{
    width: 234px;
  }
  .mediaAdd .el-form .imgUp {
    display: inline-block;
    vertical-align: top;
    width: 185px;
    height: 185px;
    /* border-radius: 20px; */
  }
  .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    margin-right: 0;
  }
  .mediaAdd .el-form .imgUp img {
    /* vertical-align: middle; */
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .mediaAdd .el-form .formImg {
    margin-top: 1rem;
  }

  .mediaAdd .el-form .el-upload-list {
    position: relative;
    /* margin-top: 1rem; */
  }

  .mediaAdd .el-form .bottomUp {
    display: inline-block;
    vertical-align: middle;
  }

  .mediaAdd .el-form .topUp {
    position: absolute;
    top: -50px;
    left: 5%;
  }

  .mediaAdd .med_btn {
    text-align: center;
    padding: 70px;
  }

  .mediaAdd .el-button {
    padding: 10px 40px;
    border-radius: 20px;
    line-height: 10px;
    font-size: 14px;
    border: none;
  }

  .leftBtn {
    margin-right: 120px;
    background-color: #d0d0d0;
    color: #fff;
    border: none;
  }

  .rightBtn {
    background-color: #07b1a6;
    color: #fff;
    border: none;
  }

</style>
