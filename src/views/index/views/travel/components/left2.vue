<style lang="scss" scoped>
.sub-item {
  font-size: 14px;
  color: $light;
  .value {
    font-size: 24px;
    font-family: "number";
    margin-left: 6px;
  }
}

.scroll2 {
  .scroll-main {
    height: 140px;
    width: 100%;
    overflow: hidden;

    .row:nth-child(even) {
      background: rgba(0, 0, 0, 0.12);
    }
  }

  .row {
    height: 28px;
    display: flex;
    align-items: center;

    .row-item {
      text-align: center;
      font-size: 14px;
      flex-shrink: 0;
      color: $light;
      width: 25%;
      span {
        font: 14px;
        color: $light;
      }
    }
    .row-item:nth-child(1) {
      width: 25%;
      flex-shrink: 0;
    }

    .row-item:nth-child(2) {
      width: 25%;
      flex-shrink: 0;
    }

    .row-item:nth-child(3) {
      flex-grow: 25%;
      flex-shrink: 0;
    }
    .row-item:nth-child(4) {
      flex-grow: 25%;
      flex-shrink: 0;
    }

    &:hover {
      cursor: pointer;
      background: linear-gradient(
        90deg,
        rgba(27, 89, 248, 0.6) 0%,
        rgba(89, 175, 255, 0) 100%
      ) !important;
    }
  }
  .scroll2-header {
    height: 36px !important;
    width: 100%;
    border: 1px solid rgba(0, 102, 255, 0.33);
    background: linear-gradient(
      180deg,
      rgba(7, 131, 250, 0.18) 0%,
      rgba(7, 131, 250, 0.12) 51.3%,
      rgba(7, 131, 250, 0.18) 100%
    );
    &:hover {
      background: linear-gradient(
        180deg,
        rgba(7, 131, 250, 0.18) 0%,
        rgba(7, 131, 250, 0.12) 51.3%,
        rgba(7, 131, 250, 0.18) 100%
      ) !important;
    }
  }
}

.monitor-container {
  display: flex;
  flex-wrap: wrap;
  .monitor-item {
    flex-shrink: 0;
    width: 50%;
    height: 120px;
    overflow: hidden bvfdcxwsqr3aetxdgfhcv mbngfxdceszwqaRzfdtx;
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
    <sub-title title="车辆分布" style="margin-bottom: 24px"></sub-title>
    <custom-pie
      style="margin-bottom: 25px"
      title="园区人员总数"
      :color="[
        'rgba(0, 255, 133, 1)',
        'rgba(0, 102, 255, 1)',
        'rgba(90, 63, 255, 1)',
      ]"
      :data="pieData"
    ></custom-pie>

    <sub-title style="margin-bottom: 16px" title="车辆通行实时记录">
      <div class="sub-item">出入频次 <span class="value">2373</span></div>
    </sub-title>

    <div class="scroll2" style="margin-bottom: 16px">
      <div class="scroll2-header row">
        <div class="row-item">车牌号码</div>
        <div class="row-item">车辆类型</div>
        <div class="row-item">通行地点</div>
        <div class="row-item">通行时间</div>
      </div>
      <div class="scroll-main">
        <scroll-wrap :distance="28">
          <div class="row" v-for="(item, index) of tableList" :key="index">
            <div class="row-item">藏DX8R82</div>
            <div class="row-item">临时</div>
            <div class="row-item">园区南门出口</div>
            <div class="row-item">17:59:00</div>
          </div>
        </scroll-wrap>
      </div>
    </div>

    <sub-title title="重点车行通道监控" style="margin-bottom: 16px"></sub-title>
    <div class="monitor-container">
      <div
        class="monitor-item"
        v-for="(item, index) of monitors"
        :key="'m' + index"
      >
        <custom-monitor :url="item.url"></custom-monitor>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      statisIcon: require("../../../../../assets/travel/icon2.png"),
      pieData: [],
      tableList: [],
      monitors: [],
    };
  },
  computed: {
    statisData() {
      return [
        {
          name: "进出车辆总数",
          value: 2373,
          unit1: "辆",
          showLine: true,
        },
        {
          name: "员工车",
          value: 1950,
          unit1: "辆",
        },
        {
          name: "预约车",
          value: 50,
          unit1: "辆",
        },
        {
          name: "临时车",
          value: 103,
          unit1: "辆",
        },
      ];
    },
  },
  methods: {
    loadMonitors() {
      this.monitors = [
      {
          name: "监控1",
          url: "rtsp://admin:yxzh12345@10.212.18.59:554/Streaming/Channels/101",
        },
        {
          name: "监控1",
          url: "rtsp://admin:yxzh12345@10.212.18.126:554/Streaming/Channels/101",
        },
        {
          name: "监控1",
          url: "rtsp://admin:yxzh12345@10.212.18.90:554/Streaming/Channels/101",
        },
        {
          name: "监控1",
          url: "rtsp://admin:yxzh12345@10.212.18.124:554/Streaming/Channels/101",
        },
      ];
    },
    loadPieData() {
      this.pieData = [
        {
          name: "员工",
          value: 1950,
        },
        {
          name: "临时",
          value: 50,
        },
        {
          name: "预约",
          value: 103,
        },
      ];
    },
    loadTableList() {
      this.tableList = [{}, {}, {}, {}, {}, {}, {}];
    },
    loadData() {
      this.loadPieData();
      this.loadTableList();
      this.loadMonitors();
    },
  },
  created() {
    this.loadData();
  },
};
</script>