import Vue from "vue"
import { isFish } from "../utils"
import moment from "moment/moment"
// Vue.filter("thousand",(value,unit1,unit2)=>{
//     console.log(unit1);
//     if(value>=10000){
//         value=(value/10000).toFixed(2)
//         value+=`<span style="font-size:14px;color:rgb(255,255,255,0.7)">${unit1}</span>`
//     }else{
//         value+=`<span style="font-size:14px;color:rgb(255,255,255,0.7)">${unit2}</span>`
//     }
//     return value;
// })


Vue.mixin({
    computed: {
        fmt() {
            return function (value, unit1, unit2) {
                if(!value){
                    value=0
                }

                value*=1
                if (!unit2) {
                    unit2 = "万" + unit1
                }
                
                const color = `rgb(255,255,255,0.5)`
                if (value >= 10000) {
                    value = (value / 10000).toFixed(2)
                    return value + `<span class="fs" style="font-weight:100;font-size:14px;color:${color};margin-left:4px">${unit2}</span>`
                } else {
                    return value + `<span class="fs" style="font-weight:100;font-size:14px;color:${color};margin-left:4px">${unit1}</span>`
                }
            }
        }
    }
})

Vue.filter("thousand", (e) => {
    return e.toLocaleString()
})

Vue.mixin({
    methods: {
        groupDataCount(data, groupKey, labelKey, fn = function (data) { return data }, add = function (data) {
            return 1
        }) {

            //拷贝数据
            let copy = JSON.parse(JSON.stringify(data))

            //获取columns 
            let column = {
            }

            copy.map(item => {

                if(labelKey.indexOf('custom')>=0){
                    column[labelKey.split("-")[1]]=0
                }else{
                    column[item[labelKey]] = 0

                }
            })


            //结果
            let result = {}
            copy.map(item => {
                let groupName = fn(item[groupKey])
                if (!result[groupName]) {
                    result[groupName] = {
                        name: groupName,
                        ...column
                    }
                }

                if(labelKey.indexOf('custom')>=0){
                    result[groupName][labelKey.split("-")[1]]+=add(item)
                }else{
                    result[groupName][item[labelKey]]+= add(item)

                }
            })


            return Object.values(result)


        }
    }
})

Vue.mixin({
    data() {
        return {
            fish: isFish()

        }
    }
})

Vue.mixin({
    methods: {
        getTimeN(){
            return {
                day:1,
                month:2,
                year:3
            }[this.time]
        },
        getTime(time) {
            if(!time)time=this.time
            if (time == 'day') {
                return [moment().format("YYYY-MM-DD"), moment().add(1, 'days').format("YYYY-MM-DD"),]
            }

            if (time == 'month') {
                return [moment().startOf('month').format("YYYY-MM-DD"), moment().add(1, 'days').format("YYYY-MM-DD")]
            }
            if (time == 'year') {
                return [moment().startOf("year").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")]
            }
        },
        getDateType() {
            return {
                year: 2,
                day: 6,
                month: 3
            }[this.time]
        }
    },
    computed:{
        u(){
            return this.$store.state.units
        }
    }

})