<style lang="scss" scoped>
.custom-progress {
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  height: 62px;
  align-items: center;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid rgba(0, 102, 255, 0.33);
  background: rgba(0, 0, 0, 0.12);
  .item {
    width: 179px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0px;
      .title {
        font-size: 16px;
        color: $light;
      }
      .value {
        font-family: "number";
        font-size: 24px;
        font-weight: bold;
        .unit {
          margin-left: 4px;
          font-size: 14px;
          color: rgb(255, 255, 255, 0.5);
          font-family: "number";
        }
      }
    }
    .progress {
      width: 100%;
      margin-top: 8px;
      height: 8px;
      border-radius: 8px;
      background: rgb(14, 18, 28);
      .progress-main {
        height: 100%;
        border-radius: 8px;
        background: linear-gradient(to right, #0131c4, #00ff85);
      }
    }
  }
}
</style>
<template>
  <div class="custom-progress">
    <div class="item" v-for="item of data" :key="item.name">
      <div class="header">
        <div class="title">{{ item.name }}</div>
        <div class="value">{{ item.value }}<span class="unit">%</span></div>
      </div>
      <div class="progress">
        <div class="progress-main" :style="`width:${item.value}%`"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-progress",
  props: {
    data: Array,
  },
};
</script>


