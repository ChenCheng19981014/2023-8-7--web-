<style lang="scss" scoped>
.time-select {
  display: flex;
  .item {
    width: 38px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: var(--10, rgba(255, 255, 255, 0.1));
    font-size: 14px;
    cursor: pointer;
    color: $light;
  }
  .active {
 border: 1px solid rgba(255, 255, 255, 0.50);
background: rgba(0, 102, 255, 0.50);
box-shadow: 0px 0px 8px 4px #06F inset;
color: $white;

  }
}
</style>
<template>
  <div class="time-select">
    <div class="item" @click="setTime(item)" :class="item==modelValue?'active':''" v-for="item of times" :key="item">
      {{ key[item] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "time-select",

  model:{
    prop:"modelValue",
    event:"update:modelValue"
  },
  props: {
    modelValue:String,
    times: {
      type: Array,
      default: function () {
        return ["day", "month", "year"];
      },
    },
  },
  methods:{
    setTime(item){
        this.$emit("update:modelValue",item)
    }
  },
  data() {
    return {
      key: {
        day: "日",
        month: "月",
        year: "年",
      },
    };
  },
};
</script>