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
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;

        .address {
          font-size: 14px;
        }
      } 
      .value {
        font-size: 20px;
        font-family: "number";
        font-weight: bold;
        color: #03fefe;

      }
  
      margin-bottom: 10px;
    }
    .progress-main {
      width: 100%;
      background: rgba(208,222,238,0.1);
      position: relative;
      margin-bottom: 2px;
      border-radius: 6px;
      overflow: hidden;
      height: 8px;
        .progress-over{
            height: 100%;
            background: linear-gradient(270deg, #06F 0%, #00FFE0 100%);

        }
    }
  }
  .item:nth-child(1){
    .progress-over{
      background: linear-gradient(270deg, #EC9D6B 0%, #FF2E2E 100%), linear-gradient(270deg, #06F 0%, #00FFE0 100%);
    }
  }
}
</style>
<template>
  <div class="custom-rank">
    <div class="item" v-for="(item, index) of getData" :key="item.name">
      <div class="header">
        <div class="left">
          <div class="address" :class="index <= 2 ? 'green' : ''">
            {{ item.name }}
          </div>
        </div>
        <div class="value" :class="index <= 2 ? 'green' : ''">
          {{ item.value | thousand }}
        </div>
      </div>
      <div class="progress-main">
        <div class="progress-over" :style="`width:${item.per}%`">
        </div>
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
  name: "specular-rank",
  props: {
    data: Array,
  },
};
</script>