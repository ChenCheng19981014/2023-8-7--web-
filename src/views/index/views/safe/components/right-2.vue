<style lang="scss" scoped>
.scroll {
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 224, 0.17);
  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(4px);
  width: 100%;
  height: 580px;
  overflow: hidden;
  padding-top: 16px;
  padding-bottom: 16px;
}

.scroll-item {
  margin-left: 8px;
  margin-right: 8px;
  background: rgba(0, 0, 0, 0.12);
  margin-bottom: 16px;
  border-radius: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 14px;
      color: $white;
      font-weight: 500;
    }
    .cont {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $light;
      .line {
        width: 1px;
        height: 12px;
        background: rgba(255, 255, 255, 0.3);
        margin-left: 8px;
        margin-right: 8px;
      }
      .address {
        font-size: 14px;
        color: $light;
      }
      .event {
        font-size: 14px;

        color: $light;
      }
      .state {
        display: flex;
        padding: 1px 8px;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: $white;
        margin-left: 16px;
      }
      .warn {
        border-radius: 4px;
        border: 1px solid #ffdb5c;
        background: rgba(223, 138, 38, 0.5);
        box-shadow: 0px 0px 8px 0px #ffbe5c inset;
      }

      .error {
        border-radius: 4px;
        border: 1px solid #fda8a3;
        background: rgba(255, 67, 55, 0.5);
        box-shadow: 0px 0px 8px 0px #ff6359 inset;
      }
    }
  }
  .item {
    margin-top: 9px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 14px;
      color: $light;
    }
    .cont {
      display: flex;
      align-items: center;
      font-size: 14px;
      .time {
        color: $light;
      }
      .status {
        color: $light;
        margin-left: 15px;
      }
    }
  }
}

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
          font-weight: bold;
          margin-left: 4px;
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
          font-weight: bold;
          .unit {
            font-size: 400;
            margin-left: 4px;
            font-size: 14px;
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
      // padding-left: 7px;
      text-align: center;
      margin-top: 18px;
      font-weight: bold;
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
</style>
<template>
  <div class="ui">
    <data-statis
      style="margin-bottom: 24px"
      :icon="statisIcon"
      :data="statisData"
    ></data-statis>
    <sub-title title="事件复核" style="margin-bottom: 16px"></sub-title>

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
              <span class="left-data">4</span>
            </div>
          </div>
          <div class="item-left">
            <div class="data">
              <span class="left-title">已复核</span>
              <span class="left-data" style="color: #03fefe">4</span>
            </div>
          </div>
        </div>
      </div>
      <div class="box-right">
        <div class="value">{{ event.per }}<span>%</span></div>
        <div class="unit">准确率</div>
      </div>
    </div>

    <sub-title title="实时告警记录" style="margin-bottom: 16px"></sub-title>

    <div class="scroll">
      <scroll-wrap :distance="86">
        <div class="scroll-wrap-main">
          <div class="scroll-item" v-for="(item, index) of list" :key="index">
            <div class="header">
              <div class="title">{{ item.title }}</div>
              <div class="cont">
                <div class="address">{{ index }}-8寸工厂</div>
                <div class="line"></div>
                <div class="event">测温事件</div>
                <div class="state warn" v-if="item.type == 'warn'">严重</div>
                <div class="state error" v-if="item.type == 'error'">紧急</div>
              </div>
            </div>
            <div class="item">
              <div class="title">AF912东门通道消防</div>
              <div class="cont">
                <div class="time">2023-07-18 09:14:56</div>
                <div class="status" v-if="item.hasFinish">已处理</div>
                <div class="status" style="color: #ff5d5d" v-else>待处理</div>
              </div>
            </div>
          </div>
        </div>
      </scroll-wrap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statisIcon: require("../../../../../assets/safe/icon3.png"),
      list: [],
      event: {
        per: 75,
      },
    };
  },
  computed: {
    statisData() {
      return [
        {
          name: "告警总数",
          value: 4,
          unit1: "件",
          showLine: true,
        },
        {
          name: "已处理",
          value: 3,
          unit1: "件",
        },
        {
          name: "处理中",
          value: 1,
          unit1: "件",
        },
        {
          name: "未处理",
          value: 0,
          unit1: "件",
        },
      ];
    },
  },
  props: {
    time: String,
  },
  watch: {
    time() {
      this.loadData();
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadList();
    },
    async loadList() {
      this.list = [
        {
          title: "温度异常！",
          type: "error",
          hasFinish: false,
        },
        {
          title: "温度异常！",
          type: "warn",
          hasFinish: true,
        },
        {
          title: "温度异常！",
          type: "error",
          hasFinish: false,
        },
        {
          title: "温度异常！",
          type: "warn",
          hasFinish: true,
        },
        {
          title: "温度异常！",
          type: "error",
        },
        {
          title: "温度异常！",
          type: "warn",
        },
        {
          title: "温度异常！",
          type: "error",
        },
        {
          title: "温度异常！",
          type: "warn",
        },
        {
          title: "温度异常！",
          type: "error",
        },
        {
          title: "温度异常！",
          type: "warn",
        },
      ];
    },
  },
};
</script>