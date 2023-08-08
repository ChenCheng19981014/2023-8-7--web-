<style lang="scss" scoped>
.box {
  width: 100%;
  height: 94px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 34px;
  .box-left {
    width: 256px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-left {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: $light;
        .left-data {
          font-size: 20px;
          font-family: "number";
          color: $white;
          margin-left: 4px;
          font-weight: bold;
        }
        .left-title {
          margin-right: 4px;
          font-size: 14px;
          color: $light;
        }
      }
      .item-right {
        display: flex;
        align-items: center;
        .number {
          font-size: 28px;
          font-family: "number";
          font-weight: bolder;
          .unit {
            margin-left: 4px;
            font-size: 14px;
            font-weight: bo;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }
  .box-right {
    width: 75px;
    height: 72px;
    margin-left: 49px;
    background-image: url("../../../../../assets/common/finish.png");

    background-size: 100% 100%;
    .value {
      white-space: nowrap;
      font-size: 24px;
      letter-spacing: 2.24px;
      color: $white;
      line-height: 32px;
      width: 100%;
      font-weight: bolder;
      // padding-left: 7px;
      text-align: center;
      margin-top: 18px;
      span {
        font-weight: 400;
        font-size: 14px;
      }
    }
    .unit {
      width: 100%;
      text-align: right;
      padding-right: 10px;
      font-size: 14px;
      position: relative;
      top: -10px;
    }
  }
  .progress {
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    height: 8px;
    border-radius: 8px;
    background: rgb(14, 18, 28);
    .progress-main {
      height: 100%;
      border-radius: 8px;
      background: linear-gradient(to right, #0131c4, #00ff85);
    }
  }
}

.boxs {
  width: 100%;
  height: 430px;
  padding-top: 29.5px;
  overflow: hidden;
}
</style>

<template>
  <div class="ui">
    <div class="box" style="margin-bottom: 16px">
      <div class="box-left">
        <div class="item">
          <div class="item-left">复核进度</div>

          <div class="item-right">
            <div class="number">
              {{ event.per }}<span class="unit">%</span>
            </div>
          </div>
        </div>

        <div class="progress">
          <div class="progress-main" :style="`width:${event.per}%`"></div>
        </div>

        <div class="item">
          <div class="item-left">
            <div class="data">
              <span class="left-title">事件数量</span>
              <span class="left-data">10</span>
            </div>
          </div>
          <div class="item-left">
            <div class="data">
              <span class="left-title">已复核</span>
              <span class="left-data" style="color: #03fefe">5</span>
            </div>
          </div>
        </div>
      </div>
      <div class="box-right">
        <div class="value">{{ event.per }}<span>%</span></div>
        <div class="unit">准确率</div>
      </div>
    </div>
    <sub-title title="复核事件占比" style="margin-bottom: 30px"></sub-title>
    <rose-pie
      style="margin-bottom: 49px"
      :data="rosePieData"
      :color="[
        'rgba(0, 255, 133, 1)',
        'rgba(48, 131, 255, 1)',
        'rgba(179, 198, 238, 1)',
      ]"
    ></rose-pie>
    <custom-title title="事件闭环" style="margin-bottom: 24px"></custom-title>
    <sub-title title="事件处理排行"></sub-title>
    <div class="boxs">
      <!-- <scroll-wrap> -->
      <specular-rank :data="rankData"> </specular-rank>
      <!-- </scroll-wrap> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: String,
  },
  watch: {
    time() {
      this.loadData();
    },
  },
  data() {
    return {
      event: {
        per: 50,
      },
      rosePieData: [],
      rankData: [],
    };
  },
  computed: {},

  methods: {
    async loadRosePieData() {
      this.rosePieData = [
        {
          name: "已处理",
          value: 30,
        },
        {
          name: "处理中",
          value: 25,
        },
        {
          name: "未处理",
          value: 20,
        },
      ];
    },
    async loadRankData() {
      this.rankData = [
        {
          name: "人员聚集",
          value: 8,
        },
        {
          name: "人员离岗",
          value: 8,
        },
        {
          name: "超速",
          value: 5,
        },
        {
          name: "消防占道",
          value: 3,
        },
        {
          name: "黑名单（人行）",
          value: 1,
        },
        {
          name: "黑名单（车行）",
          value: 0,
        },
      ];
    },
    async loadData() {
      this.loadRankData();
      this.loadRosePieData();
    },
  },
  created() {
    this.loadData();
  },
};
</script>