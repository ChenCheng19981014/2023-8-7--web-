<template>
  <div
    class="three-scene-jiangying"
    ref="three-scene-jiangying"
    onselectstart="return false;"
  >
    <Load v-show="!loadingEnd"></Load>

    <div @pointerdown="(e) => e.stopPropagation()" class="btn"></div>
  </div>
</template>

<script>
// chang 事件 实例
let sceneChange = null;
// 场景
let scene = null;
import Engine from "run-scene-v2";
import store from "./../../../store/index";
import * as THREE from "three";
import { fn } from "./Change";
import { $on, $send, $off } from "@/lib/custom-bus";
import Load from "./../components/load/index.vue";

const { RunScene, Utils } = Engine;
export default {
  name: "jiangying",
  components: {
    Load,
  },
  data() {
    return {
      loadingEnd: false,
      path:
        // "http://192.168.3.8:8080/file?path=project/linkpoint/&key=202305251349294774921001202358",
        // "http://192.168.3.8:8080/file?path=project/linkpoint/&key=202305251349294774921001202358",
        "./assets/s1.glb",
    };
  },
  activated() {
    $send("backJiangYing", "默认");
  },
  async mounted() {
    const runScene = await this.loadScene(this.path);
    // 加载场景

    // 打印点击的模型接口
    $on("logClickModel-jiangying", this.logClickModel);

    // 场景加载完回调
    runScene.on("loaded", () => {
      this.resize(store.state.fitLayoutRatio, scene);

      // this.$refs["three-scene-jiangying"].classList.add("show");

      this.$emit("load");

      fn(
        scene,
        {
          Utils,
          Three: THREE,
        },
        {}
      );

      this.onDone();
    });

    // 场景运行状态
    $on("sceneRunning1", (isRuning) => {
      this.isRuning = isRuning;
    });

    // 场景是否冻结
    $on("freeze-jiangying", this.freezeScene);

    console.log("江阴初始化");

    // 背景
    this.setBgc(scene);
  },
  methods: {
    async setBgc(runScene) {
      const dom = runScene.assetsEx.engineDom;
      const backgroudDom = document.createElement("div");
      backgroudDom.style.position = "absolute";
      backgroudDom.style.left = "50%";
      backgroudDom.style.top = "50%";
      backgroudDom.style.transform = "translate(-50%,-50%)";
      backgroudDom.style.width = "100%";
      backgroudDom.style.height = "100%";
      dom.appendChild(backgroudDom);
      backgroudDom.style.backgroundRepeat = "no-repeat";
      backgroudDom.style.backgroundSize = "100% 100%";
      backgroudDom.classList.add("bgc");
    },
    freezeScene(isfreeze) {
      scene.globalConfig.setState(isfreeze);
    },
    // 加载场景
    loadScene(path) {
      scene = new RunScene({
        render2: true,
        render3: true,
        renderConfig: {
          // 是否允许设置模型位置后自动渲染最新效果
          matrixAutoUpdate: true,
          scriptFrame: 60,
          event: {
            ignores: ["resize"],
          },
        },
      }).load({
        path: path,
        dom: this.$refs["three-scene-jiangying"],
      });

      scene.setSize(3040, 1040);

      return scene;
    },

    openDialog(item, event, type) {
      this.$store.state.innerType1 = type.split("_")[0];
      scene?.cb.controls.change.add("setDialogPosition", () => {
        if (!this.isRuning) return;
        $send("set-position-dialogThree", item, event);
      });

      // 设置 唯一dom位置
      $send("set-position-dialogThree", item, event);

      $send("set-state-dialogThree", true);
    },

    // 自适应
    resize: (x, runScene) => {
      let map = runScene.assetsEx.engineDom.getBoundingClientRect();
      runScene.setSize(map.width / x, map.height / x);
    },

    // 加载完回调
    onDone() {
      this.loadingEnd = true;
      // console.log("场景加载完毕~");
    },

    // 快照
    snapshot(name) {
      $send("snapShotFn", name);
    },

    // 打印点击到的模型
    logClickModel(model) {
      console.log("第一场景点击的模型为:", model.name);
    },
  },
  // 场景自带销毁
  destroyed() {
    sceneChange && sceneChange.dispose();
  },
};
</script>

<style lang="scss" scoped>
// 场景
.three-scene-jiangying {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: auto;
}

.three-scene-jiangying .btn {
  position: absolute;
  z-index: 3;
}

.three-scene-jiangying .show {
  opacity: 1 !important;
}

.three-scene-jiangying .block {
  display: block !important;
}

.three-scene-jiangying .none {
  display: none;
}

.showOpacity {
  opacity: 1 !important;
}

:deep(.bgc) {
  z-index: 2;
  pointer-events: none;
  background-image: url("./../../../assets/three-scene/scene-mask.png");
}
</style>
