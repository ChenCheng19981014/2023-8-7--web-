<style lang="scss" scoped>
.help {
  z-index: 2;
  position: absolute;
  right: 992px;
  bottom: 56px;
  width: 135px;
  height: 94px;
  background-image: url("../../../../../assets/travel/help-bg.png");
  background-size: 100% 100%;
  padding-left: 31px;
  padding-top: 4px;
  .title {
    z-index: 2;
    margin-bottom: 9px;
    font-size: 16px;
    color: $white;
  }
  .item {
    width: 93px;
    height: 24px;
    display: flex;
    align-items: center;
    padding-left: 4px;
    border-radius: 4px;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.2);
    .text {
      color: $light;
      font-size: 14px;
      margin-left: 10px;
    }
  }

  .active {
    background: linear-gradient(
      125deg,
      rgba(39, 107, 236, 0.7) 0%,
      rgba(39, 107, 236, 0.7) 18%,
      rgba(0, 0, 0, 0) 87.59%
    );
  }
}

#common {
  right: 464px;
}
</style>

<template>
  <div class="help" :id="!fish ? 'common' : ''">
    <div class="title">点位状态</div>
    <div class="item" :class="showOnline ? 'active' : ''">
      <el-checkbox v-model="showOnline"></el-checkbox>
      <div class="text">显示在线</div>
    </div>
    <div class="item" :class="showOffLine ? 'active' : ''">
      <el-checkbox v-model="showOffLine"></el-checkbox>
      <div class="text">显示离线</div>
    </div>
  </div>
</template>

<script>
import { $send } from "@/lib/custom-bus";
export default {
  data() {
    return {
      showOnline: true,
      showOffLine: true,
    };
  },
  watch: {
    showOnline() {
      $send("displayEnergyPoint", "online", this.showOnline);
    },
    showOffLine() {
      $send("displayEnergyPoint", "offline", this.showOffLine);
    },
  },
};
</script>
