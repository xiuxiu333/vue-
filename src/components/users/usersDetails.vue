<template>
  <div>
    <!-- 头部HTML   -->
    <div class="usersDetails">
      <!-- 基本信息中点击编辑的弹出框 -->
      <el-dialog title="基本信息修改" :visible.sync="editVisible">
        <el-form>
          <el-form-item class="lager" label="客户编号:">
            <el-input class="lag_num form-input number" v-model='editInfo.code' placeholder="客户编号"></el-input>
          </el-form-item>
          <el-form-item class="lager" label="请输入客户公司全称" prop="name">
            <el-input class="form-input" placeholder="客户公司全称" v-model='editInfo.name'></el-input>
          </el-form-item>
          <el-form-item class="lager" label="请输入客户公司品牌" prop="brand">
            <el-input class="form-input" placeholder="用‘,’号隔开,可输入多个" v-model='editInfo.brand'></el-input>
          </el-form-item>
          <el-form-item class="big" label="请输入所属公司">
            <el-input class="form-input" placeholder="所属公司" v-model='editInfo.companyName'></el-input>
          </el-form-item>
          <el-form-item class="mini" label="请选择所属销售">
            <el-select class="form-item-select" clearable  placeholder="请选择所属销售" v-model='editInfo.salesID'>
              <el-option v-for="item in salesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="mini" label="请选择地区">
            <el-cascader
              :options="cityOptions"
              :show-all-levels="false" placeholder="请选择地区"
              v-model="cityID">
            </el-cascader>
          </el-form-item>
          <el-form-item class="lager" label="请输入公司地址">
            <el-input v-model='editInfo.address' placeholder="请输入公司地址"></el-input>
          </el-form-item>
          <el-form-item class="mini" label="请选择所属行业">
            <el-select class="form-item-select" clearable  placeholder="请选择所属行业" v-model='editInfo.industryCategoryName'>
              <el-option v-for="item in industryCategoryList" :key="item.id" :label="item.name" :value="item.id">

              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="mini" label="请选择客户类型" prop="category">
            <el-select class="form-item-select" clearable  placeholder="客户类型" v-model='editInfo.category'>
              <el-option v-for="item in clientCategoryList" :key="item.id" :label="item.chineseName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="mini" label="请选择客户等级">
            <el-select class="form-item-select" clearable  placeholder="客户等级" v-model='editInfo.rank'>
              <el-option v-for="item in clientRankList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer foot_btn">
          <el-button class="users-cancel" @click="editVisible = false">取 消</el-button>
          <el-button class="users-carry" @click="editclient">保 存</el-button>
        </div>
      </el-dialog>
      <!-- 联系人信息中点击编辑的弹出框 -->
      <el-dialog :title="contactTitle.title" :visible.sync="editUserVisible">
        <el-form label-width="180px">
          <el-form-item class="lager" label="请输入联系人姓名">
            <el-input class="form-input number" v-model="contactInfo.name" placeholder="联系人姓名"></el-input>
          </el-form-item>
          <el-form-item class="lager" label="请输入联系人电话">
            <el-input class="form-input" v-model="contactInfo.telephone" placeholder="联系人电话"></el-input>
          </el-form-item>
          <el-form-item class="lager" label="请输入公司座机">
            <el-input class="form-input" v-model="contactInfo.phone" placeholder="公司座机"></el-input>
          </el-form-item>
          <el-form-item class="mini" label="请选择联系人性别">
            <el-select class="form-item-select" clearable  placeholder="联系人性别" v-model="contactInfo.gender">
              <el-option v-for="item in genderOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="mini" label="请输入所属部门">
            <el-input class="form-input" v-model="contactInfo.department" placeholder="所属部门"></el-input>
          </el-form-item>
          <el-form-item class="mini" label="请输入职位">
            <el-input class="form-input" v-model="contactInfo.position" placeholder="职位"></el-input>
          </el-form-item>
          <el-form-item class="lager" label="请输入地址">
            <el-input class="form-input" v-model="contactInfo.address" placeholder="地址"></el-input>
          </el-form-item>
          <el-form-item class="lager" label="请输入邮箱">
            <el-input class="form-input" v-model="contactInfo.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item class="mini" label="请选择出生日期">
            <el-date-picker
              v-model="contactInfo.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="mini" label="请输入籍贯">
            <el-input class="form-input" v-model="contactInfo.nativePlace" placeholder="请输入籍贯"></el-input>
          </el-form-item>
          <el-form-item class="mini" label="请输入客户爱好">
            <el-input class="form-input" v-model="contactInfo.hobby" placeholder="客户爱好"></el-input>
          </el-form-item>
          <el-form-item class="mini" label="输入客户其他备注信息">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" style="width:300px;" placeholder="请输入其他备注信息"
                      v-model="contactInfo.note">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer foot_btn">
          <el-button class="users-cancel usersIn-comm" @click="editUserVisible = false">取 消</el-button>
          <el-button class="users-carry usersIn-comm" @click="contactSave(contactTitle)">保 存</el-button>
        </div>
      </el-dialog>
      <!-- Tab 栏 -->
      <div class="users-dateTab">
        <el-tabs type="border-card" >
          <!-- 客户详情 -->
          <el-tab-pane label="客户详情" name="0">
            <div class="users-detail" >
              <div class="users-top" >
                <!-- 基本信息块 -->
                <div class="deta-top" >
                  <div class="deta-base">
                    <span>基本信息</span>
                    <span @click="toEdit" class="myicon">
                    <i class="iconfont myicon-edit" style="font-size:20px;"></i>
                  </span>
                  </div>
                  <!-- <div v-for="item in clientInfo"> -->
                  <!-- 客户编号 + 时间 一行 -->
                  <div class="deta-numtime">
                    <!-- 客户编号  -->
                    <div class="ueses-detaNum">
                      <span class="deta-num">客户编号:</span>
                      <span>{{info.clientInfo.code}}</span>
                    </div>
                    <!-- 后面的时间 -->
                    <div class="deta-tail">
                      <span>注册时间:</span>
                      <span class="deta-tail-time">2018-06-09</span>
                      <span>更新日期:</span>
                      <span class="deta-tail-time">2018-07-10</span>
                      <span>有效日期:</span>
                      <span class="deta-tail-time">2019-06-19</span>
                    </div>
                  </div>
                  <div class="conInfo">
                    <ul class="top_ul">
                      <li>
                        <div class="topD">
                          <span class="spanL">公司名称：</span>
                          <span class="spanR">{{info.clientInfo.name}}</span>
                        </div>
                        <div class="topD">
                          <span class="spanL">国家：</span>
                          <span class="spanR">{{info.clientInfo.countryName}}</span>
                        </div>
                      </li>
                      <li>
                        <div class="topD">
                          <span class="spanL">所属品牌：</span>
                          <span class="spanR">{{info.clientInfo.brand}}</span>
                        </div>
                        <div class="topD">
                          <span class="spanL">省市、直辖市：</span>
                          <span class="spanR">{{info.clientInfo.regionName}}</span>
                        </div>
                      </li>
                      <li>
                        <div class="topD">
                          <span class="spanL">所属公司：</span>
                          <span class="spanR">{{info.clientInfo.companyName}}</span>
                        </div>
                        <div class="topD">
                          <span class="spanL">城市：</span>
                          <span class="spanR">{{info.clientInfo.cityName}}</span>
                        </div>
                      </li>
                      <li>
                        <div class="topD">
                          <span class="spanL">行业大类/行业：</span>
                          <span class="spanR">{{info.clientInfo.industryCategory1}}</span>
                        </div>
                        <div class="topD">
                          <span class="spanL">地址：</span>
                          <span class="spanR">{{info.clientInfo.address}}</span>
                        </div>
                      </li>
                    </ul>
                    <ul class="bot_ul">
                      <li>
                        <div class="topD">
                          <span class="spanL">所属销售：</span>
                          <span class="spanR">{{info.clientInfo.saleName}}</span>
                        </div>
                      </li>
                      <li>
                        <div class="topD">
                          <span class="spanL">客户等级：</span>
                          <span class="spanR">{{info.clientInfo.rank}}</span>
                        </div>
                      </li>
                      <li>
                        <div class="topD">
                          <span class="spanL">客户类型:</span>
                          <span class="spanR">{{info.clientInfo.category}}</span>
                        </div>
                      </li>
                      <!-- <li>
                        <div class="topD">
                          <span class="spanL">有效期:</span>
                          <span class="spanR">2018-04-09</span>
                        </div>
                      </li> -->
                    </ul>
                  </div>
                  <!-- </div> -->
                </div>
              </div>
              <div class="usersInfo">
                <!-- 联系人信息1  type="border-card"-->
                <div class="dInfo" >
                  <el-tabs  style="text-align: center;z-index: 0;">
                    <el-tab-pane v-for="(item ,i) in info.contactInfo" class="left"  style="background-color:#fff;text-align: center;z-index: 0;" :key="i" :label="`联系人${i + 1}`" :name="i">
                      <div class="deta-baseIn deta-base"   style="text-align: center;z-index: 0;">
                        <ul class="usersUl">
                          <li class="liList">
                            <div class="topDList">
                              <span class="spanL">姓名：</span>
                              <span class="spanR">
                                <span >{{item.name}}</span>
                                <i class="iconfont myicon-edit myicon" style="font-size: 20px;"
                                   @click="usersEdit('编辑联系人信息',2,item.contactID)"></i>
                              </span>
                            </div>
                            <div class="topDList">
                              <span class="spanL">性别：</span>
                              <span class="spanR">{{item.gender | gender}}</span>
                            </div>
                            <div class="topDList">
                              <span class="spanL">部门：</span>
                              <span class="spanR">{{item.department}}</span>
                            </div>
                            <div class="topDList">
                              <span class="spanL">职位：</span>
                              <span class="spanR">{{item.position}}</span>
                            </div>
                          </li>
                          <li  class="liList">
                            <div class="topDList">
                              <span class="spanL">出生日期：</span>
                              <span class="spanR">{{item.birthday | date}}</span>
                            </div>

                            <div class="topDList">
                              <span class="spanL">籍贯：</span>
                              <span class="spanR">{{item.nativePlace}}</span>
                            </div>
                            <div class="topDList">
                              <span class="spanL">地址：</span>
                              <span class="spanR">{{item.address}}</span>
                            </div>
                            <div class="topDList"></div>
                          </li>

                          <li  class="liList">
                            <div class="topDList">
                              <span class="spanL">手机号：</span>
                              <span class="spanR">{{item.telephone}}</span>
                            </div>
                            <div class="topDList">
                              <span class="spanL">座机：</span>
                              <span class="spanR">{{item.phone}}</span>
                            </div>
                            <div class="topDList">
                              <span class="spanL">电子邮件：</span>
                              <span class="spanR">{{item.email}}</span>
                            </div>
                            <div class="topDList">
                              <span class="spanL">客户爱好：</span>
                              <span class="spanR">{{item.hobby}}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <!-- 客户其他备注 -->
                      <div class="remarks">
                        <span class="users-more">
                          客户其他备注:
                        </span>
                        <span>{{item.note}}</span>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                  <button  @click="usersEdit('添加联系人信息',1)" class="buttonList" >
                    <i class="el-icon-plus"></i>
                    <span>新增联系人</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- 添加记录 follow up -->
            <div class="newuserIn">
              <!-- 跟进拜访记录 -->
              <div class="newvisit">
                <span> 跟进拜访记录 </span>
                <ul class="visit-ul">
                  <li v-for="(item , i) in info.contactFollowupList" :key="i">
                    <div class="visit1">{{item.info}}</div>
                    <div class="visit2">
                      <span> 客户状态 </span>
                      <span> {{item.status | customerStatus}} </span>
                    </div>
                    <div class="visit3"> {{item.createdByFirstName}}</div>
                    <div class="visit4"> {{item.createdOn | date}}</div>
                  </li>
                </ul>
              </div>
              <span class="newIn-top">新增拜访记录</span>
              <div class="newIn-status">
              <span class="statusL">
                <label>请选择客户状态</label>
                <el-select v-model="fllowStatus" clearable   placeholder="请选择" id="newL">
                  <el-option v-for="item in followOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </span>
                <span class="manR">
                <label>随访人员</label>
                <el-select v-model="salesID" clearable   placeholder="请选择" id="newR">
                  <el-option v-for="item in salesList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </span>
                <div class="texInfo">
                  <!-- 多行输入框 -->
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入内容"v-model="followUpInfo">
                  </el-input>
                </div>
              </div>
              <div class="subBtn">
                <el-button class="usersIn-comm" @click="addFllow">提交</el-button>
              </div>
            </div>
          </el-tab-pane>
          <!-- 媒体计划 -->
          <el-tab-pane label="媒体计划" name="1">
            <div class="users-detia">
              <!-- 媒体计划列表 -->
              <div class="users-detop">
                <span>媒体计划列表</span>
              </div>
              <!-- 媒体计划列表的信息 -->
              <div class="users-decontent">
                <!-- 数据列表 -->
                <el-table :data="mediaList" stripe :header-cell-style="{background:'#f3f3f3'}" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" align="center"></el-table-column>
                  <el-table-column prop="mediacode" label="编号" align="center"></el-table-column>
                  <el-table-column prop="cityName" label="城市" align="center"></el-table-column>
                  <el-table-column prop="routeName" label="线路" align="center"></el-table-column>
                  <el-table-column prop="rank" label="等级" align="center" width="60"></el-table-column>
                  <el-table-column prop="stationName" label="站点" align="center"></el-table-column>
                  <el-table-column prop="mediaForm" label="媒体形式" align="center"></el-table-column>
                  <el-table-column prop="type" label="媒体类型" align="center"></el-table-column>
                  <el-table-column prop="packageOwned" label="所属套装" align="center"></el-table-column>
                  <el-table-column prop="position" label="位置" align="center"></el-table-column>
                  <el-table-column prop="saleName" label="所属销售" align="center"></el-table-column>
                  <el-table-column prop="position" label="开始时间" align="center">
                    <template slot-scope="scope">
                      {{scope.row.startdate | date}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="position" label="结束时间" align="center">
                    <template slot-scope="scope">
                      {{scope.row.enddate | date}}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="260px">
                    <template slot-scope="scope">
                      <a href="javascript:;"> 查看详情 </a> &nbsp;&nbsp;
                      <a href="javascript:;" class="centerBtn"> 查看档期 </a>&nbsp;&nbsp;
                      <a href="javascript:;" class="centerBtn"> 订位 </a>&nbsp;&nbsp;
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div  class="footer" :class="[$store.state.isCollapse ? 'collapse-width' : 'notcollapse-width']">
              <div></div>
              <div>
                已选择<span class="chooseNum">{{selectMediaLists.length}}</span>个媒体资源
              </div>
              <el-button size="mini" @click="bookMedia" type="warning">立即定位</el-button>
            </div>
          </el-tab-pane>
          <!-- 订单详情 -->
          <el-tab-pane label="订单详情" class="details-tab3">
            <div class="order-top">
              <el-radio-group size="mini" class="order-list-type" v-model="orderStatus" @change="getOrderList">
                <el-radio border :label="null">全部</el-radio>
                <el-radio border :label="0">待审核</el-radio>
                <el-radio border :label="1">已定位</el-radio>
                <el-radio border :label="3">已锁位</el-radio>
              </el-radio-group>
              <!-- 数据列表 -->
              <el-table class="el-table-media" stripe :data="orderList" >
                <el-table-column label="序号" type="index" align="center" :index="indexMethod"></el-table-column>
                <el-table-column label="订单编号" prop="ordernumber" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="detail(scope.row.id)">{{scope.row.ordernumber}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="下单时间" width="160px" prop="ordernumber" align="center">
                  <template slot-scope="scope">
                    <div>{{scope.row.createdon | date}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="城市" prop="cityName" align="center"></el-table-column>
                <el-table-column label="公司" prop="clientName" align="center"></el-table-column>
                <el-table-column label="发布品牌" prop="brand" align="center"></el-table-column>
                <el-table-column label="联系人" prop="contactName" align="center"></el-table-column>
                <el-table-column label="所属销售" prop="saleName" align="center"></el-table-column>
                <el-table-column label="当前状态" prop="status" align="center">
                  <template slot-scope="scope">
                    <div>{{scope.row.status | orderStatus}}</div>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页 -->
              <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="CurrentChange"
                               :current-page="currentPage"
                               :page-sizes="[1, 2, 3, 4]" :page-size="pageSize"
                               layout="total, prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      mediaList: [],
      contactTitle: {title: '', type: '', id: ''},
      contactInfo: {},
      // 新增联系人的Tabs默认选中项
      activeName: 0,
      // 获取点击详情之后带过来的参数
      clientID: this.$route.query.clientID,
      // 客户详情数据
      info: {
        clientInfo: {},
        contactFollowupList: [],
        contactInfo: []
      },
      // 基本信息中点击编辑后台返回的数据
      editInfo: {
        code: '',
        name: '',
        brand: '',
        company: '',
        salesID: '',
        country: '',
        resgion: '',
        city: '',
        industry: '',
        category: '',
        grade: ''
      },
      editUsers: {
        gender: '',
        birthday: '',
        place: ''
      },
      // 订单详情
      orderList: [],
      orderStatus: null,
      // 当前页码
      currentPage: 1,
      // 每页显示的条数
      pageSize: 10,
      total: 0,
      textarea2: '',
      value: '',
      // 传的clientID
      // clientID: '',
      // 基本信息中点击编辑的弹出框
      editVisible: false,
      // 联系人信息中点击编辑的弹出框
      editUserVisible: false,
      fllowStatus: '',
      salesID: '',
      salesList: [],
      followUpInfo: '',
      followOptions: [
        {
          value: 1,
          label: '有意向'
        }, {
          value: 2,
          label: '无意向'
        }, {
          value: 3,
          label: '合作'
        }
      ],
      cityOptions: [],
      cityID: [],
      clientRankList: [],
      clientCategoryList: [],
      industryCategoryList: [],
      genderOptions: [
        {label: '女', value: 2},
        {label: '男', value: 1}
      ],
      selectMediaLists: []
    }
  },
  methods: {
    // 媒体预定
    bookMedia () {
      if (this.selectMediaLists.length < 1) {
        this.$confirm('请选择媒体', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return false
      }
    },
    // 表格多选
    handleSelectionChange (val) {
      this.selectMediaLists = val
    },
    // 获取当前页的数据
    getDetails () {
      this.$http({
        url: 'client/profile',
        method: 'POST',
        dataType: 'JSON',
        data: {
          clientID: this.clientID
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
        this.info = data
        this.salesList = data.salesList
      }
    })
    },
    // 基本信息中点击编辑触发的事件
    toEdit () {
      this.$http({
        url: 'client/toEdit',
        method: 'POST',
        data: {
          clientID: this.clientID
        }
      }).then(res => {
        let {data} = res
        this.cityOptions = data.countryList
      this.cityID = data.clientInfo.clientInfo
      this.salesList = data.salesList
      this.clientRankList = data.clientRankList
      this.clientCategoryList = data.clientCategoryList
      this.industryCategoryList = data.industryCategoryList
      this.editInfo = data.clientInfo
      this.editVisible = true
      if (data.status === 0) {
      }
    })
    },
    // 保存基本信息
    editclient () {
      this.$http({
        url: 'client/edit',
        method: 'POST',
        data: {
          clientID: this.clientID,
          address: this.editInfo.address,
          brand: this.editInfo.brand,
          category: this.editInfo.category,
          cityID: this.cityID,
          code: this.editInfo.code,
          companyName: this.editInfo.companyName,
          id: this.editInfo.id,
          industryCategory1: this.editInfo.industryCategory1,
          industryCategoryName: this.editInfo.industryCategoryName,
          name: this.editInfo.name,
          rank: this.editInfo.rank,
          regionID: this.editInfo.regionID,
          salesID: this.editInfo.salesID
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
        this.getDetails()
        this.editVisible = false
      }
    })
    },
    // 联系人信息中点编辑
    usersEdit (title, type, id) {
      this.contactTitle.title = title
      this.contactTitle.type = type
      this.editUserVisible = true
      // 1 新增 2修改
      if (type === 1) {
        this.contactInfo = {}
      } else {
        this.contactTitle.id = id
        this.contactToedit(id)
      }
    },
    contactToedit (id) {
      this.$http({
        url: '/contact/toEdit',
        method: 'POST',
        dataType: 'JSON',
        data: {
          contactID: id
        }
      }).then(res => {
        let {data} = res
        this.contactInfo = data.contactInfo
    })
    },
    // 联系人弹框保存
    contactSave (contactTitle) {
      // 1新增2修改
      if (contactTitle.type === 1) {
        this.contactAdd(contactTitle)
      } else {
        this.contactEdit(contactTitle)
      }
    },
    contactAdd (contactTitle) {
      let info = Object.assign(this.contactInfo)
      info.clientID = this.clientID
      this.$http({
        url: '/contact/create',
        method: 'POST',
        dataType: 'JSON',
        data: info
      }).then(res => {
        if (res.data.status === 0) {
        this.editUserVisible = false
        this.getDetails()
        this.$message({
          type: 'success',
          message: '新增成功'
        })
      }
    })
    },
    contactEdit (contactTitle) {
      this.$http({
        url: '/contact/edit',
        method: 'POST',
        dataType: 'JSON',
        data: this.contactInfo
      }).then(res => {
        if (res.data.status === 0) {
        this.editUserVisible = false
        this.getDetails()
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }
    })
    },
    // 新增拜访记录
    addFllow () {
      this.$http({
        url: 'client/addFollowup',
        method: 'POST',
        dataType: 'JSON',
        data: {
          clientID: this.clientID,
          info: this.followUpInfo,
          salesID: this.salesID,
          status: this.fllowStatus
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
        this.followUpInfo = this.salesID = this.fllowStatus = ''
        this.getDetails()
      }
    })
    },
    // 点击当前页触发的函数
    CurrentChange (currentpage) {
      this.currentPage = currentpage
      this.getOrderList()
    },
    // 点击页容量触发的函数
    handleSizeChange (pagesize) {
      this.pageSize = pagesize
      this.getOrderList()
    },
    // 媒体计划
    getmediaList () {
      this.$http({
        url: '/client/getMediasByPlanOrClientID',
        method: 'POST',
        dataType: 'JSON',
        data: {
          clientID:this.clientID
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.mediaList = data.data ? data.data : []
        }
      })
    },
    // 表格序号
    indexMethod (index) {
      return index + 1
    },
  //  订单列表
    getOrderList () {
      this.$http({
        url: '/client/getBookingsByClientID',
        method: 'POST',
        dataType: 'JSON',
        data: {
          clientID:this.clientID,
          status:this.orderStatus,
          page:this.currentPage,
          pageSize:this.pageSize
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.total = data.data.count
          this.orderList = data.data.list ? data.data.list : []
        }
      })
    },
  },
  created () {
    this.getDetails()
    this.getmediaList()
    this.getOrderList()
  }
}
</script>
<style lang="scss" scoped>
  .users-detia{
    margin-bottom: 60px;
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
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &.collapse-width{
      width: calc(100% - 280px + 136px);
    }
    &.notcollapse-width{
      width: calc(100% - 280px);
    }
    .chooseNum{
      color: red;
    }
  }
</style>
<style>

  .usersDetails ul {
    list-style: none;
  }
  .app-main[data-v-ecafa560]{
    padding: 0;
  }

  .usersDetails {
    font-size: 15px;
  }
  /* 编辑的弹框 */
  .usersDetails .el-dialog__title {
    line-height: 24px;
    font-size: 15px;
    color: #303133;
    margin-left: 40%;
  }
  /* 弹框的body */
  .usersDetails .el-dialog__body {
    /* color: #606266; */
    font-size: 15px;
    border-top: 1px solid #f4f4f4;
    width: 70%;
    margin: 0 auto;
    padding-bottom: 0;
  }
  .usersDetails .el-dialog {
    margin-top: 1vh !important;
    border-radius: 10px;
  }
  /* 弹框的input宽 */
  .usersDetails .el-dialog .el-form {
    width: 800px;
    margin: 0 auto;
  }
  /* 弹框的input宽 */
  .usersDetails .el-dialog .lager .el-input {
    width: 300px !important;
    height: 40px;
    font-size: 15px;
  }
  .usersDetails .el-dialog .big .el-input {
    width: 275px !important;
    height: 50px;
    font-size: 14px;
  }
  /* 客户编号的框 */
  .usersDetails .el-dialog .lag_num .el-input_inner {
    border: none;
  }
  /* 弹框的input宽 */
  .usersDetails .el-dialog .lager .el-input {
    width: 255px;
    /* width: 1.94rem; */
  }
  .usersDetails .el-dialog .el-select {
    margin-right: 20px;
  }
  .usersDetails .el-dialog .el-select .el-input__inner {
    font-size: 14px;
  }
  /* 地区下拉框的框 */
  .usersDetails .el-dialog .small .el-input__inner {
    width: 165px;
    padding-right: 20px;
  }
  .usersDetails .el-dialog .mini .el-input__inner {
    width: 300px;
    padding-right: 20px;
  }
  .usersDetails .el-dialog .mini .el-input {
    width: 300px;
    font-size: 14px;
  }
  .usersDetails .el-dialog .el-form-item__label {
    width: 180px;
    font-size: 14px;
  }
  /* 弹框的按钮 */
  .usersDetails .el-dialog .dialog-footer {
    padding:20px 0 20px 0;
    margin: 0 auto;
  }
  /* 弹框按钮 */
  .usersDetails .el-dialog .foot_btn {
    text-align: center;
  }
  .usersDetails .el-dialog .el-button {
    padding: 10px 40px;
    border-radius: 20px;
  }
  input{
    height: 10px;
  }
  .buttonList{
    background-color: rgb(54,204,197);
    font-size: 12px;
    color: #fff;
    position: absolute;
    top: 0px;
    right: 0px;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
  }
  .buttonList:hover{
    background-color: #07b1a6;
  }
  .usersDetails .el-dialog .users-cancel  {
    margin-right: 90px;
    background-color: #d0d0d0;
  }
  .el-icon-plus{
    font-size: 13px;
  }
  .usersDetails .el-dialog .users-carry  {
    background-color: #07b1a6;
    color: #fff;
    border: none;
  }
  /* Tabs卡片的背景色 */
  .usersDetails .el-tabs--border-card {
    background: #eeeeee;
    border: none !important;
    box-shadow: none;
  }
  /* Tabs卡片的头部默认样式 */
  .usersDetails .el-tabs__header {
    background-color: #eeeeee;
    margin: 0;
    border-bottom: none;
  }
  .usersDetails .el-tabs__nav-wrap.is-top {
    border: none;
  }
  .usersDetails .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-top {
    margin: 20px 10px 15px 0;
    line-height: 50px;
    height: 50px;
    padding: 0 15px;
    border-radius: 5px;
    background: #e8e8e8;
    border-bottom: 9px solid #e8e8e8;
  }
  /* 鼠标经过的时候 */
  .usersDetails .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: #000;
  }
  /* 被点击的导航的样式 */
  .usersDetails .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #000;
    font-size: 15px;
    font-weight: 700;
    background-color: #fff;
    border-color: transparent;
  }
  .usersInfo  .el-tabs__item.is-active {
    padding: 50px 0;
    text-align: center;
  }
  .usersInfo  .el-tabs__item.is-top{
    text-align: center;
  }
  .usersDetails  .el-tabs__item {
    border: none;
    padding: 0 20px;
  }
  .usersDetails .usersDetails .el-tabs__item {
    height: 0;
    line-height: 0;
    margin: 0;
    padding: 0;
  }
  .usersDetails .el-tabs__item:hover {
    color: #000;
    cursor: pointer;
  }
  .usersDetails .el-tabs__item {
    padding: 0;
    height: 0;
    line-height: 0;
    font-size: 15px;
    color: #303133;
  }
  .usersDetails .el-tabs--border-card>.el-tabs__content {
    padding: 0 30px;
  }
  /* 基本信息 */
  .users-dateTab .users-top {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 0 30px 0 45px;
    border-radius: 10px;
  }
  .users-dateTab .deta-base {
    font-size: 15px;
    padding: 20px 0;
  }
  .users-dateTab .deta-base .myicon{
    margin-left: 20px;
    color: #53d9d3;
    vertical-align: middle;
  }
  /* 编号一块 */
  .users-dateTab .deta-top .deta-numtime {
    display: flex;
    justify-content: space-between;
    padding: 15px 0 15px 40px;
  }
  .users-dateTab .deta-top .deta-numtime .ueses-detaNum {
    /*font-weight: 650;*/
    font-size: 15px;
  }
  .users-dateTab .deta-top .deta-numtime .deta-tail {
    font-size: 15px;
    color: #999999;
  }
  .users-dateTab .deta-top .deta-tail .deta-tail-time {
    padding-right: 45px;
  }

  .users-dateTab .users-detail ul {
    font-size: 13px;
    padding: 20px 0 20px 10px;
    border-top: 1px solid #f4f4f4;
  }
  .users-dateTab .users-detail ul li {
    display: inline-block;
    width: 360px;
    vertical-align: middle;
  }
  .users-dateTab .users-detail ul li:last-child {
    margin-right: 0;
  }

  .users-dateTab .users-detail .topD .spanL {
    display: inline-block;
    width: 40%;
    text-align: right;
    vertical-align: top;
    height: 100%;
  }
  .users-dateTab .users-detail .topD .spanR {
    display: inline-block;
    padding-left: 20px;
    width: 50%;
    height: 100%;
  }
  .users-dateTab .dInfo {
    margin-bottom:20px;
    background-color: #fff;
    border-radius: 10px;
  }
  .usersDetails .usersInfo .el-tabs__nav-wrap::after {
    bottom: 0;
    background-color: #e4e7ed;
  }
  .usersDetails .usersInfo .el-tabs__nav-wrap.is-top {
    padding: 0;
  }
  .usersDetails .dInfo {
    position: relative;
  }
  .usersDetails .dInfo .addB {
    position: absolute;
    top: 4%;
    right: 4%;
    width: 108px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 15px;
    border: none;
    padding: 0;
  }

  /* .topd的padding */
  .usersDetails .usersInfo .el-tabs__active-bar {
    bottom: 0;
    left: 7%;
    width: 120px !important;
    z-index: 0;
    height: 0;
  }
  .el-tabs__active-bar{
    background-color: #eee;
    height: 0;
  }
  .usersInfo .el-tabs__nav-wrap::after{
    height: 0;

  }
  .usersDetails .usersInfo .el-tabs__item {
    width: 200px;
  }
  /* 联系人信息的样式 */
  .usersDetails .usersInfo .el-tabs__item:last-child {

  }
  /* 联系人的ul无border-top */
  .users-dateTab .users-detail .usersUl {
    border-top: none;
    border-bottom: 1px dashed #f4f4f4;

  }
  .usersInfo .dInfo .usersUl{
    width: 100%;
    height: 200px;
  }
  .usersInfo .el-tabs--border-card{
    background: #fff;
    border: none !important;
  }
  .usersInfo .dInfo .usersUl .liList{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    margin-top: 10px;

  }
  .usersInfo .dInfo .usersUl .liList .topDList{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .usersInfo .dInfo .usersUl .liList .topDList .spanL{
    width: 40%;
   display: inline-block;
    text-align: right;
  }
  .usersInfo .dInfo .usersUl .liList .topDList .spanR{
    width: 48%;
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box;
    display: inline-block;
  }
  .usersInfo .dInfo .usersUl .liList .topDList .spanList{
    display: flex;
    align-items: center;
  }

  .usersInfo .dInfo .el-tabs__nav-wrap.is-top {
    border: none;
    background-color: none;
  }
  /*button的样式灰色*/
  .usersInfo .dInfo .el-tabs__item.is-top  {
    padding: 20px 0 30px;
    background-color: rgb(232,232,232);
    margin-left: 6px;
    border-radius:  5px;
    width: 110px;
    font-size: 15px;
  }
  /* 鼠标经过的时候 */
  /*.usersInfo .dInfo .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {*/
  /*color: #000;*/
  /*}*/

  /* 被点击的导航的样式 */
  .usersInfo .dInfo .el-tabs__item.is-active {
    color: #5bd3cd;
    font-size: 15px;
    background-color: #fff;
    padding: 20px 0 30px;
    border: none;
    border-radius: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .users-dateTab .deta-base {
    /*padding-bottom: 30px;*/
  }
  .users-dateTab .dInfo .remarks {
    display: flex;
    margin-left: 80px;
    padding-bottom: 50px;
  }
  .users-dateTab .dInfo .remarks .users-more {
    width: 130px;
  }
  /*.users-dateTab .dInfo .remarks .el-textarea {*/
    /*width: 5.85rem;*/
    /*height: 1.05rem;*/
  /*}*/
  /* 拜访记录 */
  .users-dateTab .newuserIn {
    margin-bottom: 20px;
    padding: 30px 45px 40px 45px;
    background-color: #fff;
    border-radius: 10px;
  }
  .users-dateTab .newuserIn .newvisit {
    font-size: 18px;
  }
  .users-dateTab .newuserIn .visit-ul {
    margin: 30px 0 30px 35px;
    padding: 15px 115px 15px 40px;
    background-color: #fafafa;
    border-radius: 10px;
    font-size: 15px;
    color: #656565;
  }
  .users-dateTab .newuserIn .visit-ul li {
    display: flex;
    line-height: 40px;
  }
  .newvisit .visit-ul div {
    display: inline;
  }
  .el-tabs--border-card>.el-tabs__header{
    border-color: #eeeeee;
  }
  .newvisit .visit-ul li .visit1 {
    flex: 3;
    margin-left: 5px;
  }
  .newvisit .visit-ul li .visit2 {
    flex: 1;
  }
  .newvisit .visit-ul li .visit3 {
    flex: 1;
  }
  .newvisit .visit-ul li .visit4 {
    flex: 1;
  }
  .newvisit .visit-ul li .visit4 .vTime {
    margin-left: 20px;
  }
  /* 跟进拜访记录 */
  .users-dateTab .newuserIn .newIn-top {
    display: inline-block;
    width: 100%;
    font-size: 18px;
    border-bottom: 1px solid #f4f4f4;
    padding-bottom: 30px;
    margin-bottom: 30px;
  }

  .users-dateTab .el-tabs__nav-scroll{
    padding-left: 30px;
  }
  .usersInfo .el-tabs__nav-scroll{
    padding-left: 0;
    position: relative;
    left: -8px;
    height: 60px;
    line-height: 60px;
    font-size: 10px;
    background-color: rgb(244);
    text-align: center;
  }
  .users-dateTab .newuserIn .newIn-status {
    /*padding-left: 140px;*/
    padding-bottom: 20px;
  }
  .users-dateTab .newuserIn .newIn-status label {
    padding-right: 15px;
    font-size:15px;
    color: #555555;
  }
  .users-dateTab .newuserIn .el-select .el-input__inner {
    width: 200px;
    height: 40px;
    font-size: 15px;
  }
  .users-dateTab .newuserIn .statusL {
    margin-right: 75px;
  }
  .users-dateTab .newuserIn .texInfo .el-textarea{
    padding: 30px 0;
    width: 50%;
  }
  .users-dateTab .newuserIn .subBtn {
    text-align: center;
  }
  .users-dateTab .newuserIn .usersIn-comm {
    background-color: #08b1a6;
    color: #fff;
    border-radius: 20px;
    padding: 10px 40px;
    border: none;
  }
  /* 媒体计划 */
  .users-dateTab .users-detia {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 40px;
  }
  .users-dateTab .users-detia .users-detop {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    border-bottom: 1px solid #f4f4f4;
  }
  .users-dateTab .users-detia .users-detop span {
    font-size: 18px;
  }
  .users-dateTab .users-detia .users-detop .el-button span {
    font-size: 14px;
  }
  /* 媒体计划中的删除按钮 */
  .users-dateTab .users-detia .users-detop .el-button .delR {
    background-color: #36ccc5;
  }
  /* 操作的字体颜色 */
  .users-dateTab .users-detia .users-decontent .el-table .cell a{
    color: #3399ff;
  }
  .usersDetails .lag_num .el-input__inner {
    border: none;
  }
  .usersDetails .top_ul li div {
    height: 60px
  }
  .usersDetails .usersUl li div {
    height: 60px;
  }
  /* 订单详情 */
  .order-top{
    background: white;
    padding: 30px;
    border-radius: 10px;

  }
  .order-top .order-list-type{
    margin-bottom: 20px;
  }
</style>
