<style lang="scss" scoped>
.ui {
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 24px;
  .row {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;

    .item {
      display: flex;
      width: 178px;

      .icon {
        width: 60px;
        height: 60px;
        margin-right: 24px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .data {
        margin-top: 3px;
        .title {
          color: $light;
          font-size: 14px;
        }
        .value {
          font-weight: bold;
          color: $white;
          font-size: 28px;
          margin-top: 4px;
          font-family: "number";
        }
      }
    }
  }
}
</style>

<template>
  <div class="ui">
    <div class="row">
      <div class="item">
        <div class="icon">
          <img src="../../../../../assets/overview/icon1.png" alt="" />
        </div>
        <div class="data">
          <div class="title">建筑面积</div>
          <div class="value" v-html="fmt(10000, '㎡')"></div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="../../../../../assets/overview/icon2.png" alt="" />
        </div>
        <div class="data">
          <div class="title">建设年份</div>
          <div class="value" v-html="fmt(2009, '年')"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <div class="icon">
          <img src="../../../../../assets/overview/icon3.png" alt="" />
        </div>
        <div class="data">
          <div class="title">员工数</div>
          <div class="value" v-html="fmt(950, '人')"></div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="../../../../../assets/overview/icon4.png" alt="" />
        </div>
        <div class="data">
          <div class="title">楼栋数</div>
          <div class="value" v-html="fmt(12, '栋')"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loadData() {},
  },
  created() {
    this.loadData();
  },
};
</script>