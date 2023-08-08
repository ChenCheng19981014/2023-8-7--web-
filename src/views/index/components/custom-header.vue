<style lang="scss" scoped>
.custom-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 84px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background-image: url("../../../assets/common/header-bg.png");
  background-size: 100% 100%;
  z-index: 2;
  .title {
    font-family: "pm";
    margin-top: 13px;
    font-size: 40px;
    letter-spacing: 3.2px;

    background: linear-gradient(180deg, $white, $white 35%, #00ff85);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .right {
    position: absolute;
    right: 57px;
    top: 26px;
    display: flex;
    font-size: 16px;
    align-items: center;
    .time {
      margin-left: 16px;
      color: $light;
    }
    .date {
      margin-left: 54px;
      color: $white;
    }
    .tempture {
      margin-left: 8px;
      color: $light;
    }

    .tempture-type {
      margin-left: 7.5px;
      color: $white;
    }
    .tempture-icon {
      margin-left: 8px;
      width: 24px;
      height: 24px;
      img {
        width: 100%;
      }
    }
    .address {
      color: $white;
    }
  }
}

#common {
  background-size: 200% 100%;
  background-position-x: 50%;
}
</style>

<template>
  <div class="custom-header" :id="!fish ? 'common' : ''">
    <div class="title">中环领先数字孪生平台</div>
    <div class="right">
      <div class="address">无锡</div>
      <div class="tempture-icon">
        <img :src="temptureIcon" alt="" />
      </div>
      <div class="tempture-type">{{ temptureType }}</div>
      <div class="tempture">{{ tempture }}</div>
      <div class="date">{{ date }}</div>
      <div class="time">{{ time }}</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  created() {
    this.loadTime();
    this.loadTempture();
  },
  data() {
    return {
      date: "",
      time: "",
      tempture: "",
      temptureType: "",
    };
  },
  computed: {
    temptureIcon() {
      return (
        process.env.VUE_APP_BASE_ASSETS +
        "assets/images/weather/" +
        this.temptureType +
        ".png"
      );
    },
  },
  methods: {
    loadTime() {
      this.date = moment().format("YYYY-MM-DD");
      this.time = moment().format("hh:mm:ss");
      setTimeout(() => {
        this.loadTime();
      }, 1000);
    },
    loadTempture() {
      this.tempture = "1~10℃";
      this.temptureType = "下雨";
    },
  },
};
</script>
