<style lang="scss" scoped>
</style>

<template>
  <div class="ui">
    <data-statis
      style="margin-bottom: 8px"
      :icon="statisIcon"
      :data="statisData"
    ></data-statis>
    <custom-progress
      style="margin-bottom: 16px"
      :data="progressData"
    ></custom-progress>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statisIcon: require("../../../../../assets/overview/icon7.png"),
      progressData: [
        {
          name: "任务完成率",
          value: 75,
        },
        {
          name: "点位完成率",
          value: 97,
        },
      ],
      barUnit: "",
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
    async loadData() {},
  },
  created() {
    this.loadData();
  },
};
</script>