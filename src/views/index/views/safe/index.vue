<template>
  <div class="view">
    <ui-banner>
      <div class="left-1" v-if="$store.state.showLeft1">
        <custom-title
          style="margin-bottom: 24px"
          title="ERT人员"
        ></custom-title>
        <left11 />
        <custom-title
          style="margin-bottom: 26px"
          title="巡更任务"
        ></custom-title>
        <left12 />
      </div>
      <div class="left-2" v-if="$store.state.showLeft2">
        <custom-title
          title="视频监控"
          style="margin-bottom: 24px"
        ></custom-title>
        <left21 />
      </div>
    </ui-banner>
    <ui-banner right>
      <div class="right-1" v-if="$store.state.showRight1">
        <custom-title style="margin-bottom: 16px" title="告警分析">
          <time-select v-model="time1"></time-select>
        </custom-title>
        <right1Vue />
      </div>
      <div class="right-2" v-if="$store.state.showRight2">
        <custom-title style="margin-bottom: 24px" title="告警分析">
          <time-select v-model="time2"></time-select>
        </custom-title>
        <right2Vue :time="time2" />
      </div>
    </ui-banner>

    <cdialog :dialogName="dialogName" v-if="showDialog" />
    <help></help>
  </div>
</template>

<script>
import help from "./components/help"
import right1Vue from "./components/right-1.vue";
import right2Vue from "./components/right-2.vue";
import left11 from "./components/left-1-1.vue";
import left12 from "./components/left-1-2.vue";
import left21 from "./components/left-2-1.vue";
import cdialog from "./components/dialog.vue";
import { $on, $off } from "@/lib/custom-bus";
export default {
  components: {
    left11,
    left12,
    left21,
    right1Vue,
    right2Vue,
    cdialog,
    help
  },
  data() {
    return {
      time1: "day",
      time2: "day",
      showDialog: false,
      dialogName: "123",
    };
  },
  created() {
    $on("back",()=>{
      this.showDialog=false;
    })
    $on("displaySafeDialog", (dialogName) => {
      this.showDialog = true;
      this.dialogName = dialogName;
    });
  },
  methods: {},
  destroyed() {
    $off("displaySafeDialog");
  },
};
</script>

