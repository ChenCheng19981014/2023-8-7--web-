<template>
  <div class="point-popup-traffic-title">
    <div class="left">{{ areaInfo.areaName }}</div>
  </div>
</template>
<script>
export default {
  components: {},
  // 点位弹窗
  name: "pointPopupTrafficTitle",
  props: ["areaInfo"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.point-popup-traffic-title {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  left: 0;

  .left {
    font-family: "pm";
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 29px;
    font-size: 20px;
    width: 239px;
    height: 31px;
    font-weight: 400;
    background-image: url("./../../../assets/three-scene/交通顶牌.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
