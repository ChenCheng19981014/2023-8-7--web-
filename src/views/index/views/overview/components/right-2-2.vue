<style lang="scss" scoped>
</style>

<template>
  <div class="ui">
    <data-statis
      style="margin-bottom: 21.5px"
      :icon="statisIcon"
      :data="statisData"
    ></data-statis>
    <data-statis-card
      style="margin-bottom: 16px"
      :data="statisCardData"
    ></data-statis-card>

    <sub-title style="margin-bottom: 16px" title="工单分类占比"></sub-title>
    <custom-pie
      title="工单总量"
      :color="[
        'rgba(0, 255, 133, 1)',
        'rgba(90, 63, 255, 1)',
        'rgba(90, 63, 255, 1)',
        'rgba(0, 102, 255, 1)',
      ]"
      :data="pieData"
    ></custom-pie>
  </div>
</template>

<script>
export default {
  props: {
    time: String,
  },
  data() {
    return {
      statisIcon: require("../../../../../assets/overview/icon15.png"),
      statisCardData: [
        {
          icon: require("../../../../../assets/overview/icon16.png"),
          name: "安防设备",
          value: 323,
          unit1: "路",
        },
        {
          icon: require("../../../../../assets/overview/icon17.png"),
          name: "电梯运行",
          value: 40,
          unit1: "部",
        },
        {
          icon: require("../../../../../assets/overview/icon18.png"),
          name: "照明设备",
          value: 419,
          unit1: "路",
        },
        {
          icon: require("../../../../../assets/overview/icon19.png"),
          name: "暖通设备",
          value: 158,
          unit1: "台",
        },
      ],
      pieData: [],
    };
  },
  watch: {
    time() {
      this.loadData();
    },
  },
  computed: {
    statisData() {
      return [
        {
          name: "设备总量",
          value: 1000,
          unit1: "台",
          showLine: true,
        },
        {
          name: "运行数量",
          value: 982,
          unit1: "台",
        },
        {
          name: "故障数量",
          value: 8,
          unit1: "台",
        },
      ];
    },
  },
  methods: {
    async loadPieData() {
      this.pieData = [
        {
          name: "故障",
          value: 10,
        },
        {
          name: "维修",
          value: 13,
        },
        {
          name: "点检",
          value: 9,
        },
        {
          name: "缺陷",
          value: 23,
        },
      ];
    },
    async loadStatisCardData() {},
    async loadData() {
      this.loadPieData();
      this.loadStatisCardData();
    },
  },
  created() {
    this.loadData();
  },
};
</script>