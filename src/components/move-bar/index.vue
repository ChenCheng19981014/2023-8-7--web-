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
  name:"move-bar",
  props: {
    source: Array,
    //y轴单位
    yAxisName: {
      type: String,
      default: "件",
    },
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
        return [
          ["rgba(1, 49, 196, 0)", "rgba(0, 255, 224, 1)"],
          ["rgba(255, 184, 76, 0)", "rgba(255, 184, 76, 1)"],
          ["rgba(255, 67, 67, 0)", "rgba(255, 67, 67, 1)"],
        ];
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
      keys.map((key) => {
        series.push({
          type: "bar",
          name: key,
          barWidth:6,
          data: [],
          barGap:'100%',
           itemStyle: {
                      normal: {
                            barBorderRadius:[6,6, 0, 0]
                      }
                },
        });
      });

      this.options = {
        grid: {
          top: 35,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true,
        },
        legend: {
          right: 0,
          top: 0,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 24,
          textStyle: {
            color: "rgba(255,255,255,0.7)",
            fontSize: 14,
          },
          
        },
        tooltip: {
          trigger: "axis",
           axisPointer: {
            type: 'shadow',
        
        },

          backgroundColor:'rgb(5,41,75)',
          borderColor:'#00FFE0',
          textStyle:{
            fontSize:14,
            color:'#00FFE0'
          }
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
        },
        yAxis: {
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
        color:this.colors.map(item=>{
          return new echarts.graphic.LinearGradient(0, 1, 0, 0, [{  
          offset: 0,
          color: item[0]
        }, {
          offset: 1,
          color: item[1]
        }])
        }),
         
        series,
      };

      //判断是否小于最少数量，如果小于不执行
      if (this.source.length <= this.maxShow) {
        this.options.xAxis.data = this.source.map((item) => item.name);
        keys.map((item, index) => {
          this.options.series[index].data = this.source.map((ite) => {
            return ite[item];
          });
        });
        return;
      }

      //初始赋值0
      this.startIndex = 0;

      let setOption = () => {
        if (this.isHover) return;
        let source = [];
        for (
          let index = this.startIndex;
          index < this.startIndex + this.maxShow;
          index++
        ) {
          source.push(this.source[index % this.source.length]);
        }
        this.options.xAxis.data = source.map((item) => item.name);
        keys.map((item, index) => {
          this.options.series[index].data = source.map((ite) => {
            return ite[item];
          });
        });
        this.startIndex++;
      };

      setOption();

      this.intv = setInterval(() => {
        setOption();
      }, this.time);
    },
  },
  mounted() {
    // console.log(this.$refs.canvas);
    this.loadData();
    // setTimeout(() => {
    //     this.loadData()
    // }, 500);
  },
  destroyed(){
    clearInterval(this.intv)
  }
};
</script>