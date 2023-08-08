<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .scene {
    width: 100%;
    height: 100%;
    > div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<template>
  <fit-layout :width="fish ? fishWidth : commonWidth">
    <div class="index">
      <KeepAlive>
        <component :is="showScene"></component>
      </KeepAlive>
      <custom-header></custom-header>
      <custom-footer></custom-footer>
      <router-view></router-view>
      <back-button></back-button>
    </div>
  </fit-layout>
</template>

<script>
import customHeader from "./components/custom-header.vue";
import customFooter from "./components/custom-footer.vue";
import zhongHuan from "./../../components/three-scene/zhonghuan/index.vue";
import jiangYing from "./../../components/three-scene/jiangying/index.vue";
import { $on, $send, $off } from "@/lib/custom-bus";
import backButton from "./components/back-button.vue";
export default {
  data() {
    return {
      commonWidth: 1920,
      fishWidth: 3840,
      isUe: process.env.VUE_APP_BASE_IS_UE,
      showScene: "",
    };
  },
  components: {
    customHeader,
    customFooter,
    backButton,
    zhongHuan,
    jiangYing,
  },
  created() {
    $on("over-view", () => {
      this.$router.replace({ name: "overview" });
    });

    // 3d-切换场景
    $on("show-scene", (where) => {
      // 显示对应场景
      this.showScene = where;

      // 冻结场景
      if (where === "jiangYing") {
        $on("freeze-jiangYing", true);
        $on("freeze-zhonghuan", false);
      } else {
        $on("freeze-jiangYing", false);
        $on("freeze-zhonghuan", true);
      }

      console.log("where:", where, this.showScene);
    });

    // 3d-切换到地图
    $on("map", () => {
      this.showScene = "jiangYing";
    });
  },
  mounted() {
    // 判断初始化 展示那个场景
    this.showScene = this.$route.path === "/map" ? "jiangYing" : "zhongHuan";
  },
  destroyed() {
    $off("over-view");
  },
};
</script>
