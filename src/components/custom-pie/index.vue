<style lang="scss" scoped>
.custom-pie {
  padding-left: 16px;
  height: 160px;
  padding-right: 6px;
  display: flex;
  align-items: center;
  .chart {
    width: 160px;
    height: 160px;
    margin-right: 32px;
    flex-shrink: 0;
    position: relative;
    .pie-bg {
      width: 176px;
      height: 176px;
      position: absolute;
      left: -8px;
      top: -8px;
      // background: red;
      border: 27px solid rgba(0, 0, 0, 0.12);
      border-radius: 50%;
      z-index: 1;
    }
    .chart-main {
      width: 160px;
      height: 160px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 3333;
    }
    .chart-div {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // padding-top: 48px;
      .value {
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 4px;
        font-family: "number";
      }
      .title {
        font-size: 16px;
        color: $light;
      }
    }
  }
  .main {
    flex-grow: 1;
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .item-color {
        width: 10px;
        height: 10px;
        flex-shrink: 0;
        border-radius: 1px;
        margin-right: 8px;
      }
      .item-title {
        margin-right: 8px;
        font-size: 14px;
        color: $light;
        width: 58px;
      }
      .item-text {
        width: 72px;
        font-size: 20px;
        font-family: "number";
        font-weight: bold;
      }
      .item-per {
        font-size: 20px;
        color: $light;
        font-family: "number";
        font-weight: bold;
        .unit {
          font-size: 14px;
          color: $light;
          font-family: "number";
          margin-left: 4px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="custom-pie">
    <div class="chart">
      <div class="pie-bg"></div>
      <div class="chart-main">
        <chart-base :options="option"></chart-base>
      </div>
      <div class="chart-div">
        <div class="value">{{ getAll }}</div>
        <div class="title">{{ title }}</div>
      </div>
    </div>
    <div class="main">
      <div class="item" v-for="(item, index) of data" :key="index">
        <div class="item-color" :style="`background:${color[index]}`"></div>
        <div class="item-title">{{ item.name }}</div>
        <div class="item-text">{{ item.value }}</div>
        <div class="item-per">{{ item.per }}<span class="unit">%</span></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "custom-pie",
  props: {
    data: Array,
    title: String,
    color: Array,
  },
  computed: {
    getAll() {
      let all = 0;
      this.data.map((e) => {
        all += e.value;
      });
      return all;
    },
  },
  data() {
    return {
      option: {},
    };
  },
  watch: {
    data() {
      this.loadOption();
    },
  },
  methods: {
    loadOption() {
      //处理合计问题
      let all = this.getAll;
      let setup = 0.03 * all;
      let color = [];
      this.color.map((e) => {
        color.push(e);
        color.push("rgba(0,0,0,0)");
      });
      let data = [];
      this.data.map((item) => {
        if (all == 0) {
          item.per = 0;
        } else {
          item.per = ((item.value / all) * 100).toFixed(2);
        }
        if (item.value != 0) {
          data.push({ name: item.name, value: item.value });
          data.push({ name: "", value: setup });
        }
      });

      this.option = {
        series: {
          name: "",
          radius: [80, 70],
          type: "pie",
          data,
          itemStyle: {
            borderRadius: 5,
          },
          emphasis:{//使用emphasis
         disabled:false,
         scale:true,//不缩放
     },
          label: {
            show: false,
          },
        },
        color,
      };
    },
  },
  created() {
    this.loadOption();
  },
};
</script>