<template>
  <div class="media-add">
    <div class="title" style="line-height: 70px;">新增媒体</div>
    <baseInfo v-if="stepStatus" :type="type" :baseinfoList="baseinfoList" @goNext="goNext"></baseInfo>
    <mediaAttribute v-else :nextInfo="nextInfo" :attList="attList" @goBaseInfo="goBaseInfo" @saveInfo="saveInfo"></mediaAttribute>
  </div>
</template>

<script>
import baseInfo from './comments/baseInfo'
import mediaAttribute from './comments/mediaAttribute'
export default {
  name: '',
  data () {
    return {
      haveCreated: false,
      // 1修改 2新增
      type: 2,
      stepStatus: true,
      baseinfoList: {
        mediaCode: '',
        name: '',
        cityID: '',
        routeID: '',
        stationID: '',
        direction: '',
        packageOwned: '',
        isExclusive: '',
        mediaForm: '',
        type: '',
        mediaFee: null,
        fabricationFee: null,
        position: '',
        direct: '',
        area: ''
      },
      nextInfo: {
      },
      attList: {
        actualHeight: '',
        actualWidth: '',
        craftOfMake: '',
        designHeight: '',
        designWidth: '',
        floor: '',
        orientation: true,
        package: true,
        passengerFlow: '',
        photo: '',
        remark: '',
        saleNum: 0,
        saleUnit: '',
        sides: 0,
        status: true,
        visualHeight: 0,
        visualWidth: 0,
        lightEnd: '',
        lightStart: ''
      }
    }
  },
  computed: {},
  methods: {
    // 保存基本信息
    goNext (baseinfoList) {
      if (this.haveCreated) {
        this.stepStatus = false
      } else {
        this.$http({
          url: 'media/create',
          method: 'POST',
          dataType: 'JSON',
          data: baseinfoList
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
            this.nextInfo = data
            this.stepStatus = false
            this.haveCreated = true
          }
        })
      }

    },
    // 保存媒体属性
    saveInfo (formData) {
      this.$http({
        url: '/media/createMaterials',
        method: 'POST',
        contentType: 'multipart/form-data',
        dataType: 'JSON',
        data: formData
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.$message({
            message: '执行成功',
            type: 'success'
          })
          this.$router.push('/media')
        }
      })
    },
    goBaseInfo () {
      this.stepStatus = true
    }
  },
  components: {
    baseInfo,
    mediaAttribute
  }
}
</script>

<style scoped>
  .media-add{
    padding:0 30px;
  }
  .media-add .title {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;

  }

</style>
