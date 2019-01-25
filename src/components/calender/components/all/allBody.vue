<template>
  <div class="full-calendar-body">
    <div class="weeks">
      <span class="week" v-for="(week,i) in weekNames" :key="i">{{week}}</span>
    </div>
    <div class="dates" ref="dates">
      <div class="dates-bg">
        <div class="week-row" v-for="(week,i) in currentDates" :key="i">
          <div class="day-cell" v-for="(day,i) in week" :key="i"
               :class="[dayEventsStatus(day.events),
               {'not-cur-month' : !day.isCurMonth}
               ]">
            <p class="day-number">{{day.monthDay}}</p>
          </div>
        </div>
      </div>
      <slot name="body-card">

      </slot>
    </div>
  </div>
</template>
<script type="text/babel">
import dateFunc from '../dateFunc'

export default {
  props: {
    currentDate: {},
    events: {},
    weekNames: {
      type: Array,
      default: () => {
        return []
      }
    },
    monthNames: {},
    firstDay: {}
  },
  created () {
    this.events.forEach((item, index) => {
      item._id = item.id || index
      item.end = item.end || item.start
    })
    // this.events = events
  },
  data () {
    return {
      // weekNames : DAY_NAMES,
      localtionVisible: false,
      weekMask: [1, 2, 3, 4, 5, 6, 7],
      // events : [],
      isLismit: true,
      eventLimit: 3,
      showMore: false,
      dayMore: false,
      eventMore: false,
      morePos: {
        top: 0,
        left: 0
      },
      selectDay: {}
    }
  },
  watch: {
    weekNames (val) {
      console.log('watch weekNames', val)
    }
  },
  computed: {
    currentDates () {
      return this.getCalendar()
    }
  },
  methods: {
    // 判断当天状态
    dayEventsStatus (events) { //  1-订位 is-reserved #ffc600  3-锁位 is-locked #ed2020  4-上刊 is-publish #0092ff
      let flag = ''
      for (let i = 0; i < events.length; i++) {
        if (events[i].type === 1) {
          if (!flag) {
            flag = 'is-reserved'
          }
        } else if (events[i].type === 3) {
          if (!flag || flag === 'is-reserved') {
            flag = 'is-locked'
          }
        } else if (events[i].type === 4) {
          if (!flag || flag === 'is-reserved' || flag === 'is-locked') {
            flag = 'is-publish'
          }
        }
      }
      return flag
    },
    eventDetail () {
      this.eventMore = false
      this.localtionVisible = true
    },
    isBegin (event, date, index) {
      let st = new Date(event.start)

      if (index === 0 || st.toDateString() === date.toDateString()) {
        return event.title
      }
      return '　'
    },
    moreTitle (date) {
      let dt = new Date(date)
      return this.weekNames[dt.getDay()] + ', ' + this.monthNames[dt.getMonth()] + dt.getDate()
    },
    classNames (cssClass) {
      if (!cssClass) return ''
      // string
      if (typeof cssClass === 'string') return cssClass

      // Array
      if (Array.isArray(cssClass)) return cssClass.join(' ')

      // else
      return ''
    },
    getCalendar () {
      // calculate 2d-array of each month
      // first day of this month
      let now = new Date() // today
      let current = new Date(this.currentDate)

      let startDate = dateFunc.getStartDate(current) // 1st day of this month

      let curWeekDay = startDate.getDay()

      // begin date of this table may be some day of last month
      let diff = parseInt(this.firstDay) - curWeekDay
      diff = diff > 0 ? (diff - 7) : diff

      startDate.setDate(startDate.getDate() + diff)
      let calendar = []

      for (let perWeek = 0; perWeek < 6; perWeek++) {

        let week = []

        for (let perDay = 0; perDay < 7; perDay++) {
          week.push({
            monthDay: startDate.getDate(),
            isToday: now.toDateString() === startDate.toDateString(),
            isCurMonth: startDate.getMonth() === current.getMonth(),
            weekDay: perDay,
            date: new Date(startDate),
            events: this.slotEvents(startDate)
          })
          startDate.setDate(startDate.getDate() + 1)
          // if (startDate.toDateString() == endDate.toDateString()) {
          //   isFinal = true
          //   break
          // }
        }
        calendar.push(week)
        // if (isFinal) break
      }
      return calendar
    },
    slotEvents (date) {
      // find all events start from this date
      let thisDayEvents = this.events.filter(day => {
        let dt = new Date(day.start)
        let st = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())
        let ed = day.end ? new Date(day.end) : st
        // console.log('slotEvt', st, ed, date)
        return date >= st && date <= ed
      })
      // sort by duration
      thisDayEvents.sort((a, b) => {
        if (!a.cellIndex) return 1
        if (!b.cellIndex) return -1
        return a.cellIndex - b.cellIndex
      })
      // mark cellIndex and place holder
      for (let i = 0; i < thisDayEvents.length; i++) {
        thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1)
        thisDayEvents[i].isShow = true
        if (thisDayEvents[i].cellIndex === i + 1 || i > 2) continue
        thisDayEvents.splice(i, 0, {
          title: 'holder',
          cellIndex: i + 1,
          start: dateFunc.format(date, 'yyyy-MM-dd'),
          end: dateFunc.format(date, 'yyyy-MM-dd'),
          isShow: false
        })
      }
      return thisDayEvents
    },
    isStart (eventDate, date) {
      let st = new Date(eventDate)
      return st.toDateString() === date.toDateString()
    },
    isEnd (eventDate, date) {
      let ed = new Date(eventDate)
      return ed.toDateString() === date.toDateString()
    },
    selectThisDay (day, jsEvent) {
      this.selectDay = day
      this.showMore = true
      this.morePos = this.computePos(event.target)
      this.morePos.top -= 100
      let events = day.events.filter(item => {
        return item.isShow === true
      })
      this.$emit('moreclick', day.date, events, jsEvent)
    },
    computePos (target) {
      let eventRect = target.getBoundingClientRect()
      let pageRect = this.$refs.dates.getBoundingClientRect()
      return {
        left: eventRect.left - pageRect.left,
        top: eventRect.top + eventRect.height - pageRect.top
      }
    },
    dayClick (day, jsEvent) {
      console.log(day)
      if (day.events.length > 0) {
        this.selectDay = day
        this.eventMore = true
        this.morePos = this.computePos(event.target)
        this.morePos.top -= 20
        this.$emit('dayclick', day, jsEvent)
      } else {
        this.eventDetail()
      }
    },
    eventClick (events, date, jsEvent) {
      if (!events.isShow) {
        return
      }
      this.selectDay.events = [events]
      this.selectDay.date = date
      this.eventMore = true
      this.morePos = this.computePos(event.target)
      jsEvent.stopPropagation()
      let pos = this.computePos(jsEvent.target)
      this.$emit('eventclick', events, jsEvent, pos, date)
    }
  }
}
</script>
<style lang="scss" scoped>
  .full-calendar-body {
    margin-top: 10px;

    .weeks {
      display: flex;
      border-top: 1px solid #ebeff3;
      border-bottom: 1px solid #ebeff3;
      border-left: 1px solid #ebeff3;

      .week {
        flex: 1;
        text-align: center;
        border-right: 1px solid #ebeff3;
        background: #f9f9f9;
        color: #989898;
        padding: 5px 10px;
      }
    }

    .dates {
      position: relative;

      .week-row {
        border-left: 1px solid #ebeff3;
        display: flex;

        .day-cell {
          flex: 1;
          padding: 4px;
          border-right: 1px solid #ebeff3;
          border-bottom: 1px solid #ebeff3;

          .day-number {
            text-align: center;
          }

          &.today {
            background-color: #fcf8e3;
          }
          /*1-订位 is-reserved #ffc600  3-锁位 is-locked #ed2020  4-上刊 is-publish #0092ff */
          &.is-reserved {
            background-color: #fef7d8;
          }
          &.is-locked {
            background-color: #f8dbda;
          }
          &.is-publish {
            background-color: #d9efff;
          }
          &.not-cur-month {
            .day-number {
              color: rgba(0, 0, 0, .24);
            }
          }
        }
      }

    }
  }
</style>
