<style lang="scss" scoped>
.back-button {
  z-index: 2;
  width: 148px;
  height: 43px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  border: 1.2px solid var(--unnamed, #00ffe0);
  background: linear-gradient(
      0deg,
      rgba(34, 59, 96, 0.5) 0%,
      rgba(34, 59, 96, 0.5) 100%
    ),
    linear-gradient(
      180deg,
      rgba(45, 130, 255, 0.55) 17.3%,
      rgba(45, 130, 255, 0) 100%
    );
  box-shadow: 0px 0px 12px 4px rgba(88, 145, 254, 0.83) inset;
  position: absolute;
  left: 980px;
  top: 89px;
  svg {
    width: 23px;
    margin-right: 8px;
  }
  div {
    font-family: "pm";
    font-size: 20px;
    letter-spacing: 1.6px;
  }
}

#common {
  left: 502px;
}
</style>

<template>
  <div
    class="back-button"
    :id="!fish ? 'common' : ''"
    @click="back"
    v-if="$route.name != 'map'"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <g filter="url(#filter0_d_1654_84740)">
        <path
          d="M15.52 3C21.8822 3 27.04 8.15782 27.04 14.52C27.04 20.8822 21.8822 26.04 15.52 26.04C9.15782 26.04 4 20.8822 4 14.52C4 8.15782 9.15782 3 15.52 3ZM24.8879 15.5673H20.2024C20.0376 18.4403 19.1749 21.2297 17.6889 23.6941C19.58 23.2461 21.2865 22.2249 22.5752 20.7703C23.864 19.3157 24.672 17.4985 24.8889 15.5673H24.8879ZM10.8376 15.5673H6.15215C6.36882 17.4984 7.17667 19.3156 8.46523 20.7702C9.75379 22.2249 11.4602 23.246 13.3511 23.6941C11.865 21.2299 11.0025 18.4403 10.8387 15.5673H10.8376ZM18.1036 15.5683H12.9364C13.1142 18.296 14.0047 20.9293 15.519 23.205C17.0346 20.9298 17.9259 18.2963 18.1036 15.5683ZM13.3521 5.34589L13.1008 5.40873C11.2654 5.8972 9.62024 6.92827 8.38046 8.36705C7.14068 9.80584 6.36404 11.5853 6.15215 13.4727H10.8376C11.0022 10.5994 11.865 7.80952 13.3511 5.34484L13.3521 5.34589ZM15.52 5.83497L15.4415 5.95017C13.9733 8.2005 13.1105 10.7915 12.9364 13.4727H18.1036C17.926 10.7447 17.0355 8.11102 15.521 5.83497H15.52ZM17.6879 5.34484L17.7853 5.50717C19.2127 7.93245 20.0414 10.6631 20.2024 13.4727H24.8879C24.6712 11.5416 23.8633 9.72443 22.5748 8.26979C21.2862 6.81514 19.5798 5.79398 17.6889 5.34589L17.6879 5.34484Z"
          fill="url(#paint0_linear_1654_84740)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1654_84740"
          x="0"
          y="0"
          width="31.04"
          height="31.04"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.94 0 0 0 0 1 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1654_84740"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1654_84740"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1654_84740"
          x1="15.52"
          y1="3"
          x2="15.52"
          y2="26.04"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#75FFF7" />
        </linearGradient>
      </defs>
    </svg>
    <div>鸟瞰视角</div>
  </div>
</template>

<script>
import { $send } from "@/lib/custom-bus";
export default {
  methods: {
    back() {
      $send("back");
    },
  },
};
</script>
