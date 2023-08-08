<template>
  <div class="view">
    <ui-banner>
      <div class="left-1"  v-if="$store.state.showLeft1">
        <img style="width: 100%" src="./1.png" alt="" />
      </div>
      <div class="left-2"  v-if="$store.state.showLeft2"><img style="width: 100%" src="./2.png" alt="" /></div>
    </ui-banner>
    <ui-banner right>
      <div class="right-1"  v-if="$store.state.showRight1">
        <img style="width: 100%" src="./3.png" alt="" />
      </div>
      <div class="right-2"  v-if="$store.state.showRight2">
        <img style="width: 100%" src="./3.png" alt="" />
      </div>
    </ui-banner>
  </div>
</template>

<script>
import { $send, $on, $off } from "@/lib/custom-bus";

export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

