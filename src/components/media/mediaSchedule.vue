<template>
  <div class="mediaSchedule">
    <div class="calendar">
      <full-calendar class="test-fc" :events="fcEvents"
                     first-day='1'
                     lang='zh'
                     :currentDate="currentDate"
                     :monthNames="monthNames"
                     :dayNames="dayNames"
                     @changeMonth="changeMonth"
                     @eventClick="eventClick"
                     @eventMouseover="eventMouseover"
                     @eventMouseout="eventMouseout"
                     @dayClick="dayClick"
                     @moreClick="moreClick">
      </full-calendar>
    </div>
  </div>
</template>

<script>
import fullCalendar from '../calender/fullCalendar'

export default {
  data () {
    return {
      currentDate: new Date(this.$route.query.date),
      fcEvents: [],
      monthNames: [
        '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
      ],
      dayNames: [
        '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
      ],
      // <!-- 点击日历中每一天的弹出框里的数据 从后台获取 -->
      formLocation: {
        name: ''
      },
      //    向后台提交的点击每天弹框里的数据
      form: {
        name: '',
        code: ''
      },
      //    点击每天的弹框
      locationVisible: false
      //    formLabelWidth: '100px'
    }
  },
  methods: {
    // 切换月份时触发
    changeMonth (start, end, current) {
    },
    // 点击某个日历事件时触发
    eventClick (event, jsEvent, pos, date) {
    },
    eventMouseover: function (event, jsEvent, view) {
    },
    eventMouseout (event, jsEvent, view) {
    },
    // 点击某一天触发
    dayClick (day, jsEvent) {
    },
    moreClick (day, events, jsEvent) {
    },
    getInfo () {
      this.$http({
        url: 'media/singleMediaCalendar',
        method: 'POST',
        dataType: 'JSON',
        data: {
          mediaID: this.$route.query.mediaID
        }
      }).then(res => {
        let {data} = res
        if (data.status === 0) {
          this.fcEvents = data.list
        } else {
          this.$message.error('状态错误')
        }
      }, (error) => {
        console.log(error)
        this.$message.error('访问失败')
      })
    }
  },
  components: {
    'full-calendar': fullCalendar
  },
  created () {
    this.getInfo()
  }
}
</script>
<style scoped>
  .mediaSchedule {
    font-size: .16rem;
  }

  /* 面包屑导航 */
  .mediaSchedule .el-breadcrumb {
    padding: .25rem .3rem;
    font-size: .18rem;
    font-weight: 700 !important;
  }

  .full-calendar-body .dates .dates-events .events-week .events-day .event-box .locked {
    background: rgba(255, 0, 0, 0.6);
  }

  .is-start {
    border-top-left-radius: 9px;
    border-bottom-left-radius: 9px;
  }

  .is-end {
    border-top-right-radius: 9px;
    border-bottom-right-radius: 9px;
  }
</style>
