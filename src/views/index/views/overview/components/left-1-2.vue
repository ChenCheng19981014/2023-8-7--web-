<style lang="scss" scoped>
</style>

<template>
  <div class="ui">
    <data-statis
      style="margin-bottom: 24px"
      :icon="statisIcon"
      :data="statisData"
    ></data-statis>
    <custom-pie
      title="园区人员总数"
      :color="[
        'rgba(0, 255, 133, 1)',
        'rgba(0, 102, 255, 1)',
        'rgba(90, 63, 255, 1)',
      ]"
      :data="pieData"
    ></custom-pie>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statisIcon: require("../../../../../assets/overview/icon5.png"),
      pieData: [],
    };
  },
  computed: {
    statisData() {
      return [
        {
          name: "人员总数",
          value: 2100,
          unit1: "人",
          unit2: "万人",
          showLine: true,
        },
        {
          name: "员工数",
          value: 1250,
          unit1: "人",
          unit2: "万人",
        },
        {
          name: "访客数",
          value: 454,
          unit1: "人",
          unit2: "万人",
        },
        {
          name: "相关方",
          value: 396,
          unit1: "人",
          unit2: "万人",
        },
      ];
    },
  },
  methods: {
    async loadData() {
      this.pieData = [
        {
          name: "员工",
          value: 1250,
        },
        {
          name: "访客",
          value: 454,
        },
        {
          name: "相关方",
          value: 396,
        },
      ];
    },
  },
  created() {
    this.loadData();
  },
};
</script>