<template>
  <div class="point-popup-AI" v-if="isShow && aIInfo">
    <pointPopupCameraTitle :info="aIInfo"></pointPopupCameraTitle>
    <div class="content">
      <div class="tab">
        <div
          :class="{ selected: _ === selectedIndex }"
          v-for="(i, _) in ['监控画面', '告警事件']"
          @pointerdown="showTab(i, _)"
        >
          {{ i }}
        </div>
      </div>
      <div class="screen" v-show="selectedIndex == 0">
        <pointPopupVideo :info="aIInfo"></pointPopupVideo>
      </div>
      <div class="event" v-show="selectedIndex == 1">
        <div class="fn">
          <div class="left">
            <div class="key">事件:</div>
            <div class="value">{{ aIInfo.errorEvent.event }}</div>
          </div>
          <div class="right">
            <div class="what">{{ aIInfo.errorEvent.what }}</div>
            <div class="line"></div>
            <div class="level">
              <span>{{ aIInfo.errorEvent.level }}</span>
            </div>
          </div>
        </div>
        <div class="position">
          <div class="key">地点:</div>
          <div class="value">{{ aIInfo.errorEvent.position }}</div>
        </div>
        <div class="time">
          <div class="key">时间:</div>
          <div class="value">{{ aIInfo.errorEvent.time }}</div>
        </div>
        <div class="img">
          <div class="upper-right">
            <div>{{ aIInfo.errorEvent.eventsState }}</div>
          </div>
          <img :src="aIInfo.errorEvent.img" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pointPopupCameraTitle from "./point-popup-camera-title.vue";
import pointPopupVideo from "./point-popup-video.vue";
import { $on, $send, $off } from "@/lib/custom-bus";
export default {
  components: {
    pointPopupCameraTitle,
    pointPopupVideo,
  },
  // 点位弹窗
  name: "point-popup-AI",
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
      aIInfo: null,
      selectedIndex: 0,
      isShow: false,
    };
  },
  mounted() {
    //職權專用
    if ("point-popup-AI" == this.$route.name) {
      this.isShow = true;
      this.id = this.$route.query.id;
    } else {
      if (this.id) {
        this.loadData();
      }
    }
    // 控制显示隐藏
    $on("show-ai-info", (isShow) => {
      this.isShow = isShow;
    });
  },
  methods: {
    loadData() {
      this.aIInfo = {
        type: "Al",
        state: true,
        title: "Al点位-001",
        position: "12寸南边道路3（行为规范拍摄）",
        errorEvent: {
          img:
            "https://imgessl.kugou.com/mvhdpic/400/20230725/20230725112015213050.jpg",
          event: "人员聚集",
          what: "人行违规",
          level: "一般",
          position: "综合楼",
          time: "2023-07-18 09:14:56",
          eventsState: "待处理",
        },
        src:
          "https://mvwebfs.ali.kugou.com/202307251308/19ac3971dfed39a2d967dbcb78e2281f/KGTX/CLTX002/767117f5654e90b6c6d90cb5f8816c68.mp4",
      };
      console.log("加载数据");
    },
    showComs() {
      this.isShow = false;
    },
    showTab(i, index) {
      this.selectedIndex = index;
    },
  },
};
</script>

<style scoped lang="scss">
.point-popup-AI {
  z-index: 3;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 383px;
  color: #fff;
  background: rgba(0, 0, 0, 0.2);

  .content {
    width: 100%;
    margin: 8px 20px 0px 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    .tab {
      width: 341px;
      height: 28px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 86px;
        height: 100%;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .selected {
        position: relative;
        background: var(--10, rgba(255, 255, 255, 0.1));
      }

      .selected::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 34px;
        height: 2px;
        background-color: rgba(0, 255, 133, 1);
      }
    }

    .screen {
      margin-top: 8px;
      width: 341px;
      height: 200px;
      position: relative;
    }

    .event {
      padding: 0px 20px 20px 20px;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      .fn {
        margin-top: 13px;
        width: 100%;
        height: 22px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        > div {
          flex: 1;
        }
        .left {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .key {
            width: 42px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
            font-weight: 400;
          }
          .value {
            color: #fff;
            font-size: 14px;
            font-weight: 500;
          }
        }
        .right {
          display: flex;
          justify-content: flex-end;
          align-items: center;

          .what {
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            margin-right: 14.5px;
          }

          .line {
            width: 1px;
            height: 12px;
            margin-right: 14.5px;
            background-color: rgba(255, 255, 255, 0.3);
          }

          .level {
            display: flex;
            align-content: center;
            justify-content: center;
            width: 44px;
            height: 22px;
            border-radius: 4px;
            border: 1px solid #76ffe9;
            background: rgba(43, 178, 189, 0.5);
            box-shadow: 0px 0px 8px 0px #22ffd7 inset;
            font-size: 14px;
          }
        }
      }

      .position {
        margin-top: 10px;
        width: 100%;
        height: 22px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .key {
          width: 42px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          font-weight: 400;
        }
        .value {
          color: #fff;
          font-size: 14px;
          font-weight: 500;
        }
      }

      .time {
        margin-top: 10px;
        width: 100%;
        height: 22px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .key {
          width: 42px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          font-weight: 400;
        }
        .value {
          color: #fff;
          font-size: 14px;
          font-weight: 500;
        }
      }

      .img {
        margin-top: 13px;
        width: 341px;
        height: 200px;
        flex-shrink: 0;
        position: relative;

        > img {
          width: 100%;
          height: 100%;
        }

        .upper-right {
          width: 74.5px;
          height: 25.9px;
          position: absolute;
          top: 0;
          right: 0;
          color: #fff;
          font-size: 12px;
          background-image: url("./../../../assets/three-scene/带处理右上角.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          > div {
            margin-right: 5.88px;
          }
        }
      }
    }
  }
}
</style>
