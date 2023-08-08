<template>
  <div
    class="point-popup-safe-other"
    v-if="isShow && safeInfo"
    v-show="id"
    ref="point-popup-safe-other"
  >
    <div class="important">
      <div class="icon"></div>
      <div class="text">室内重点区域</div>
      <div class="value" v-html="fmt(safeInfo.important, '路')"></div>
    </div>
    <div class="line1"></div>
    <div class="normal">
      <div class="icon"></div>
      <div class="value" v-html="fmt(safeInfo.normal, '路')"></div>
    </div>
    <div class="err">
      <div class="icon"></div>
      <div class="value" v-html="fmt(safeInfo.err, '路')"></div>
    </div>
    <div class="line2"></div>
    <div class="text" @pointerdown="openDialog(id)">详情</div>
  </div>
</template>
<script>
import { $on, $send, $off } from "@/lib/custom-bus";
export default {
  components: {},
  // 点位弹窗
  name: "pointPopupSafeOther",
  props: {
    id: {
      type: String,
      require: false,
    },
  },
  data() {
    return {
      safeInfo: null,
      isShow: false,
    };
  },
  watch: {
    id() {
      this.loadData();
    },
  },
  mounted() {
    if ("point-popup-safe-other" == this.$route.name) {
      this.isShow = true;
      this.id = this.$route.query.id;
    } else {
      if (this.id) {
        this.loadData();
      }
    }
    $on("show-safe-other-info", (isShow) => {
      this.isShow = isShow;
    });
  },
  methods: {
    loadData() {
      this.safeInfo = {
        normal: 998,
        err: 333,
        important: 132,
      };
    },
    openDialog() {
      // 显示 杨yim 弹框
      $send("displaySafeDialog", this.id);

      // 调用父类功能
      this.$emit("buildDetails", this.id);

      $send("displaySafeDialogUe", this.id);

      this.id = "";
    },
  },
};
</script>

<style scoped lang="scss">
.point-popup-safe-other {
  padding: 6px 35px 6px 29px;
  z-index: 3;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  height: 48px;
  position: absolute;
  background-image: url("./../../../assets/three-scene/safe-other.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .important {
    .icon {
      width: 36px;
      height: 36px;
      background-image: url("./../../../assets/three-scene/monitor-normal.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .text {
      min-width: 84px;
      color: rgba(255, 255, 255, 0.7);
      font-family: SourceHanSansCN;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .line1 {
    margin-left: 14px;
    width: 1px;
    height: 19px;
    background: rgba(255, 255, 255, 0.1);
  }

  .normal {
    margin-left: 14px;
    min-width: 65px;
    height: 100%;
    .icon {
      width: 8px;
      height: 8px;
      background-color: #00ffe0;
      border-radius: 50%;
    }
    .value {
      margin-left: 8px;
    }
  }

  .err {
    margin-left: 12px;
    min-width: 65px;
    height: 100%;
    .icon {
      margin-left: 8px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #ff5e5e;
    }
    .value {
      margin-left: 8px;
    }
  }

  .line2 {
    margin-left: 14px;
    width: 1px;
    height: 19px;
    background: rgba(255, 255, 255, 0.1);
  }

  .text {
    margin-left: 14px;
    color: #00ffe0;
    font-family: SourceHanSansCN;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 1.12px;
  }
}
</style>
