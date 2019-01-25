<template>
  <div class="container-box">
    <h1>权限管理</h1>
    <!-- 面包屑导航 -->
    <!--<el-breadcrumb separator="/">-->
      <!--<el-breadcrumb-item :to="{ path: '/permission' }">系统设置</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>权限管理</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <div class="panel-box">
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane label="部门管理">
          <div class="paneDept">
            <div class="left">
            <el-tree
              :data="data4"
              default-expand-all
              :expand-on-click-node="false"
              :render-content="renderContent"
            @node-click="depTreeClick">
            </el-tree>
              </div>
            <div class="right dep-right">
              <div class="img-dep" v-if="showImg"></div>
              <div class="dep-info" v-if="!showImg">
                <div class="dep-item"><span class="dep-item-tit">部门名称：</span><span class="'dep-item-info">{{showDepForm.name}}</span></div>
                <div class="dep-item"><span class="dep-item-tit">上级部门：</span><span class="'dep-item-info">{{showDepForm.region}}</span></div>
                <div class="dep-item"><span class="dep-item-tit">部门负责人：</span><span class="'dep-item-info">{{showDepForm.people}}</span></div>
                <div class="dep-item"><span class="dep-item-tit">部门描述：</span><span class="'dep-item-info">{{showDepForm.desc}}</span></div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色管理">
          <div class="paneDept">
            <div class="left role-left">
              <ul class="role-nav">
                <li  v-for="(item,index) in roleData" :key=index :class="roleIndex==index?'role-nav-item role-active':'role-nav-item'" @click="roleClick(index,item.roleID)"> <i class="icon-pingtai iconfont role-left-icon"></i><span class="role-nav-text">{{item.name}}</span><i class="el-icon-arrow-right role-right-icon"></i></li>
              </ul>
            </div>
            <div class="right role-right">
              <div class="role-top">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>功能权限</span>
                    <i class="el-icon-edit-outline" @click="roleEdit"></i>
                  </div>
                  <div class="img-dep" v-if="showRole"></div>
                  <div class="text item" v-if="!showRole">
                    <el-tree
                      :data="roleDataTree"
                      default-expand-all
                      :render-content="renderContentRole"
                      :filter-node-method="filterTreeNode"
                      ref="roleTree">
                    </el-tree>
                  </div>
                </el-card>
              </div>
              <div class="role-bottom" v-if="!showRole">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>流程记录</span>
                  </div>
                  <div class="text item">
                    <div style="height: 100%; width: 500px;padding:30px" v-if="roleProcessShow">
                      <el-steps direction="vertical">
                        <el-step  v-for="(stepData,index) in roleProcessData"
                                  :key="index"
                                  :title="stepData.operatedon |date"
                                  :description="stepData.description"
                                  :icon="index % 2== 0?'el-icon-remove-outline':'el-icon-remove'"
                                  :class="index % 2==0?'sshu':'danshu'"></el-step>
                        <!--<el-step title="2017-03-28" description="15:53:00  张三2：修改" icon="el-icon-remove" class="danshu"></el-step>-->
                        <el-step title="" icon="el-icon-remove-outline"  description=""></el-step>
                      </el-steps>
                    </div>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户管理">
          <div class="paneDept">
            <div class="left">
              <el-tree
                :data="sysData"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContentSys"
                @node-click="roleTreeClick">
              </el-tree>
            </div>
            <div class="right">
              <div class="img-dep" v-if="showUser"></div>
              <div v-if="!showUser">
                <p class="right-tit">用户列表</p>
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="username"
                    label="账号"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="email"
                    label="邮箱"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="firstName"
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    prop="gender"
                    label="性别">
                  </el-table-column>
                  <el-table-column
                    prop="departmentName"
                    label="部门">
                  </el-table-column>
                  <el-table-column
                    prop="roleName"
                    label="角色">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                      <el-button @click="userEditBtn(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button type="text" size="small" @click="changeStatus(scope.row)">{{ scope.row.status }}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  background
                  layout="total,prev, pager, next,jumper"
                  :total="total"
                  @current-change="handleCurrentChange">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary"  class="add-btn" size="small" @click="departmentClick" v-if="departmentBtn">+ 新增部门</el-button>
      <el-button type="primary"  class="add-btn" size="small" @click="rolePupClick" v-if="roleBtn">+ 新增角色</el-button>
      <el-button type="primary" class="add-btn" size="small" @click="userPupClick" v-if="userBtn">+ 新增用户</el-button>
    </div>

    <!--新增部门-->
    <el-dialog :title="departmentTit" :visible.sync="departmentPup" width="35%">
      <el-form :model="form">
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择上级部门">
            <el-option v-for="item in depParent" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门负责人" :label-width="formLabelWidth">
          <el-select v-model="form.people" placeholder="请选择部门负责人">
            <el-option v-for="item in depPeople" :key="item.id" :label="item.firstName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="departmentPup = false">取 消</el-button>-->
        <el-button type="primary" @click="saveDepBtn">保 存</el-button>
      </div>
    </el-dialog>
    <!--新增角色-->
    <el-dialog :title="rolePupTit" :visible.sync="rolePup" width="35%">
      <el-form :model="roleForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="roleForm.name" autocomplete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="roleQx"
            :default-expanded-keys="['CLIENT']"
            show-checkbox
            :expand-on-click-node="false"
            node-key="flag"
            :default-checked-keys="roleSelect"
            accordion
            :render-content="renderContentRoleQx"
            @check="clickNode"
          ref="rolePupTree">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="departmentPup = false">取 消</el-button>-->
        <el-button type="primary" @click="rolePupBtn">保 存</el-button>
      </div>
    </el-dialog>
    <!--新增用户-->
    <el-dialog :title="userPupTit" :visible.sync="userPup" width="35%">
      <el-form :model="userForm">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="userForm.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!userShowPassBtn" label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="userForm.password" autocomplete="off" disabled></el-input>
          <p class="note">注：密码由系统自动生成后邮件发送至注册邮箱，请注意查收</p>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="userForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="userForm.sex" placeholder="男">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-cascader
            expand-trigger="hover"
            :options="UserDepData"
            :show-all-levels="false"
            v-model="userForm.department"
            change-on-select
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option v-for="(item,i) in userRoleData" :key=i :label="item.name" :value="item.roleID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="userForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码/电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="userForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div class="reset" v-if="userShowPassBtn">
        <el-button type="text" @click="sendPassBtn">重置密码</el-button>
      </div>

      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="departmentPup = false">取 消</el-button>-->
        <el-button type="primary" @click="userSaveBtn">保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  let roleManagData=[
    {
      label:'我的工作台',
      flag:'HOME_1'
    },
    {
      label:'客户管理',
      flag:'CLIENT',
      children:[
        {
          label:'客户列表',
          flag:'CLIENT_LIST',
          children:[
            {
              flag:'CLIENT_LIST_1',
              label:'查看'
            },
            {
              flag:'CLIENT_LIST_5',
              label:'编辑'
            },
            {
              flag:'CLIENT_LIST_6',
              label:'批量上传'
            },
            {
              flag:'CLIENT_LIST_7',
              label:'导出报表'
            }
          ]
        },
        {
          label:'新增客户',
          flag:'CLIENT_NEW',
          children:[
            {
              flag:'CLIENT_NEW_3',
              label:'新增'
            },
          ]
        },
        {
          label:'客户查询',
          flag:'CLIENT_SEARCH',
          children:[
            {
              flag:'CLIENT_SEARCH_2',
              label:'查询'
            }
          ]
        },
        {
          label:'审核',
        }
      ]
    },
    {
      label:'媒体管理',
      flag:'MEDIA',
      children:[
        {
          label:'媒体列表',
          flag:'MEDIA_LIST',
          children:[
            {
              flag:'MEDIA_LIST_1',
              label:'查看'
            },
            {
              flag:'MEDIA_LIST_5',
              label:'编辑'
            },
            {
              flag:'MEDIA_LIST_6',
              label:'批量上传'
            },
            {
              flag:'MEDIA_LIST_7',
              label:'导出'
            }
          ]
        },
        {
          label:'新增媒体',
          flag:'MEDIA_NEW',
          children:[
            {
              flag:'MEDIA_NEW_3',
              label:'新增'
            },
          ]
        },
        {
          label:'媒体查询',
          flag:'MEDIA_SEARCH',
          children:[
            {
              flag:'MEDIA_NEW_2',
              label:'查询'
            }
          ]
        },
        {
          label:'媒体计划',
          flag:'MEDIA_PLAN',
          children:[
            {
              flag:'MEDIA_PLAN_1',
              label:'查看'
            },
            {
              flag:'MEDIA_PLAN_5',
              label:'编辑'
            },
            {
              flag:'MEDIA_PLAN_4',
              label:'删除'
            },
            {
              flag:'MEDIA_PLAN_3',
              label:'新增'
            }
          ]
        }
      ]
    },
    {
      label:'系统设置',
      flag:'SYS',
      children:[
        {
          label:' 角色管理',
          flag:'SYS_ROLE',
          children:[
            {
              flag:'SYS_ROLE_1',
              label:'查看'
            },
            {
              flag:'SYS_ROLE_5',
              label:'编辑'
            },
            {
              flag:'SYS_ROLE_3',
              label:'新增'
            }
          ]
        },
        {
          label:' 用户管理',
          flag:'SYS_USER',
          children:[
            {
              flag:'SYS_USER_1',
              label:'查看'
            },
            {
              flag:'SYS_USER_5',
              label:'编辑'
            },
            {
              flag:'SYS_USER_3',
              label:'新增'
            },
            {
              flag:'SYS_USER_8',
              label:'禁/启用'
            }
          ]
        },
        {
          label:' 部门管理',
          flag:'SYS_DEPT',
          children:[
            {
              flag:'SYS_DEPT_1',
              label:'查看'
            },
            {
              flag:'SYS_DEPT_5',
              label:'编辑'
            },
            {
              flag:'SYS_DEPT_3',
              label:'新增'
            }
          ]
        }
      ]
    },
    {
      label:'订单管理',
      flag:'ORDER',
      children:[
        {
          label:'订单列表',
          flag:'ORDER_LIST',
          children:[
            {
              flag:'ORDER_LIST_1',
              label:'查看'
            }
          ]
        }
      ]
    },
    {
      label:'审核管理',
      flag:'CHECK',
      children:[
        {
          label:'订单审核',
          flag:'CHECK_ORDER',
          children:[
            {
              flag:'CHECK_ORDER_1',
              label:'查看'
            }
          ]
        }
      ]
    }
  ];
  export default {
    name: "permission",
    data() {
      return {
        departmentBtn:true,
        departmentTit:'',
        roleBtn:false,
        roleTit:'',
        userBtn:false,
        userTit:'',
        data4: [],
        roleDataTree: roleManagData,
        showDepForm: {
          name: '',
          region: '',
          people:'',
          desc: ''
        },
        departmentPup: false,
        form: {
          depID:'',
          name: '',
          region: '',
          people:'',
          desc: '',
          saleDept:false
        },
        depParent:[],
        depPeople:[],
        rolePup:false,
        showRole:true,
        roleData:[],
        roleIndex:0,
        roleID:1,
        rolePupTit:'',
        filterTreeText: '',
        roleForm:{
          name: '',
          region: '',
          people:'',
          desc: ''
        },
        roleProcessData:[],
        roleProcessShow:false,
        roleSelect:[],
        formLabelWidth: '120px',
        roleQx:roleManagData,
        showUser:true,
        page:1,
        pageSize:10,
        total:0,
        depID:'',
        sysData: [],
        tableData: [],
        userPup:false,
        userPupTit:'',
        UserDepData:[],
        userRoleData:[],
        userShowPassBtn:false,
        isAddUser:false,
        isEditUser:false,
        userID:'',
        userRoleID:'',
        userForm:{
          number: '',
          password: '123456',
          name:'',
          sex: '',
          department:[],
          role:'',
          email:'',
          phone:''
        },
        showImg:true
      }
    },
    watch: {
      filterTreeText(val) {
        this.$refs.roleTree.filter(val);
      }
    },
    created(){
      this.getDepTree()
    },
    methods:{
      // 点击tab切换新增按钮
      tabClick(tab) {
        // console.log(tab.label);
        switch (tab.label) {
          case "部门管理":
            this.departmentBtn = true;
            this.roleBtn = false;
            this.userBtn = false;
            break;
          case "角色管理":
            this.departmentBtn = false;
            this.roleBtn = true;
            this.userBtn = false;
            this.getRoleData();
            break;
          case "用户管理":
            this.departmentBtn = false;
            this.roleBtn = false;
            this.userBtn = true;
            this.getUserData();
            break;
        }
      },
      // 获取部门管理的tree数据
      getDepTree(){
        this.$http({
          url:'/department/tree',
          method: 'POST',
          dataType: 'JSON'
        })
          .then(res=>{
            if(res.status==200){
              let result=res.data;
              console.log(result,'=======')
              if(result.status==0){
                this.data4=result.departmentTree;
                // console.log(this.data4)
              }
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      // 点击tree节点获取信息展示右侧区域
      depTreeClick(data){
        console.log(data)
        this.showImg=false;
        this.$http({
          url:'/department/info',
          method: 'POST',
          dataType: 'JSON',
          data:{
            departmentID:data.value
          }
        })
          .then(res=>{
            console.log(res.data)
            if(res.status==200){
              let result=res.data;
              if(result.status==0){
                this.showDepForm.name=result.departmentInfo.name;
                this.showDepForm.region=result.departmentInfo.parentDepName;
                this.showDepForm.people=result.departmentInfo.headName;
                this.showDepForm.desc=result.departmentInfo.description;
              }
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      // 部门管理的tree点击编辑
      edit(e,data){
        console.log(data)
        e.stopPropagation();
        this.departmentTit='编辑部门';
        this.departmentPup=true;
        this.$http({
          url:'/department/toEdit',
          method: 'POST',
          dataType: 'JSON',
          data:{
            departmentID:data.value
          }
        })
          .then(res=>{
            console.log(res)
            if(res.status==200){
              let result=res.data;
              if(result.status==0){
                this.form.depID=result.departmentInfo.depID;
                this.form.name=result.departmentInfo.name;
                this.form.region=result.departmentInfo.parentDepName;
                this.form.people=result.departmentInfo.headName;
                this.form.desc=result.departmentInfo.description;
                this.depParent=result.parentDepartments;
                this.depPeople=result.users.list;
                console.log(data.saleDept)
                this.form.saleDept=data.saleDept
                console.log(this.form.saleDept)
              }
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      // 判断是编辑部门还是新增部门,并新增部门
      departmentClick(){
        this.departmentPup=true;
        this.departmentTit='新增部门';
        this.form.depID='';
        this.form.name='';
        this.form.region='';
        this.form.people='';
        this.form.desc='';
        this.$http({
          url:'/department/new',
          method: 'POST',
          dataType: 'JSON',
        })
          .then(res=>{
            console.log(res)
            if(res.status==200){
              let result=res.data;
              if (result.status==0){
                this.depParent=result.parentDepartments;
                this.depPeople=result.users.list;
              }
            }
          })
          .catch(err=>{
            console.log(err)
          });
      },
      // 保存部门编辑
      saveDepBtn(){
        this.departmentPup=false;
        console.log(this.form.region,'11111111')
        console.log(this.form.saleDept)
        if(this.form.region!=null && this.form.region!='销售部'){
            if(this.form.region===1){
                this.form.saleDept=true
            }else{
              this.form.saleDept=false
            }
        }
        this.form.region===''?this.form.region=0:this.form.region=this.form.region;
        // console.log(this.form.people)
        console.log(this.form.region)
        console.log(this.form.saleDept)
        if(this.departmentTit=='编辑部门'){
          this.$http({
            url:'/department/edit',
            method: 'POST',
            dataType: 'JSON',
            data:{
              depID: this.form.depID,
              description: this.form.desc,
              headID: Number(this.form.people),
              name: this.form.name,
              parentID: Number(this.form.region),
              saleDept:  this.form.saleDept
            }
          })
            .then(res=>{
              console.log(res)
              this.getDepTree()
            })
            .catch(err=>{
              console.log(err)
            })
        }else if (this.departmentTit=='新增部门') {
          this.$http({
            url:'/department/create',
            method: 'POST',
            dataType: 'JSON',
            data:{
              description: this.form.desc,
              headID: this.form.people,
              name: this.form.name,
              parentID: this.form.region,
              saleDept:  this.form.saleDept
            }
          })
            .then(res=>{
              console.log(res)
              console.log('save')
              this.getDepTree()
            })
            .catch(err=>{
              console.log(err)
            })
        }



      },
      // 渲染部门管理tree
      renderContent(h, { node, data, store }) {
        // console.log(node)
          return (
            <span class="custom-tree-node">
            <span class="iconfont icon-gangwei"></span>
            <span>{node.label}</span>
            <span class='edit-icon'>
            <i class="el-icon-edit" on-click={()=>this.edit(event,data)}></i>
          </span>
          </span>);
        },
      //获取角色管理初始化数据
      getRoleData(){
        this.$http({
          url:'/role/list',
          method: 'POST',
          dataType: 'JSON'
        })
          .then(res=>{
            console.log(res)
            if(res.status==200){
              let result=res.data;
              if(result.status==0){
                this.roleData=result.list;
                // console.log(this.roleData)
              }
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      //角色管理左边改变数据
      roleClick(index,roleID){
        this.showRole=false;
        this.roleIndex=index||0;
        this.roleID=roleID;
        console.log(this.roleID);
        this.$http({
          url:'/role/info',
          method:'POST',
          dataType:"JSON",
          data:{
            roleID:Number(this.roleID)
          }
        })
          .then(res=>{
            console.log(res)
            if(res.status==200){
              let result=res.data;
              if(result.status==0){
                this.filterTreeText=result.privileges;
                if(!result.privileges){
                  this.showRole=true;
                }
                if(result.logs.length<=0){
                  this.roleProcessShow=false;
                  this.roleProcessData=[];
                }else{
                  this.roleProcessShow=true;
                  this.roleProcessData=result.logs;
                }
              }
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      //过滤角色tree数据
      filterTreeNode(value, data) {
        if (!value) return true;
        return value.indexOf(data.flag) !== -1
      },
      //新增角色
      rolePupClick(){
        this.rolePupTit='新增角色';
        this.rolePup=true;
        this.roleForm.name='';
        this.roleSelect=[];
        // console.log(this.$refs.rolePupTree)
        if(this.$refs.rolePupTree){
          this.$refs.rolePupTree.setCheckedKeys(this.roleSelect)
        }
      },
      //编辑角色
      roleEdit(){
        this.rolePupTit='编辑角色';
        this.rolePup=true;
        console.log(this.roleSelect,'=====')
        // console.log(this.roleID)
        this.$http({
          url:'/role/toEdit',
          dataType:'JSON',
          method: 'POST',
          data:{
            roleID:this.roleID
          }
        })
          .then(res=>{
            console.log(res)
            if(res.status==200){
              let result =res.data;
              if(result.status==0){
                this.roleForm.name=result.roleName;
                this.roleSelect=result.privileges.split(',')
                this.$refs.rolePupTree.setCheckedKeys(this.roleSelect)
              }
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      //角色管理tree渲染
      renderContentRole(h, { node, data, store }) {
    return (
      <span class="custom-tree-node">
          <span class="iconfont icon-wenjianjia"></span>
      <span>{node.label}</span>
    </span>);
  },
      //渲染角色管理弹出层的页面tree
      renderContentRoleQx(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
          <span class="iconfont icon-wenjianjia"></span>
          <span>{node.label}</span>
          </span>);
      },
      clickNode(e){
        let arr=this.$refs.rolePupTree.getCheckedKeys();
       if(e.flag=='CLIENT_LIST_5'|| e.flag=='CLIENT_LIST_6'||e.flag=='CLIENT_LIST_7'){
         if(arr.indexOf('CLIENT_LIST_1')==-1){
           arr.push('CLIENT_LIST_1')
         }
         console.log(arr)
         console.log(this.$refs.rolePupTree)
         this.$refs.rolePupTree.setCheckedKeys(arr)
       }else if(e.flag=='MEDIA_LIST_5'||e.flag=='MEDIA_LIST_6'||e.flag=='MEDIA_LIST_7'){
         if(arr.indexOf('MEDIA_LIST_1')==-1){
           arr.push('MEDIA_LIST_1')
         }
         console.log(arr)
         this.$refs.rolePupTree.setCheckedKeys(arr)
       }else if(e.flag=='MEDIA_PLAN_5'||e.flag=='MEDIA_PLAN_4'||e.flag=='MEDIA_PLAN_3'){
         if(arr.indexOf('MEDIA_PLAN_1')==-1){
           arr.push('MEDIA_PLAN_1')
         }
         console.log(arr)
         this.$refs.rolePupTree.setCheckedKeys(arr)
       }else if(e.flag=='SYS_ROLE_5'||e.flag=='SYS_ROLE_3'){
         if(arr.indexOf('SYS_ROLE_1')==-1){
           arr.push('SYS_ROLE_1')
         }
         console.log(arr)
         this.$refs.rolePupTree.setCheckedKeys(arr)
       }else if(e.flag=='SYS_USER_5'||e.flag=='SYS_USER_3'||e.flag=='SYS_USER_8'){
         if(arr.indexOf('SYS_USER_1')==-1){
           arr.push('SYS_USER_1')
         }
         console.log(arr)
         this.$refs.rolePupTree.setCheckedKeys(arr)
       }else if(e.flag=='SYS_DEPT_5'||e.flag=='SYS_DEPT_3'){
         if(arr.indexOf('SYS_DEPT_1')==-1){
           arr.push('SYS_DEPT_1')
         }
         console.log(arr)
         this.$refs.rolePupTree.setCheckedKeys(arr)
       }else if(e.flag=='CLIENT_LIST_1') {

         if (arr.indexOf('CLIENT_LIST_1') == -1) {
           console.log(arr, 'CLIENT_LIST_1CLIENT_LIST_1')
           let temp = arr.filter(item => {
             return item.indexOf('CLIENT_LIST') < 0
           })
           console.log(temp, 'CLIENT_LIST_1CLIENT_LIST_1CLIENT_LIST_1')
           this.$refs.rolePupTree.setCheckedKeys(temp)
         }
       }else if(e.flag=='MEDIA_LIST_1') {

         if (arr.indexOf('MEDIA_LIST_1') == -1) {

           if (arr.indexOf('MEDIA_LIST_1') == -1) {
             console.log(arr, 'MEDIA_LIST_1MEDIA_LIST_1MEDIA_LIST_1')
             let temp = arr.filter(item => {
               console.log(item, '=====')
               return item.indexOf('MEDIA_LIST') < 0
             })
             console.log(temp, 'MEDIA_LIST_1MEDIA_LIST_1MEDIA_LIST_1')

             this.$refs.rolePupTree.setCheckedKeys(temp)
           }
         }
       }
       else if(e.flag=='MEDIA_PLAN_1') {

         if (arr.indexOf('MEDIA_PLAN_1') == -1) {
           if (arr.indexOf('MEDIA_PLAN_1') == -1) {
             console.log(arr, 'MEDIA_PLAN_1MEDIA_PLAN_1MEDIA_PLAN_1MEDIA_PLAN_1')
             let temp = arr.filter(item => {
               return item.indexOf('MEDIA_PLAN') < 0
             })
             console.log(temp, 'MEDIA_PLAN_1MEDIA_PLAN_1MEDIA_PLAN_1')

             this.$refs.rolePupTree.setCheckedKeys(temp)
           }
         }
       }
       else if(e.flag=='SYS_ROLE_1') {

         if (arr.indexOf('SYS_ROLE_1') == -1) {
           if (arr.indexOf('SYS_ROLE_1') == -1) {
             console.log(arr, 'SYS_ROLE_1SYS_ROLE_1SYS_ROLE_1SYS_ROLE_1')
             let temp = arr.filter(item => {
               return item.indexOf('SYS_ROLE') < 0
             })
             console.log(temp, 'SYS_ROLE_1SYS_ROLE_1SYS_ROLE_1SYS_ROLE_1')

             this.$refs.rolePupTree.setCheckedKeys(temp)
           }
         }
       }
       else if(e.flag=='SYS_USER_1') {

         if (arr.indexOf('SYS_USER_1') == -1) {
           if (arr.indexOf('SYS_USER_1') == -1) {
             console.log(arr, 'SYS_USER_1SYS_USER_1SYS_USER_1')
             let temp = arr.filter(item => {
               return item.indexOf('SYS_USER') < 0
             })
             console.log(temp, 'SYS_USER_1SYS_USER_1SYS_USER_1SYS_USER_1')

             this.$refs.rolePupTree.setCheckedKeys(temp)
           }
         }
       }
       else if(e.flag=='SYS_DEPT_1') {

         if (arr.indexOf('SYS_DEPT_1') == -1) {
           if (arr.indexOf('SYS_DEPT_1') == -1) {
             console.log(arr, 'SYS_DEPT_1SYS_DEPT_1SYS_DEPT_1SYS_DEPT_1')
             let temp = arr.filter(item => {
               return item.indexOf('SYS_DEPT') < 0
             })
             console.log(temp, 'SYS_DEPT_1SYS_DEPT_1SYS_DEPT_1')

             this.$refs.rolePupTree.setCheckedKeys(temp)
           }
         }
       }
       },
      //保存角色管理
      rolePupBtn(){
        // this.rolePup=false;
        if(this.rolePupTit==='新增角色'){
          let roleName=this.roleForm.name;
          let selectTreeNode=this.$refs.rolePupTree.getCheckedKeys();
          console.log(selectTreeNode,'-----------')
          let roleNode=[];
          for(let item of selectTreeNode){
            console.log(item)
            let regNumber=/\d+/;
            if(regNumber.test(item)){
              roleNode.push(item)
            }
          }
          console.log(roleNode)
          this.$http({
            url:'/role/create',
            method:'POST',
            dataType:'JSON',
            data:{
              privileges:roleNode,
              roleName:roleName
            }
          })
            .then(res=>{
              console.log(res)
              this.getRoleData();
            })
            .catch(err=>{
              console.log(err)
            })

        }else if(this.rolePupTit==='编辑角色'){
          let roleName=this.roleForm.name;
          let selectTreeNode=this.$refs.rolePupTree.getCheckedKeys();
          let roleNode=[];
          for(let item of selectTreeNode){

            let regNumber=/\d+/;
            if(regNumber.test(item)){
              roleNode.push(item)
            }
          }
          console.log(roleName)
          console.log(roleNode)
          console.log(this.roleID)
          this.$http({
            url:'/role/edit',
            method:'POST',
            dataType:'JSON',
            data:{
              privileges: roleNode,
              roleID: this.roleID,
              roleName: roleName
            }
          })
            .then(res=>{
              console.log(res);
              this.getRoleData();
              this.roleClick(null,this.roleID)
            })
            .catch(err=>{
              console.log(err)
            })
        }
      },
      // 初始化tree 用戶管理
      getUserData(){
        this.$http({
          url:'/user/toList',
          method:'POST',
          dataType:'JSON'
        })
          .then(res=>{
            console.log(res)
            if(res.status==200){
              let result=res.data;
              if(result.status==0){
                this.sysData=result.departmentTree;
              }
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      // 点击左侧tree切换表格数据 用户管理
      roleTreeClick(e){
        this.showUser=false;
        if(e){
          this.depID =e.value;
        }
        this.$http({
          url:'/user/list',
          method:'POST',
          dataType:'JSON',
          data:{
            departmentID: this.depID ,
            page: this.page,
            pageSize: this.pageSize
          }
        })
          .then(res=>{
            //1 男 2女
            console.log(res)
            if(res.status==200){
              let result=res.data;
              if(result.status==0){
                this.total=result.userList.count;
                this.tableData=result.userList.list;
                if(this.tableData){
                  this.tableData.map(item=>{
                    if(item.gender==1){
                      item.gender='男';
                    }else if(item.gender==2){
                      item.gender='女';
                    }
                    item.status==true?item.status='启用':item.status='禁用'
                  });
                }
                console.log(this.total)
              }
            }

          })
          .catch(err=>{
            console.log(err)
          })
      },
      // 改变启用禁用状态 用户管理
      changeStatus(row){
        let userID=row.id;
        let active='';
        if(row.status=='启用'){
          active=false;
        }else if(row.status=='禁用'){
          active=true;
        }
        this.$http({
          url:'/user/active',
          method:'POST',
          dataType:'JSON',
          data:{
            active: active,
            userID: userID
        }
        })
          .then(res=>{
            // console.log(res)
            this.roleTreeClick(null)
          })
          .catch(err=>{
            console.log(err)
          })
      },
      // 获取用户弹出层的下拉列表数据
      getUserSelectInfo(){
        this.$http({
          url:'/user/new',
          method:'POST',
          dataType:'JSON'
        }).then(res=>{
            console.log(res)
          if(res.status==200){
            let result=res.data;
            if(result.status==0){
              this.UserDepData=result.departmentTree;
              console.log(this.UserDepData)
              this.userRoleData=result.roleList;
            }
          }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      // 新增用户
      userPupClick(){
        console.log('xin user');
        this.userPupTit='新增用户';
        this.userPup=true;
        this.userShowPassBtn=false;
        this.userForm.number='';
        this.userForm.name='';
        this.userForm.sex='';
        this.userForm.department=[];
        this.userForm.role='';
        this.userForm.email='';
        this.userForm.phone='';
        this.getUserSelectInfo();
      },
      // 新增用户保存数据
      userAddInfo(){
        this.$http({
          url:'user/create',
          method:'POST',
          dataType:'JSON',
          data:{
            departmentID:this.userForm.department[this.userForm.department.length-1],
            email: this.userForm.email,
            firstName: this.userForm.name,
            gender: Number(this.userForm.sex),
            phone: this.userForm.phone,
            roleID: Number(this.userForm.role),
            username: this.userForm.number
          }
        })
          .then(res=>{
            console.log(res,'=======');
            this.userPup=false;
            if(res.status==200){
              if(res.data.status==0){
                this.roleTreeClick(null)
              }
            }
          },(err)=>{
            console.log(err)
          })
          .catch(err=>{
            console.log(err)
          })
      },
      //发送密码
      spendPassword(id){
        this.$http({
          url:'/user/sendPwdToEmail',
          method:'POST',
          dataType:'JSON',
          data:{
            userID:id,
            email: this.userForm.email,
            phone: this.userForm.phone
          }
        })
          .then(res=>{
            // console.log(res,'-------')
            this.$message({
              showClose: true,
              message: '密码发送已发送邮箱，请注意查看！'
            });
          })
          .catch(err=>{
            console.log(err)
          })
      },
      //编辑用户
      userEditSave(){
        if(isNaN(Number(this.userForm.role))){
          this.userForm.role=this.userRoleID
        }
        this.$http({
          url:'/user/edit',
          method:'POST',
          data:{
            departmentID:this.userForm.department[this.userForm.department.length-1],
            email: this.userForm.email,
            firstName: this.userForm.name,
            gender: Number(this.userForm.sex),
            phone: this.userForm.phone,
            roleID: this.userForm.role,
            userID: this.userID,
            username: this.userForm.number
          }
        })
          .then(res=>{
            // console.log(res);
            this.userPup=false;
            this.roleTreeClick(null)
          })
          .catch(err=>{
            console.log(err)
          })
      },
      // 保存用户
      userSaveBtn(){
        console.log(this.userForm);
        if(this.userForm.number==''){
          this.$message({
            showClose: true,
            message: '账号不能为空'
          });
          return;
        }
        if(this.userForm.name==''){
          this.$message({
            showClose: true,
            message: '姓名不能为空'
          });
          return;
        }
        if(this.userForm.sex==''){
          this.$message({
            showClose: true,
            message: '必须选择性别'
          });
          return;
        }
        if(this.userForm.department==''){
          this.$message({
            showClose: true,
            message: '必须选择部门'
          });
          return;
        }
        if(this.userForm.role==''){
          this.$message({
            showClose: true,
            message: '必须选择角色'
          });
          return;
        }
        if(this.userForm.email==''){
          this.$message({
            showClose: true,
            message: '邮箱不能为空'
          });
          return;
        }
        let emailExg= /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if(!emailExg.test(this.userForm.email)){
          this.$message({
            showClose: true,
            message: '邮箱不正确'
          });
          return;
        }
        if(this.userForm.phone==''){
          this.$message({
            showClose: true,
            message: '手机不能为空'
          });
          return;
        }
        let phoneExg=/^1[34578]\d{9}$/;
        if(!phoneExg.test(this.userForm.phone)){
          this.$message({
            showClose: true,
            message: '手机号码不正确'
          });
          return;
        }

        if(this.userPupTit==='新增用户'){
          this.$http({
            url:'/user/isRepeat',
            method:'POST',
            dataType:'JSON',
            data:{
              email:this.userForm.email,
              phone:this.userForm.phone,
              userName:this.userForm.number
            }
          })
            .then(res=>{
              // console.log(res)
              if(res.status==200){
                if(res.data.status==0) {
                  this.isAddUser = true;
                  if(this.isAddUser){
                  this.userAddInfo();
                  }
                }
              }
            },(err)=>{
              this.isAddUser=false;
            })
            .catch(err=>{
              this.isAddUser=false;
            })

        }else if(this.userPupTit==='编辑用户'){
          this.userShowPassBtn=true;
          console.log(this.userID)
          this.$http({
            url:'/user/isRepeat',
            method:'POST',
            dataType:'JSON',
            data:{
              email:this.userForm.email,
              phone:this.userForm.phone,
              userName:this.userForm.number
            }
          })
            .then(res=>{
              console.log(res,'usereidt======')
              if(res.status==200){
                if(res.data.status==0){
                  this.isEditUser=true;
                  if(this.isEditUser){
                    this.userEditSave()
                  }
                }
              }

            },(err)=>{
              this.isEditUser=false;
            })
            .catch(err=>{
              this.isEditUser=false;
              console.log(err)
            })

        }

      },
      //分页
      handleCurrentChange(val){
        this.page=val;
        console.log(this.page)
        this.roleTreeClick(null)
      },
      //渲染用户管理tree
      renderContentSys(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
          <span class="iconfont icon-gangwei"></span>
          <span>{node.label}</span>
          </span>);
      },
      //用户管理编辑数据
      getEditInfo(userID){
        console.log(userID)
        this.$http({
          url:'/user/toEdit',
          method:'POST',
          dataType:'JSON',
          data:{
            userID: userID
          }
        })
          .then(res=>{
            console.log(res,'1111111')
            if(res.status==200){
              let result=res.data;
              if(result.status==0){
                this.UserDepData=result.departmentTree;
                this.userRoleData=result.roleList;
                if(result.userInfo.gender===1){
                  this.userForm.sex='男'
                }else if(result.userInfo.gender===2){
                  this.userForm.sex='女'
                }
                console.log(this.userForm.sex)
                let arrID=[];
                if(result.userInfo.deptParentID!==0){
                  arrID.push(result.userInfo.deptParentID)
                  arrID.push(result.userInfo.departmentID)
                }else {
                  arrID.push(result.userInfo.departmentID)
                }
                this.userForm.number=result.userInfo.username;
                this.userForm.name=result.userInfo.firstName;
                this.userForm.department=arrID;
                this.userForm.role=result.userInfo.roleName;
                this.userForm.email=result.userInfo.email;
                this.userForm.phone=result.userInfo.phone;
                this.userRoleID=result.userInfo.roleID;
              }
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      // 编辑用户
      userEditBtn(row) {
        console.log('bian user');
        console.log(row);
        this.userPupTit='编辑用户';
        this.userPup=true;
        this.userShowPassBtn=true;
        this.userID=row.id;
        this.getEditInfo(this.userID)
      },
      //重置密码
      sendPassBtn(){
        console.log(this.userID)
        this.spendPassword(this.userID)
      },

    }
  }
</script>
<style>

  .container-box  .iconfont{
    color: #08b1a6;
    margin: 0 8px 0 0;
    font-size: 16px;
  }
  .container-box  .el-tabs--border-card > .el-tabs__header {
    background: #eee;
    border: 0;
  }

  .container-box  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    border: 1px solid transparent;
    border-bottom: 9px solid #fff;
    color: #36ccc5;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .container-box  .el-tabs--border-card {
    box-shadow: none;
    border: 0;
  }

  .container-box  .el-tabs__item {
    background: #e8e8e8;
    box-sizing: initial;
    font-size: 15px;
    padding: 0 30px;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    margin-right: 9px;
    border-bottom: 9px solid #eee;
  }

  .container-box  .el-tabs--top.el-tabs--border-card .el-tabs__item:nth-child(2) {
    padding-left: 37px;
  }

  .container-box .el-tabs--top.el-tabs--border-card .el-tabs__item:last-child {
    padding-right: 37px;
  }

  .container-box .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: #36ccc5;
  }
  .container-box  .el-tree-node__content{
    height: 40px;
  }
  .container-box .edit-icon{
    position: absolute;
    right: 10px;
    font-size: 15px;
    color: #08b1a6;
  }
  .container-box .el-menu{
    background: #fbfbfb;
    color: #aaa;
    border-bottom:1px solid #ededed;
    border-right: 0;
  }
  .container-box .el-menu:last-child{
    border-bottom: 0;
  }
  .container-box .el-submenu__title{
    width: 100%;
    color: #aaa;
    border-top:1px solid #ededed;
  }
  .container-box .el-menu .el-submenu:first-child .el-submenu__title{
    border-top-color: #fbfbfb;
  }
  .container-box .el-menu-vertical-demo.el-menu, .container-box .el-menu-item{
    color: #aaa;
    background-color:#fbfbfb;
  }
  .container-box .el-menu-item.is-active{
    width: auto;
    color: #fff;
    background: #52d6d4;
  }
  .container-box .el-submenu :hover{
    background: #52d6d4;
    color: #fff;
  }
  .container-box .el-submenu__title i{
    color: #aaa;
  }
  .container-box .el-submenu__icon-arrow.el-icon-arrow-down{
    color: #aaa;
  }
  .container-box .el-submenu :hover  i{
    color:#fff;
  }
  .container-box .el-submenu .el-menu-item{
    padding-left: 120px !important;
  }
  .container-box .el-card__header{
    background: #f9f9f9;
  }
  .container-box .el-card__header i{
    color: #53d9d3;
    vertical-align: middle;
  }
  .container-box .el-step__head.is-wait{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    display: block;
    color: #08b1a6;
    height: 100%;
  }
  .container-box .el-steps--vertical{
    position: relative;
  }
 .container-box  .el-step__line{
    background: #08b1a6;
  }
  .container-box .el-step__title.is-wait{
    color: #08b1a6;
  }
  .container-box .el-step__description{
    color: #7a7a7a;
    white-space: nowrap;
  }
  .container-box .el-step.is-vertical.danshu, .container-box .el-step.is-vertical.sshu{
    position: relative;
  }
  .container-box .el-step.is-vertical.danshu .el-step__main{
    position: absolute;
    right: -7px;
    display: inline-block;
    top:-12px;
    text-align: center;
  }
  .container-box .el-step.is-vertical.sshu .el-step__main{
    position: absolute;
    left: 0;
    top: -12px;
    display: inline-block;
    text-align: center;
  }
  .container-box .sshu  .el-step__head.is-wait::after{
    content: '';
    position: absolute;
    right: 82px;
    top: 12.5px;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background:#08b1a6;
  }
  .container-box .sshu  .el-step__head.is-wait::before{
    position: absolute;
    right: 22px;
    top: 12.5px;
    width: 60px;
    content: '';
    height: 1px;
    background: #08b1a6;
    z-index: 2;
  }
  .container-box .danshu  .el-step__head.is-wait::after{
    content: '';
    position: absolute;
    left: 82px;
    top: 12.5px;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background:#08b1a6;
  }
  .container-box .danshu  .el-step__head.is-wait::before{
    position: absolute;
    left: 22px;
    top: 12.5px;
    width: 60px;
    content: '';
    height: 1px;
    background: #08b1a6;
    z-index: 2;
  }

  .container-box  .el-table th{
    background: #f9f9f9;
  }
  .container-box .el-dialog__header{
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
    margin:0 20px;
  }
  .container-box .el-input__inner{
    width: 85%;
  }
  .container-box  .el-select{
    width: 85%;
  }
  .container-box  .el-select .el-input__inner{
    width: 100%;
  }
  .container-box  .el-cascader{
    width: 85%;
  }
  .container-box  .el-cascader .el-input, .el-cascader .el-input__inner{
    width: 100%;
  }
  .container-box  .el-cascader__label{
    width: 85%;
  }
  .container-box  .el-textarea__inner{
    width: 85%;
  }
  .container-box   .el-dialog{
    border-radius: 10px;
  }
  .container-box .el-dialog__footer{
    text-align: center;
  }
  .container-box   .el-button--primary{
    padding: 10px 40px;
    border: 0;
    background: #08b1a6;
    border-radius: 20px;
  }
  .container-box  .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    border-color:#dcdfe6
  }
  .container-box  .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
    content: '';
    position: absolute;
    display: block;
    background-color: #fff;
    height: 12px;
    width: 12px;
    transform: scale(1);
    left: 0;
    right: 0;
     top: 0;
  }
  .container-box  .el-tabs__nav-scroll{
    line-height: 0;
    padding-left: 0;
  }
  .container-box  .el-tabs--border-card>.el-tabs__header .el-tabs__item{
    margin: 0 9px 0 0;
    border-bottom-width: 9px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    /*border-radius: 5px;*/
  }
  .container-box  .el-step.is-vertical{
    min-height: 80px;
  }
  .container-box  .el-pagination{
    padding-top:20px;
  }
  .container-box  .el-tree-node__expand-icon{
    color: #08b1a6;
  }
  .container-box  .el-tree-node__expand-icon.is-leaf{
    color:transparent;
  }
</style>
<style scoped>
  .container-box {
    padding: 0 30px;
    background: #eee;
    overflow: hidden;
  }

  .container-box .el-breadcrumb {
    font-size: 18px;
    margin: 25px 0 35px;
  }
 .container-box .left{
   border: 1px solid #ededed;
   border-radius: 5px;
   padding: 30px 10px;
   width: 260px;
   float: left;
   margin-right: 30px;
   box-sizing: border-box;
 }
  .container-box .right{
    border: 1px solid #ededed;
    border-radius: 5px;
    box-sizing: border-box;
    overflow: hidden;
    padding: 20px;
  }
  .dep-right{
    min-height: 450px;
  }
  .img-dep{
    background: url("../../assets/bg.png") no-repeat center;
    width: 150px;
    height: 160px;
    margin: 110px auto;
  }
  .dep-info{
    width: 500px;
    margin: 40px auto;
    font-size: 14px;
  }
  .dep-info .dep-item{
    padding: 15px 0;
  }
  .dep-info .dep-item .dep-item-tit{
    display: inline-block;
    width: 100px;
    text-align: right;
    font-weight: bold;
    margin-right: 10px;
  }
  .container-box .role-left{
    border: 0;
    border-radius: 0;
    padding: 0;
    background: #fbfbfb;
  }
  .container-box .role-left  .role-nav{
    background: #fbfbfb;
    color: #aaa;
    border-bottom: 0;
    border-right: 0;
  }
  .container-box .role-left  .role-nav .role-nav-item{
    list-style: none;
    margin: 0;
    width: 100%;
    color: #aaa;
    border-top: 1px solid #ededed;
    cursor: pointer;
    height: 45px;
    line-height: 45px;
    position: relative;
    white-space: nowrap;
  }
  .container-box .role-left  .role-nav .role-nav-item:first-child{
    border-top: 0;
  }

  .container-box .role-left  .role-nav .role-nav-item  .role-left-icon{
    display: inline-block;
    width: 60px;
    height:45px;
    line-height: 45px;
    text-align: center;
    color:#aaa;
    border-right: 1px solid #ededed;
  }
  .container-box .role-left  .role-nav .role-nav-item .role-nav-text{
    padding-left: 18px;
    font-size: 15px;
  }
  .container-box .role-left  .role-nav .role-nav-item .role-right-icon{
    padding-right: 24px;
    float: right;
    line-height: 45px;
  }
  .container-box .role-left  .role-nav .role-nav-item.role-active{
     background: #52d6d4;
     color: #fff;
   }
  .container-box .role-left  .role-nav .role-nav-item.role-active .role-left-icon{
    color: #fff;
    border-right: 1px solid #52d6d4;
  }
 .container-box  .role-right{
    border: 0;
   padding: 0;
  }
  .container-box .el-tree-node{
    font-size: 14px !important;
  }
 .right-tit{
   font-size: 16px;
   border-bottom: 2px solid #ccc;
   color: #5e5e5e;
   line-height: 35px;
   padding-bottom:10px;
 }
 .role-top{
   margin-bottom: 30px;
 }
  .container-box  .paneDept{
    padding: 30px 40px;
    height: 100%;
    overflow: hidden;
  }
  .panel-box{
    position: relative;
  }
  .add-btn{
    position: absolute;
    top: 5px;
    left: 420px;
    height: 30px;
    padding: 0 15px;
    font-size: 12px;
    background: #36ccc5;
    line-height: 30px;
    z-index: 1;
    border: 0;
    border-radius: 5px;
  }
  .note{
    padding-top: 10px;
    height: 26px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 14px;
    color: #ff3333;
  }
  .reset{
    text-align: center;
  }
</style>
