<template>
  <div class="point-popup-video">
    <video
      ref="camera-video"
      class="camera-video"
      :src="info.src"
      autoplay="true"
      width="100%"
      height="100%"
    ></video>
    <div class="amplify" @pointerdown="openCameraVideo"></div>
  </div>
</template>
<script>
export default {
  // 点位弹窗
  name: "pointPopupVideo",
  props: ["info"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // video全屏
    async openCameraVideo() {
      console.log("openvideo");
      await this.$refs["camera-video"].requestFullscreen();
    },
  },
};
</script>

<style scoped lang="scss">
.point-popup-video {
  .camera-video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .amplify {
    right: 8px;
    bottom: 8px;
    position: absolute;
    width: 40px;
    height: 30px;
    background-image: url("./../../../assets/three-scene/放大.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    cursor: pointer;
  }
}
</style>
