<template>
  <div class="point-popup-camera" v-if="isShow && cameraInfo">
    <pointPopupCameraTitle
      :info="cameraInfo"
      @showComs="showComs"
    ></pointPopupCameraTitle>
    <div class="content">
      <div class="frame" v-show="cameraInfo.src">
        <video
          ref="camera-video"
          ass="camera-video"
          :src="cameraInfo.src"
          autoplay="true"
          width="100%"
          height="100%"
        ></video>
        <div class="amplify" @pointerdown="openCameraVideo"></div>
      </div>
      <div class="err" v-show="!cameraInfo.src">
        <div class="t1">设备离线</div>
        <div class="t2">监控画面，显示错误</div>
      </div>
    </div>
  </div>
</template>
<script>
import { $on, $send, $off } from "@/lib/custom-bus";
import pointPopupCameraTitle from "./point-popup-camera-title.vue";
export default {
  props: {
    id: {
      type: String,
      require: false,
    },
  },
  components: {
    pointPopupCameraTitle,
  },
  watch: {
    id() {
      this.loadData();

      console.log(this.id, "this.id");
    },
  },
  // 点位弹窗
  name: "pointPopupCamera",
  data() {
    return {
      cameraInfo: null,
      isShow: false,
    };
  },
  mounted() {
    if ("point-popup-camera" == this.$route.name) {
      this.isShow = true;
      this.id = this.$route.query.id;
    } else {
      if (this.id) {
        this.loadData();
      }
    }
    $on("show-camera-info", (isShow) => {
      this.isShow = isShow;
    });
  },
  methods: {
    loadData() {
      this.cameraInfo = {
        type: `外围-001`,
        state: true,
        title: this.id,
        position: `厂区西南角1`,
        // src: "./assets/t.mp4",
      };
    },
    showComs() {
      this.isShow = false;

      $send("set-selected-camera-index", -1);
    },
    // video全屏
    async openCameraVideo() {
      console.log("全屏操作~");
      await this.$refs["camera-video"].requestFullscreen();
    },
  },
};
</script>

<style scoped lang="scss">
.point-popup-camera {
  z-index: 1;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 383px;
  color: #fff;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
  backdrop-filter: blur(7px);

  .content {
    width: 100%;
    margin: 8px 20px 20px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    .frame {
      width: 341px;
      height: 200px;
      position: relative;
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

    .err {
      width: 341px;
      height: 200px;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      .t1 {
        color: #df2c2d;
        text-align: center;
        font-size: 16px;
        color: #df2c2d;
      }

      .t2 {
        margin-top: 3px;
        font-size: 14px;
        opacity: 0.800000011920929;
        color: #fff;
      }
    }
  }
}
</style>
