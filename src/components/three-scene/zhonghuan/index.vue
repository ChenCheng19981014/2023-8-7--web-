<template>
  <div
    class="three-scene-zhonghuan"
    ref="three-scene-zhonghuan"
    onselectstart="return false;"
  >
    <Load v-show="!loadingEnd"></Load>
    <div
      @pointerdown="
        (e) => {
          e.stopPropagation();
        }
      "
      class="btn"
    ></div>

    <!-- 大门看板 -->
    <div
      v-show="loadingEnd"
      :class="`door_sprite ` + ` door_${i}`"
      v-for="(i, _) in allDoor"
      @pointerdown="doorEvents(i)"
    >
      <div class="top">
        <div>{{ i }}</div>
      </div>
      <div class="bottom">
        <div></div>
      </div>
    </div>

    <!-- 倒三角厂房点位弹窗 也有综合态势 -->
    <div
      v-show="loadingEnd"
      class="top-card"
      v-for="(i, index) in workshopSprite"
      :class="
        'workshop_' +
          i.replace('#', '') +
          `${topCard == index ? ' selected' : ''}`
      "
      @pointerdown.prevent="selectWorkShop(i, $event, index)"
    >
      <div class="triangle"></div>
      <div class="name ">
        <div class="text">{{ i }}</div>
      </div>
    </div>

    <!-- 摄像头图标 -->
    <div
      v-for="(val, key, index) in cameraInfo"
      v-show="loadingEnd"
      :class="
        `${val.class} ` +
          `camera_${val.type} ` +
          `camera_info_sprite ` +
          `${
            selectedCameraIndex === index
              ? val.type === 'ai'
                ? 'ai-selected '
                : 'monitor-selected '
              : ''
          }` +
          `${val.type}_camera_${val.state}`
      "
      :key="key"
      @pointerdown="selectedCameraFn(val, index, $event)"
    ></div>

    <!-- 门禁图标 -->
    <div
      v-show="loadingEnd"
      :class="
        `door-control ` +
          `door-control-${i} ` +
          `${selectedDoorControlIndex === index ? 'door-control-selected' : ''}`
      "
      @pointerdown="selectedDoorControl(i, index)"
      v-for="(i, index) in doorControl"
    ></div>

    <!-- 便捷交通 门禁 -->
    <pointPopupDoor
      class="travel_door_control"
      :id="travelDoorControlId"
    ></pointPopupDoor>

    <!-- 摄像机 弹框 -->
    <pointPopupCamera
      class="camera_sprite_popup"
      :id="normalCameraId"
    ></pointPopupCamera>

    <!--摄像机 Ai弹框 -->
    <pointPopupAl class="camera_ai_popup" :id="aiId"></pointPopupAl>

    <!-- 综合态势 大门  -->
    <pointPopupComprehensive
      class="comprehensive_popup"
      :id="comprehensiveDoorId"
    ></pointPopupComprehensive>

    <!-- 安防 大门  便捷交通共用-->
    <pointPopupSafe
      class="safe_door"
      ref="safe_door"
      :id="safeDoorId"
    ></pointPopupSafe>

    <!-- 安防 其他楼栋区域 -->
    <pointPopupSafeOther
      ref="safe_other"
      class="safe_other"
      :id="safeOtherId"
      @buildDetails="buildDetails"
    >
    </pointPopupSafeOther>

    <!-- 便捷交通其他栋楼 -->
    <pointPopupFactory
      class="travel_build"
      :id="travelBuildId"
    ></pointPopupFactory>

    <!-- 便捷交通 停车场 -->
    <pointPopupParking
      class="travel_parking"
      :id="travelParkingId"
    ></pointPopupParking>

    <!-- 能源管理 -->
    <pointPopupEnergy class="energy_sprite" :id="energyId"></pointPopupEnergy>
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
import pointPopupComprehensive from "./../components/point-popup-comprehensive.vue";
import pointPopupSafe from "./../components/point-popup-safe.vue";
import pointPopupCamera from "./../components/point-popup-camera.vue";
import pointPopupAl from "./../components/point-popup-AI.vue";
import pointPopupSafeOther from "./../components/point-popup-safe-other.vue";
import pointPopupFactory from "./../components/point-popup-factory.vue";
import pointPopupParking from "./../components/point-popup-parking.vue";
import pointPopupDoor from "./../components/point-popup-door.vue";
import pointPopupEnergy from "./../components/point-popup-energy.vue";
import Load from "./../components/load/index.vue";
const { RunScene, Utils } = Engine;
export default {
  name: "zhongHuan",
  components: {
    pointPopupEnergy,
    pointPopupDoor,
    pointPopupComprehensive,
    pointPopupSafe,
    pointPopupCamera,
    pointPopupAl,
    pointPopupSafeOther,
    pointPopupFactory,
    pointPopupParking,
    Load,
  },
  data() {
    return {
      lastClickWorkShopName: false,
      loadingEnd: false,
      energyId: "",
      travelDoorControlId: "",
      travelBuildId: "",
      travelParkingId: "",
      selectedId: "",
      normalCameraId: "",
      aiId: "",
      comprehensiveDoorId: "",
      safeDoorId: "",
      safeOtherId: "",
      // 安防 其他信息
      safeOtherInfo: {
        normal: 998,
        err: 333,
        important: 132,
      },
      // 第二场景的当前tab选择  overview safe travel energy device
      currentState: "overview",
      // 相机选中后样式
      selectedCameraIndex: -1,
      // 相机点位
      cameraPoint: [],
      // 相机的信息
      cameraInfo: {},
      // 门禁点位
      doorControl: [
        "门禁1",
        "门禁2",
        "门禁3",
        "门禁4",
        "门禁5",
        "门禁6",
        "门禁7",
        "门禁8",
        "门禁9",
      ],
      selectedDoorControlIndex: -1,
      // ai 设想点位
      aiCameraPoint: [24, 38, 52, 57, 167],
      // 选中定牌弹出  id样式索引
      topCard: -1,
      // 大门
      door: ["东门", "北门", "西南门", "东南门"],
      allDoor: [
        "东门",
        "北门",
        "西南门",
        "东南门",
        "南面停车场",
        "北面停车场",
        "新8寸停车场",
        "老8寸停车场",
      ],
      park: ["南面停车场", "北面停车场", "新8寸停车场", "老8寸停车场"],
      // 厂房点位
      workshopSprite: [
        "8#仓库",
        "6#仓库",
        "7#仓库",
        "污水站",
        "12寸工厂",
        "CUB",
        "8寸工厂",
        "综合楼",
        "柴发站",
        "大宗气站",
        "制氮站",
        "制氢站",
        "氢气站",
        "新8寸",
      ],
      // 综合态势 大门
      comprehensiveDoorInfo: [],
      //综合态势 其他楼
      comprehensiveOtherBuildInfo: [],
      // 上个 厂房顶牌 dom
      lastWorkShopDom: null,
      path:
        "http://192.168.3.8:8080/file?path=project/linkpoint/&key=202307111031436395271001202328",
      // "http://192.168.3.8:8080/file?path=project/linkpoint/&key=202308041558142138221001202388",
      // "http://192.168.3.8:8080/file?path=project/linkpoint/&key=202307111031436395271001202328",
      // "./assets/s2.glb",
    };
  },
  activated() {
    $send("back");
    // 初始 综合态势
    this.initOverview();
  },
  async mounted() {
    // return;
    // 获取相机的信息
    this.getCameraInfo();

    // 加载场景
    this.load();

    // 注册bus
    this.bus();

    // 遮罩
    this.setBgc(scene);
  },
  methods: {
    //  页面上的 点击 5个大门  效果
    doorEvents(name) {
      // 区域的动画
      $send("camera-anima-zhonghuan", name);

      // 不可点击相同的 顶牌2次
      if (this.lastClickWorkShopName === name) return;

      // 根据当前的状态 显示对应的看板
      if (this.currentState === "overview") {
        $send("web-click-comprehensive", name);
      } else if (this.currentState === "safe") {
        $send("clickSafeModel", name);
      } else if (this.currentState === "energy") {
        // 停车场
        if (this.park.includes(name)) {
          $send("closeEnergySprite", name);
          $send("web-click-energy", name);
        }
        // if (name === "2号停车场") {
        //   $send("closeEnergySprite", name);
        //   $send("web-click-energy", name);
        // }
      } else if (this.currentState === "travel") {
        $send("clickSafeModel", name);
        // 停车场
        if (this.park.includes(name)) {
          $send("clickParking", name);
        }

        // if (name === "2号停车场") {
        //   $send("clickParking", name);
        // }
      } else if (this.currentState === "device") {
      }

      this.lastClickWorkShopName = name;
    },

    // 场景事件
    bus() {
      // 清除点击到的 模型顶牌
      $on("clear-lastClickWorkShopName", (name) => {
        this.lastClickWorkShopName = name;
      });

      // 打印点击的模型接口
      $on("logClickModel-zhonghuan", this.logClickModel);

      // 场景是否冻结
      $on("freeze-zhonghuan", this.freezeScene);

      // 综合态势
      $on("overview", () => {
        this.currentState = "overview";
        this.changeRouterCloseFn();
        $send("show-camera-sprite-three", false);
        $send("show-camera-ai-sprite-three", false);
        $send("show-travel-doorControl-sprite-three", false);
        $send("area-sprite-door", true);
        $send("showParking", false);
        $send("showOtherParking", false);
        $send("showCurrentSprite", "overview");
        // 大门的ui显示隐藏
        $send("area-sprite-door", true);

        console.log("3d-综合态势");
        // 路由切换事件
        this.changeRouterFn();
      });
      $on("safe", () => {
        this.currentState = "safe";
        this.changeRouterCloseFn();
        $send("show-camera-sprite-three", true);
        $send("show-camera-ai-sprite-three", false);
        $send("show-travel-doorControl-sprite-three", false);
        $send("showParking", false);
        $send("showOtherParking", false);
        $send("area-sprite-door", true);
        // 大门的ui显示隐藏
        $send("area-sprite-door", true);
        $send("showCurrentSprite", "safe");

        // 路由切换事件
        this.changeRouterFn();
        console.log("3d-园区安防");
      });
      $on("travel", () => {
        this.currentState = "travel";
        this.changeRouterCloseFn();
        $send("show-camera-sprite-three", false);
        $send("show-camera-ai-sprite-three", true);
        $send("show-travel-doorControl-sprite-three", true);
        console.log("3d-便携通行");
        $send("showParking", true);
        $send("showOtherParking", true);
        $send("showCurrentSprite", "travel");
        $send("area-sprite-door", true);
        // 大门的ui显示隐藏
        $send("area-sprite-door", true);
        // 路由切换事件
        this.changeRouterFn();
      });
      $on("energy", () => {
        this.currentState = "energy";
        this.changeRouterCloseFn();
        $send("show-travel-doorControl-sprite-three", false);
        $send("show-camera-ai-sprite-three", false);
        $send("show-camera-sprite-three", false);
        $send("showParking", true);
        $send("area-sprite-door", false);
        $send("showOtherParking", false);
        // 大门的ui显示隐藏
        $send("area-sprite-door", false);
        $send("showCurrentSprite", "energy");

        // 路由切换事件
        this.changeRouterFn();
        console.log("3d-能源管理");
      });
      $on("device", () => {
        this.currentState = "device";
        this.changeRouterCloseFn();
        // 路由切换事件
        this.changeRouterFn();
        console.log("3d-设备管理");
        $send("showCurrentSprite", "device");
      });

      $on("updateNormalCameraId", (id) => (this.normalCameraId = id));

      $on("updateAiId", (id) => (this.aiId = id));

      $on("updateComprehensiveDoorId", (id) => (this.comprehensiveDoorId = id));

      $on("updatesSafeDoorId", (id) => (this.safeDoorId = id));

      $on("updatesSafeOtherId", (id) => (this.safeOtherId = id));

      $on("updatesTravelBuildId", (id) => (this.travelBuildId = id));

      $on("updatesTravelParkingId", (id) => (this.travelParkingId = id));

      $on("updatesTravelDoorId", (id) => (this.travelDoorControlId = id));

      $on("updatesEnergyId", (id) => (this.energyId = id));

      // 倒三角选中 模式
      $on("close-topCard", () => (this.topCard = -1));
      // 门禁 选中 模式
      $on(
        "close-selected-doorControl",
        (index) => (this.selectedDoorControlIndex = index)
      );

      // 设置选中的 摄像头id
      $on(
        "set-selected-camera-index",
        (index) => (this.selectedCameraIndex = index)
      );

      // 显示 消防 大门
      $on("show-safe-door", (isShow) => {
        this.showSafe = isShow;
      });

      // 显示 安防其他
      $on("show-safe-other", (isShow) => {
        this.showSafeOther = isShow;
      });

      // 更新摄像头的信息
      $on("refresh-camera-info", (info) => {
        this.defaultMonitorInfo = info;
      });

      // 更新Ai摄像的信息
      $on("refresh-defaultAIInfo-info", (info) => {
        this.defaultAIInfo = info;
      });

      // 更新摄像头的信息
      $on("refresh-comprehensive-info", (info) => {
        this.defaultComprehensive = info;
      });

      // 设置选中的 安防信息 -door
      $on("set-selected-safe-door-info", (info) => {
        this.safeDoorInfo = info;
      });

      // 设置选中的 安防信息 -door
      $on("set-selected-safe-other-info", (info) => {
        this.safeOtherInfo = info;
      });
    },

    // 切换路由 事件
    changeRouterFn() {
      // 清空选中 光墙
      $send("set-selected-lightArea", "", true);

      // 相机动画 重置视角
      $send("reset-camera");

      // 设置控制器
      $send("set-controls", true);

      this.lastClickWorkShopName = "";
    },

    // 切换路由隐藏看板
    changeRouterCloseFn() {
      // 关闭部分弹窗
      $send("show-camera-info", false);
      $send("show-ai-info", false);
      $send("show-comprehensive-info", false);
      // 能源
      $send("show-energy-info", false);
      // 摄像头选中 失效
      $send("set-selected-camera-index", -1);

      // 关闭 safe 弹框
      $send("show-safe-info", false);
      // 关闭 safe 其他的弹框
      $send("show-safe-other-info", false);

      // 清空选中的倒三角
      $send("close-topCard");
      // 关闭门禁
      $send("show-travel-doorControl-info", false);

      // 便捷通行 停车场
      $send("show-travel-parking-info", false);
      // 便捷通行 大楼
      $send("show-travel-build-info", false);

      // 清空选中的模型id
      $send("updateNormalCameraId", "");
      $send("updateAiId", "");
      $send("updateComprehensiveDoorId", "");
      $send("updatesSafeDoorId", "");
      $send("updatesSafeOtherId", "");
      $send("updatesTravelBuildId", "");
      $send("updatesTravelParkingId", "");
      $send("updatesTravelDoorId", "");
      // 复原选中的门禁
      $send("close-selected-doorControl");
    },

    //  点击 摄像机图标
    selectedCameraFn(info, index, e) {
      const { id, state } = info;
      // 前端  点击显示对应看板 摄像头
      $send("web-click-camera", id);
      // 前端  点击显示对应看板 ai摄像头
      $send("web-click-camera-ai", id);

      this.lastClickWorkShopName = "";
      // 报警不选中
      if (state === "error") return;
      // 选中样式
      this.selectedCameraIndex = index;
    },

    // 选择 门禁
    selectedDoorControl(name, index) {
      this.selectedDoorControlIndex = index;
      // 点击 门名称
      $send("web-click-door-control", name);
      this.lastClickWorkShopName = "";
    },
    // 点击楼栋详情
    buildDetails(name) {
      $send("set-selected-snapshot", name);
    },

    // 获取相机的信息
    getCameraInfo() {
      // 所有摄像头点位
      new Array(171).fill("").map((_, index) => {
        if (index + 1 <= 9) {
          this.cameraPoint.push(`00${index + 1}`);
        } else if (index + 1 < 100) {
          this.cameraPoint.push(`0${index + 1}`);
        } else {
          this.cameraPoint.push(`${index + 1}`);
        }
      });

      this.cameraPoint.map((point) => {
        this.$set(this.cameraInfo, `camera${point}`, {
          class: `camera_${point}`,
          id: `${point}`,
          state: Math.random() >= 0.5 ? "normal" : "error",
          type: ["024", "038", "052", "057", "167"].includes(point)
            ? "ai"
            : "normal",
        });
      });
    },

    // 加载场景
    async load() {
      // 加载场景
      const runScene = await this.loadScene(this.path);

      // 场景加载完回调
      runScene.on("loaded", () => {
        // 自适应
        this.resize(store.state.fitLayoutRatio, scene);

        // changejs
        fn(scene, { Utils, Three: THREE }, {});

        // 结束回调
        this.onDone();

        console.log("中环初始化-----zhonghuan.vue---570");
      });
    },

    // 加载场景
    loadScene(path) {
      scene = new RunScene({
        render2: true,
        // render3: true,
        // showFps: true,
        material: {
          // load: false,
        },
        instance: {
          enable: true,
          ignoreNames: ["外围-056", "外围-156", "外围-008"],
        },
        texture: {
          // load: false,
        },
        // msg: {
        //   show: true,
        // },
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
        dom: this.$refs["three-scene-zhonghuan"],
      });

      return scene;
    },

    // 初始 综合态势
    initOverview() {
      this.currentState = "overview";
      this.changeRouterCloseFn();
      $send("show-camera-sprite-three", false);
      $send("show-camera-ai-sprite-three", false);
      $send("show-travel-doorControl-sprite-three", false);
      $send("area-sprite-door", true);
      $send("showParking", false);
      $send("showOtherParking", false);
      $send("showCurrentSprite", "overview");
      // 大门的ui显示隐藏
      $send("area-sprite-door", true);

      console.log("3d-综合态势");
      // 路由切换事件
      this.changeRouterFn();
    },

    // 获取当前路由
    getPath() {
      this.currentState = this.$route.name.trim();
    },

    // 选择厂区
    selectWorkShop(workShopName, e, index) {
      const placeName = workShopName.replace("点", "");

      // 区域的动画
      $send("camera-anima-zhonghuan", placeName);

      // 选中的光墙
      $send("set-selected-lightArea", placeName);

      // 弹出的 样式
      this.topCard = index;

      // 清除上个快照
      $send("clear-last-snapShot");

      if (this.lastClickWorkShopName === workShopName) return;

      // 根据当前的状态 显示对应的看板
      if (this.currentState === "overview") {
        // 点击显示对应看板---综合态势
        $send("web-click-comprehensive", workShopName);
        // 更新综合态势 id
        $send("updateComprehensiveDoorId", workShopName);
        //----------------------
        console.log("综合态势");
      } else if (this.currentState === "safe") {
        console.log("安防");

        // 点击显示对应看板---安防
        $send("web-click-safe", workShopName);
      } else if (this.currentState === "energy") {
        // 点击显示对应看板---能源
        $send("web-click-energy", workShopName);
      } else if (this.currentState === "travel") {
        $send("web-click-travel", workShopName);
      } else if (this.currentState === "device") {
      }

      this.lastClickWorkShopName = workShopName;
    },

    // 场景是否冻结
    freezeScene(isfreeze) {
      scene.globalConfig.setState(isfreeze);
    },

    // 打印点击到的模型
    logClickModel(model) {
      console.log("第二场景点击的模型为:", model.name);
    },

    // 自适应
    resize: (x, runScene) => {
      let map = runScene.assetsEx.engineDom.getBoundingClientRect();
      runScene.setSize(map.width / x, map.height / x);
    },

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

    // 加载完回调
    onDone() {
      this.logClickModel = true;
      this.loadingEnd = true;
      // 获取当前路由
      this.getPath();

      console.log("场景加载完毕~");
    },

    openDialog(item, event, type) {
      this.$store.state.innerType1 = type.split("_")[0];
      scene?.cb.controls.change.add("setDialogPosition", () => {
        if (!this.isRuning) return;
        $send("set-position-dialogThree", item, event);
      });
    },
  },
  // 场景自带销毁
  destroyed() {
    scene && scene.dispose();
  },
};
</script>

