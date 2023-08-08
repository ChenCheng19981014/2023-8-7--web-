<style lang="scss" scoped>
.custom-monitor {
  width: 100%;
  height: 100%;
  background: black;
  position: relative;
  .monitor-title {
    width: 100%;
    height: 28px;
    color: $white;
    font-size: 14px;
    background: var(
      --1000,
      linear-gradient(
        90deg,
        #06f 8.33%,
        rgba(1, 49, 196, 0.65) 52.6%,
        rgba(4, 37, 88, 0) 100%
      )
    );
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    line-height: 28px;
    text-indent: 10px;
  }
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>

<template>
  <div class="custom-monitor">
    <video src="" autoplay muted controls ref="haikang-monitor"></video>
    <!-- <div class="monitor-title">{{name}}</div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "custom-monitor",
  props: {
    url: String,
   
  },
  methods: {
    async initFlv() {
        // return
      let url = `${process.env.VUE_APP_BASE_HAIKANG_URL}/rtsp/id123?url=` + this.url;
      let flvPlayer = flvjs.createPlayer({
        type: "flv",
        isLive: true, //<====加个这个
        url,
      });
      flvPlayer.attachMediaElement(this.$refs["haikang-monitor"]);
      flvPlayer.load(); //加载
      flvPlayer.play();
      this.flvPlayer = flvPlayer;
      this.$refs["haikang-monitor"].play();
      // flv_start();
    },
    destroyFlv() {
      if(!this.flvPlayer)return
      this.flvPlayer.pause(); //停止播放
      this.flvPlayer.unload(); //停止加载
      this.flvPlayer.detachMediaElement(); //销毁实例
      this.flvPlayer.destroy();
      this.flvPlayer = null;
    },
  }, mounted() {
    // window.onclick=()=>{
    this.initFlv();
    // window.onclick=null
    // }
  },
  destroyed() {
    this.destroyFlv();
  },
};
</script>