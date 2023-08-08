<style lang="scss" scoped>
</style>

<template>
  <div class="ui">

    <data-statis-one :icon="icon" title="累计碳排放" :data="statisData"></data-statis-one>

    <sub-title style="margin-bottom: 16px" title="碳排放趋势图">
      <el-dropdown>
        <span class="el-dropdown-link">
          月<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>月</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </sub-title>

    <custom-line
      style="margin-bottom: 29px; height: 190px"
      yAxisName="指标"
      showLegend="false"
      :colors="[{ color: '#00FFE0' }]"
      :source="lineData"
    ></custom-line>
  </div>
</template>

<script>
export default {
  data() {
    return {
       icon:require("../../../../../assets/energy/icon2.png"),
      lineData: [],
    };
  },
  props: {
    time: String,
  },
  computed: {
    statisData(){
      return [
        {
          value:52333,
          unit1:'tCO2',
          unit2:"万tCO2"
        }
      ]
    }
  },
  methods: {
    async loadLineData() {
      this.lineData = [
        {
          name: "10:00",
          "tCO2": Math.ceil(Math.random() * 100),
        },
        {
          name: "11:00",
          "tCO2": Math.ceil(Math.random() * 100),
        },
        {
          name: "12:00",
          "tCO2": Math.ceil(Math.random() * 100),
        },
        {
          name: "13:00",
          "tCO2": Math.ceil(Math.random() * 100),
        },
        {
          name: "14:00",
          "tCO2": Math.ceil(Math.random() * 100),
        },
        {
          name: "15:00",
          "tCO2": Math.ceil(Math.random() * 100),
        },
      ];
    },
    async loadData() {
      this.loadLineData();
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