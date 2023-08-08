<template>
  <div class="view">
    <ui-banner>
      <div class="left-1"  v-if="$store.state.showLeft1">
        <custom-title style="margin-bottom: 16px" title="综合能耗统计">
          <time-select v-model="time1"></time-select>
        </custom-title>
        <left11 :time="time1" />

        <custom-title style="margin-bottom: 35px" title="用能排行">
          <time-select v-model="time2"></time-select>
        </custom-title>
        <left12 :time="time2" />
      </div>
      <div class="left-2"  v-if="$store.state.showLeft2">
        <custom-title style="margin-bottom: 36px" title="综合能耗统计">
          <time-select v-model="time3"></time-select>
        </custom-title>
        <left21 :time="time3" />
      </div>
    </ui-banner>
    <ui-banner right>
      <div class="right-1"  v-if="$store.state.showRight1">
        <custom-title style="margin-bottom: 24px" title="能耗占比">
          <time-select v-model="time4"></time-select>
        </custom-title>
        <right11 :time="time4" />

        <custom-title title="能耗KPI" style="margin-bottom: 13px">
          <time-select v-model="time5" :times="['month', 'year']"></time-select>
        </custom-title>
        <right12 :time="time5" />

        <custom-title title="碳分析" style="margin-bottom: 16px">
        </custom-title>
        <right13 />
      </div>
      <div class="right-2"  v-if="$store.state.showRight2">
        <custom-title title="告警事件" style="margin-bottom: 26px">
        </custom-title>
        <right21 />

        <custom-title title="节能项目实时统计" style="margin-bottom: 9px">
          <time-select :time="time6"></time-select>
        </custom-title>
        <right22 :time="time6" />
      </div>
    </ui-banner>
    <help />
  </div>
</template>

<script>
import left11 from "./components/left-1-1.vue";
import left12 from "./components/left-1-2.vue";
import left21 from "./components/left-2-1.vue";
import right11 from "./components/right-1-1.vue";
import right12 from "./components/right-1-2.vue";
import right13 from "./components/right-1-3.vue";
import right21 from "./components/right-2-1.vue";
import right22 from "./components/right-2-2.vue";
import help from "./components/help.vue";
export default {
  components: {
    left11,
    left12,
    left21,
    right11,
    right12,
    right13,
    right21,
    right22,
    help,
  },
  data() {
    return {
      time1: "day",
      time2: "day",
      time3: "day",
      time4: "day",
      time5: "month",
      time6: "day",
    };
  },
  created() {},
  methods: {},
};
</script>

