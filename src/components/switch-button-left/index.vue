<style lang="scss" scoped>
.button {
  width: 20px !important;
  height: 50px;
  background: rgb(255, 255, 255);
  cursor: pointer;
  margin-top: 500px;

  &.left {
    left: 502px;
  }
  &.right {
    right: 502px;
  }
  &.active {
    background: rgb(3, 109, 252);
  }
}
</style>

<template>
  <div
    class="button left"
    v-if="!fish"
    :class="$store.state.showLeft1 == false ? 'active' : ''"
    @click="switchLeft"
  ></div>
</template>

<script>
export default {
  name: "switch-button-left",
  methods: {
    switchLeft() {
      this.$store.state.showLeft1 = !this.$store.state.showLeft1;
      this.$store.state.showLeft2 = !this.$store.state.showLeft1;
    },
    switchRight() {
      this.$store.state.showRight1 = !this.$store.state.showRight1;
      this.$store.state.showRight2 = !this.$store.state.showRight1;
    },
  },
};
</script>