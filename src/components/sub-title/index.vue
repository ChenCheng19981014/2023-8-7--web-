<template>
  <div class="sub-title">
    <div class="text">
      {{ title }}
    </div>
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  name: "sub-title",
};
</script>

<style lang="scss">
.sub-title{
  .el-dropdown{
    span{
      font-size: 14px;
      color: $light;
    }
  }
}
</style>

<style lang="scss" scoped>
.sub-title {
  height: 28px;
  width: 100%;
  display: flex;
  align-items: center;
  color: $white;
  justify-content: space-between;
  
  padding-left: 24px;
  background-image: url("../../assets/common/sub-bg.png");
  background-size: 100% 100%;

  .text {
    font-weight: bold;
    font-size: 16px;
    background: linear-gradient(
      180deg,
      #fff 0%,
      #fff 42.64%,
      rgba(43, 251, 213, 0.37) 98.28%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1.28px;
  }
}
</style>