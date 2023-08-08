<template>
  <div class="ui">
    <sub-title title="类型分析" style="margin-bottom: 16px"></sub-title>
    <line-progress
      style="margin-bottom: 16px"
      :data="lineProgressData"
      :color="[
        'rgba(0, 255, 133, 1)',
        'rgba(0, 255, 224, 1)',
        'rgba(0, 102, 255, 1)',
        'rgba(90, 63, 255, 1)',
        'rgba(0, 102, 255, 1)',
        'rgba(90, 63, 255, 1)',
      ]"
    ></line-progress>

    <sub-title title="趋势分析" style="margin-bottom: 16px"></sub-title>
    <custom-line
      style="margin-bottom: 20px; height: 190px"
      yAxisName="件"
      showLegend="false"
      :colors="[{ color: '#00FFE0' }]"
      :source="lineData"
    ></custom-line>

    <sub-title title="处理分析" style="margin-bottom: 16px"></sub-title>
    <rose-pie
      :data="rosePieData"
      :color="[
        'rgba(0, 255, 133, 1)',
        'rgba(48, 131, 255, 1)',
        'rgba(179, 198, 238, 1)',
      ]"
    ></rose-pie>

    <sub-title title="等级分析" style="margin-bottom: 16px"></sub-title>
    <move-bar style="height: 185px" :source="barData"></move-bar>
  </div>
</template>

<script>
export default {
  props: {
    time: String,
  },
  data() {
    return {
      lineProgressData: [],
      lineData: [],
      barData: [],
      rosePieData: [],
    };
  },
  watch: {
    time() {
      this.loadData();
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadRosePieData() {
      this.rosePieData = [
        {
          name: "已处理",
          value: 30,
        },
        {
          name: "处理中",
          value: 25,
        },
        {
          name: "未处理",
          value: 20,
        },
      ];
    },
    async loadBarData() {
      this.barData = [
        {
          name: "视频监控",
          一般: Math.ceil(Math.random() * 10),
          紧急: Math.ceil(Math.random() * 10),
          严重: Math.ceil(Math.random() * 10),
        },
        {
          name: "周边监控",
          一般: Math.ceil(Math.random() * 10),
          紧急: Math.ceil(Math.random() * 10),
          严重: Math.ceil(Math.random() * 10),
        },
        {
          name: "消防事件",
          一般: Math.ceil(Math.random() * 10),
          紧急: Math.ceil(Math.random() * 10),
          严重: Math.ceil(Math.random() * 10),
        },
        {
          name: "测温事件",
          一般: Math.ceil(Math.random() * 10),
          紧急: Math.ceil(Math.random() * 10),
          严重: Math.ceil(Math.random() * 10),
        },
        {
          name: "其他",
          一般: Math.ceil(Math.random() * 10),
          紧急: Math.ceil(Math.random() * 10),
          严重: Math.ceil(Math.random() * 10),
        },
      ];
    },
    async loadLineData() {
      this.lineData = [
        {
          name: "10:00",
          件: Math.ceil(Math.random() * 50),
        },
        {
          name: "11:00",
          件: Math.ceil(Math.random() * 50),
        },
        {
          name: "12:00",
          件: Math.ceil(Math.random() * 50),
        },
        {
          name: "13:00",
          件: Math.ceil(Math.random() * 50),
        },
        {
          name: "14:00",
          件: Math.ceil(Math.random() * 50),
        },
        {
          name: "15:00",
          件: Math.ceil(Math.random() * 50),
        },
      ];
    },
    async loadLineProgressData() {
      this.lineProgressData = [
        {
          name: "视频监控",
          value: 10,
        },
        {
          name: "周边监控",
          value: 3,
        },
        {
          name: "消防事件",
          value: 1,
        },
        {
          name: "测温事件",
          value: 1,
        },
        {
          name: "人行违规",
          value: 2,
        },
        {
          name: "车行违规",
          value: 6,
        },
      ];
    },
    loadData() {
      this.loadRosePieData();
      this.loadBarData();
      this.loadLineData();
      this.loadLineProgressData();
    },
  },
};
</script>