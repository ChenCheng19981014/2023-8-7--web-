<template>
  <div class="point-popup-parking" v-if="isShow && parkingInfo">
    <div class="title">
      <pointPopupTrafficTitle :areaInfo="parkingInfo"></pointPopupTrafficTitle>
    </div>
    <div class="content">
      <div class="info">
        <pointPopupInfoContent :info="parkingInfo"></pointPopupInfoContent>
      </div>
    </div>
  </div>
</template>
<script>
import { $on, $send, $off } from "@/lib/custom-bus";
import pointPopupTrafficTitle from "./point-popup-traffic-title.vue";
import pointPopupInfoContent from "./point-popup-info-content.vue";

export default {
  components: {
    pointPopupTrafficTitle,
    pointPopupInfoContent,
  },
  // 点位弹窗
  name: "pointPopupParking",
  props: {
    id: {
      type: String,
      require: false,
    },
  },
  data() {
    return {
      selectedIndex: 0,
      parkingInfo: null,
      isShow: false,
    };
  },
  watch: {
    id() {
      this.loadData();
    },
  },
  mounted() {
    if ("point-popup-parking" == this.$route.name) {
      this.isShow = true;
      this.id = this.$route.query.id;
    } else {
      if (this.id) {
        this.loadData();
      }
    }

    // 控制显示隐藏
    $on("show-travel-parking-info", (isShow) => {
      this.isShow = isShow;
    });
  },
  methods: {
    loadData() {
      this.parkingInfo = {
        areaName: this.id,
        icon: require("./../../../assets/three-scene/three-person-icon.png"),
        arrInfo: [
          { key: "车位数量", name: "carNumber", value: 365, unit: "个" },
          { key: "已用车位", name: "use", value: 10, unit: "个" },
          { key: "剩余车位", name: "leave", value: 4, unit: "个" },
        ],
      };
    },
  },
};
</script>

<style scoped lang="scss">
.point-popup-parking {
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 428px;
  color: #fff;
  position: absolute;
  .title {
    width: 100%;
    height: 31px;
  }
  .content {
    width: 100%;
    height: 92px;
    padding: 16px;
    background: rgba(45, 57, 87, 0.64);
    border-radius: 0px 8px 8px 8px;
    .info {
      width: 396px;
      height: 56px;
    }
  }
}
</style>
