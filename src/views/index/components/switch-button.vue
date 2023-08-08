<style lang="scss" scoped>
.button{
    position: absolute;
    width: 20px;
    height: 50px;
    background: rgb(255, 255, 255);
        top:500px;
        cursor: pointer;

    &.left{
        left:502px;
    }
     &.right{
        right:502px;
    }
    &.active{
        background: rgb(3,109,252);
    }
}
</style>

<template>
  <div class="total-button" v-if="!fish">
    <div class="button left" :class="$store.state.showLeft1==false?'active':''" @click="switchLeft"></div>
    <div class="button right" :class="$store.state.showRight2==false?'active':''" @click="switchRight"></div>
  </div>
</template>

<script>
export default {
  methods: {
    switchLeft() {
        this.$store.state.showLeft1=!this.$store.state.showLeft1
        this.$store.state.showLeft2=!this.$store.state.showLeft1
    },
    switchRight() {
          this.$store.state.showRight1=!this.$store.state.showRight1
        this.$store.state.showRight2=!this.$store.state.showRight1
    },
  },
};
</script>