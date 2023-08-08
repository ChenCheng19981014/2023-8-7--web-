<style lang="scss" scoped>
.scroll2 {
  .scroll-main {
    height: 168px;
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
      white-space: nowrap;
      overflow: hidden;
      flex: 1;
      text-align: center;
      span {
        font: 14px;
        color: $light;
      }
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
    <sub-title title="能耗KPI" style="margin-bottom: 12px">
      <el-dropdown>
        <span class="el-dropdown-link">
          电耗<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>电耗</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </sub-title>

    <div class="scroll2" style="margin-bottom: 14px">
      <div class="scroll2-header row">
        <div class="row-item">能耗区域</div>
        <div class="row-item">电能KPI指标</div>
        <div class="row-item">完成情况</div>
      </div>
      <div class="scroll-main">
        <scroll-wrap :distance="28">
          <div class="row" v-for="(item, index) of tableList" :key="index">
            <div class="row-item">综合楼</div>
            <div class="row-item">产水率</div>
            <div class="row-item img-row">
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
  data() {
    return {
      tableList: [],
    };
  },
  props: {
    time: String,
  },
  computed: {},
  methods: {
    async loadTableList() {
      this.tableList = [
        {
          value: 50,
        },
        {
          value: 60,
        },
        {
          value: 80,
        },
        {
          value: 50,
        },
        {
          value: 60,
        },
        {
          value: 80,
        },
        {
          value: 50,
        },
        {
          value: 60,
        },
        {
          value: 80,
        },
      ];
    },
    async loadData() {
      this.loadTableList();
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