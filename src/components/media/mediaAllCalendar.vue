<template>
  <div class="calendar">
    <div class="calendar-title">
      <div>
        <el-button @click="changeYear(2)" size="mini" type="primary" icon="el-icon-arrow-left" circle></el-button>
        <span class="calendar-year">
        {{currentDate.getFullYear()}}年
      </span>
        <span>
        <el-button @click="changeYear(1)" size="mini" type="primary" icon="el-icon-arrow-right" circle></el-button>
      </span>
      </div>
      <div class="remark">
        <span class="remark-item"><span class="remark-color is-reserved"></span><span class="remark-text">预定</span></span>
        <span class="remark-item"><span class="remark-color is-locked"></span><span class="remark-text">锁位</span></span>
        <span class="remark-item"><span class="remark-color is-publish"></span><span class="remark-text">上刊</span></span>
      </div>
    </div>

    <div class="calender-lists">
      <div class="calender-item" v-for="(item,i) in dateList" :key="i" @click="eventMore(item.date)">
        <full-calendar class="test-fc" :events="fcEvents"
                       first-day='1'
                       lang='ch'
                       :monthNames="monthNames"
                       :dayNames="dayNames"
                       :currentDate="item.date"
                       @changeMonth="changeMonth"
                       @eventClick="eventClick"
                       @eventMouseover="eventMouseover"
                       @eventMouseout="eventMouseout"
                       @dayClick="dayClick"
                       @moreClick="moreClick">
        </full-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import allCalendar from '../calender/allCalendar'

export default {
  data () {
    return {
      fcEvents: [],
      monthNames: [
        '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
      ],
      dayNames: [
        '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
      ],
      currentDate: new Date()
    }
  },
  computed: {
    dateList () {
      let dt = new Date(this.currentDate)
      let arr = []
      for (let i = 0; i < 12; i++) {
        arr.push({date: new Date(dt.setMonth(i))})
      }
      return arr
    }
  },
  methods: {
    changeYear (type) {
      let num
      type === 1 ? num = 1 : num = -1
      let dt = new Date(this.currentDate)
      this.currentDate = new Date(dt.setYear(dt.getFullYear() + num))
      console.log(this.currentDate)
    },
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
    }, // 日历详情
    eventMore (date) {
      this.$router.push({
        path: '/mediaSchedule',
        query: {
          mediaID: this.$route.query.mediaID,
          mediaCode: this.$route.query.mediaCode,
          mediaName: this.$route.query.mediaName,
          date: date.toString()
        }
      })
    }
  },
  components: {
    'full-calendar': allCalendar
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang="scss" scoped>
  .calendar {
    font-size: 14px;
    background: #fff;
    padding: 20px 10px;
    position: relative;

    .calendar-title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      .calendar-year {
        font-size: 20px;
        margin: 0 10px;
      }
    }

    .remark {
      margin-left: 100px;
      .remark-item {
        margin: 0 10px;
        .remark-color {
          display: inline-block;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          margin: 0 5px;

          &.is-reserved {
            background-color: #fef7d8;
          }

          &.is-locked {
            background-color: #f8dbda;
          }

          &.is-publish {
            background-color: #d9efff;
          }
        }
      }
    }

    .calender-lists {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .calender-item {
        width: 25%;
      }
    }
  }
</style>
