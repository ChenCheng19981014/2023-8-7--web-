<style lang="scss" scoped>
</style>

<template>
  <div class="ui">

    {{u}}
    <data-statis-one :icon="icon" title="累计总能耗" :data="statisData"></data-statis-one>
    <data-statis-card :data="cardData" style="margin-bottom:21px"></data-statis-card>

    <sub-title style="margin-bottom: 16px" title="能耗趋势(tce-eq)">
      <el-dropdown>
        <span class="el-dropdown-link">
          总能耗<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>总能耗</el-dropdown-item>
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
import {queryEnterpriseEnergyEfficiencyz} from "@/api/energy"
export default {
  data() {
    return {
      lineData: [],
      icon:require("../../../../../assets/energy/icon1.png")
    };
  },
  props: {
    time: String,
  },
  computed: {
    cardData(){
      return [
            {
          icon: require("../../../../../assets/overview/icon11.png"),
          name: "电能耗",
          value: 54508,
          unit1: "kWh",
          unit2: "MKWh",
        },
        {
          icon: require("../../../../../assets/overview/icon12.png"),
          name: "水能耗",
          value: 54508,
          unit1: "吨",
          unit2: "万吨",
        },
        {
          icon: require("../../../../../assets/overview/icon13.png"),
          name: "天然气",
          value: 54508,
          unit1: "m³",
          unit2: "万m³",
        },
        {
          icon: require("../../../../../assets/overview/icon14.png"),
          name: "压缩空气",
          value: 54508,
          unit1: "m³",
          unit2: "万m³",
        },
      ]
    },
    statisData(){
      return[
        {
        value:1662974.13,
        unit1:"(吨/标煤）",
        unit1:"(万吨/标煤）"
      }
      ]
    }
  },
  methods: {
    async loadStatisData(){
      queryEnterpriseEnergyEfficiencyz({}).then(res=>{
        console.log(res);
      })
    },  
    async loadLineData() {
      this.lineData = [
        {
          name: "10:00",
          "tce-eq": Math.ceil(Math.random() * 100),
        },
        {
          name: "11:00",
          "tce-eq": Math.ceil(Math.random() * 100),
        },
        {
          name: "12:00",
          "tce-eq": Math.ceil(Math.random() * 100),
        },
        {
          name: "13:00",
          "tce-eq": Math.ceil(Math.random() * 100),
        },
        {
          name: "14:00",
          "tce-eq": Math.ceil(Math.random() * 100),
        },
        {
          name: "15:00",
          "tce-eq": Math.ceil(Math.random() * 100),
        },
      ];
    },
    async loadData() {
      this.loadLineData();
      this.loadStatisData()
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