<template>
  <div class="view">
    <ui-banner>
      <div class="left-1" v-if="$store.state.showLeft1">
        <custom-title
          style="margin-bottom: 16px"
          title="园区概况"
        ></custom-title>
        <left11 />
        <custom-title
          style="margin-bottom: 16px"
          title="今日人员分析"
        ></custom-title>
        <left12 style="margin-bottom: 47px" />
        <custom-title title="今日车辆分析"></custom-title>
        <left13 />
      </div>
      <div class="left-2" v-if="$store.state.showLeft2">
        <custom-title
          title="巡更任务"
          style="margin-bottom: 16px"
        ></custom-title>
        <left21 />
        <custom-title title="告警分析" style="margin-bottom: 16px">
          <time-select v-model="time1"></time-select>
        </custom-title>
        <left22 :time="time1" />
      </div>
    </ui-banner>
    <ui-banner right>
      <div class="right-1" v-if="$store.state.showRight1">
        <custom-title style="margin-bottom: 16px" title="能源分析">
          <time-select v-model="time2"></time-select>
        </custom-title>
        <right11 />
      </div>
      <div class="right-2" v-if="$store.state.showRight2">
        <custom-title
          title="环境数据"
          style="margin-bottom: 16px"
        ></custom-title>
        <right21 />

        <custom-title title="设备设施"> </custom-title>
        <right22 />
      </div>
    </ui-banner>
  </div>
</template>

<script>
import { $send, $on, $off } from "@/lib/custom-bus";
import left11 from "./components/left-1-1.vue";
import left12 from "./components/left-1-2.vue";
import left13 from "./components/left-1-3.vue";
import left21 from "./components/left-2-1.vue";
import left22 from "./components/left-2-2.vue";
import right11 from "./components/right-1-1";
import right21 from "./components/right-2-1";
import right22 from "./components/right-2-2";
export default {
  components: {
    left11,
    left12,
    left13,
    left21,
    left22,
    right11,
    right21,
    right22,
  },
  data() {
    return {
      time1: "day",
      time2: "day",
      source: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {},
  },
};
</script>

