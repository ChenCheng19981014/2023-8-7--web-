<style lang="scss" scoped>
.monitor-dialog {
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
    margin-left: 100px;

  transform: translateX(-50%) translateY(-50%);
  .main {
    width: 1165px;
    height: 296px;
    border-radius: 8px;
    border: 2px solid rgb(0, 255, 244);
    background: black;
  }
  .close {
    width: 36px;
    height: 36px;
    margin-left: 8px;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="monitor-dialog">
    <div class="main"></div>
    <svg
    @click="close"
      class="close"
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <g filter="url(#filter0_b_1566_116730)">
        <rect width="36" height="36" rx="8" fill="#2D3957" fill-opacity="0.3" />
        <rect
          x="0.5"
          y="0.5"
          width="35"
          height="35"
          rx="7.5"
          stroke="white"
          stroke-opacity="0.3"
        />
      </g>
      <path
        d="M24.7279 12L18.364 18.364M18.364 18.364L12 24.7279M18.364 18.364L12 12M18.364 18.364L24.7279 24.7279"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <filter
          id="filter0_b_1566_116730"
          x="-14"
          y="-14"
          width="64"
          height="64"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="7" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_1566_116730"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1566_116730"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    monitor: Object,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>