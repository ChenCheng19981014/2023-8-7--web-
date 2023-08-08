<style lang="scss" scoped>
.custom-pie {
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .chart{
    height: 18px;
    width: 100%;
    margin-bottom: 9px;
    border-radius: 4px;
    display: flex;
    overflow: hidden;
    >div{
      flex-shrink: 0;
      height: 100%;
    }
  }
  .main {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 167px;
      display: flex;
      align-items: center;
      margin-top: 16px;
      .item-color {
        width: 10px;
        height: 10px;
        flex-shrink: 0;
        border-radius: 1px;
        margin-right: 8px;
      }
      .item-title {
        margin-right: 16px;
        font-size: 14px;
        color: $light;
        width: 56px;
        flex-shrink: 0;
        white-space: nowrap;
      }
      .item-text {
        width: 72px;
        font-size: 20px;
        font-family: "number";
        font-weight: bold;
        margin-right: 16PX;
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
          font-weight: bold;margin-left: 4px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="custom-pie">
    <div class="chart">
      <div v-for="(item,index) of data" :key="item.name" :style="`width:${item.per}%;background:${color[index]}`"></div>
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
  name: "line-progress",
  props: {
    data: Array,
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
      let all = this.getAll;
      this.data.map((item) => {
        if (all == 0) {
          item.per = 0;
        } else {
          item.per = ((item.value / all) * 100).toFixed(2);
        }
      });

   
    },
  },
  created() {
    this.loadOption();
  },
};
</script>