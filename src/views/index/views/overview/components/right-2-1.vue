<style lang="scss" scoped>
.scroll2 {
  .scroll-main {
    height: 114px;
    width: 100%;
    overflow: hidden;

    .row:nth-child(even) {
      background: rgba(0, 0, 0, 0.12);
    }
  }

  .row {
    height: 38px;
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
      width: 85px;
      flex-shrink: 0;
    }

    .row-item:nth-child(2) {
      width: 146px;
      flex-shrink: 0;
    }

    .row-item:nth-child(3) {
      width: 90px;
    }

    .row-item:nth-child(4) {
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
    <div class="scroll2" style="margin-bottom: 16px">
      <div class="scroll2-header row">
        <div class="row-item">位置</div>
        <div class="row-item">名称</div>
        <div class="row-item">国家规定值</div>
        <div class="row-item">实时值</div>
      </div>
      <div class="scroll-main">
        <scroll-wrap :distance="38">
          <div class="row" v-for="(item, index) of tableList" :key="index">
            <div class="row-item">废水站</div>
            <div class="row-item">氨氮(m³）</div>
            <div class="row-item">100</div>
            <div class="row-item">
              <span style="color: #00ffe0">{{ item.value }}</span>
            </div>
          </div>
        </scroll-wrap>
      </div>
    </div>
    <sub-title title="环境趋势图" style="margin-bottom: 16px">
      <el-dropdown>
        <span class="el-dropdown-link">
          废水<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>废水</el-dropdown-item>
          <el-dropdown-item disabled>废气</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </sub-title>
    <div class="chart" style="width: 100%; height: 190px; margin-bottom: 17px">
      <specular-line
        :source="lineData"
        :max="20"
        :colors="['rgba(0, 255, 224)', 'rgb(255,190,92)', 'rgb(255,93,93)']"
      ></specular-line>
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
      tableList: [],
      lineData: [],
    };
  },
  watch: {
    time() {
      this.loadData();
    },
  },
  computed: {},
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
    async loadLineData() {
      let data = [
        {
          name: "10:00",
          数值: 5,
        },
        {
          name: "11:00",
          数值: 4.5,
        },
        {
          name: "12:00",
          数值: 5.2,
        },
        {
          name: "13:00",
          数值: 5,
        },
        {
          name: "14:00",
          数值: 3,
        },
        {
          name: "15:00",
          数值: 4,
        },
      ].map((e) => {
        e.一般预警 = 10;
        e.国家规定 = 20;
        return e;
      });
      this.lineData = data;
    },
    async loadData() {
      this.loadTableList();
      this.loadLineData();
    },
  },
  created() {
    this.loadData();
  },
};
</script>