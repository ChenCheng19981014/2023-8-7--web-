
<style lang="scss" scoped>
.scroll {
  border-radius: 8px;
  width: 100%;
  height: 360px;
  padding-top: 17px;
}

.scroll-item {
  height: 73px;
  margin-bottom: 17px;
  border-radius: 4px;
  padding-top: 4px;
  padding-bottom: 4px;

  .header {
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
    .title {
      font-size: 14px;
      color: $white;
      font-weight: 500;
    }
    .finish {
      font-size: 14px;
      color: #03fefe;
    }
  }
  .main {
    padding-left: 16px;
    padding-right: 16px;
    background: rgba(0, 0, 0, 0.12);
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .column {
      font-size: 12px;
      color: $light;
      flex-shrink: 0;
      span {
        font-size: 12px;
      }
    }
    .column:nth-child(1) {
      width: 160px;
      flex-shrink: 0;
    }
    .column:nth-child(2) {
      width: 100px;
      flex-shrink: 0;
    }
    .column:nth-child(3) {
      text-align: right;
      width: 110px;
    }
    .blue {
      color: #03fefe;
    }
    .big {
      font-size: 14px;
    }
  }
}
</style>
<style lang="scss">
.spec {
  background: none !important;
  border: none !important;
  height: auto !important;
}
</style>
<template>
  <div class="ui">
    <data-statis
      style="margin-bottom: 31.5px"
      :icon="statisIcon"
      :data="statisData"
    ></data-statis>

    <custom-progress
      class="spec"
      style="margin-bottom: 18px"
      :data="progressData"
    ></custom-progress>

    <sub-title title="任务详情"></sub-title>

    <div class="scroll">
      <scroll-wrap :distance="90">
        <div class="scroll-wrap-main">
          <div class="scroll-item" v-for="(item, index) of list" :key="index">
            <div class="header">
              <div class="title">{{ item.title }}</div>
              <div class="cont">
                <div class="state finish">已完成</div>
              </div>
            </div>
            <div class="main">
              <div class="item">
                <div class="column">巡更路线</div>
                <div class="column">时间段</div>
                <div class="column">已巡更点位</div>
              </div>
              <div class="item">
                <div class="column big">园区A线（外围）</div>
                <div class="column">20:00-20:30</div>
                <div class="column">
                  <span class="specular blue">14</span> / 14
                </div>
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
      statisIcon: require("../../../../../assets/safe/icon1.png"),
      list: [],
      progressData: [],
    };
  },
  computed: {
    statisData() {
      return [
        {
          name: "路线数量",
          value: 5,
          unit1: "条",
          showLine: true,
        },
        {
          name: "巡更任务",
          value: 25,
          unit1: "项",
        },
        {
          name: "点位数量",
          value: 72,
          unit1: "个",
        },
      ];
    },
  },
  methods: {
    loadData() {
      this.loadProgressData();
      this.loadTableList();
    },
    async loadTableList() {
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
      ];
    },
    async loadProgressData() {
      this.progressData = [
        {
          name: "任务完成率",
          value: 75,
        },
        {
          name: "点位完成率",
          value: 97,
        },
      ];
    },
  },
  created() {
    this.loadData();
  },
};
</script>