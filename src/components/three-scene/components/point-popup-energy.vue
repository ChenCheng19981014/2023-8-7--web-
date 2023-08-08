<template>
  <!-- 综合态势 -->
  <div class="point-popup-energy" v-if="isShow && eneryInfo" v-show="id">
    <div class="title">
      <pointPopupTrafficTitle :areaInfo="eneryInfo"></pointPopupTrafficTitle>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="info">
        <pointPopupComprehensiveContent
          :info="eneryInfo.data"
        ></pointPopupComprehensiveContent>
      </div>
      <!-- 能耗 -->
      <div class="consume">
        <pointPopupEnergyConsume
          :class="'consume_' + _"
          v-for="(i, _) in eneryInfo.info"
          :info="i"
          :key="_"
        ></pointPopupEnergyConsume>
      </div>
    </div>
  </div>
</template>
<script>
import { $on, $send, $off } from "@/lib/custom-bus";
import pointPopupTrafficTitle from "./point-popup-traffic-title.vue";
import pointPopupComprehensiveContent from "./point-popup-comprehensive-content.vue";
import pointPopupEnergyConsume from "./point-popup-energy-consume.vue";
export default {
  components: {
    pointPopupTrafficTitle,
    pointPopupComprehensiveContent,
    pointPopupEnergyConsume,
  },
  // 综合态势
  name: "pointPopupEnergy",
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
      eneryInfo: {},
      isShow: false,
    };
  },
  mounted() {
    if ("point-popup-energy" == this.$route.name) {
      this.isShow = true;
      this.id = this.$route.query.id;
    } else {
      if (this.id) {
        this.loadData();
      }
    }

    $on("show-energy-info", (isShow) => {
      this.isShow = isShow;
    });
  },
  methods: {
    loadData() {
      this.eneryInfo = {
        areaName: this.id,
        hasLine: true,
        data: [
          {
            name: "电能耗",
            num: 9999.99,
            unit: "kWh",
            icon: require("./../../../assets/three-scene/能耗.png"),
          },
          {
            name: "水能耗 (超纯水)",
            num: 999.99,
            unit: "吨",
            icon: require("./../../../assets/three-scene/能耗.png"),
          },
          {
            name: "能耗 (超纯水)",
            num: 999.99,
            unit: "吨",
            icon: require("./../../../assets/three-scene/能耗.png"),
          },
          {
            name: "能耗 (超纯水)",
            num: 999.99,
            unit: "吨",
            icon: require("./../../../assets/three-scene/能耗.png"),
          },
        ],
      };

      const a = {
        areaName: "8寸工厂",
        hasLine: true,
        data: [
          {
            name: "电能耗",
            num: 9999.99,
            unit: "kWh",
            icon: require("./../../../assets/three-scene/three-person-icon.png"),
          },
          {
            name: "水能耗 (超纯水)",
            num: 999.99,
            unit: "吨",
            icon: require("./../../../assets/three-scene/three-car-icon.png"),
          },
          {
            name: "shit能耗 (超纯水)",
            num: 999.99,
            unit: "吨",
            icon: require("./../../../assets/three-scene/three-car-icon.png"),
          },
          {
            name: "shit能耗 (超纯水)",
            num: 999.99,
            unit: "吨",
            icon: require("./../../../assets/three-scene/three-car-icon.png"),
          },
        ],
        info: [
          {
            title: "水能耗",
            arr: [
              { name: "市政水", num: 5206.1, unit: "吨" },
              { name: "超纯水", num: 5206.1, unit: "吨" },
              { name: "4M", num: 5206.1, unit: "吨" },
            ],
          },
          {
            title: "电能耗",
            arr: [
              { name: "市政水", num: 5206.1, unit: "吨" },
              { name: "超纯水", num: 5206.1, unit: "吨" },
              { name: "4M", num: 5206.1, unit: "吨" },
              { name: "4M", num: 5206.1, unit: "吨" },
            ],
          },
        ],
      };
    },
  },
};
</script>

<style scoped lang="scss">
.point-popup-energy {
  z-index: 3;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  // left:-1000px;
  .title {
    width: 100%;
    height: 31px;
  }
  .content {
    padding: 16px;
    background: rgba(45, 57, 87, 0.64);
    border-radius: 0px 8px 8px 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(7px);

    .consume {
      width: 100%;
    }

    .consume > div:first-child {
      margin-top: 32px;
    }
  }
}
</style>
