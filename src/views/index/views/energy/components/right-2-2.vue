<style lang="scss" scoped>
.scroll2 {
  .scroll-main {
    height: 136px;
    width: 100%;
    overflow: hidden;
    .row:nth-child(even) {
      background: rgba(0, 0, 0, 0.12);
    }
  }

  .row {
    height: 34px;
    display: flex;
    align-items: center;

    .row-item {
      text-align: center;
      font-size: 14px;
      flex-shrink: 0;
      color: $light;
      white-space: nowrap;
      overflow: hidden;
      span {
        font: 14px;
        color: $light;
      }
    }
    .row-item:nth-child(1) {
      width: 194px;
      flex-shrink: 0;
    }

    .row-item:nth-child(2) {
      width: 140px;
      flex-shrink: 0;
    }

    .row-item:nth-child(3) {
      flex-grow: 1;
    }

    &:hover {
      cursor: pointer;
      background: linear-gradient(
        90deg,
        rgba(27, 89, 248, 0.6) 0%,
        rgba(89, 175, 255, 0) 100%
      ) !important;
    }
  }
  .scroll2-header {
    height: 36px !important;
    width: 100%;
    border: 1px solid rgba(0, 102, 255, 0.33);
    background: linear-gradient(
      180deg,
      rgba(7, 131, 250, 0.18) 0%,
      rgba(7, 131, 250, 0.12) 51.3%,
      rgba(7, 131, 250, 0.18) 100%
    );
    &:hover {
      background: linear-gradient(
        180deg,
        rgba(7, 131, 250, 0.18) 0%,
        rgba(7, 131, 250, 0.12) 51.3%,
        rgba(7, 131, 250, 0.18) 100%
      ) !important;
    }
  }
}

.img-row {
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    position: relative;
    top: -1px;
    width: 10px;
    margin-left: 4px;
  }
  img {
    margin-left: 4px;
  }
}
</style>

<template>
  <div class="ui">
    <div class="scroll2">
      <div class="scroll2-header row">
        <div class="row-item">项目名称</div>
        <div class="row-item">类型</div>
        <div class="row-item">指标</div>
      </div>
      <div class="scroll-main">
        <scroll-wrap :distance="34">
          <div class="row" v-for="(item, index) of tableList" :key="index">
            <div class="row-item">酸碱废水、一般排水回用</div>
            <div class="row-item">产水率</div>
            <div class="row-item img-row">
              <span>{{ item.value }}</span>
              <svg
                v-if="item.up"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="20"
                viewBox="0 0 10 20"
                fill="none"
              >
                <path
                  d="M0.226562 9.474V9.46L5.00056 4L9.77456 9.46V9.474H7.32456V16.81H2.67656V9.474H0.226562Z"
                  fill="#00FF85"
                />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="20"
                viewBox="0 0 10 20"
                fill="none"
              >
                <path
                  d="M0.226562 11.526V11.54L5.00056 17L9.77456 11.54V11.526H7.32456V4.19H2.67656V11.526H0.226562Z"
                  fill="#FF5D5D"
                />
              </svg>
            </div>
          </div>
        </scroll-wrap>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableList: [],
    };
  },
  props: {
    time: String,
  },
  computed: {},
  methods: {
    async loadTableList() {
      this.tableList = [
        {
          up: true,
          value: "80%",
        },
        {
          up: false,
          value: "80%",
        },
        {
          up: false,
          value: "50%",
        },
        {
          up: false,
          value: "4999元",
        },
        {
          up: true,
          value: "80%",
        },
        {
          up: false,
          value: "80%",
        },
        {
          up: true,
          value: "50%",
        },
        {
          up: false,
          value: "4999元",
        },
      ];
    },
    async loadData() {
      this.loadTableList();
    },
  },
  created() {
    this.loadData();
  },
  watch: {
    time() {
      this.loadData();
    },
  },
};
</script>