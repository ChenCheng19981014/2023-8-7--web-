<style lang="scss" scoped>
.data-statis {
  padding-left: 16px;
  margin-bottom: 16px;
  height: 60px;
  display: flex;
  align-items: center;
  padding-right: 8px;
  .icon {
    width: 60px;
    height: 60px;
    margin-right: 16px;
    flex-shrink: 0;
    flex-shrink: 0;
    img {
      width: 100%;
    }
  }
  .titles{
    flex-shrink: 0;
    color: $light;
    font-size: 14px;
  }
  .data {
    flex-grow: 1;
    display: flex;
    // align-items: center;
    justify-content: center;
    .name {
      font-size: 14px;
      color: $light;
    }
    .value {
      font-size: 36px;
      color: white;
      font-weight: bold;
      margin-top: 4px;
      font-family: "number";
    }
    .line {
      margin-top: 4px;
      width: 48px;
      height: 2px;
      border-radius: 10px;
      background: #00ff85;
      box-shadow: 0px 0px 10px 0px rgba(0, 255, 133, 0.48);
    }
  }
}
</style>

<template>
  <div class="data-statis">
    <div class="icon">
      <img :src="icon" alt="" />
    </div>
    <div class="titles">{{title}}</div>
    <div class="data">
      <div class="item" v-for="item of data" :key="item.name">
        <div class="name">{{ item.name }}</div>
        <div
          class="value"
          v-html="fmt(item.value, item.unit1, item.unit2)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "data-statis-one",
  props: {
    data: Array,
    title:String,
    icon: String,
  },
};
</script>