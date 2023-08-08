<style lang="scss" scoped>
.data-statis-card {
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 195px;
    height: 54px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    border-radius: 4px;
    border: 1.2px solid rgba(0, 255, 224, 0.17);
    background: linear-gradient(90deg, #0e3377 0%, rgba(14, 51, 119, 0) 100%);
    .icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      margin-left: 12px;
      margin-right: 12px;
      img {
        width: 100%;
      }
    }
    .main {
      .title {
        font-size: 14px;
        color: $light;
      }
      .value {
        font-size: 20px;
        font-weight: bold;
        font-family: "number";
      }
    }
  }
}
</style>

<template>
  <div class="data-statis-card">
    <div class="item" v-show="item.disable==undefined" v-for="item of data" :key="item.name">
      <div class="icon">
        <img :src="item.icon" alt="" />
      </div>
      <div class="main">
        <div class="title">{{ item.name }}</div>
        <div
          class="value"
          v-html="fmt(item.value, item.unit1, item.unit2)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "data-statis-card",
  props: {
    data: Array,
  },
};
</script>