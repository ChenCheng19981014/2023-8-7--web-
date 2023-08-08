<template>
  <!-- 能源消耗 -->
  <div class="point-popup-energy-consume">
    <div class="title">{{ info.title }}</div>
    <div class="list">
      <div v-for="(i, _) in info.arr">
        <div class="left">{{ i.name }}</div>
        <div class="right">
          <div class="num">{{ i.num }}</div>
          <div class="unit">{{ i.unit }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  // 综合态势
  name: "pointPopupEnergyConsume",
  props: ["info"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.point-popup-energy-consume {
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .title {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 23px;
  }

  .list {
    margin-top: 16px;
    width: 100%;
    display: grid;
    position: relative;
    justify-content: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    > div {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 230px;
      height: 44px;
      background: rgba(0, 0, 0, 0.12);

      .left {
        color: rgba(255, 255, 255, 0.7);
      }

      .right {
        display: flex;
        justify-content: space-between;
        align-content: center;
        .num {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
