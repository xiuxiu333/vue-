<template>
  <div class="comp-full-calendar">
    <!-- header pick month -->
    <fc-header :current-date="currentDate" :title-format="titleFormat"
               :first-day="firstDay"
               :month-names="monthNames"
               @change="emitChangeMonth">

      <div slot="header-left">
        <slot name="fc-header-left">
        </slot>
      </div>

      <div slot="header-right">
        <slot name="fc-header-right">
        </slot>
      </div>
    </fc-header>
    <!-- body display date day and events -->
    <fc-body :current-date="currentDate" :events="events" :month-names="monthNames" :week-names="weekNames"
             :first-day="firstDay"
             @eventclick="emitEventClick" @dayclick="emitDayClick"
             @moreclick="emitMoreClick">
      <!--<div slot="body-card">
        <slot name="fc-body-card">
        </slot>
      </div>-->
    </fc-body>
  </div>
</template>
<script type="text/babel">
import langSets from './dataMap/langSets'
import fcBody from './components/all/allBody'
import fcHeader from './components/all/header'

export default {
  props: {
    events: { // events will be displayed on calendar
      type: Array,
      default: () => {
        return []
      }
    },
    lang: {
      type: String,
      default: 'en'
    },
    firstDay: {
      type: Number | String,
      validator (val) {
        let res = parseInt(val)
        return res >= 0 && res <= 6
      },
      default: 0
    },
    titleFormat: {
      type: String,
      default () {
        return langSets[this.lang].titleFormat
      }
    },
    monthNames: {
      type: Array,
      default () {
        return langSets[this.lang].monthNames
      }
    },
    weekNames: {
      type: Array,
      default () {
        let arr = langSets[this.lang].weekNames
        return arr.slice(this.firstDay).concat(arr.slice(0, this.firstDay))
      }
    },
    currentDate: {}
  },
  data () {
    return {
    }
  },
  methods: {
    emitChangeMonth (start, end, currentStart, current) {
      this.currentDate = current
      this.$emit('changeMonth', start, end, currentStart)
    },
    emitEventClick (event, jsEvent, pos, date) {
      this.$emit('eventClick', event, jsEvent, pos, date)
    },
    emitDayClick (day, jsEvent) {
      this.$emit('dayClick', day, jsEvent)
    },
    emitMoreClick (day, events, jsEvent) {
      this.$emit('moreClick', day, event, jsEvent)
    }
  },
  components: {
    fcBody,
    fcHeader
  }
}
</script>
<style lang="scss" scoped>
  .comp-full-calendar {
    // font-family: "elvetica neue", tahoma, "hiragino sans gb";
    padding: 10px;
    background: #fff;
    margin: 10px;

    ul, p {
      margin: 0;
      padding: 0;
      font-size: 14px;
    }
  }
</style>
