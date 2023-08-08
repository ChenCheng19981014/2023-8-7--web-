<style lang="scss" scoped>
.scroll2 {
  .scroll-main {
    height: 168px;
    width: 100%;
    overflow: hidden;
    .row:nth-child(even) {
      background: rgba(0, 0, 0, 0.12);
    }
  }

  .row {
    height: 28px;
    display: flex;
    align-items: center;

    .row-item {
      text-align: center;
      font-size: 14px;
      flex-shrink: 0;
      color: $light;
      white-space: nowrap;
      overflow: hidden;
      flex: 1;
      text-align: center;
      span {
        font: 14px;
        color: $light;
      }
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
</style>

<template>
  <div class="ui">
    <sub-title title="能耗KPI" style="margin-bottom: 12px">
        <el-dropdown>
        <span class="el-dropdown-link">
          {{getSelect.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item of selectors" :key="item.name" @click.native="select=item.id">{{ item.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </sub-title>

    <div class="scroll2" style="margin-bottom: 14px">
      <div class="scroll2-header row">
        <div class="row-item">能耗区域</div>
        <div class="row-item">使用量</div>
        <div class="row-item">完成情况</div>
      </div>
      <div class="scroll-main">
        <scroll-wrap :distance="28">
          <div class="row" v-for="(item, index) of tableList" :key="index">
            <div class="row-item">{{item.localName}}</div>
            <div class="row-item">{{item.totalUsed}}</div>
            <div class="row-item img-row">
               <span style="color: #03fefe" v-if="item.value > 60"
                >{{ item.value }}%</span
              >
              <span style="color: #ffbe5c" v-else-if="item.value > 30"
                >{{ item.value }}%</span
              >
              <span style="color: #ff5e5e" v-else>{{ item.value }}%</span>
            </div>
          </div>
        </scroll-wrap>
      </div>
    </div>
  </div>
</template>

<script>
import {queryChildUsed} from "@/api/energy"
export default {
  data() {
    return {
      select:null,
      tableList: [],
    };
  },
  props: {
    time: String,
  },
  computed: {
    getSelect(){
      return this.selectors.filter(e=>e.id==this.select)[0]||{}
    },  
    selectors(){
         return [
        {
          name: "电",
          unit1: "kWh",
          unit2: "MKWh",
          id:this.u['电']
                  },
        {
          name: "水",
          unit1: "吨",
          unit2: "万吨",
          id:this.u['水']
        },
        {
         
          name: "天然气",
         
          unit1: "m³",
          unit2: "万m³",
          id:this.u['天然气']
        },
        {
          
          name: "压缩空气",
          
          unit1: "m³",
          unit2: "万m³",
          id:this.u['压缩空气']
        },
      ] 
    }
  },
  methods: {
    async loadTableList() {

      queryChildUsed({
        startDate: this.getTime()[0],
        endDate: this.getTime()[1],
        type:"day",
        resultDateType: this.getDateType(),
        energyCode:this.select
      }).then(res=>{
        this.tableList=res.data.map(e=>{
          return{
            ...e,
            value:e.finishRate.split("%")[0]*1
          }
        })
    })

    return
      this.tableList = [
        {
          value: 50,
        },
        {
          value: 60,
        },
        {
          value: 80,
        },
        {
          value: 50,
        },
        {
          value: 60,
        },
        {
          value: 80,
        },
        {
          value: 50,
        },
        {
          value: 60,
        },
        {
          value: 80,
        },
      ];
    },
    async loadData() {
      this.loadTableList();
    },
  },
  created() {
    this.select=this.u['电']
  },
  watch: {
    select(){
      this.loadData()
    },
    
    time() {
      this.loadData();
    },
  },
};
</script>