<template>
  <div id='bookingSuccess'>
    <el-steps :space="200" :active="active" finish-status="success" align-center>
      <el-step v-for="(item, i) in steps" :key="i" :title="item.title"></el-step>
    </el-steps>
    <div class="center">恭喜！已定位，待审核通过后即可定位成功</div>
    <div class="center">您可以在客户详情中查看订单详情。<a href="">立即查看</a></div>
    <div class="center remark">提示：订位有效期为7*24小时，到期系统自动放位，随即冻结期3*24小时不可预定该媒体。</div>
  </div>
</template>

<script>
export default {
  name: 'bookingSuccess',
  data () {
    return {}
  },
  props: ['active', 'steps'],
  computed: {},
  methods: {},
  components: {},
  created () {
  }
}
</script>

<style lang="scss" scoped>
  #bookingSuccess{
    margin: 80px 20px;
    .center{
      text-align: center;
      margin: 20px 0;
      &.remark{
        color: red;
      }
    }
  }
</style>
