// const console = {
//   log: () => { }
// }

import { $on, $send, $off } from "@/lib/custom-bus";
const fn = (runScene, inputData = {}, constant = {}) => {
  const fn = (map) => {
    const {
      runScene,
      Utils,
      store,
      core,
      getModel,
      constant,
      bus,
      Three,
      camera,
      scene,
      controls,
      renderer,
    } = map;

    // 场景刷新
    const reflash = () => {
      runScene.sceneEx.aotuOpenUpdate();
    }

    const { } = constant;

    // 场景初始化
    class InitScene {
      name = "initScene";
      mounted() {
        // 脚本
        runScene.script.playAll();
        // 入场动画
        runScene.cameraEx.setTemp("鸟瞰视角", { time: 2 });
      }

      init() { }

      // 蓝图功能
      blueprintFn(name) {
        runScene.graph.runCustom(name);
      }
      // 快照
      snapShotFn(name) {
        // 快照
        runScene.snapshot.set(name);
        // 视角
        runScene.cameraEx.setTemp(name, { time: 1 });
      }
    }

    // 点击事件
    class ClickEvents {
      name = "clickEvents";

      lastCameraModel = null;

      lastComprehensiveModel = null;

      lastAiModel = null;

      lastTravelDoorModel = null;

      lastEnergyModel = null;
      // 场景dom
      dom = null;
      lastTravelParkingModel = null;
      lastTravelBuildModel = null;
      // 安防 大门
      lastSafeDoorModel = null;
      // 安防 其他
      lastSafeOtherModel = null;
      // 综合态势
      comprehensive = [
        "8#仓库",
        "6#仓库",
        "7#仓库",
        "污水站",
        "12寸工厂",
        "CUB",
        "8寸工厂",
        "综合楼",
        "污水站",
        "东门",
        "北门",
        "西南门",
        "东南门",
        '柴发站'
      ];

      // 大门
      door = ["东门点", "北门点", "西南门点", "东南门点"];

      // 模型大门 名称
      modelDoor = ["东门", "北门", "西南门", "东南门"];

      // ai摄像头
      aiCameraPoint = ["024", "038", "052", "057", 167];

      // Ai相机
      aiCamera = ["外围-024", "外围-038", "外围-052", "外围-057", "外围-167"];

      mounted() {
        // 刷新dom
        this.refreshDom();
        // 场景容器
        this.dom = runScene.assetsEx.engineDom;

        // 前端  点击显示对应看板 倒三角 综合态势
        $on("web-click-comprehensive", this.webClickComprehensive.bind(this));

        // 前端 点击显示对应看板 倒三角 安防
        $on("web-click-safe", this.webClickSafe.bind(this));

        // 前端  点击显示对应看板 摄像头
        $on("web-click-camera", this.webClickNormalCamera.bind(this));

        // 前端  点击显示对应看板 ai
        $on("web-click-camera-ai", this.webClickAi.bind(this));

        // 前端  点击显示对应看板 倒三角 便捷交通看板
        $on("web-click-travel", this.webClickTravel.bind(this));

        // 前端  点击显示门禁
        $on("web-click-door-control", this.webClickTravelDoorControl.bind(this));

        // 前端  点击显示对应看板 倒三角 能源看板
        $on("web-click-energy", this.webClickEnergy.bind(this));


        // 后加
        $on('clickSafeModel', this.clickSafeModel.bind(this));

        // 后加
        $on('clickParking', this.clickParking.bind(this));

      }
      //---------------------能源-----------------------------------

      // 能源 模块
      webClickEnergy(name) {
        // 能源模型
        this.lastEnergyModel = getModel(name);

        // 清空之前的数据
        core.camera.closeSprite();

        // 转换位置
        Utils.getMacro(() => {

          // 刷新一帧
          this.refreshEnergyPosition({
            camera,
            model: this.lastEnergyModel,
            outDom: this.dom,
          });

          // 显示隐藏
          $send("show-energy-info", true);

          $send("updatesEnergyId", name);

        }, 300);

      }

      // 刷新能源 面板
      refreshEnergyPosition(map) {
        const doorDom = document.querySelector(`.energy_sprite`);
        if (!doorDom) return;
        const { left: x, top: y } = core.events.get2DVec(map);
        const ps = { x, y };
        this.setPosition(doorDom, ps, true, { py: 50, px: -200 });
      }

      //---------------------便捷通行-----------------------------------

      // 便捷通行 点击门禁
      webClickTravelDoorControl(name) {
        // 清空之前的数据
        core.camera.closeSprite();

        this.lastTravelDoorModel = getModel(name);

        $send("updatesTravelDoorId", name);

        // 显示隐藏
        $send("show-travel-doorControl-info", true);
        // 转换位置
        Utils.getMacro(() => {

          // 刷新一帧
          this.refreshTravelDoorPosition({
            camera,
            model: this.lastTravelDoorModel,
            outDom: this.dom,
          });

        }, 100);
      }

      refreshTravelDoorPosition(map) {
        const doorDom = document.querySelector(`.travel_door_control`);
        if (!doorDom) return;
        const { left: x, top: y } = core.events.get2DVec(map);
        const ps = { x, y };
        this.setPosition(doorDom, ps, true, { py: 24, px: 24 });
      }

      // 便捷通行  前端点击 
      webClickTravel(name) {
        // 清空之前的数据
        core.camera.closeSprite();

        this.clickTravelBuild(name);

      }

      // 便捷通行  大楼
      clickTravelBuild(name) {

        this.lastTravelBuildModel = getModel(name);

        // 显示隐藏
        $send("show-travel-build-info", true);
        // 转换位置
        Utils.getMacro(() => {
          // 刷新一帧
          this.refreshTravelBuildPosition({
            camera,
            model: this.lastTravelBuildModel,
            outDom: this.dom,
          });

          // 更新 安防大门id
          $send("updatesTravelBuildId", name);

        }, 100);

        console.log("safe-travel-build:", name);
      }

      refreshTravelBuildPosition(map) {
        const eneryDom = document.querySelector(`.travel_build`);
        if (!eneryDom) return;
        const { left: x, top: y } = core.events.get2DVec(map);
        const ps = { x, y };
        this.setPosition(eneryDom, ps, true, { py: 50, px: -150 });
      }

      // 点击 通行 停车场
      clickParking(name) {
        this.lastTravelParkingModel = getModel(name);

        // 清空之前的数据
        core.camera.closeSprite();

        // 更新 安防大门id
        $send("updatesTravelParkingId", name);

        // 显示隐藏
        $send("show-travel-parking-info", true);
        // 转换位置
        Utils.getMacro(() => {
          // 刷新一帧
          this.refreshTravelParkingPosition({
            camera,
            model: this.lastTravelParkingModel,
            outDom: this.dom,
          });

        }, 100);

        console.log("safe-click-travel-parking:", name);
      }

      refreshTravelParkingPosition(map) {
        const eneryParkDom = document.querySelector(`.travel_parking`);
        if (!eneryParkDom) return;
        const { left: x, top: y } = core.events.get2DVec(map);
        const ps = { x, y };
        this.setPosition(eneryParkDom, ps, true, { py: 100, px: -150 });
      }

      //---------------------安防-----------------------------------

      // 点击  安防
      webClickSafe(name) {
        // 清空之前的数据
        core.camera.closeSprite();

        this.door.includes(name) ? "" : this.safeOther(name);
      }

      // 点击 安防模型
      clickSafeModel(name) {

        if (!this.modelDoor.includes(name)) return;

        // 清空之前的数据
        core.camera.closeSprite();

        // 清除 上个墙
        core.areaLight.showLight('', true);

        // 点击安防大楼
        this.safeDoor(name);

        // 清除倒三角
        $send('close-topCard')

        // 清除上个快照
        $send("clear-last-snapShot");
      }

      // 点击  安防 大门
      safeDoor(name) {
        this.lastSafeDoorModel = getModel(name);

        // 转换位置
        Utils.getMacro(() => {

          // 更新 安防大门id
          $send("updatesSafeDoorId", name);

          // 显示隐藏
          $send("show-safe-info", true);

          // 刷新一帧
          this.refreshSafeDoorPosition({
            camera,
            model: this.lastSafeDoorModel,
            outDom: this.dom,
          });

        }, 200);

        console.log("safe-door:", name);
      }

      // 设置 安防 大门 door -位置
      refreshSafeDoorPosition(map) {
        const safeDom = document.querySelector(`.safe_door`);
        if (!safeDom) return;
        const { left: x, top: y } = core.events.get2DVec(map);
        const ps = { x, y };
        this.setPosition(safeDom, ps, true, { py: 50, px: -200 });
      }

      // 点击  安防 其他厂区顶牌
      safeOther(name) {
        // 其他安防的模型位置
        this.lastSafeOtherModel = getModel(name);

        // 清除上个快照
        $send("clear-last-snapShot");

        // 显示隐藏
        $send("show-safe-other-info", true);

        // 转换位置
        Utils.getMacro(() => {

          // 刷新一帧
          this.refreshSafeOtherPosition({
            camera,
            model: this.lastSafeOtherModel,
            outDom: this.dom,
          });

          // 更新安防 id
          $send("updatesSafeOtherId", name);
        }, 200);

        console.log("safe-other:", name);
      }

      // 设置 安防 其他 -位置
      refreshSafeOtherPosition(map) {
        const safeOtherDom = document.querySelector(`.safe_other`);
        if (!safeOtherDom) return;
        const { left: x, top: y } = core.events.get2DVec(map);
        const ps = { x, y };
        this.setPosition(safeOtherDom, ps, true, { py: 50, px: -150 });
      }

      // 点击 正常 摄像头
      webClickNormalCamera(name) {

        if (this.aiCameraPoint.includes(name)) return;

        // 清空之前的数据
        core.camera.closeSprite();

        this.lastCameraModel = getModel(`外围点位-${name}`);

        // 显示隐藏
        $send("show-camera-info", true);

        // 更新 相机的id
        $send("updateNormalCameraId", name);

        // 转换位置
        Utils.getMacro(() => {
          // 刷新一帧
          this.refreshNormalCameraPosition({
            camera,
            model: this.lastCameraModel,
            outDom: this.dom,
          });
        }, 100);

        console.log("web--normal-camera");
      }

      // 设置 正常 摄像头-位置
      refreshNormalCameraPosition(map) {
        const normalCameraDom = document.querySelector(`.camera_sprite_popup`);
        if (!normalCameraDom) return;
        const { left: x, top: y } = core.events.get2DVec(map);
        const ps = { x, y };
        this.setPosition(normalCameraDom, ps, true, { py: 24, px: 24 });
      }

      // 鼠标点击 ai摄像头
      webClickAi(name) {
        if (!this.aiCameraPoint.includes(name)) return;

        // 清空之前的数据
        core.camera.closeSprite();

        this.lastAiModel = getModel(`外围点位-${name}`);

        // 显示隐藏
        $send("show-ai-info", true);

        // 更新ai的id
        $send("updateAiId", name);

        // 转换位置
        Utils.getMacro(() => {
          // 刷新一帧
          this.refreshAiPosition({
            camera,
            model: this.lastAiModel,
            outDom: this.dom,
          });
        }, 100);

        console.log("web--Ai--camera");
      }

      // 刷新 ai
      refreshAiPosition(map) {
        const normalCameraDom = document.querySelector(`.camera_ai_popup`);
        if (!normalCameraDom) return;
        const { left: x, top: y } = core.events.get2DVec(map);
        const ps = { x, y };
        this.setPosition(normalCameraDom, ps, true, { py: 24, px: 24 });
      }


      //---------------------综合态势-----------------------------------

      // 综合态势 页面点击
      webClickComprehensive(name) {

        if (!this.comprehensive.includes(name)) return;

        // 清空之前的数据
        core.camera.closeSprite();

        this.lastComprehensiveModel = getModel(name);

        // 显示综合能耗看板
        $send("show-comprehensive-info", true);

        // 更新 名称
        $send("updateComprehensiveDoorId", name);

        // 转换位置
        Utils.getMacro(() => {

          // 刷新一帧
          this.refreshComprehensivePosition({
            camera,
            model: this.lastComprehensiveModel,
            outDom: this.dom,
          });

        }, 100);

        console.log("标签---综合态势");
      }

      // 综合态势 点击模型
      clickComprehensiveModel(model) {
        const name = model.name;

        if (!this.modelDoor.includes(name)) return;

        this.webClickComprehensive(name);

        // 清空选中的倒三角
        $send("close-topCard");
      }

      // 刷新 综合态势 位置 面板
      refreshComprehensivePosition(map) {
        const comprehensiveDom = document.querySelector(`.comprehensive_popup`);
        if (!comprehensiveDom) return;
        const { left: x, top: y } = core.events.get2DVec(map);
        const ps = { x, y };
        this.setPosition(comprehensiveDom, ps, true, { py: 50, px: -100 });
      }

      // 刷新dom
      refreshDom() {
        runScene.cb.controls.change.add("setDialogPosition", () => {
          if (this.lastCameraModel) {
            // 普通相机移动
            this.refreshNormalCameraPosition({
              camera,
              model: this.lastCameraModel,
              outDom: this.dom,
            });
          }

          if (this.lastComprehensiveModel) {
            // 综合态势
            this.refreshComprehensivePosition({
              camera,
              model: this.lastComprehensiveModel,
              outDom: this.dom,
            });
          }

          if (this.lastAiModel) {
            // Ai
            this.refreshAiPosition({
              camera,
              model: this.lastAiModel,
              outDom: this.dom,
            });
          }

          if (this.lastSafeDoorModel) {
            // 安防大门
            this.refreshSafeDoorPosition({
              camera,
              model: this.lastSafeDoorModel,
              outDom: this.dom,
            });
          }

          if (this.lastTravelParkingModel) {
            // 便捷通行 其他楼栋
            this.refreshTravelParkingPosition({
              camera,
              model: this.lastTravelParkingModel,
              outDom: this.dom,
            });
          }

          if (this.lastTravelBuildModel) {
            // 便捷通行 停车场
            this.refreshTravelBuildPosition({
              camera,
              model: this.lastTravelBuildModel,
              outDom: this.dom,
            });
          }

          if (this.lastSafeOtherModel) {
            // 安防 其他
            this.refreshSafeOtherPosition({
              camera,
              model: this.lastSafeOtherModel,
              outDom: this.dom,
            });
          }

          if (this.lastTravelDoorModel) {
            // 便携交通 门禁
            this.refreshTravelDoorPosition({
              camera,
              model: this.lastTravelDoorModel,
              outDom: this.dom,
            });
          }


          if (this.lastEnergyModel) {
            // 便携交通 门禁
            this.refreshEnergyPosition({
              camera,
              model: this.lastEnergyModel,
              outDom: this.dom,
            });
          }


        });
      }

      // 公共 设置 位置
      setPosition(dom, ps, iscenter = false, offset = { px: 0, py: 0 }) {
        if (!dom) return;
        const { px, py } = offset;
        let x = 0;
        let y = 0;
        let width = 0;
        let height = 0;
        if (ps) {
          x = ps.x;
          y = ps.y;
        } else {
          x = dom.getBoundingClientRect().x;
          y = dom.getBoundingClientRect().y;
          width = dom.getBoundingClientRect().width;
          height = dom.getBoundingClientRect().height;
        }

        if (iscenter) {
          dom.style.left = x + px + "px";
          dom.style.top = y + py + "px";
        } else {
          dom.style.left = width * 2 + x + px + "px";
          dom.style.top = y + py + "px";
        }
      }
    }

    // 区域定牌
    class AreaPointModel {
      name = "areaPointModel";

      // 区域定牌模型
      areaPointModel = {};

      door = ["东门", "北门", "西南门", "东南门"];

      parkModel = {}

      mounted() {

        const path = window.location.hash
          .replace("#", "")
          .replace("/", "")
          .trim();

        // 获取模型
        this.getModel();

        // 大门的ui显示隐藏
        $on("area-sprite-door", this.isShowDoor.bind(this));

        // 显示隐藏停车场看牌
        $on('showParking', this.showParking.bind(this))
        // 显示 除了老八寸标牌 
        $on('showOtherParking', this.showOtherParking.bind(this))

        // 出来能源外全部显示
        Utils.getMacro(() => this.isShowDoor(path != 'energy'), 500)
        // 能源管理下只显示 老8寸停车场
        Utils.getMacro(() => this.showParking(path === 'energy'), 500)
        // 其他停车场
        Utils.getMacro(() => this.showOtherParking(path === 'travel'), 500)
      }

      // 获取模型
      getModel() {

        getModel("新加点位").children.map((group) => {
          const groupName = group.name;
          this.areaPointModel[groupName] = {};
          group.children.map((m) => {
            this.areaPointModel[groupName][m.name] = m;
          });

        });

        this.parkModel = { '2号停车场': getModel('2号停车场面板') }
      }

      // 显示 停车场老八寸标牌
      showParking(isShow) {
        core.addSprite.pointModel['parkName']['老8寸停车场'].sprite.visible = isShow;
      }

      // 显示 除了老八寸标牌 
      showOtherParking(isShow) {
        Object.keys(core.addSprite.pointModel['parkName']).map((name) => {
          const { sprite } = core.addSprite.pointModel['parkName'][name];
          if (name === '老8寸停车场') return
          sprite.visible = isShow
        })
      }

      // 是否显示隐藏大门的ui
      isShowDoor(isShow) {
        Object.keys(core.addSprite.pointModel['doorName']).map((name) => {
          const { sprite } = core.addSprite.pointModel['doorName'][name];
          sprite.visible = isShow
        })

      }
    }

    // 光墙
    class AreaLight {
      name = 'areaLight';
      lightGroup = {}
      mounted() {
        // 获取模型
        this.getModel()

        // 设置选中的光墙
        $on('set-selected-lightArea', this.showLight.bind(this));
        // 默认光强全部关闭
        this.showLight('', true)
      }
      // 获取模型
      getModel() {
        // 光框
        getModel('光框').children.map((m) => {
          this.lightGroup[m.name] = m
        })
      }

      // 显示对应的光墙体
      showLight(selectedName, closeAll = false) {
        Object.keys(this.lightGroup).map((name) => {
          const model = this.lightGroup[name];
          if (closeAll) {
            model.visible = false;
          } else {
            if (`Light_${selectedName}` === name) {
              model.visible = true;
            } else {
              model.visible = false;
            }
          }
        })
      }

    }

    // 快照
    class SnapShotFn {

      name = 'snapShotFn';
      // 快照对照表
      snapShotMap = {
        "8#仓库": '8cangku',
        "6#仓库": '6cangku',
        "7#仓库": '7cangku',
        "污水站": '污水站',
        "12寸工厂": '12cun',
        "CUB": 'cub',
        "8寸工厂": '8cun',
        "综合楼": '综合楼',
        "污水站": '污水站',
        "柴发站": 'chaifazhan',
      }

      lastSnapShot = ''

      mounted() {
        // 设置选中的快照
        $on('set-selected-snapshot', this.snapShot.bind(this))

        // 清除上个快照
        $on('clear-last-snapShot', this.clearLastSnapShot.bind(this))
      }

      // 清除上个快照
      clearLastSnapShot() {
        if (this.lastSnapShot) runScene.snapshot.set(`${this.lastSnapShot}默认`)
        core.blueprintFn.doBlueprintFn('白天')
      }

      // 快照
      snapShot(buildName) {

        const name = this.snapShotMap[buildName];

        if (this.lastSnapShot) {

          runScene.snapshot.set(`${this.lastSnapShot}默认`);

          core.blueprintFn.doBlueprintFn('白天');

          this.lastSnapShot = '';

        }

        // 快照
        runScene.snapshot.set(`${name}展开`);


        core.blueprintFn.doBlueprintFn('夜晚')

        console.log(`${name}展开`, '执行---');

        this.lastSnapShot = name;
      }
    }

    // 添加精灵图
    class AddSprite {
      name = "addSprite";
      // 所有点位的模型
      pointModel = {};

      // 综合态势各个位置
      workshopPoint = [
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
      ];

      currentWorkShop = {
        overview: [
          "8#仓库",
          "6#仓库",
          "7#仓库",
          "污水站",
          "12寸工厂",
          "CUB",
          "8寸工厂",
          "综合楼",
          "污水站",
          "柴发站",
        ],
        safe: [
          "8#仓库",
          "6#仓库",
          "7#仓库",
          "污水站",
          "12寸工厂",
          "CUB",
          "8寸工厂",
          "综合楼",
          "污水站",
          "柴发站",
        ],
        travel: [
          "8#仓库",
          "6#仓库",
          "7#仓库",
          "污水站",
          "12寸工厂",
          "CUB",
          "8寸工厂",
          "综合楼",
          "污水站",
          "柴发站",

        ],
        energy: [
          "新8寸",
          "8寸工厂",
          "污水站",
          "12寸工厂",
          "CUB",
          "综合楼",
          "制氮站",
          "制氢站",
          "氢气站",
          "大宗气站",
        ],
        device: [],
      };

      // ai监控
      aiCameraName = ["024", "038", "052", "057", "167"];

      allDoor = ["东门", "北门", "西南门", "东南门", "南面停车场", '北面停车场', '新8寸停车场', '老8寸停车场'];

      mounted() {

        const path = window.location.hash
          .replace("#", "")
          .replace("/", "")
          .trim();

        // 添加点位
        this.add();

        // 初始化执行一次
        this.showCurrentSprite(path);

        // 初始化 停车场看牌 显示隐藏
        this.initPark(path);

        // 显示当前的倒三角模型
        $on("showCurrentSprite", this.showCurrentSprite.bind(this));

      }

      // 初始化 停车场看牌 显示隐藏
      initPark(path) {
        if (path === 'travel' || path === 'energy') {
          core.areaPointModel.showParking(true)
        } else {
          core.areaPointModel.showParking(false)
        }
      }

      // 添加点位
      add() {

        const path = window.location.hash
          .replace("#", "")
          .replace("/", "")
          .trim();

        // 添加门的看板
        this.addDoorSprite();

        // 添加 摄像头 点位
        this.addCameraSprite();

        // 添加 门禁
        this.addDoorControl();

        // 厂区ui
        this.addWorkShop();

        // 显示隐藏 相机 模型
        $on("show-camera-sprite-three", this.showCameraSprite.bind(this));
        // 显示隐藏 ai 相机
        $on("show-camera-ai-sprite-three", this.showAiSprite.bind(this));
        // 显示隐藏 门禁
        $on("show-travel-doorControl-sprite-three", this.isShowDoorControl.bind(this));

        // 初始化门禁 状态
        this.isShowDoorControl(path === 'travel');
      }

      // 添加 门禁
      addDoorControl() {
        this.pointModel["door-control"] = {};
        ["门禁1", "门禁2", "门禁3", "门禁4", "门禁5", "门禁6", "门禁7", "门禁8", "门禁9",
        ].map((doorName) => {
          const dom = document.querySelector(`.door-control-${doorName}`);
          const m = getModel(doorName);
          if (!dom || !m) return;
          let sprite = Utils.domTo2Dui(dom);
          sprite.scale.set(0.03, 0.03, 0.03);
          sprite.name = `${doorName}_sprite`;
          this.pointModel["door-control"][doorName] = {
            sprite,
            dom,
          };
          m.add(sprite);
        });
      }

      // 是否显示门禁
      isShowDoorControl(isShow) {
        Object.values(this.pointModel["door-control"]).map(({ dom, sprite }) => {
          sprite.visible = isShow;
        })
      }

      // 添加 摄像头 点位
      addCameraSprite() {
        const path = window.location.hash
          .replace("#", "")
          .replace("/", "")
          .trim();
        this.pointModel["camera_ai"] = {};
        this.pointModel["camera_normal"] = {};
        new Array(171).fill("").map((_, index) => {
          let m = null;
          let name = null;
          if (index + 1 <= 9) {
            m = getModel("外围点位-" + `00${index + 1}`);
            name = `00${index + 1}`;
          } else if (index + 1 < 100) {
            m = getModel("外围点位-" + `0${index + 1}`);
            name = `0${index + 1}`;
          } else {
            m = getModel("外围点位-" + `${index + 1}`);
            name = `${index + 1}`;
          }
          const dom = document.querySelector(`.camera_${name}`);

          if (!dom || !m) return;
          let sprite = Utils.domTo2Dui(dom);
          // sprite.scale.set(0.25, 0.25, 0.25);
          sprite.name = `${m.name}_camera`;

          if (this.aiCameraName.includes(name)) {
            this.pointModel["camera_ai"][m.name] = {
              sprite: sprite,
              dom: dom,
            };
            sprite.visible = path === "travel";
          } else {
            this.pointModel["camera_normal"][m.name] = {
              sprite: sprite,
              dom: dom,
            };
            sprite.visible = path === "safe";
          }
          m.add(sprite);
          // dom.classList.remove("none");
        });
      }

      // 倒三角 厂区ui --- 包含各个门
      addWorkShop() {
        // 倒三角厂房点位弹窗
        this.pointModel["workshop"] = {};
        this.workshopPoint.map((place) => {
          const m = getModel(place);

          const dom = document.querySelector(
            `.workshop_${m.name.replace("#", "")}`
          );

          if (!dom || !m) return;
          let sprite = Utils.domTo2Dui(dom);
          sprite.position.x += 6;
          // sprite.scale.set(0.3, 0.3, 0.3);
          sprite.name = `${m.name}_sprite`;
          this.pointModel["workshop"][m.name] = {
            sprite,
            dom,
          };
          m.add(sprite);
        });

      }

      // 显示隐藏 相机所有的模型
      showCameraSprite(isShow) {
        Object.values(this.pointModel["camera_normal"]).map(
          ({ dom, sprite }) => {
            sprite.visible = isShow;
          }
        );
      }

      showAiSprite(isShow) {
        Object.values(this.pointModel["camera_ai"]).map(({ dom, sprite }) => {
          sprite.visible = isShow;
        });
      }

      // 显示当前的倒三角模型
      showCurrentSprite(name) {
        Object.values(this.pointModel["workshop"]).map(({ dom, sprite }) => {
          const spriteName = sprite.name.replace("_sprite", "");
          if (this.currentWorkShop[name].includes(spriteName)) {
            sprite.visible = true;
          } else {
            sprite.visible = false;
          }
        });
      }

      // 添加 门的看板
      addDoorSprite() {
        this.pointModel["doorName"] = {}
        this.pointModel["parkName"] = {}
        this.allDoor.map((doorName) => {
          const dom = document.querySelector(`.door_${doorName}`);
          const m = getModel(`${doorName}面板`);
          if (!dom || !m) return;
          let sprite = Utils.domTo2Dui(dom);
          sprite.name = `${doorName}_sprite`;
          if (doorName.includes('门')) {
            this.pointModel["doorName"][doorName] = {
              sprite,
              dom,
            };
          } else {
            this.pointModel["parkName"][doorName] = {
              sprite,
              dom,
            };
          }
          m.add(sprite);
        })

        console.log(this.pointModel, '  this.pointModel');
      }
    }

    // 关闭某些事件
    class CloseFn {

      name = 'closeFn';

      // modelDoor = ["东门", "北门", "西南门", "东南门", '2号停车场'];

      modelDoor = ["东门",
        "北门",
        "西南门",
        "东南门",
        "南面停车场",
        "北面停车场",
        "新8寸停车场",
        "老8寸停车场",
      ];
      park = ["南面停车场", "北面停车场", "新8寸停车场", "老8寸停车场"];

      doorModel = {}

      mounted() {

        $on('closeEnergySprite', this.closeEnergySprite.bind(this))
      }

      // 关闭能源面板
      closeEnergySprite(model) {
        const name = model.name;
        if (!this.park.includes(name)) return
        // 清空选中的倒三角
        $send("close-topCard");

        // 清除 所有选中的墙
        core.areaLight.showLight('', true);
      }

      // 点击锁住
      setLock(path, model) {
        const name = model.name;
        if (!this.modelDoor.includes(name)) return
        core.camera.isLock(false)
      }


    }

    // 蓝图
    class BlueprintFn {
      name = 'blueprintFn'

      mounted() {

      }
      // 白天 黑夜
      doBlueprintFn(name) {
        runScene.graph.runCustom(name)
      }

    }

    // 相机视角
    class Camera {
      name = "camera";
      mounted() {
        //鸟瞰视角
        $on("back", this.back.bind(this));

        //相机动画
        $on("camera-anima-zhonghuan", this.cameraAnima.bind(this));

        // 相机动画 重置视角
        $on('reset-camera', this.resetCamera.bind(this))

        // 设置控制器
        $on('set-controls', this.isLock.bind(this))
      }

      // 鸟瞰视角
      back() {
        // 释放控制器
        core.camera.isLock(true);
        // 聚焦动画
        runScene.cameraEx.setTemp("鸟瞰视角", { time: 1 });
        // 关闭弹窗
        this.closeSprite()
        // 重置选中的索引  选中的门禁 选中的摄像头 清空选中的倒三角
        this.closeSelectedIndex()

        // 清楚选中的光墙
        core.areaLight.showLight('', true);

        // 清楚上个快照
        core.snapShotFn.clearLastSnapShot();

        // 清楚上次点击的名称
        $send('clear-lastClickWorkShopName', '')
      }

      // 重置选中的索引  选中的门禁 选中的摄像头 清空选中的倒三角
      closeSelectedIndex() {
        // 清空选中的倒三角
        $send("close-topCard");

        // 摄像头选中 失效
        $send("set-selected-camera-index", -1);

        // 复原选中的门禁
        $send("close-selected-doorControl", -1);
      }

      // 关闭弹窗
      closeSprite() {
        // 关闭 综合态势 弹框
        $send("show-comprehensive-info", false);

        // 关闭 安防弹窗
        $send("show-camera-info", false);
        // 关闭 安防 弹框
        $send("show-safe-info", false);
        // 关闭 安防 其他的弹框
        $send("show-safe-other-info", false);

        // 关闭 便捷通行 弹窗
        $send("show-ai-info", false);
        // 便捷通行 关闭门禁
        $send("show-travel-doorControl-info", false);
        // 便捷通行 关闭停车场
        $send("show-travel-parking-info", false);
        // 便捷通行 关闭大楼
        $send("show-travel-build-info", false);

        // 能源 关闭
        $send("show-energy-info", false);

        // 清除所有的id
        this.closeSpriteId()
      }

      // 清空选中的模型id
      closeSpriteId() {
        // 清空选中的模型id
        $send("updateNormalCameraId", "");
        $send("updateAiId", "");
        $send("updateComprehensiveDoorId", "");
        $send("updatesSafeDoorId", "");
        $send("updatesSafeOtherId", "");
        $send("updatesTravelBuildId", "");
        $send("updatesTravelParkingId", "");
        $send("updatesTravelDoorId", "");
      }

      // 相机动画 重置视角
      resetCamera() {
        Utils.getMacro(() => runScene.cameraEx.setTemp('鸟瞰视角', { time: 1 }), 80);
      }

      // 相机动画
      cameraAnima(place) {
        new Promise((res) => {
          Utils.getMacro(() => runScene.cameraEx.setTemp(place, { time: 1 }) && res(), 80);
        }).then(() => {
          this.isLock(false)
        })
      }

      // 是否锁定
      isLock(lock = true) {
        controls.enablePan = lock;
        controls.enableZoom = lock;
        controls.maxPolarAngle = Math.PI / 2 - 0.4;
      }
    }

    // 基本事件
    class Events {
      name = "events";

      clickModel = null;

      isRunning = true;

      lastClickModel = null

      constructor() {
        runScene.cb.model.click.add(
          "trigger-click",
          this.triggerClick.bind(this)
        );

        $on("sceneRunning2", (isRunnig) => {
          this.isRunning = isRunnig;
        });
      }

      triggerClick = (model) => {

        if (!model) return;

        // 打印bus
        $send("logClickModel-zhonghuan", model);

        // 点击事件
        this.clickSprite(model);

        this.lastClickModel = model;

        console.log('点击的模型', model, '-----');

      };

      // 点击事件
      clickSprite(model) {
        const path = window.location.hash
          .replace("#", "")
          .replace("/", "")
          .trim();


        // 锁定
        core.closeFn.setLock(path, model);
      }

      // 3d坐标转2位坐标
      get2DVec(map) {
        const { camera, model, outDom } = map;
        const { clientWidth, clientHeight } = outDom;
        const halfWidth = clientWidth / 2;
        const halfHeight = clientHeight / 2;
        const camPos = new Three.Vector3();
        const camDir = new Three.Vector3();
        camera.getWorldPosition(camPos);
        camera.getWorldDirection(camDir);
        const objPos = new Three.Vector3();
        model.updateMatrixWorld();
        objPos.setFromMatrixPosition(model.matrixWorld);
        const ndcPos = objPos.clone();
        ndcPos.project(camera);
        const objDir = new Three.Vector3();
        objDir.subVectors(objPos, camPos);
        objDir.normalize();
        const dotValue = camDir.dot(objDir);
        const sign = dotValue > 0 ? 1 : -1;
        const left = (1 + sign * ndcPos.x) * halfWidth;
        const top = (1 - sign * ndcPos.y) * halfHeight;
        return {
          left,
          top,
        };
      }

      // 3d坐标转2位坐标
      get2DVec(map) {
        const { camera, model, outDom } = map;
        const { clientWidth, clientHeight } = outDom;
        const halfWidth = clientWidth / 2;
        const halfHeight = clientHeight / 2;
        const camPos = new Three.Vector3();
        const camDir = new Three.Vector3();
        camera.getWorldPosition(camPos);
        camera.getWorldDirection(camDir);
        const objPos = new Three.Vector3();
        model.updateMatrixWorld();
        objPos.setFromMatrixPosition(model.matrixWorld);
        const ndcPos = objPos.clone();
        ndcPos.project(camera);
        const objDir = new Three.Vector3();
        objDir.subVectors(objPos, camPos);
        objDir.normalize();
        const dotValue = camDir.dot(objDir);
        const sign = dotValue > 0 ? 1 : -1;
        const left = (1 + sign * ndcPos.x) * halfWidth;
        const top = (1 - sign * ndcPos.y) * halfHeight;
        return {
          left,
          top,
        };
      }

      getXy(model) {
        const map = { outDom: document.querySelector("#app"), model, camera };

        const { left: x, top: y } = this.get2DVec(map);

        const ps = { x, y };

        return ps;
      }

      dispose() {
        controls.removeEventListener("start", this.controlStart);
      }
    }

    return [Events, InitScene, AreaPointModel, AddSprite, BlueprintFn, Camera, ClickEvents, AreaLight, SnapShotFn, CloseFn];
  };

  const modules = fn({
    runScene,
    getModel: runScene.modelEx.getModel.bind(runScene.modelEx),
    core: runScene.custom,
    ...runScene.assetsEx.get(),
    ...inputData,
    constant,
    window: null,
  });

  if (!modules) return;

  modules
    .map((TheClass) => {
      const ins = new TheClass();
      if (!ins.name) throw TypeError("代码出错");
      runScene.custom[ins.name] = ins;
      return ins;
    })
    .map((ins) => ins?.mounted?.());
};
export { fn };
