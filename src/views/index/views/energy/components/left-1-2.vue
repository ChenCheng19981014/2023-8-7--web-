<style lang="scss" scoped>

</style>

<template>
    <div class="ui">
        <custom-rank :data="rankData" style="height:323px;width:100%"></custom-rank>
    </div>
</template>

<script>
export default {
    data(){
        return{
            rankData:[]
        }
    },
    props:{
        time:String
    },
    computed:{

    },
    methods:{
        async loadRankData(){
            this.rankData=[
                {
                    name:"12寸工厂",
                    value:68888.88
                },
                 {
                    name:"新8寸工厂",
                    value:58888.88
                },
                 {
                    name:"8寸工厂",
                    value:48888.88
                },
                 {
                    name:"CUB",
                    value:38888.88
                },
                  {
                    name:"综合楼",
                    value:28888.88
                }
            ]
        },
       async loadData(){
        this.loadRankData()
        },
    },
    created(){
        this.loadData()
    },
    watch:{

        time(){
            this.loadData()
        }
    }
}
</script>