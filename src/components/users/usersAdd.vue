
<template>
  <div class="usersAdd">
    <!-- 面包屑导航 -->
    <h1>新增客户</h1>
    <!-- <div class="head"> -->
    <!-- 基本信息 -->
    <div class="base-infor">
      <el-form :label-position="labelPosition" :model="usersList" ref="newList" class="demo-ruleForm" size="small">
        <!-- form top -->
        <div class="el-form_top">
          <div class="base-top">
            <span class="borderl">基本信息</span>
          </div>
          <!-- 新增内容 -->
          <el-form-item label="请输入客户公司全称" prop="name" class="is-required"  >
            <el-input v-model="usersList.name" placeholder="请输入公司全称" class="form-input"></el-input>
          </el-form-item>


          <el-form-item label="请输入客户公司品牌" prop="brand"  class="is-required" >
            <el-input v-model="usersList.brand" class="form-input" clearable  placeholder="用‘,’号隔开,可输入多个"></el-input>
          </el-form-item>


          <el-form-item class="big" label="请输入所属公司" >
            <el-input v-model="usersList.companyName" class="form-input" placeholder="请选择所属公司"></el-input>
          </el-form-item>
          <el-form-item class="big is-required" label="请选择所属销售" prop="salesID"  >
            <el-select class="form-item-select" v-model="usersList.salesID" clearable  placeholder="请选择所属销售">
              <el-option v-for="item in newList.list.salesList" :label="item.name" :value="item.id"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 选择城市 -->
          <el-form-item class="big" label="请选择地区">
            <el-cascader
              :options="options"
              :show-all-levels="false" placeholder="请选择地区"
              v-model="cityID">
            </el-cascader>
          </el-form-item>
          <el-form-item class="big" label="请输入公司地址">
            <el-input v-model="usersList.address" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="请选择所属行业" prop="industry">
            <el-select class="form-item-select" v-model="usersList.industryCategory1" clearable  placeholder="请选择所属行业">
              <el-option v-for="item in industryCategoryList" :label="item.name" :value="item.id"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请选择所属等级" prop="rank">
            <el-select class="form-item-select" v-model="usersList.rank" clearable  placeholder="请选择所属等级">
              <el-option v-for="item in clientRankList" :label="item.name" :value="item.id"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户类型" prop="category" class="is-required">
            <el-select class="form-item-select" v-model="usersList.category" clearable  placeholder="请选择客户类型">
              <el-option v-for="item in newList.list.clientCategoryList" :label="item.chineseName" :value="item.id"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- form bottom -->
        <div class="users-infor">
          <div class="base-top baseIn">
            <span class="borderl">联系人信息1</span>
            <!-- <button @click="userInfo" class="users-more">
              <i class="el-icon-plus"></i>
              新增联系人
            </button> -->
          </div>
          <!-- 新增联系人部分 -->
          <div class="newusers-center">
            <!-- 填写信息的表单 -->
            <div class="users-new">
              <el-form-item label="请输入联系人姓名" prop="usersName" class="is-required">
                <el-input class="form-input" v-model="usersList.contactList[0].name"></el-input>
                </el-select>
              </el-form-item>
              <el-form-item label="请输入联系电话" prop="telephone" class="is-required">
                <el-input class="form-input" v-model="usersList.contactList[0].telephone"></el-input>
              </el-form-item>
              <el-form-item label="请输入公司座机" prop="phone">
                <el-input class="form-input" v-model="usersList.contactList[0].phone"></el-input>
              </el-form-item>
              <el-form-item label="请选择联系人性别" prop="gender" class="is-required">
                <el-select class="form-item-select" v-model="usersList.contactList[0].gender">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="mini" label="请输入所属部门" prop="department">
                <el-input class="form-input" v-model="usersList.contactList[0].department"></el-input>
              </el-form-item>
              <el-form-item class="mini" label="请输入职位" prop="position">
                <el-input class="form-input" v-model="usersList.contactList[0].position"></el-input>
              </el-form-item>
              <el-form-item class="mini" label="请输入邮箱" prop="email">
                <el-input class="form-input" v-model="usersList.contactList[0].email"></el-input>
              </el-form-item>
              <el-form-item label="请输入地址" prop="address" class="is-required">
                <el-input class="form-input" v-model="usersList.contactList[0].address"></el-input>
              </el-form-item>
              <el-form-item label="请选择联系人生日" prop="birthday">
                <el-date-picker
                  v-model="usersList.contactList[0].birthday"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="请输入籍贯" prop="place">
                <el-input class="form-input" v-model="usersList.contactList[0].nativePlace"></el-input>
              </el-form-item>
              <el-form-item label="请输入客户爱好" prop="hoddy">
                <el-input class="form-input" v-model="usersList.contactList[0].hobby"></el-input>
              </el-form-item>
              <el-form-item label="请输入客户其他备注" prop="others">
                <el-input class="form-input" v-model="usersList.contactList[0].note"></el-input>
              </el-form-item>
            </div>
            <div class="btn">
              <button class="users-cancel" @click="cancelUsers">取消</button>
              <button class="users-carry" @click="goSave('newList')">保存</button>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <!-- 联系人信息 -->
  </div>