<style lang="scss" scoped>
// 场景
.three-scene-zhonghuan {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: auto;
}

.camera_normal {
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 3;
  background-image: url("./../../../assets/three-scene/monitor-normal.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 2;
}

.door-control {
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 3;
  background-image: url("./../../../assets/three-scene/control-normal.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 2;
}

.door-control-selected {
  background-image: url("./../../../assets/three-scene/control-selected.png");
}

.monitor-selected {
  background-image: url("./../../../assets/three-scene/monitor-selected.png") !important;
}

.ai-selected {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./../../../assets/three-scene/ai-selected.png") !important;
}

.door_sprite {
  z-index: 3;
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;

  > .top {
    padding: 9px 30px;
    height: 38px;
    background-image: url("./../../../assets/three-scene/door-top.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      font-size: 20px;
      font-weight: 400;
      font-family: "pm" !important;
    }
  }

  .bottom {
    margin-top: 5px;
    width: 137px;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      width: 34px;
      height: 20px;
      background-image: url("./../../../assets/three-scene/door-content.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}

.camera_ai {
  z-index: 2;
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 3;
  background-image: url("./../../../assets/three-scene/ai-normal.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.camera_sprite {
  position: absolute;
}

.normal_camera_error {
  background-image: url("./../../../assets/three-scene/monitor-err.png");
}

.ai_camera_error {
  background-image: url("./../../../assets/three-scene/ai-err.png");
}

.top-card {
  z-index: 2;
  position: absolute;
  z-index: 3;
  height: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: "pm";

  .triangle {
    width: 52px;
    height: 37px;
    background-image: url("./../../../assets/three-scene/标牌默认.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 3;
  }

  .name {
    z-index: 2;
    margin-left: -15px;
    height: 31px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to right, #0131c4, #00ff85);
    border-radius: 3px;
    transform: skewX(-33deg) scaleX(0);
    transform-origin: 0 60%;
    transition: all 0.3s;

    .text {
      font-weight: 400;
      line-height: normal;
      font-family: "pm";
      padding: 8px 30px 8px 30px;
      font-size: 20px;
      text-align: center;
      text-shadow: 0px 0px 3.8214492797851562px 0px #4479e0;
      color: #fff;
      transform: skewX(33deg);
      letter-spacing: 1.6px;
    }
  }

  .triangle:hover + .name {
    transform-origin: 0 60%;
    transform: skewX(-33deg) scaleX(1);
  }

  .name:hover {
    transform-origin: 0 60%;
    transform: skewX(-33deg) scaleX(1);
  }

  .selected + .name {
    transform-origin: 0 60% !important;
    transform: skewX(-33deg) scaleX(1) !important;
  }
}

.selected {
  .name {
    transform-origin: 0 60% !important;
    transform: skewX(-33deg) scaleX(1) !important;
  }
}

.travel_door_control {
  left: -10000px;
  position: absolute;
}

.camera_sprite_popup {
  left: -10000px;
  position: absolute;
}

.camera_ai_popup {
  left: -10000px;
}

.comprehensive_popup {
  left: -10000px;
}

.comprehensive {
  width: 394px;
  height: 92px;
}

.three-scene-zhonghuan .btn {
  position: absolute;
  z-index: 3;
}

.three-scene-zhonghuan .show {
  opacity: 1 !important;
}

.three-scene-zhonghuan .block {
  display: block !important;
}

.three-scene-zhonghuan .none {
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

:deep(.css2dRenderer) {
  z-index: 2;
  // pointer-events: none;
}
</style>
