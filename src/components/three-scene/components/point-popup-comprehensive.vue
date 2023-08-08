<template>
  <!-- 综合态势 -->
  <div class="point-popup-comprehensive" v-if="isShow && comprehensiveInfo">
    <div class="title">
      <pointPopupTrafficTitle
        :areaInfo="comprehensiveInfo"
      ></pointPopupTrafficTitle>
    </div>
    <div class="content">
      <div class="info">
        <pointPopupComprehensiveContent
          :info="comprehensiveInfo.data"
        ></pointPopupComprehensiveContent>
      </div>
    </div>
  </div>
</template>
<script>
import { $on, $send, $off } from "@/lib/custom-bus";
import pointPopupTrafficTitle from "./point-popup-traffic-title.vue";
import pointPopupComprehensiveContent from "./point-popup-comprehensive-content.vue";
export default {
  watch: {
    id() {
      this.loadData();
    },
  },
  props: {
    id: {
      type: String,
      require: false,
    },
  },
  components: {
    pointPopupTrafficTitle,
    pointPopupComprehensiveContent,
  },
  // 综合态势
  name: "pointPopupComprehensive",

  data() {
    return {
      comprehensiveInfo: null,
      isShow: false,
      arr: {
        东门: {
          areaName: this.id,
          data: [
            {
              name: "入园人数",
              num: 1920,
              unit: "人",
              icon: require("./../../../assets/three-scene/three-person-icon.png"),
            },
            {
              name: "入园车辆",
              num: 525,
              unit: "辆",
              icon: require("./../../../assets/three-scene/three-car-icon.png"),
            },
          ],
        },
        北门: {
          areaName: this.id,
          data: [
            {
              name: "入园人数",
              num: 1920,
              unit: "人",
              icon: require("./../../../assets/three-scene/three-person-icon.png"),
            },
            {
              name: "入园车辆",
              num: 525,
              unit: "辆",
              icon: require("./../../../assets/three-scene/three-car-icon.png"),
            },
          ],
        },
        西南门: {
          areaName: this.id,
          data: [
            {
              name: "入园人数",
              num: 920,
              unit: "人",
              icon: require("./../../../assets/three-scene/three-person-icon.png"),
            },
            {
              name: "入园车辆",
              num: 525,
              unit: "辆",
              icon: require("./../../../assets/three-scene/three-car-icon.png"),
            },
          ],
        },
        东南门: {
          areaName: this.id,
          data: [
            {
              name: "入园人数",
              num: 1920,
              unit: "人",
              icon: require("./../../../assets/three-scene/three-person-icon.png"),
            },
            {
              name: "入园车辆",
              num: 525,
              unit: "辆",
              icon: require("./../../../assets/three-scene/three-car-icon.png"),
            },
          ],
        },
      },
    };
  },

  mounted() {
    if ("point-popup-comprehensive" == this.$route.name) {
      this.isShow = true;
      this.id = this.$route.query.id;
    } else {
      if (this.id) {
        this.loadData();
      }
    }
    // 控制显示隐藏
    $on("show-comprehensive-info", (isShow) => {
      this.isShow = isShow;
    });
  },
  methods: {
    loadData() {
      console.log(this.id, "this.id-----");
      if (this.arr[this.id]) {
        this.comprehensiveInfo = this.arr[this.id];
        this.$set(this.arr[this.id], "areaName", this.id);
      } else {
        this.comprehensiveInfo = {
          areaName: this.id,
          data: [
            {
              name: "通行人数",
              num: 1920,
              unit: "人",
              icon: require("./../../../assets/three-scene/three-person-icon.png"),
            },
          ],
        };
      }
      return;
      this.comprehensiveInfo = {
        areaName: this.id,
        data: [
          {
            name: "入园人数",
            num: 1920,
            unit: "人",
            icon: require("./../../../assets/three-scene/three-person-icon.png"),
          },
          {
            name: "入园车辆",
            num: 525,
            unit: "辆",
            icon: require("./../../../assets/three-scene/three-car-icon.png"),
          },
        ],
      };
    },
  },
};
</script>
<style scoped lang="scss">
.point-popup-comprehensive {
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  position: absolute;
  // left: -10000px;
  .title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .content {
    width: 100%;
    padding: 16px;
    background: rgba(45, 57, 87, 0.64);
    border-radius: 0px 8px 8px 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(7px);

    .info {
      min-height: 60px;
    }
  }
}
</style>
