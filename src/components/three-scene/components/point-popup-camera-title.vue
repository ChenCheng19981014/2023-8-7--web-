<template>
  <div class="point-popup-camera-title">
    <div :class="info.state ? 'title normal' : 'title error'">
      <div class="name">{{ info.title }}</div>
      <div class="close" @pointerdown="close()"></div>
    </div>
    <div class="position">{{ info.position }}</div>
  </div>
</template>
<script>
import { $on, $send, $off } from "@/lib/custom-bus";
export default {
  // 点位弹窗
  name: "pointPopupCameraTitle",
  props: ["info"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    close() {
      // 关闭部分弹窗
      $send("show-camera-info", false);

      // ai摄像头
      $send("show-ai-info", false);

      // 摄像头选中 失效
      $send("set-selected-camera-index", -1);

      // 门禁选中失效
      $send("close-selected-doorControl", -1);

      // 门禁
      $send("show-travel-doorControl-info", false);
    },
  },
};
</script>

<style scoped lang="scss">
.point-popup-camera-title {
  .title {
    display: flex;
    width: 381px;
    height: 36px;
    padding-left: 20px;
    padding: 4px 0px 4px 20px;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px 8px 0px 0px;
    background-color: #fff;
    font-size: 20px;
    .name {
      font-size: 20px;
      font-family: "pm";
    }
    .close {
      width: 48px;
      height: 36px;
      background-image: url("./../../../assets/three-scene/弹框关闭.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      cursor: pointer;
    }
  }

  .normal {
    background: linear-gradient(
      89deg,
      #06f 0%,
      rgba(1, 49, 196, 0.6) 39.22%,
      rgba(4, 88, 37, 0) 100%
    );
  }

  .error {
    background: linear-gradient(90deg, #df2c2d 0%, rgba(255, 99, 89, 0.6) 100%);
  }

  .position {
    font-family: "SourceHanSansCN";
    font-size: 16px;
    height: 45px;
    padding-left: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>
