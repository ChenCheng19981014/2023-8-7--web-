<style lang="scss" scoped>
.rank-1 {
  height: 348px;
}
.rank-2 {
  height: 384px;
}
</style>

<template>
  <div class="ui">
    <sub-title
      style="margin-bottom: 16px"
      title="区域单位能耗(tce-eq)"
    ></sub-title>
    <div class="rank-1" style="margin-bottom: 38px">
      <specular-rank-line :data="rankData1"></specular-rank-line>
    </div>
    <sub-title
      style="margin-bottom: 16px"
      title="能源品类单位能耗(tce-eq)"
    ></sub-title>
    <div class="rank-2">
      <specular-rank-line :data="rankData2"></specular-rank-line>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rankData1: [],
      rankData2: [],
    };
  },
  props: {
    time: String,
  },
  computed: {},
  methods: {
    async loadRankData1() {
      this.rankData1 = [
        {
          name: "12寸工厂",
          value: 2888,
        },
        {
          name: "新8寸工厂",
          value: 2254,
        },
        {
          name: "8寸工厂",
          value: 2018,
        },
        {
          name: "CUB",
          value: 1918,
        },
        {
          name: "综合楼",
          value: 1850,
        },
        {
          name: "废水站",
          value: 1540,
        },
        {
          name: "制氮站",
          value: 1500,
        },
        {
          name: "制氢站",
          value: 1420,
        },
        {
          name: "氢气站",
          value: 1320,
        },
        {
          name: "大宗气站",
          value: 980,
        },
      ];
    },
    async loadRankData2() {
         this.rankData2 = [
        {
          name: "电",
          value: Math.random()*10000,
        },
        {
          name: "市政水",
          value: 2254,
        },
        {
          name: "工业水",
          value: 2018,
        },
        {
          name: "超纯水",
          value: 1918,
        },
        {
          name: "4M",
          value: 1850,
        },
        {
          name: "天然气",
          value: 1540,
        },
        {
          name: "普氧",
          value: 1500,
        },
        {
          name: "氩气",
          value: 1420,
        },
        {
          name: "氢气",
          value: 1320,
        },
        {
          name: "普氮",
          value: 980,
        },   {
          name: "高纯氮",
          value: 580,
        },
      ];
    },
    async loadData() {
      this.loadRankData1();
      this.loadRankData2();
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