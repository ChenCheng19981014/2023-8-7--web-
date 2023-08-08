<style lang="scss" scoped>
.custom-pie {
  padding-left: 16px;
  height: 142px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 16px;
  .chart {
    width: 142px;
    height: 142px;
    flex-shrink: 0;
    position: relative;
  
    .chart-main {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 333;
    }
   
  }
  .main {
    flex-grow: 1;
    margin-left: 63px;
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
        width: 50px;
        font-size: 20px;
        font-family: "number";
        font-weight: bold;
      }
      .item-per {
        font-size: 20px;
        color: $light;
        font-family: "number";
        font-weight: bold;
        text-align: right;
        flex-grow: 1;
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
      <div class="chart-main">
        <chart-base :options="option"></chart-base>
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
  name: "rose-pie",
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
    
      this.data.map((item) => {
        if (all == 0) {
          item.per = 0;
        } else {
          item.per = ((item.value / all) * 100).toFixed(2);
        }
      });

      this.option = {
        series: {
          name: "",
          radius: [25,70],
          type: "pie",
          data:this.data,
          roseType:"radius",
          itemStyle: {
            // borderRadius: 5,
          },
          label: {
            show: false,
          },
        },
        color:this.color,
      };
    },
  },
  created() {
    this.loadOption();
  },
};
</script>