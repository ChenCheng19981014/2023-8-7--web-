<template>
  <!-- 综合态势内容 -->
  <div
    ref="point-popup-comprehensive-content"
    :class="
      info.length == 1
        ? 'once point-popup-comprehensive-content'
        : info.length <= 3
        ? 'no-line point-popup-comprehensive-content'
        : 'point-popup-comprehensive-content'
    "
    :style="
      `grid-template-columns: repeat(${
        info.length >= 3 ? 3 : info.length
      }, 1fr)`
    "
  >
    <div class="info-item" v-for="(i, _) in info">
      <div class="icon">
        <img :src="i?.icon || defaultImg" alt="" />
      </div>
      <div class="right">
        <div class="title">{{ i.name }}</div>
        <div class="num">
          <div v-html="fmt(i.num, i.unit)"></div>
          <!-- <div>{{ i.num }}</div>
          <div class="unit">{{ i.unit }}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  // 综合态势
  name: "pointPopupComprehensiveContent",
  props: ["info"],
  data() {
    return {
      defaultImg: require("./../../../assets/three-scene/three-person-icon.png"),
    };
  },
  mounted() {
    if (this.info.length == 2)
      this.$refs["point-popup-comprehensive-content"].classList.add("haveline");
  },
  methods: {},
};
</script>

<style scoped lang="scss">
// 下划线
.info-item:nth-child(3n + 1) {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 345%;
    height: 1px;
    left: 0%;
    bottom: -16px;
    background: rgba(255, 255, 255, 0.1);
  }
}

// 俩个有竖线
.haveline {
  & > div:nth-child(2) {
    position: relative;
    justify-content: center;
  }

  & > div:nth-child(2)::after {
    position: absolute;
    content: "";
    // background: rgba(0, 0, 0, 0.12);
    background: rgba(255, 255, 255, 0.12);
    width: 1px;
    height: 52px;
    left: -16px;
  }
}

// 移除下划线
.no-line .info-item:nth-child(1) {
  &::after {
    height: 0px;
  }
}

// 内容
.point-popup-comprehensive-content {
  width: 100%;
  height: 100%;
  min-height: 60px;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 24px;
  position: relative;

  .info-item {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .right {
      height: 100%;
      display: flex;
      align-content: center;
      flex-direction: column;
      justify-content: center;
      margin-left: 24px;
      position: relative;

      .title {
        white-space: nowrap;
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
        font-family: "SourceHanSansCN";
      }
    }

    .right::after {
      content: "";
      position: absolute;
      width: 80%;
      max-width: 50px;
      height: 2px;
      bottom: 0;
      border-radius: 10px;
      background: var(--unnamed, #00ff85);
      box-shadow: 0px 0px 10px 0px rgba(0, 255, 133, 0.48);
    }

    .num {
      display: flex;
      justify-content: flex-start;
      align-items: end;

      > div {
        font-size: 24px;
        display: flex;
        justify-content: flex-start;
        align-items: end;
        font-family: "number";
        font-weight: 700;

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

  .icon {
    width: 60px;
    height: 54.7px;
  }
}

// 一个居中
.once {
  width: 428px;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-template-columns: none;

  > div {
    justify-content: center;
  }
}
</style>
