<template>
  <div>
    <div class="title">编辑媒体信息</div>
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
      // 1修改 2新增
      type: 1,
      mediaID: this.$route.query.mediaID ? this.$route.query.mediaID : '',
      stepStatus: true,
      baseinfoList: {
        code: '',
        mediaName: '',
        city: '',
        line: '',
        site: '',
        direction: '',
        mediaSuit: '',
        excMedia: '',
        mediaForm: '',
        mediaType: '',
        periodicalPrice: '',
        productionFee: '',
        mediaPosition: '',
        position: ''
      },
      nextInfo: {},
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
        visualWidth: 0
      }
    }
  },
  computed: {},
  methods: {
    // 保存基本信息
    goNext (baseinfoList) {
      baseinfoList.recordID = this.mediaID
      this.$http({
        url: 'media/edit',
        method: 'POST',
        dataType: 'JSON',
        data: baseinfoList
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.stepStatus = false
        }
      })
    },
    // 获取媒体素材管理基本信息
    toEditMaterial () {
      this.$http({
        url: 'media/toEditMaterial',
        method: 'POST',
        dataType: 'JSON',
        data: {mediaID: this.mediaID}
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.nextInfo.crafts = data.crafts
          this.attList = data.mediaMaterialInfo ? data.mediaMaterialInfo : {}
          this.attList.lightEnd = data.lightEnd ? data.lightEnd : ''
          this.attList.lightStart = data.lightStart ? data.lightStart : ''
        }
      })
    },
    // 保存媒体属性
    saveInfo (formData) {
      formData.recordID = this.mediaID
      this.$http({
        url: '/media/editMaterial',
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
    }, // 获取媒体基本信息
    toEdit () {
      this.$http({
        url: '/media/toEdit',
        method: 'POST',
        contentType: 'multipart/form-data',
        dataType: 'JSON',
        data: {mediaID: this.mediaID}
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.nextInfo.mediaCode = data.mediaInfo.mediaCode
          this.nextInfo.mediaName = data.mediaInfo.name
          this.nextInfo.mediaID = this.mediaID
          this.baseinfoList = data.mediaInfo
          this.baseinfoList.cityID = [data.mediaInfo.countryID, data.mediaInfo.regionID, data.mediaInfo.cityID]
        }
      })
    }
  },
  created () {
    this.toEdit()
    this.toEditMaterial()
  },
  components: {
    baseInfo,
    mediaAttribute
  }
}
</script>

<style scoped>
  .title {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }
</style>
