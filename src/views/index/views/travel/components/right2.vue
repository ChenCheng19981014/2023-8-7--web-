<style lang="scss" scoped>
.scroll {
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 224, 0.17);
  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(4px);
  width: 100%;
  height: 636px;
  overflow: hidden;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 8.5px;
  padding-right: 8.5px;
}

.scroll-item {
  background: rgba(0, 0, 0, 0.12);
  margin-bottom: 16px;
  border-radius: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      span {
        color: $white;
      }
    }
    .cont {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $light;
      .line {
        width: 1px;
        height: 12px;
        background: rgba(255, 255, 255, 0.3);
        margin-left: 14.5px;
        margin-right: 14.5px;
      }
      .address {
        font-size: 14px;
        color: $light;
      }
      .event {
        font-size: 14px;

        color: $light;
      }
      .state {
        display: flex;
        padding: 1px 8px;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: $white;
        margin-left: 16px;
      }
      .common {
        border-radius: 4px;
        border: 1px solid #76ffe9;
        background: rgba(43, 178, 189, 0.5);
        box-shadow: 0px 0px 8px 0px #22ffd7 inset;
      }
    }
  }

  .main {
    height: 90px;
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .main-data {
      font-size: 14px;
      div {
        color: rgba(255, 255, 255, 0.5);
      }
      span {
        color: $light;
      }
    }
    .main-image {
      width: 160px;
      height: 100%;
      background: black;
      background-size: cover;
      position: relative;
      background-image: url("https://img1.baidu.com/it/u=3796293257,649768138&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=439");

      .status {
        width: 74px;
        height: 25px;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        svg {
          width: 100%;
          height: 100%;
        }
        .text {
          width: 100%;
          height: 100%;
          white-space: nowrap;
          position: absolute;
          right: 0;
          top: 0;
          text-align: right;
          padding-right: 8px;
          font-size: 12px;
          line-height: 25px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="ui">
    <data-statis
      style="margin-bottom: 24px"
      :icon="statisIcon"
      :data="statisData"
    ></data-statis>
    <sub-title title="类型占比" style="margin-bottom: 24px"></sub-title>
    <line-progress
      style="margin-bottom: 24px"
      :data="lineProgressData"
      :color="['rgba(0, 255, 133, 1)', 'rgba(0, 255, 224, 1)']"
    ></line-progress>

    <div class="scroll">
      <scroll-wrap :distance="160">
        <div class="scroll-wrap-main">
          <div class="scroll-item" v-for="(item, index) of list" :key="index">
            <div class="header">
              <div class="title">事件：<span>人员聚焦</span></div>
              <div class="cont">
                <div class="address">人行违规</div>
                <div class="line"></div>
                <div class="state common">一般</div>
              </div>
            </div>

            <div class="main">
              <div class="main-data">
                <div>地点：<span>综合楼</span></div>
                <div>设备：<span>M092一楼左出通道</span></div>
                <div>时间：<span>2023-07-18 09:14:56</span></div>
              </div>
              <div class="main-image">
                <div class="status status-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="74"
                    height="26"
                    viewBox="0 0 74 26"
                    fill="none"
                  >
                    <path
                      d="M74.3626 0.517363H1.49017L11.4005 12.6032L17.0376 19.4776C20.0832 23.1917 24.6334 25.345 29.4365 25.345H74.3626V0.517363Z"
                      fill="url(#paint0_linear_1566_114734)"
                      stroke="url(#paint1_linear_1566_114734)"
                      stroke-width="1.03448"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1566_114734"
                        x1="66.0269"
                        y1="25.8622"
                        x2="0.397129"
                        y2="25.8622"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#02A557" />
                        <stop
                          offset="1"
                          stop-color="#048D53"
                          stop-opacity="0.7"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_1566_114734"
                        x1="-11.4995"
                        y1="24.3105"
                        x2="6.08672"
                        y2="-20.1723"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#00F0FF" />
                        <stop
                          offset="0.628792"
                          stop-color="#3B4CE7"
                          stop-opacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div class="text">已处理</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll-wrap>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: String,
  },
  watch: {
    time() {
      this.loadData();
    },
  },
  data() {
    return {
      lineProgressData: [],
      list: [],
      statisIcon: require("../../../../../assets/travel/icon3.png"),
    };
  },
  computed: {
    statisData() {
      return [
        {
          name: "人行违规",
          value: 12,
          unit1: "件",
        },
        {
          name: "车行违规",
          value: 4,
          unit1: "件",
        },
        {
          name: "处理中",
          value: 0,
          unit1: "件",
        },
        {
          name: "未处理",
          value: 3,
          unit1: "件",
        },
      ];
    },
  },

  methods: {
    async loadList() {
      this.list = [{}, {}, {}, {}, [], {}];
    },
    async loadLineProgressData() {
      this.lineProgressData = [
        {
          name: "人行违规",
          value: 12,
        },
        {
          name: "车行违规",
          value: 4,
        },
      ];
    },
    async loadData() {
      this.loadList();
      this.loadLineProgressData();
    },
  },
  created() {
    this.loadData();
  },
};
</script>