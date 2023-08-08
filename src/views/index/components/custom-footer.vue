<style lang="scss" scoped>
.custom-footer {
  z-index: 2;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .footer-bg {
    background-image: url("../../../assets/common/footer.png");
    width: 100%;
    height: 12px;
    background-size: 100% 100%;
    margin-bottom: 7px;
    margin-top: 6px;
  }
  .footer-menu {
    width: 1174px;
    height: 157px;
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: center;
    &.map {
      background-image: url("../../../assets/common/footer-menu-map.png");
    }
    background-image: url("../../../assets/common/footer-menu.png");
  }
  .button {
    width: 379px;
    height: 47px;
    background-size: cover;
    pointer-events: all;
    cursor: pointer;
    margin-top: 97px;
    background-image: url("../../../assets/common/footer-button.png");
    &:active {
      background-image: url("../../../assets/common/footer-button-active.png");
    }
  }

  .menu {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.active {
      img {
        opacity: 1;
      }
    }
    img {
      opacity: 0;
      width: 100%;
      height: 100%;
    }
    .title {
      font-size: 20px;
      font-family: "pm";
    }
    .title-box {
      position: absolute;
    }
  }
}

#common {
  transform: scale(0.7);
  transform-origin: center bottom;
  .title {
    font-size: 26px;
  }
}
</style>

<template>
  <div class="custom-footer">
    <div
      class="footer-menu"
      :id="!fish ? 'common' : ''"
      :class="$route.name == 'map' ? 'map' : ''"
    >
      <div class="menus" v-if="$route.name == 'map'">
        <div
          class="menu"
          @dblclick="linkTo({ name: item.dname })"
          v-for="item of routesMap"
          :key="item.name"
          :class="item.name == $route.name ? 'active' : ''"
          :style="getStyle(item)"
        >
          <img :src="item.image" alt="" />
          <div class="title-box">
            <div
              class="title"
              :style="` transform: rotate(${item.rotate}deg);`"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>

      <div class="menus" v-else>
        <div
          class="menu"
          @click="linkTo(item)"
          v-for="item of routes"
          :key="item.name"
          :class="item.name == $route.name ? 'active' : ''"
          :style="getStyle(item)"
        >
          <img :src="item.image" alt="" />
          <div class="title-box">
            <div
              class="title"
              :style="` transform: rotate(${item.rotate}deg);`"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>

      <div class="button" @click="linkTo({ name: 'map' })"></div>
    </div>
    <div class="footer-bg" :class="$route.name == 'map' ? 'map' : ''"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          image: require("../../../assets/common/button/1.svg"),
          name: "overview",
          title: "综合态势",
          width: "159px",
          height: "111.9px",
          left: "62.12px",
          top: "43.2px",
          rotate: "-16.5",
        },
        {
          image: require("../../../assets/common/button/2.svg"),
          name: "safe",
          title: "园区安防",
          width: "163.75px",
          height: "98.89px",
          left: "202.41px",
          top: "15.31px",
          rotate: "-10",
        },
        {
          image: require("../../../assets/common/button/3.svg"),
          name: "travel",
          title: "便捷通行",
          width: "155.29px",
          height: "86.10px",
          left: "354.43px",
          top: "3px",
          rotate: "-4",
        },
        {
          image: require("../../../assets/common/button/4.svg"),
          name: "energy",
          title: "能源管理",
          width: "162.27px",
          height: "76.54px",
          left: "504.11px",
          top: "1px",
          rotate: "0",
        },
        {
          image: require("../../../assets/common/button/5.svg"),
          name: "device",
          title: "设备设施",
          width: "155.29px",
          height: "86.10px",
          left: "660.28px",
          top: "3px",
          rotate: "4",
        },
        {
          image: require("../../../assets/common/button/6.svg"),
          title: "智能物流",
          width: "163.75px",
          height: "98.89px",
          left: "803.84px",
          top: "14.31px",
          rotate: "10",
        },
        {
          image: require("../../../assets/common/button/7.svg"),
          title: "ESG",
          width: "159.02px",
          height: "111.99px",
          left: "948.86px",
          top: "42.2px",
          rotate: "16.5",
        },
      ],
      routesMap: [
        {
          image: require("../../../assets/common/button-map/4.svg"),
          title: "内蒙古",
          width: "192px",
          height: "100.9px",
          left: "221.29px",
          top: "9.12px",
          rotate: "-9",
        },
        {
          image: require("../../../assets/common/button-map/4.svg"),
          title: "天津",
          width: "187.23px",
          height: "83.9px",
          left: "403.12px",
          top: "1px",
          rotate: "-3",
        },
        {
          image: require("../../../assets/common/button-map/4.svg"),
          title: "徐州",
          width: "187.23px",
          height: "83.9px",
          left: "589.25px",
          top: "1px",
          rotate: "3",
        },
        {
          image: require("../../../assets/common/button-map/4.svg"),
          title: "宜兴",
          name: "map",
          dname: "overview",
          width: "192px",
          height: "100.87px",
          left: "766.22px",
          top: "9.12px",
          rotate: "9",
        },
      ],
    };
  },
  computed: {
    getStyle() {
      return function(data) {
        return data;
      };
    },
  },
  methods: {
    linkTo(item) {
      if (!item.name) return;
      this.$router.replace({ name: item.name });
    },
  },
};
</script>
