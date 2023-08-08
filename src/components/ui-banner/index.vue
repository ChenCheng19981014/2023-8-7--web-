<style lang="scss" scoped>
.ui-banner {
  z-index: 2;
  position: absolute;
  top: 86.6px;
  display: flex;
  -moz-transition-timing-function: cubic-bezier(0.38, 0.15, 0.54, 0.99);
  gap: 48px;
  > div {
    flex-shrink: 0;
    width: 430px;
  }
  animation-timing-function: cubic-bezier(0.38, 0.15, 0.54, 0.99);
  &.ui-banner-left {
    left: 32px;
    animation-name: toLeft;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    transition: 1s margin-left;
    > div:nth-child(2) {
      margin-left: 48px;
    }
  }

  &.ui-banner-right {
    right: 32px;
    animation-name: toRight;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    transition: 0.5s margin-right;
    -moz-transition-timing-function: cubic-bezier(0.38, 0.15, 0.54, 0.99);
    > div:nth-child(1) {
      margin-right: 48px;
    }
  }
}

@keyframes toLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}

@keyframes toRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
</style>

<template>
  <div class="ui-banner" :class="right ? 'ui-banner-right' : 'ui-banner-left'">
    <switch-button-right v-if="right"></switch-button-right>

    <slot></slot>
    <switch-button-left v-if="!right"></switch-button-left>
  </div>
</template>

<script>
export default {
  name: "ui-banner",
  props: {
    right: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
