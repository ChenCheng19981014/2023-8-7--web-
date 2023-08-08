<template>
  <div class="point-popup-factory" v-if="isShow && factoryInfo" v-show="id">
    <div class="title">
      <pointPopupTrafficTitle :areaInfo="factoryInfo"></pointPopupTrafficTitle>
    </div>
    <div class="content">
      <div class="info">
        <pointPopupInfoContent :info="factoryInfo"></pointPopupInfoContent>
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
  name: "pointPopupFactory",
  props: {
    id: {
      type: String,
      require: false,
    },
  },
  watch: {
    id() {
      this.loadData();
    },
  },
  data() {
    return {
      factoryInfo: null,
      isShow: false,
    };
  },
  mounted() {
    if ("point-popup-factory" == this.$route.name) {
      this.isShow = true;
      this.id = this.$route.query.id;
    } else {
      if (this.id) {
        this.loadData();
      }
    }

    // 控制显示隐藏
    $on("show-travel-build-info", (isShow) => {
      this.isShow = isShow;
    });
  },
  methods: {
    loadData() {
      this.factoryInfo = {
        areaName: this.id,
        icon: require("./../../../assets/three-scene/three-car-icon.png"),
        arrInfo: [
          { key: "通行人数", name: "person", value: 365, unit: "辆" },
          { key: "员工", name: "staff", value: 10, unit: "人" },
          { key: "相关方", name: "InterestedParty", value: 4, unit: "人" },
          { key: "访客", name: "visitor", value: 4, unit: "人" },
        ],
      };
    },
  },
};
</script>

<style scoped lang="scss">
.point-popup-factory {
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 494px;
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
      width: 462px;
      height: 56px;
    }
  }
}
</style>
