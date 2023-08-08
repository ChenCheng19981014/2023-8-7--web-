<template>
  <div class="point-popup-traffic" v-if="isShow && areaInfo" v-show="id">
    <pointPopupTrafficTitle :areaInfo="areaInfo"></pointPopupTrafficTitle>
    <div class="content">
      <div :class="i.className" v-for="(i, _) in areaInfo.data">
        <!-- 顶部 -->
        <div class="top">
          <pointPopupInfoContent :info="i"></pointPopupInfoContent>
        </div>
        <!-- 文本 -->
        <div class="title">{{ i.realTimeTile }}</div>
        <!-- 行内 -->
        <div class="info">
          <div class="left">
            <div v-for="(r, _) in i.realTimeArr" :class="r.className">
              <div class="key">{{ r.key }} :</div>
              <div class="value">
                {{ r[r.className] }}
              </div>
            </div>
          </div>
          <div class="right">
            <img :src="i.img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pointPopupTrafficTitle from "./point-popup-traffic-title";
import pointPopupInfoContent from "./point-popup-info-content.vue";
export default {
  components: {
    pointPopupTrafficTitle,
    pointPopupInfoContent,
  },
  // 点位弹窗
  name: "pointPopupTraffic",
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
      areaInfo: null,
      isShow: false,
    };
  },
  mounted() {
    if ("point-popup-traffic" == this.$route.name) {
      this.isShow = true;
      this.id = this.$route.query.id;
    } else {
      if (this.id) {
        this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      console.log("??");
      this.areaInfo = {
        areaName: this.id,
        data: [
          {
            name: " person",
            icon: require("./../../../assets/three-scene/three-person-icon.png"),
            realTimeTile: "实时出入人员",
            arrInfo: [
              { key: "入园人数", value: "num", value: 135, unit: "人" },
              { key: "员工", value: "staff", value: 951, unit: "人" },
              {
                key: "相关方",
                value: "interestedParty",
                value: 25,
                unit: "人",
              },
              { key: "访客", value: "visitor", value: 5, unit: "人" },
            ],
            realTimeArr: [
              {
                className: "name",
                name: "张爱华",
                key: "姓名",
              },
              {
                className: "type",
                type: "相关方",
                key: "类型",
              },
              {
                className: "time",
                time: "2023-07-18 09:14:56",
                key: "时间",
              },
              {
                className: "machine",
                machine: "东南门5号入口闸机M092",
                key: "设备",
              },
            ],
            img:
              "https://imgessl.kugou.com/mvhdpic/400/20230725/20230725112015213050.jpg",
          },
          {
            name: "car",
            icon: require("./../../../assets/three-scene/three-car-icon.png"),
            realTimeTile: "实时出入车辆",
            arrInfo: [
              { key: "入园人数", value: "num", value: 525, unit: "个" },
              { key: "员工", value: "staff", value: 951, unit: "个" },
              { key: "预约", value: "reservation", value: 10, unit: "个" },
              { key: "临时", value: "temporary", value: 1, unit: "个" },
            ],
            realTimeArr: [
              {
                className: "licensePlate",
                licensePlate: "苏B06TF2",
                key: "车牌",
              },
              {
                className: "type",
                type: "相关方",
                key: "类型",
              },
              {
                className: "time",
                time: "2023-07-18 09:14:56",
                key: "时间",
              },
              {
                className: "machine",
                machine: "东南门5号入口闸机M092",
                key: "设备",
              },
            ],
            img:
              "https://imgessl.kugou.com/mvhdpic/400/20230725/20230725112015213050.jpg",
          },
        ],
      };
    },
  },
};
</script>

<style scoped lang="scss">
.point-popup-traffic {
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  width: 510px;
  position: absolute;

  .content {
    width: 100%;
    border-radius: 0px 8px 8px 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(45, 57, 87, 0.64);
    backdrop-filter: blur(7px);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 16px;

    > div {
      width: 478px;
      height: 205px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;

      .top {
        width: 478px;
        height: 60px;
      }

      > .title {
        width: 478px;
        height: 23px;
        margin-top: 12px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .info {
        margin-top: 4px;
        padding: 8px;
        width: 478px;
        height: 108px;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-around;
        align-items: center;

        .left {
          width: 302px;
          height: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;

          > div {
            width: 100%;
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
        }

        .right {
          width: 160px;
          height: 90px;
          position: relative;

          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .content > div:nth-child(2) {
    margin-top: 12px;
  }
}
</style>
