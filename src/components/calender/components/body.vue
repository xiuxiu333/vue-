<template>
  <div class="full-calendar-body">
    <div class="weeks">
      <strong class="week" v-for="(week,i) in weekNames" :key="i">{{week}}</strong>
    </div>
    <div class="dates" ref="dates">
      <div class="dates-bg">
        <div class="week-row" v-for="(week,i) in currentDates" :key="i">
          <div class="day-cell" v-for="(day,i) in week" :key="i"
               :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}">
            <p class="day-number">{{day.monthDay}}</p>
          </div>
        </div>
      </div>
      <!-- absolute so we can make dynamic td -->
      <div class="dates-events">
        <div class="events-week" v-for="(week,i) in currentDates" :key="i">
          <div class="events-day" v-for="(day,i) in week" :key="i" track-by="$index"
               :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}" @click.stop="dayClick(day, $event)">
            <p class="day-number">{{day.monthDay}}</p>
            <div class="event-box">
              <div v-for="(event,i) in day.events" :key="i">
                <el-popover
                  placement="bottom"
                  trigger="hover"
                  width="300">
                  <div class="events-detail">
                    <div class="event-header"><i class="el-icon-date"></i> {{day.date | day}}</div>
                    <div class="event-center">
                      <div class="event-list" v-show="event.isShow"
                           @click="eventDetail(event)">
                        <div class="events-title">{{event.title}}</div>
                        <div class="events-time"><i class="el-icon-time"></i> {{event.start|yyyy}}-{{event.end|yyyy}}
                        </div>
                        <div class="events-name"><i class="el-icon-location-outline"></i> {{event.YOUR_DATA.name}}</div>
                      </div>
                    </div>
                  </div>
                  <p class="event-item" v-show="event.cellIndex <= eventLimit"
                     slot="reference"
                     :class="[classNames(event.type), {
                  'is-start'   : isStart(event.start, day.date),
                  'is-end'     : isEnd(event.end,day.date),
                  'is-opacity' : !event.isShow
                  }]">
                    {{isBegin(event, day.date, day.weekDay)}}
                  </p>
                </el-popover>
              </div>

              <p v-if="day.events.length > eventLimit"
                 class="more-link">
                ...
              </p>
            </div>
          </div>
        </div>
      </div>
      <slot name="body-card">

      </slot>

    </div>
    <el-dialog title="订位" :visible.sync="localtionVisible" :close-on-click-modal="false">
      <booking @closeVisible="closeVisible" @clearSelectMediaLists="clearSelectMediaLists"
               :mediaList="mediaList"></booking>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
import dateFunc from './dateFunc'
import booking from './booking'

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
      selectDay: {},
      clientList: [],
      salesList: [],
      contacts: [],
      saleName: '',
      telephone: '',
      clientID: '',
      salesID: '',
      contactID: '',
      brand: '',
      mediaList: [{
        mediaID: this.$route.query.mediaID,
        mediaCode: this.$route.query.mediaCode,
        mediaName: this.$route.query.mediaName,
        startDate: '',
        endDate: '',
        dateArr: []
      }]
    }
  },
  components: {
    booking
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
    // 关闭弹框
    closeVisible (data) {
      this[data] = false
    },
    // 清空选定媒体
    clearSelectMediaLists () {
      this.mediaList = []
    },
    eventDetail (date) {
      console.log(this.mediaList)
      this.mediaList[0].dateArr = [date, '']
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
    classNames (type) {
      // /*1-订位 is-reserved #ffc600  3-锁位 is-locked #ed2020  4-上刊 is-publish #0092ff */
      switch (type) {
        case 1:
          return 'is-reserved'
        case 3:
          return 'is-locked'
        case 4:
          return 'is-publish'
      }
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
        if (thisDayEvents[i].type === 1 || thisDayEvents[i].type === 3 || thisDayEvents[i].type === 4) {
          thisDayEvents[i].isShow = true
        }
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
      if (day.events.length > 0) {
        this.selectDay = day
        this.eventMore = true
        this.morePos = this.computePos(event.target)
        this.morePos.top -= 20
        this.$emit('dayclick', day, jsEvent)
      } else {
        this.eventDetail(day.date)
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
    margin-top: 20px;

    .weeks {
      display: flex;
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      border-left: 1px solid #e0e0e0;

      .week {
        flex: 1;
        text-align: center;
        border-right: 1px solid #e0e0e0;
      }
    }

    .dates {
      position: relative;

      .week-row {
        // width: 100%;
        // position:absolute;
        border-left: 1px solid #e0e0e0;
        display: flex;

        .day-cell {
          flex: 1;
          min-height: 100px;
          padding: 4px;
          border-right: 1px solid #e0e0e0;
          border-bottom: 1px solid #e0e0e0;

          .day-number {
            text-align: right;
          }

          &.today {
            background-color: #fcf8e3;
          }

          &.not-cur-month {
            .day-number {
              color: rgba(0, 0, 0, .24);
            }
          }
        }
      }

      .dates-events {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;

        .events-week {
          display: flex;

          .events-day {
            cursor: pointer;
            flex: 1;
            min-height: 109px;
            overflow: hidden;
            text-overflow: ellipsis;

            .day-number {
              text-align: right;
              padding: 4px 5px 4px 4px;
              opacity: 0;
            }

            &.not-cur-month {
              .day-number {
                color: rgba(0, 0, 0, .24);
              }
            }

            .event-box {
              .event-item {
                cursor: pointer;
                font-size: 12px;
                margin-bottom: 2px;
                color: rgba(0, 0, 0, .87);
                padding: 0 0 0 4px;
                height: 18px;
                line-height: 18px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                &.is-reserved {
                  background-color: #fef7d8;
                }

                &.is-locked {
                  background-color: #f8dbda;
                }

                &.is-publish {
                  background-color: #d9efff;
                }

                &.is-start {
                  margin-left: 4px;
                  // border-top-left-radius:4px;
                  // border-bottom-left-radius:4px;
                }

                &.is-end {
                  margin-right: 4px;
                  // border-top-right-radius:4px;
                  // border-bottom-right-radius:4px;
                }

                &.is-opacity {
                  opacity: 0;
                }
              }

              .more-link {
                cursor: pointer;
                // text-align: right;
                padding-left: 8px;
                padding-right: 2px;
                color: rgba(0, 0, 0, .38);
                font-size: 14px;
              }
            }
          }
        }
      }
      .events-detail {
        width: 300px;
        padding: 5px;
        background: #fff;
        font-size: 14px;

        .event-header {
          color: black;
          i {
            vertical-align: middle;
          }

          height: 30px;
          vertical-align: middle;
          margin: 5px;

          .el-icon-close {
            font-size: 10px;
          }

          .el-button--mini.is-circle {
            float: right;
            padding: 3px;
          }
        }

        .event-center {
          max-height: 240px;
          overflow: auto;
          margin-bottom: 5px;

          .event-list {
            background: #f9fbfc;
            margin-bottom: 5px;
            padding: 5px;
          }
        }

      }
    }
  }
</style>
