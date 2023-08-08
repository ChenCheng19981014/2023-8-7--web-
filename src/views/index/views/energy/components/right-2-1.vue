<style lang="scss" scoped>
.scroll {
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 224, 0.17);
  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(4px);
  width: 100%;
  height: 565px;
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
  padding-top: 4px;
  padding-bottom: 4px;
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
      .common{
        border-radius: 4px;
border: 1px solid #76FFE9;
background: rgba(43, 178, 189, 0.50);
box-shadow: 0px 0px 8px 0px #22FFD7 inset;
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
</style>

<template>
  <div class="ui">
    <sub-title title="系统实时告警" style="margin-bottom: 16px"></sub-title>
    <div class="scroll" style="margin-bottom: 31px">
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
                <div class="state common" v-if="item.type == 'common'">一般</div>
                <div class="state error" v-if="item.type == 'error'">紧急</div>
              </div>
            </div>
            <div class="item">
              <div class="title">AF912东门通道消防</div>
              <div class="cont">
                <div class="time">2023-07-18 09:14:56</div>
                <div class="status" v-if="item.hasFinish">已解决</div>
                <div class="status" style="color: #ff5d5d" v-else>告警</div>
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
      list: [],
    };
  },
  props: {
    time: String,
  },
  computed: {},
  methods: {
    async loadList() {
           this.list = [
        {
          title: "温度异常！",
          type: "common",
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
      ];
    },
    async loadData() {
      this.loadList();
    },
  },
  created() {
    this.loadData();
  },
  watch: {
    time() {
      this.loadData();
    },
  },
};
</script>