<style lang="scss" scoped>
.move-bar-chart {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div
    class="move-bar-chart"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <chart-base ref="canvas" :options="options"></chart-base>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "specular-line",
  props: {
    source: Array,
    //y轴单位
    yAxisName: {
      type: String,
      default: "件",
    },
    max1:Number,
    max2:Number,
    //一排最多显示多少
    maxShow: {
      type: Number,
      default: 4,
    },
    //几秒钟更新一次
    time: {
      type: Number,
      default: 2000,
    },
    //颜色
    colors: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    source() {
      this.loadData();
    },
  },
  data() {
    return {
      isHover: false,
      startIndex: 0,
      options: {},
    };
  },
  methods: {
    loadData() {
      //清空计时器
      clearInterval(this.intv);
      if(!this.source[0])return
      //设置series
      let keys = Object.keys(this.source[0]).filter((e) => e != "name");
      let series = [];

      //循环添加series
      keys.map((key, index) => {
        if(index==0){
   series.push({
          type: "line",
          name: key,
          smooth: true,
          data: [],
          symbolSize: 0,
          areaStyle: {
            opacity: 0.2,
          },
        });
        }else{
             series.push({
          type: "line",
          name: key,
          smooth: true,
          data: [],
          symbolSize: 0,
          lineStyle:{
            type:'dashed'
          }
        });
        }
     
      });


      this.options = {
        color: this.colors,
        grid: {
          top: 35,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true,
        },
        legend: {
          icon: "rectangle",
          right: 0,
          top: 0,
          itemWidth: 16,
          itemHeight: 4,
          itemGap: 24,
          textStyle: {
            color: "rgba(255,255,255,0.7)",
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // type: 'shadow',
            lineStyle: {
              color: "#00FFE0",
              width: 2,
            },
          },
          
          backgroundColor: "rgb(5,41,75)",
          borderColor: "#00FFE0",
          textStyle: {
            fontSize: 14,
            color: "#00FFE0",
          },
        },
        xAxis: {
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
            },
          },
          boundaryGap:[0,100]
        },
        yAxis: {
          max:this.max,
          nameTextStyle: {
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            align: "right",
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "rgb(33,215,181)",
            },
          },
          axisLabel: {
            margin: 18,
            textStyle: {
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
            },
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(255,255,255,0.2)",
            },
          },
          name: this.yAxisName,
          type: "value",
        },
        series,
      };

      //判断是否小于最少数量，如果小于不执行
      this.options.xAxis.data = this.source.map((item) => item.name);
      keys.map((item, index) => {
        this.options.series[index].data = this.source.map((ite) => {
          return ite[item];
        });
      });
      return;
    },
  },
  mounted() {
    // console.log(this.$refs.canvas);
    this.loadData();
    // setTimeout(() => {
    //     this.loadData()
    // }, 500);
  },
  destroyed() {
    clearInterval(this.intv);
  },
};
</script>