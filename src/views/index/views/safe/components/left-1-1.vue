
<style lang="scss" scoped>
.scroll2 {
  .scroll-main {
    height: 120px;
    width: 100%;
    overflow: hidden;

    .row:nth-child(even) {
      background: rgba(0, 0, 0, 0.12);
    }
  }

  .row {
    height: 30px;
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
      width: 123px;
      flex-shrink: 0;
    }

    .row-item:nth-child(2) {
      width: 123px;
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
      style="margin-bottom: 21.5px"
      :icon="statisIcon"
      :data="statisData"
    ></data-statis>

    <div class="scroll2" style="margin-bottom: 18px">
      <div class="scroll2-header row">
        <div class="row-item">人员姓名</div>
        <div class="row-item">当前位置</div>
        <div class="row-item">联系方式</div>
      </div>
      <div class="scroll-main">
        <scroll-wrap :distance="30">
          <div class="row" v-for="(item, index) of tableList" :key="index">
            <div class="row-item">钱一唯</div>
            <div class="row-item">综合楼</div>
            <div class="row-item">17768331522</div>
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
      statisIcon: require("../../../../../assets/safe/icon1.png"),
      tableList: [],
    };
  },
  computed: {
    statisData() {
      return [
        {
          name: "ERT总人员",
          value: 28,
          unit1: "人",
          showLine:true
        },
        {
          name: "今日在岗",
          value: 14,
          unit1: "人",
        },
        {
          name: "占比",
          value: 50,
          unit1: "%",
          unit2: "%",
        },
      
      ];
    },
  },
  methods: {
    loadData() {
      this.loadTableList();
    },
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
  },
  created() {
    this.loadData();
  },
};
</script>