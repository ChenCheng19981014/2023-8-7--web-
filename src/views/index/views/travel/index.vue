<template>
  <div class="view">
    <ui-banner>
      <div class="left-1"  v-if="$store.state.showLeft1">
        <custom-title
          title="今日通行人员统计"
          style="margin-bottom: 24px"
        ></custom-title>
        <left-1 />
      </div>

      <div class="left-2"  v-if="$store.state.showLeft2">
        <custom-title
          title="今日车辆通行统计"
          style="margin-bottom: 24px"
        ></custom-title>
        <left-2 />
      </div>
    </ui-banner>
    <ui-banner right>
      <div class="right-1"  v-if="$store.state.showRight1">
        <custom-title title="事件复核" style="margin-bottom: 16px">
          <time-select v-model="time1"></time-select>
        </custom-title>
        <right-1 :time="time1" />
      </div>
      <div class="right-2"  v-if="$store.state.showRight2">
        <custom-title title="告警事件" style="margin-bottom: 24px">
          <time-select v-model="time2"></time-select>
        </custom-title>
        <right-2 :time="time2" />
      </div>
    </ui-banner>

    <help/>
  </div>
</template>

<script>
import left1 from "./components/left1.vue";
import left2 from "./components/left2.vue";
import right1 from "./components/right1.vue";
import right2 from "./components/right2.vue";
import help from "./components/help.vue"
export default {
  components: {
    left1,
    left2,
    right1,
    right2,
    help
  },
  data() {
    return {
      time1: "day",
      time2: "day",
    };
  },
  created() {},
  methods: {},
};
</script>