</template>
<script>
  export default {
    data () {
      return {
        cityID: [],
        // 后台返回的数据
        newList: {
          list: {},
          regionID: [],
          cityID: []
        },
        usersList: {
          'address': '',
          'brand': '',
          'category': '',
          'cityID': [],
          'clientID': '',
          'code': '',
          'companyName': '',
          'contactList': [
            {
              'address': '',
              'birthday': '',
              'cityID': '',
              'clientID': '',
              'contactID': '',
              'countryID': '',
              'department': '',
              'email': '',
              'gender': '',
              'hobby': '',
              'name': '',
              'nativePlace': '',
              'note': '',
              'phone': '',
              'position': '',
              'regionID': '',
              'telephone': ''
            }
          ],
          'countryID': '',
          'industryCategory1': '',
          'industryCategory2': '',
          'name': '',
          'rank': '',
          'regionID': '',
          'salesID': ''
        },
        // 文本域
        textarea2: '',
        formLabelWidth: '120px',
        // rules: {
        //   // 公司名称
        //   companyName: [
        //     { required: true, message: '请输入客户公司全称', trigger: 'blur' }
        //   ],
        //   // 公司品牌
        //   brand: [
        //     { required: true, message: '请输入客户公司品牌', trigger: 'blur' }
        //   ],
        //   // 所属销售
        //   salesID: [
        //     { required: true, message: '请选择所属销售', trigger: 'submit' }
        //   ],
        //   // 客户类型
        //   category: [
        //     { required: true,  message: '请选择所属销售', trigger: 'submit' }
        //   ],
        //   name: [
        //     { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        //   ],
        //   // 联系人姓名
        //   usersName: [
        //     { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        //   ],
        //   telephone: [
        //     { required: true, message: '请输入联系人电话', trigger: 'blur' }
        //   ],
        //   gender: [
        //     { required: true, message: '请选择联系人性别', trigger: 'change' }
        //   ],
        //   address: [
        //     { required: true, message: '请输入联系人地址', trigger: 'blur' }
        //   ],
        // },
        labelPosition: 'right',
        // 选择城市的级联先择期
        options: [],
        industryCategoryList: [],
        clientCategoryList: [],
        clientRankList: []
      }
    },
    methods: {
      getNewuser () {
        this.$http({
          url: 'client/new',
          method: 'POST',
          dataType: 'JSON',
          data: {}
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
          this.newList.list = data
          this.industryCategoryList = data.industryCategoryList
          this.clientCategoryList = data.clientCategoryList
          this.clientRankList = data.clientRankList
          this.options = data.countryList
        }
      })
      },
      // 点击国家
      getCountryList (citrID) {
        this.$http({
          url: 'client/listRegion',
          method: 'POST',
          data: {
            countryID: citrID
          }
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
          this.newList.regionID = data.regionList
        }
      })
      },
      // 点击省市
      getCityList (townID) {
        this.$http({
          url: 'client/listCity',
          method: 'POST',
          data: {
            regionID: townID
          }
        }).then(res => {
          console.log(res)
        let {data} = res
        if (data.status === 0) {
          this.newList.cityID = data.cityList
        }
      })
      },
      // 点击新增联系人
      userInfo () {

      },
      // 点击取消的处理函数
      cancelUsers () {
        this.$router.push('/users')
      },
      // 点击保存的处理函数
      goSave (newList) {
        this.usersList.cityID = this.cityID
        this.hide = true
        this.$refs[newList].validate((valid) => {
          if (valid) {
            this.$http({
              url: 'client/create',
              method: 'POST',
              data: this.usersList
            }).then(res => {
              if (res.data.status === 0) {
              this.cityID = []
              this.usersList = {
                'address': '',
                'brand': '',
                'category': '',
                'cityID': '',
                'clientID': '',
                'code': '',
                'companyName': '',
                'contactList': [
                  {
                    'address': '',
                    'birthday': '',
                    'cityID': '',
                    'clientID': '',
                    'contactID': '',
                    'countryID': '',
                    'department': '',
                    'email': '',
                    'gender': '',
                    'hobby': '',
                    'name': '',
                    'nativePlace': '',
                    'note': '',
                    'phone': '',
                    'position': '',
                    'regionID': '',
                    'telephone': ''
                  }
                ],
                'countryID': '',
                industryCategory1: '',
                'industryCategory2': '',
                'name': '',
                'rank': '',
                'regionID': '',
                'salesID': ''
              }
              this.$message({
                type: 'success',
                message: '新增成功'
              })
            }
          })
          } else {
            console.log('error submit!!')
          return false
        }
      })
        // 点击下一步跳转到新增联系人
        // this.$router.push('/newUsers')
        // this.$http({
        //   url: 'client/create',
        //   methods: 'POST',
        //   dataType: 'JSON',
        //   data: {

        //   }
        // }).then(res => {
        //   console.log(res);

        // })
      },
      // 上传图片成功
      resFilesSuccess () {

      }
    },
    created () {
      this.getNewuser()
    }
  }

