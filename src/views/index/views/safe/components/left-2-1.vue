<style lang="scss" scoped>
.monitor-select {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 8px;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 8px;
    height: 49px;
    border-radius: 4px;
    border: 1.2px solid rgba(0, 255, 224, 0.17);
    background: linear-gradient(90deg, #2d3957 0%, rgba(45, 57, 87, 0) 100%);
    .title {
      font-size: 14px;
      color: $white;
    }
    .number {
      font-size: 16px;
      font-family: "number";
      font-weight: bold;
      .blue {
        color: rgba(3, 254, 254, 1);
      }
    }
  }
}

.active {
  border-radius: 4px;
  border: 1.2px solid var(--unnamed, #00ffe0);
  background: linear-gradient(
      0deg,
      rgba(34, 59, 96, 0.5) 0%,
      rgba(34, 59, 96, 0.5) 100%
    ),
    linear-gradient(
      180deg,
      rgba(45, 130, 255, 0.55) 17.3%,
      rgba(45, 130, 255, 0) 100%
    );
  box-shadow: 0px 0px 12px 4px rgba(88, 145, 254, 0.83) inset;
}
.monitor-container {
  width: 100%;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .monitor-item {
    width: 210px;
    height: 117px;
    margin-bottom: 16px;
  }
}
</style>

<template>
  <div class="">
    <data-statis
      style="margin-bottom: 24px"
      :icon="statisIcon"
      :data="statisData"
    ></data-statis>

    <div class="monitor-select">
      <div
        class="item"
        :key="item.name"
        @click="selectCategoryType = item.name"
        :class="item.name == selectCategoryType ? 'active' : ''"
        v-for="item of category"
      >
        <div class="title">{{ item.name }}</div>
        <div class="number"><span class="blue">20</span>/ <span>27</span></div>
      </div>
    </div>
    <div class="monitor-container">
      <div class="monitor-item" v-for="(item, index) of monitors" :key="index">
        <custom-monitor :url="item.url" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statisIcon: require("../../../../../assets/safe/icon2.png"),
      category: [],
      monitors: [],
      selectCategoryType: null,
    };
  },
  watch: {
    selectCategoryType() {
      this.loadMonitors();
    },
  },
  methods: {
    loadData() {
      this.loadcategory();
    },
    async loadMonitors() {
      this.monitors = [
        {
          name: "监控1",
          url: "rtsp://admin:yxzh12345@10.212.18.131:554/Streaming/Channels/101",
        },
        {
          name: "监控1",
          url: "rtsp://admin:yxzh12345@10.212.18.110:554/Streaming/Channels/101",
        },
        {
          name: "监控1",
          url: "rtsp://admin:yxzh12345@10.212.18.160:554/Streaming/Channels/101",
        },
        {
          name: "监控1",
          url: "rtsp://admin:yxzh12345@10.212.18.86:554/Streaming/Channels/101",
        },  {
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
        //  {
        //   name: "监控1",c
        //   url: "rtsp://admin:admin@192.168.3.225:8554/live",
        // },   {
        //   name: "监控1",
        //   url: "rtsp://admin:admin@192.168.3.225:8554/live",
        // },   {
        //   name: "监控1",
        //   url: "rtsp://admin:admin@192.168.3.225:8554/live",
        // },   {
        //   name: "监控1",
        //   url: "rtsp://admin:admin@192.168.3.225:8554/live",
        // },   {
        //   name: "监控1",
        //   url: "rtsp://admin:admin@192.168.3.225:8554/live",
        // },   {
        //   name: "监控1",
        //   url: "rtsp://admin:admin@192.168.3.225:8554/live",
        // },   {
        //   name: "监控1",
        //   url: "rtsp://admin:admin@192.168.3.225:8554/live",
        // },    {
        //   name: "监控1",
        //   url: "rtsp://admin:admin@192.168.3.225:8554/live",
        // },   {
        //   name: "监控1",
        //   url: "rtsp://admin:admin@192.168.3.225:8554/live",
        // }, 
      ];
    },
    async loadcategory() {
      this.category = [
        {
          name: "全部",
        },
        {
          name: "综合楼",
        },
        {
          name: "8寸工厂",
        },
        {
          name: "新8寸工厂",
        },
        {
          name: "12寸工厂",
        },
        {
          name: "CUB",
        },
        {
          name: "库房",
        },
        {
          name: "园区公共",
        },
      ];
      this.selectCategoryType = "全部";
    },
  },
  computed: {
    statisData() {
      return [
        {
          name: "在线",
          value: 197,
          unit1: "台",
        },
        {
          name: "离线",
          value: 14,
          unit1: "台",
        },
        {
          name: "未启用",
          value: 14,
          unit1: "台",
        },
      ];
    },
  },
  created() {
    this.loadData();
  },
};
</script>