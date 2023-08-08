<style lang="scss" scoped>
</style>

<template>
  <div class="ui">
    <data-statis
      style="margin-bottom: 24px"
      :icon="statisIcon"
      :data="statisData"
    ></data-statis>
    <sub-title style="margin-bottom: 16px" title="车辆趋势图"></sub-title>
    <div style="width: 100%; height: 190px">
      <custom-line
        yAxisName="辆"
        :colors="colors"
        :source="source"
      ></custom-line>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        {
          color: "#00FF85",
        },
        {
          color: "#06F",
        },
        {
          color: "#654BFF",
        },
      ],
      source: [],
      statisIcon: require("../../../../../assets/overview/icon6.png"),
    };
  },
  computed: {
    statisData() {
      return [
        {
          name: "入园车辆",
          value: 1000,
          unit1: "辆",
          showLine: true,
        },
        {
          name: "员工车",
          value: 943,
          unit1: "辆",
        },
        {
          name: "预约车",
          value: 27,
          unit1: "辆",
        },
        {
          name: "临时车",
          value: 30,
          unit1: "辆",
        },
      ];
    },
  },
  methods: {
    async loadData() {
      this.source = [
        {
          name: "10:00",
          员工: 90 + Math.floor(Math.random() * 50),
          预约: 30 + Math.floor(Math.random() * 50),
          临时: 20 + Math.floor(Math.random() * 50),
        },
        {
          name: "11:00",
          员工: 90 + Math.floor(Math.random() * 50),
          预约: 30 + Math.floor(Math.random() * 50),
          临时: 20 + Math.floor(Math.random() * 50),
        },
        {
          name: "12:00",
          员工: 90 + Math.floor(Math.random() * 50),
          预约: 30 + Math.floor(Math.random() * 50),
          临时: 20 + Math.floor(Math.random() * 50),
        },
        {
          name: "13:00",
          员工: 90 + Math.floor(Math.random() * 50),
          预约: 30 + Math.floor(Math.random() * 50),
          临时: 20 + Math.floor(Math.random() * 50),
        },
        {
          name: "14:00",
          员工: 90 + Math.floor(Math.random() * 50),
          预约: 30 + Math.floor(Math.random() * 50),
          临时: 20 + Math.floor(Math.random() * 50),
        },
        {
          name: "15:00",
          员工: 90 + Math.floor(Math.random() * 50),
          预约: 30 + Math.floor(Math.random() * 50),
          临时: 20 + Math.floor(Math.random() * 50),
        },
      ];
    },
  },
  created() {
    this.loadData();
  },
};
</script>