
<style lang="scss" scoped>
.dialog {
  position: absolute;
  top: 230px;
  left: 980px;
  width: 358px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(28, 42, 77, 0.9);
  .dialog-title {
    width: 100%;
    height: 31px;
    padding-left: 16px;
    margin-bottom: 13px;
    background-image: url("../../../../../assets/common/monitor-list-header.png");
    background-size: cover;
    .text {
      font-family: "pm";

      background: linear-gradient(
        180deg,
        #fff 0%,
        #fff 42.64%,
        rgba(43, 251, 213, 0.37) 98.28%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 16px;
    }
  }
  .totast {
    display: flex;
    align-items: center;
    .titles {
      flex-shrink: 0;
      margin-right: 12px;
      color: rgba(255, 255, 255, 0.5);
      font-size: 14px;
    }
    .data-item {
      display: flex;
      align-items: center;
      .value {
        font-family: "number";
        color: white;
        font-size: 20px;
        margin-right: 4px;
      }
      .unit {
        margin-left: 4px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
      }

      .point {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
    .line {
      width: 1px;
      height: 19px;
      background: rgba(255, 255, 255, 0.1);
      margin-left: 15px;
      margin-right: 15px;
    }
    .data-main {
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
    }
  }
}

.monitor-list {
  height: 509px;
  overflow-y: auto;
  margin-top: 13px;
  .monitor-item {
    margin-bottom: 16px;
    width: 100%;
    height: 89px;
    background: rgba(0, 0, 0, 0.12);
    display: flex;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid transparent;
    .left-container {
      width: 158px;
      height: 100%;
      flex-shrink: 0;
      background-image: url("https://img1.baidu.com/it/u=3796293257,649768138&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=439");

      background-size: cover;
    }
    .right-container {
      flex-grow: 1;
      padding-left: 8px;
      padding-top: 4px;
      .title {
        font-size: 14px;
        color: $white;
        margin-bottom: 6px;
      }
      .item {
        font-size: 12px;
        color: $light;
        span {
          font-size: 12px;
          color: $light;
        }
      }
    }
  }
  .active{
    border: 1px solid rgba(0, 255, 224, 0.64);
background: linear-gradient(180deg, rgba(7, 131, 250, 0.18) 0%, rgba(7, 131, 250, 0.12) 51.30%, rgba(7, 131, 250, 0.18) 100%);
    .title{
        color: #00FFE0;

    }
  }
}

.monitor-list::-webkit-scrollbar {
  width: 0px;
}
#common{
  left:502px;
}
</style>

<template>
  <div class="dialog" :id="!fish?'common':''">
    <div class="dialog-title">
      <div class="text">{{ dialogName }}</div>
    </div>
    <div class="totast">
      <div class="titles">室内重点监控</div>
      <div class="data-item">
        <div class="value">999<span class="unit">路</span></div>
      </div>
      <div class="line"></div>
      <div class="data-main">
        <div class="data-item">
          <div class="point" style="background: rgba(0, 255, 224, 1)"></div>
          <div class="value">999<span class="unit">路</span></div>
        </div>
        <div class="data-item">
          <div class="point" style="background: rgba(255, 94, 94, 1)"></div>

          <div class="value">999<span class="unit">路</span></div>
        </div>
      </div>
    </div>
    <div class="monitor-list">
      <div class="monitor-item" :class="item==selectMonitor?'active':''" @click="selectMonitorItem(item)" v-for="(item, index) of monitors" :key="index">
        <div class="left-container"></div>
        <div class="right-container">
          <div class="title">综合楼-2F-咖啡厅①</div>
          <div class="item">位置：<span>综合楼2F咖啡厅①</span></div>
          <div class="item">状态：<span>正常</span></div>
          <div class="item">时间：<span>2023-07-05 17:24:58</span></div>
        </div>
      </div>
    </div>

    <!-- <monitorDialog @close="removeMonitor" v-if="selectMonitor" :selectMonitor="selectMonitor" /> -->
  </div>
</template>


<script>
import monitorDialog from "./monitor-dialog.vue";
export default {
  components: {
    monitorDialog,
  },
  props: {
    dialogName: String,
  },
  data() {
    return {
      selectMonitor: null,
      monitors: [],
    };
  },
  methods: {
    loadData() {
      this.monitors = [{}, {}, {}, {}, {}, {}];
    },
    removeMonitor(){
        this.selectMonitor=null
    },
    selectMonitorItem(item){
        this.selectMonitor=null
        setTimeout(() => {
            this.selectMonitor=item
        }, 100);
    }
  },
  created() {
    this.loadData();
  },
};
</script>
