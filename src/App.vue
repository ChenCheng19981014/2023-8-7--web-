<style lang="scss" scoped>
</style>

<template>
  <div id="app" @dragstart.prevent @selectstart.prevent>
      <router-view></router-view>
    <!-- </fit-layout> -->
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      commonWidth:1920,
      fishWidth:3840
    };
  },
  methods: {},
  created() {
 
  }
};
</script>
