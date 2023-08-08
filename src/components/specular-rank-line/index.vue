<style lang="scss" scoped>
.custom-rank {
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .item {
    display: flex;
    align-items: center;
    .left {
      width: 68px;
      font-size: 14px;
      color: $light;
      flex-shrink: 0;
      margin-right: 14px;
      text-align: right;
    }
    .value {
      margin-left: 14px;
      font-size: 16px;
      width: 100px;
      font-family: "number";
      font-weight: bold;
      color: #03fefe;
    }

    .progress-main {
      width: 100%;
      background: rgba(208, 222, 238, 0.1);
      position: relative;
      border-radius: 6px;
      overflow: hidden;
      height: 8px;
      .progress-over {
        border-radius: 8px;
        height: 100%;
        background: linear-gradient(270deg, #06f 0%, #00ffe0 100%);
      }
    }
  }
  .item:nth-child(1) {
    .progress-over {
      background: linear-gradient(270deg, #ec9d6b 0%, #ff2e2e 100%),
        linear-gradient(270deg, #06f 0%, #00ffe0 100%);
    }
  }
}
</style>
<template>
  <div class="custom-rank">
    <div class="item" v-for="(item, index) of getData" :key="item.name">
      <div class="left">
          {{ item.name }}
      </div>
      <div class="progress-main">
        <div class="progress-over" :style="`width:${item.per}%`"></div>
      </div>
      <div class="value" :class="index <= 2 ? 'green' : ''">
        {{ item.value | thousand }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {},
  computed: {
    getData() {
      if (this.data.length == 0) return [];

      if (this.data[0].value <= 0) return;

      let max = this.data[0].value;
      this.data.map((e) => {
        e.per = (e.value / max) * 100;
      });

      return this.data;
    },
  },
  name: "specular-rank-line",
  props: {
    data: Array,
  },
};
</script>