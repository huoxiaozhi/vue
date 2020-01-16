<template>
  <div class="dashboard-container">
    <div class="dashboard-text1">{{hourstip}},</div>
    <div class="dashboard-text1">{{name}}</div>
    <!-- <div class="dashboard-text" align="center">{{ nowDate + ' ' + nowTime + ' ' + nowWeek }}</div>
    <div class="dashboard-text1" align="center">{{hourstip}},{{name }}</div>
    <div class="dashboard-text2" align="center">欢迎使用国科大选课系统</div> -->
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        nowDate: "", // 当前日期
        nowTime: "", // 当前时间
        nowWeek: "" ,// 当前星期
        hourstip:""
      };
    },
    methods: {
      currentTime() {
        setInterval(this.getDate, 500);
      },
      getDate: function() {
        var _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        let week = new Date().getDay();
        let hh = new Date().getHours();
        let mf =
          new Date().getMinutes() < 10 ?
          "0" + new Date().getMinutes() :
          new Date().getMinutes();
        if (hh >= 0 && hh < 8) {
          this.hourstip = "早上好";
        } else if (hh >= 8 && hh < 12) {
          this.hourstip = "上午好";
        } else if (hh >= 12 && hh < 18) {
          this.hourstip = "下午好";
        } else {
          this.hourstip = "晚上好";
        }
        if (week == 1) {
          this.nowWeek = "星期一";
        } else if (week == 2) {
          this.nowWeek = "星期二";
        } else if (week == 3) {
          this.nowWeek = "星期三";
        } else if (week == 4) {
          this.nowWeek = "星期四";
        } else if (week == 5) {
          this.nowWeek = "星期五";
        } else if (week == 6) {
          this.nowWeek = "星期六";
        } else {
          this.nowWeek = "星期日";
        }
        _this.nowTime = hh + ":" + mf;
        _this.nowDate = yy + "/" + mm + "/" + dd;
      }
    },
    mounted() {
      this.currentTime();
    },
    // 销毁定时器
    beforeDestroy: function() {
      if (this.getDate) {
        console.log("销毁定时器")
        clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      // line-height: 46px;
      padding: 10px;
    }

    &-text1 {
      font-size: 50px;
      // line-height: 46px;
      padding: 10px;
    }

  }
</style>
