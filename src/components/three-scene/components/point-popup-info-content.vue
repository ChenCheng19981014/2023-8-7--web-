<template>
  <!-- 场景内容弹框 -->
  <div class="point-popup-info-content">
    <div class="icon">
      <img :src="info?.icon || defaultImg" alt="" />
    </div>
    <div v-for="(i, _) in info.arrInfo">
      <div class="title">{{ i.key }}</div>
      <div class="num">
        <div v-html="fmt(i.value, i.unit)"></div>
        <!-- <div>{{ i.value }}</div>
        <div class="unit">{{ i.unit }}</div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  // 点位弹窗
  name: "pointPopupInfoContent",
  props: ["info"],
  data() {
    return {
      defaultImg: require("./../../../assets/three-scene/three-person-icon.png"),
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.point-popup-info-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    height: 100%;
    width: 82px;
    display: flex;
    align-items: left;
    justify-content: space-around;
    flex-direction: column;

    .title {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      font-weight: 500;
      /* 文本/正文2-14m */
      font-family: SourceHanSansCN;
      font-style: normal;
      line-height: normal;
    }

    .num {
      display: flex;
      justify-content: flex-start;
      align-items: end;
      > div {
        display: flex;
        justify-content: flex-start;
        // align-items: center;
        font-size: 24px;
        align-items: end;
        font-family: "number";

        > span {
        }
      }
      // > div {
      //   font-size: 24px;
      //   display: flex;
      //   justify-content: center;
      //   align-items: end;
      // }
      // .unit {
      //   padding-bottom: 4px;
      //   margin-left: 4px;
      //   font-size: 14px;
      //   color: rgba(255, 255, 255, 0.5);
      // }
    }
  }

  & > div:nth-child(2) {
    position: relative;
  }

  & > div:nth-child(2)::after {
    content: "";
    position: absolute;
    width: 48px;
    height: 2px;
    left: 35%;
    bottom: 0;
    transform: translate(-60%);
    border-radius: 10px;
    background: var(--unnamed, #00ff85);
    box-shadow: 0px 0px 10px 0px rgba(0, 255, 133, 0.48);
  }

  .icon {
    width: 60px;
    height: 54.7px;
    margin-left: 0;
  }
}
</style>