</script>
<style scoped>
  /* 基本信息中所有输入框的高 */
  .usersAdd .el-input__inner {
    width: 100%;
    height: 38px;
  }
</style>
<style>
  .usersAdd {
    padding: 0 100px 10px 30px;
    /*font-size: 0.16rem;*/
  }
  /* 验证是的错误提示信息 */
  .usersAdd .el-form-item--small .el-form-item__error {
    color: red;
    line-height: 0;
    top: 125%;
    left: 12%;
  }
  .is-required{

  }
  /* 改变验证完成下拉框的默认颜色 */
  .usersAdd .el-form-item.is-success .el-input__inner{
    border-color: #dcdfe6;
  }
  /* form表单的字体大小 */
  .usersAdd .el-input__inner {
    font-size: 12px;
  }
  /* element的默认样式是 */
  .usersAdd .el-form-item__label {
    /* padding: 0; */
    padding-right: 18px;
    width: 200px;
    font-size: 14px;
    /*border: 1px solid #000;*/
  }
  .usersAdd .el-form-item {
    margin-bottom: 18px;
  }
  /* 编号 */
  .usersAdd .el-form-item.code {
    margin-bottom: 0;
  }

  /* 所有输入框input的宽 300*/
  .usersAdd .demo-ruleForm .form-input {
    width: 234px;
  }
  /* 输入框的宽为275 */
  .usersAdd .base-infor .big .el-input--small {
    width: 234px;
  }
  /* 选择地区的宽为162 */
  .usersAdd .base-infor .small .el-select.form-item-select.el-select--small {
    /* width: 22%; */
    padding-right: 205px;
  }
  /* 选择地区的最后一个选择框的padding-right为0 */
  .usersAdd .base-infor .small .item-right.el-select.form-item-select.el-select--small {
    padding-right: 0;
  }
  /* 行业信息下拉框的间距 */
  .usersAdd .base-infor .el-select.form-item-select.item-county.el-select--small {
    padding-right: 20px;
  }
  /* 面包屑导航 */
  .usersAdd .el-breadcrumb {
    padding: 25px 0 35px 0;
    font-size: 20px;
  }
  /* 基本信息和联系人信息的大盒子 */
  /* 基本信息 */
  .usersAdd .el-form_top {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 50px;
    margin-bottom: 30px;
  }
  /* 基本信息的大盒子的border-bottom */
  .usersAdd .base-top {
    padding-bottom: 18px;
    border-bottom: 1px solid #f4f4f4;
    margin-bottom: 20px;
  }
  /* 基本信息和联系人信息的左border */
  .usersAdd .borderl {
    font-size: 15px;
    padding-left: 5px;
    border-left: 2px solid #53d9d3;
  }
  /* 客户编号input的border为none */
  .usersAdd .number .el-input__inner{
    border: none;
    padding-left: 0px;
  }
  /* 下拉框的宽 */
  .usersAdd .form-item-select {
    width: 234px;
  }
  .usersAdd .newusers-center .mini .el-input--small {
    width: 234px;
  }
  /* 新增联系人信息 */
  .usersAdd .users-infor {
    padding: 20px 50px;
    background-color: #fff;
    border-radius: 10px;
  }
  /* 新增联系人按钮 */
  .usersAdd .users-infor .users-more {
    width: 110px;
    height: 20px;
    padding: 10px;
    line-height: .05rem;
    margin-left: 25px;
    font-size: 15px;
    background-color: #53d9d3;
    color: #fff;
    border-radius: 10px;
    /* 默认样式 */
    border: 1px solid transparent;
    outline: none;
  }
  /* 新增联系人的图标 */
  .usersAdd .users-infor .users-more .el-icon-plus {
    line-height: 0;
  }
  /* 保存按钮 */
  .usersAdd .users-carry {
    background-color: #08b1a6;
    padding: 10px 40px;color: #ffffff;
    border: none; border-radius: 50px;
  }
  .usersAdd .btn {
    text-align: center;
    padding: 40px 0;
  }
  .usersAdd .el-button {
    padding: 10px 40px;
    border-radius: 50px;
    color: #fff;
    border: none;

  }
  /* 取消按钮 */
  .usersAdd .users-cancel {
    margin-right: 200px;
    background-color: #d0d0d0;
    padding: 10px 40px;
    color: #ffffff;
    border: none; border-radius: 50px;
  }
  .usersAdd  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 234px;
  }
</style>
