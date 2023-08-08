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
          font-size: 16px;
          font-weight: bold;
        }
      } 
      .value {
        font-size: 16px;
        font-family: "number";
        font-weight: bold;
      }
      .green {
        color: #03fefe;
      }
      margin-bottom: 14px;
    }
    .progress-main {
      height: 4px;
      width: 100%;
      background: rgba(208,222,238,0.1);
      position: relative;
      overflow: visible;
      margin-bottom: 2px;
      .point{
        position: absolute;
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        top:-2px;
        margin-left: -6px;
      }
        .progress-over{
            height: 100%;
            overflow: hidden;
            .pm{
                width: 409px;
                height: 100%;
                background: linear-gradient(to right,#0131C4,#00FF85);
            }
        }
    }
  }
  .icon{
    width: 20px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: 'number';
    margin-right: 8px;
    background-size: 100% 100%;
    font-weight: bold;
   &.rank-1{
      background-image: url('../../assets/overview/icon-top.png');
    }

    &.rank-2{
      background-image: url('../../assets/overview/icon-top.png');
    }
  }
  
}
</style>
<template>
  <div class="custom-rank">
    <div class="item" v-for="(item, index) of getData" :key="item.name">
      <div class="header">
        <div class="left">
          <div class="icon"   :class="index <= 2 ? 'rank-1' : 'rank-2'">{{index+1}}</div>
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
            <div class="pm"></div>
        </div>
        <div class="point" :style="`left:${item.per}%`"></div>
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

      let max = this.data[0].value==0?0.1:this.data[0].value;
      this.data.map((e) => {
        e.per = (e.value / max) * 100;
      });

      return this.data;
    },
  },
  name: "custom-rank",
  props: {
    data: Array,
  },
};
</script>