<style lang="scss" scoped>
.scroll1 {
  height: 328px;
  width: 100%;
  overflow: hidden;
}

.scroll2 {
  .scroll-main {
    height: 196px;
    width: 100%;
    overflow: hidden;

    .row:nth-child(even) {
      background: rgba(0, 0, 0, 0.12);
    }
  }

  .row {
    height: 28px;
    display: flex;
    align-items: center;

    .row-item {
      text-align: center;
      font-size: 14px;
      flex-shrink: 0;
      color: $light;
      span {
        font: 14px;
        color: $light;
      }
    }
    .row-item:nth-child(1) {
      width: 140px;
      flex-shrink: 0;
    }

    .row-item:nth-child(2) {
      width: 140px;
      flex-shrink: 0;
    }

    .row-item:nth-child(3) {
      flex-grow: 1;
    }

    &:hover {
      cursor: pointer;
      background: linear-gradient(
        90deg,
        rgba(27, 89, 248, 0.6) 0%,
        rgba(89, 175, 255, 0) 100%
      ) !important;
    }
  }
  .scroll2-header {
    height: 36px !important;
    width: 100%;
    border: 1px solid rgba(0, 102, 255, 0.33);
    background: linear-gradient(
      180deg,
      rgba(7, 131, 250, 0.18) 0%,
      rgba(7, 131, 250, 0.12) 51.3%,
      rgba(7, 131, 250, 0.18) 100%
    );
    &:hover {
      background: linear-gradient(
        180deg,
        rgba(7, 131, 250, 0.18) 0%,
        rgba(7, 131, 250, 0.12) 51.3%,
        rgba(7, 131, 250, 0.18) 100%
      ) !important;
    }
  }
}
</style>

<template>
  <div class="ui">
    <data-statis
      style="margin-bottom: 16px"
      :icon="statisIcon"
      :data="statisData"
    ></data-statis>
    <data-statis-card
      style="margin-bottom: 5px"
      :data="statisCardData"
    ></data-statis-card>
    <sub-title title="用能排行(tce-eq)" style="margin-bottom: 13px"></sub-title>

    <div class="scroll1" style="margin-bottom: 33px">
      <custom-rank :data="rankData"></custom-rank>
    </div>

    <sub-title title="能耗KPI" style="margin-bottom: 13px">
      <el-dropdown>
        <span class="el-dropdown-link">
          电能耗<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>电能耗</el-dropdown-item>
          <el-dropdown-item disabled>水能耗</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </sub-title>

    <div class="scroll2">
      <div class="scroll2-header row">
        <div class="row-item">能耗区域</div>
        <div class="row-item">电能KPI指标</div>
        <div class="row-item">完成情况</div>
      </div>
      <div class="scroll-main">
        <scroll-wrap :distance="28">
          <div class="row" v-for="(item, index) of tableList" :key="index">
            <div class="row-item">综合楼</div>
            <div class="row-item">2888</div>
            <div class="row-item">
              <span style="color: #03fefe" v-if="item.value > 60"
                >{{ item.value }}%</span
              >
              <span style="color: #ffbe5c" v-else-if="item.value > 30"
                >{{ item.value }}%</span
              >
              <span style="color: #ff5e5e" v-else>{{ item.value }}%</span>
            </div>
          </div>
        </scroll-wrap>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: String,
  },
  data() {
    return {
      statisIcon: require("../../../../../assets/overview/icon10.png"),
      barUnit: "",
      statisCardData: [
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
      ],
      tableList: [],
      rankData: [],
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
          name: "累计总能耗",
          value: 1652372,
          unit1: "(吨/标煤）",
          unit1: "(万吨/标煤）",
        },
        {
          name: "累计碳排放",
          value: 53245,
          unit1: "吨",
          unit2: "万吨",
        },
      ];
    },
  },
  methods: {
    async loadTableList() {
      this.tableList = [
        {
          value: 90,
        },
        {
          value: 60,
        },
        {
          value: 100,
        },
        {
          value: 30,
        },
        {
          value: 90,
        },
        {
          value: 60,
        },
        {
          value: 100,
        },
        {
          value: 30,
        },
        {
          value: 90,
        },
        {
          value: 60,
        },
        {
          value: 100,
        },
        {
          value: 30,
        },
        {
          value: 90,
        },
        {
          value: 60,
        },
        {
          value: 100,
        },
        {
          value: 30,
        },
      ];
    },
    async loadRankData() {
      this.rankData = [
        {
          name: "12寸工厂",
          value: 6888888,
        },
        {
          name: "新8寸工厂",
          value: 5888888,
        },
        {
          name: "8寸工厂",
          value: 4888888,
        },
        {
          name: "CBU",
          value: 3888888,
        },
        {
          name: "综合楼",
          value: 1228888.88,
        },
      ];
    },
    async loadStatisCardData() {},
    async loadData() {
      this.loadTableList();
      this.loadStatisCardData();
      this.loadRankData();
    },
  },
  created() {
    this.loadData();
  },
};
</script>