<template>
  <div id='calendars'>
    <el-row class="table-head" type="flex" justify="center">
      <div class="month">
        <el-button @click="changeMonth(1)" size="mini" type="primary" icon="el-icon-arrow-left" circle></el-button>
        <span>
            {{today|months}}
          <el-button @click="changeMonth(2)" size="mini" type="primary" icon="el-icon-arrow-right" circle></el-button>
         </span>
      </div>
      <div class="remark">
        <span class="remark-item"><span class="remark-color is-reserved"></span><span
          class="remark-text">预定</span></span>
        <span class="remark-item"><span class="remark-color is-locked"></span><span class="remark-text">锁位</span></span>
        <span class="remark-item"><span class="remark-color is-publish"></span><span
          class="remark-text">上刊</span></span>
      </div>
    </el-row>
    <div class="table-warp" ref="dates">
      <table border="">
        <tr>
          <th rowspan="2" class="name">名称</th>
          <th v-for="(item,i) in currentDateList" :key="i" :colspan="item.monthLength.length"> {{item.date|months}}</th>
        </tr>
        <tr>
          <th v-for="(item,i) in currentDateList[0].monthLength" :key="'0'+i">{{item.date.getDate()}}</th>
        </tr>
        <tr v-for="(lists,i) in mediaInfo" :key="i">
          <td class="name" style="width: 200px">
            <el-popover
              placement="right"
              trigger="hover">
              <div>
                <p>媒体位置：{{lists.info.position}}</p>
                <p>套装形式：{{lists.info.mediaForm}}</p>
                <p>媒体等级：{{lists.info.rank}}</p>
                <p>媒体制作费：{{lists.info.fabricationFee}}</p>
                <p>媒体刊例价：{{lists.info.mediaFee}}</p>
              </div>
              <el-button size="mini" type="text" slot="reference">{{lists.info.name}}{{lists.info.mediaCode}}
              </el-button>
            </el-popover>
          </td>
          <td v-for="(item,j) in lists.dateEvents[0].monthLength" :key="'0'+j"  @click="tdClick(item,i,j)">
            <!--<div class="td-item" @mouseenter="dayClick(item, $event)" @mouseleave="eventMore = false" :class="[dayEventsStatus(item.events)]"  ></div>-->
            <el-popover
              v-if="item.events.length > 0"
              placement="bottom"
              trigger="hover"
              width="300">
              <div class="events-detail">
                <div class="event-header"><i class="el-icon-date"></i> {{item.date | day}}</div>
                <div class="event-center">
                  <div class="event-list" v-for="(event,i) in item.events" :key="i" v-show="event.isShow"
                       @click="eventDetail(item)">
                    <div class="events-title">{{event.title}}</div>
                    <div class="events-time"> <i class="el-icon-time"></i> {{event.start|yyyy}}-{{event.end|yyyy}}</div>
                    <div class="events-name"> <i class="el-icon-location-outline"></i> {{event.YOUR_DATA}}</div>
                  </div>
                </div>
              </div>
              <div slot="reference" class="td-item" :class="[dayEventsStatus(item.events)]"></div>
            </el-popover>
            <div v-else></div>
          </td>
        </tr>
        <tr v-if="scheduleList.length===0">
          <td :colspan="currentDateList[0].monthLength.length + 1">暂无数据</td>
        </tr>
      </table>
    </div>
    <el-dialog
      title="订位"
      :visible.sync="localtionVisible"
      :close-on-click-modal="false"
    >
      <div>
        <el-button type="primary" plain size="small" @click="checkMediaIfAvailable">保存</el-button>
        <el-form ref="form" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="公司名称：">
                <el-select v-model="clientID" @change="getClientDetailByID" filterable clearable placeholder="公司名称">
                  <el-option
                    v-for="item in clientList"
                    :key="item.clientid"
                    :label="item.name"
                    :value="item.clientid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="品牌：">
                <el-input
                  placeholder="品牌"
                  v-model="brand"
                  :disabled="clientID ? false : true">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="销售人员：">
                <el-select v-model="salesID" :disabled="clientID ? false : true" filterable clearable placeholder="销售">
                  <el-option
                    v-for="item in salesList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="联系人：">
                <el-select v-model="contactID" @change="getTelphone" :disabled="clientID ? false : true" filterable
                           clearable
                           placeholder="联系人">
                  <el-option
                    v-for="item in contacts"
                    :key="item.contactID"
                    :label="item.name"
                    :value="item.contactID">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="电话：">
                <el-input
                  placeholder="请输入内容"
                  v-model="telephone"
                  :disabled="true">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="媒体信息:">
            <div style="width: 80%;height: 200px;border: #6f7180 solid 1px;padding: 5px">
              <div v-for="(item,i) in mediaList" :key="i">编号：{{item.mediaCode}} 媒体名称：{{item.mediaName}}
                <el-date-picker
                  size="mini"
                  v-model="item.dateArr"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import dateFunc from './components/dateFunc'

  export default {
    name: '',
    props: ['scheduleList', 'monthLengths'],
    data () {
      return {
        today: new Date(),
        lists: this.scheduleList,
        localtionVisible: false,
        selectDay: {},
        eventMore: false,
        morePos: {
          top: 0,
          left: 0
        },
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
    computed: {
      currentDateList () {
        return this.currentDateLists([], this.today)
      },
      mediaInfo () {
        return this.getMediaList(this.scheduleList, this.today)
      }
    },
    watch: {
      scheduleList: {
        handler (newValue, oldValue) {
          if (newValue.length !== oldValue.length) {
            this.scheduleList = newValue
          }
        },
        deep: true
      }
    },
    methods: {
      // 下单前校验
      checkMediaIfAvailable () {
        if (!this.mediaList[0].dateArr[1] || !this.mediaList[0].dateArr[0]) {
          this.$message.warning('请完善信息')
          return
        }
        this.$http({
          url: 'booking/checkMediaIfAvailable',
          method: 'POST',
          dataType: 'JSON',
          data: {
            clientID: this.clientID,
            salesID: this.salesID,
            contactID: this.contactID,
            brand: this.brand,
            bookingMediasSet: [{
              mediaID: this.$route.query.mediaID,
              mediaCode: this.$route.query.mediaCode,
              mediaName: this.$route.query.mediaName,
              endDate: this.mediaList[0].dateArr[1],
              startDate: this.mediaList[0].dateArr[0]
            }
            ]
          }
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
            this.newBooking()
          } else {
            this.$message.error('状态错误')
          }
        }, (error) => {
          this.$message.error(error)
        })
      },
      // 保存新增数据
      newBooking () {
        this.$http({
          url: 'booking/checkMediaIfAvailable',
          method: 'POST',
          dataType: 'JSON',
          data: {
            clientID: this.clientID,
            salesID: this.salesID,
            contactID: this.contactID,
            brand: this.brand,
            bookingMediasSet: [{
              mediaID: this.$route.query.mediaID,
              mediaCode: this.$route.query.mediaCode,
              mediaName: this.$route.query.mediaName,
              endDate: this.mediaList[0].dateArr[1],
              startDate: this.mediaList[0].dateArr[0]
            }
            ]
          }
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
            this.$message.success('预定成功')
            this.localtionVisible = false
          } else {
            this.$message.error('状态错误')
          }
        }, (error) => {
          this.$message.error(error)
        })
      },
      getInfo () {
        this.$http({
          url: 'booking/newBooking',
          method: 'POST',
          dataType: 'JSON',
          data: {}
        }).then(res => {
          let {data} = res
          if (data.status === 0) {
            this.clientList = data.data.clientList
          } else {
            this.$message.error('状态错误')
          }
        }, (error) => {
          console.log(error)
          this.$message.error('访问失败')
        })
      },
      // 根据客户ID获取品牌联系人等信息
      getClientDetailByID () {
        if (this.clientID) {
          this.$http({
            url: 'booking/getClientDetailByID',
            method: 'POST',
            dataType: 'JSON',
            data: {
              clientID: this.clientID
            }
          }).then(res => {
            let {data} = res
            if (data.status === 0) {
              this.salesList = data.data.salesList
              this.contacts = data.data.contacts
              this.brand = data.data.clientInfo.brand
              this.salesID = data.data.clientInfo.salesID
            } else {
              this.$message.error('状态错误')
            }
          }, (error) => {
            this.$message.error(error)
          })
        }
      },
      // 获取电话
      getTelphone () {
        if (this.contactID) {
          for (let i = 0; i < this.contacts.length; i++) {
            if (this.contactID = this.contacts[i].contactID) {
              this.telephone = this.contacts[i].telephone
              return
            }
          }
        }
      },
      computePos (target) {
        let eventRect = target.getBoundingClientRect()
        let pageRect = this.$refs.dates.getBoundingClientRect()
        return {
          left: eventRect.left,
          top: eventRect.top
        }
      },
      dayClick (day, jsEvent) {
        if (day.events.length > 0) {
          this.selectDay = day
          this.eventMore = true
          this.morePos = this.computePos(event.target)
          this.morePos.top += 20
          this.$emit('dayclick', day, jsEvent)
        } else {
          // this.eventDetail(day.date)
        }
      },
      eventDetail (date) {
        this.mediaList[0].dateArr = [date, '']
        this.eventMore = false
        this.getInfo()
        this.localtionVisible = true
      },
      currentDateLists (events, date) {
        let arr = []
        let dt = new Date(this.today)
        for (let i = 0; i < this.monthLengths; i++) {
          let d = new Date(dt)
          if (i !== 0) {
            d = new Date(dt.setMonth(dt.getMonth() + 1))
          }
          let arrItem = this.getMonthLength(events, new Date(d))
          arr.push({
            'monthLength': arrItem,
            'date': new Date(d)
          })
        }
        return arr
      },
      getMediaList (list, date) {
        let arr = []
        for (let i = 0; i < this.scheduleList.length; i++) {
          arr.push({
            info: this.scheduleList[i],
            dateEvents: this.currentDateLists(this.scheduleList[i].mediaSchedules)
          })
        }
        return arr
      },
      getMonthLength (events, date) {
        let d = new Date(date)
        // 将日期设置为下月一号
        d.setMonth(d.getMonth() + 1)
        d.setDate('1')
        // 获取本月最后一天
        d.setDate(d.getDate() - 1)
        let monthLength = []
        for (let i = 0; i < d.getDate(); i++) {
          let dt = new Date(d.toString()).setDate(i + 1)
          monthLength.push({
            'date': new Date(dt),
            'events': this.slotEvents(new Date(dt), events)
          })
        }
        return monthLength
      },
      slotEvents (date, events) {
        if (events.length < 1) {
          return false
        }
        // find all events start from this date
        let thisDayEvents = events.filter(day => {
          let dt = new Date(day.start)
          let st = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())
          let ed = day.end ? new Date(day.end) : st
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
      changeMonth (type) {
        let d = new Date(this.today)
        //  上个月
        if (type === 1) {
          d.setMonth(d.getMonth() - this.monthLengths)
        } else {
          d.setMonth(d.getMonth() + this.monthLengths)
        }
        this.today = new Date(d)
      },
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
      tdClick(e,i,j){
        console.log(e)
        console.log(i)
        console.log(j)
      }
    },
    created () {
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .td-item {
    width: 25px;
    height: 25px;
    margin: auto;
    /*border-radius: 50%;*/
  }

  .table-head {
    margin-bottom: 20px;
    align-items: center;

    .month {
      font-size: 20px;
    }

    .el-button--mini.is-circle {
      padding: 2px;
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
          background-color: #21cca5;
        }

        &.is-locked {
          background-color: #fd4747;
        }

        &.is-publish {
          background-color: #45a7f3;
        }
      }
    }
  }

  .table-warp {
    width: 100%;
    height: 500px;
    overflow: auto;

    table {
      border-collapse: collapse;
      text-align: center;
      border: 1px solid #f3f3f2;
      width: 100%;

      td, th {
        width: 40px;
        height: 40px;

        &.name {
          padding: 0 10px;
          /*min-width: 100px;*/
        }
      }

      td {
        /*1-订位 is-reserved #ffc600  3-锁位 is-locked #ed2020  4-上刊 is-publish #0092ff */
        .is-reserved {
          background-color: #21cca5;
        }

        .is-locked {
          background-color: #fd4747;
        }

        .is-publish {
          background-color: #45a7f3;
        }
      }

      .month {
        vertical-align: center;
        margin: 10px;
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
</style>
