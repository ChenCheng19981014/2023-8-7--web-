import axios from "@/lib/axios/energy"


export const queryEnterpriseEnergyEfficiencyz = async (data) => {
    let topParentId = await getParentId()
    data.topParentId=topParentId
    return axios.request({
        url: "/cms-cloud-service/energyUsedInfo/queryEnterpriseEnergyEfficiency",
        method: 'post',
        data
    })
}

export const queryChildRanking =async (data) => {
    let topParentId = await getParentId()
    data.topParentId=topParentId
    data.locationId=topParentId
    return axios.request({
        url: "/cms-cloud-service/energyUsedInfo/queryChildRanking",
        method: 'post',
        data
    })
}

let topParentId = null
const getParentId = async () => {
    if (!topParentId) {
        let data = await axios.request({
            method: "post",
            url: "cms-cloud-service/locationTree/queryCacheAllTop",
            data: {

            }
        })

        topParentId=data.data[0].topParentId
    }

    return topParentId
}

export const getUnit = async () => {
  return axios.request({
        method: "post",
        url: "cms-cloud-service/locationTree/queryCacheAllTop",
        url: "cms-cloud-service/energyInfo/queryCache",
        data: {

        }
    })

}


export const queryChildUsed=async (data)=>{
    let topParentId=await getParentId()
    data.topParentId=topParentId
    data.locationId=topParentId
    return axios.request({
        method: "post",
        url: "cms-cloud-service/energyUsedInfo/queryChildUsed",
        data
    })
}


export const queryCarbonUse=async (data)=>{
    let topParentId=await getParentId()
    data.topParentId=topParentId
    return axios.request({
        url: "business/CarbonEmissionView/queryCarbonUse",
        params:data
    })
}

export const carbonTrend=async(data)=>{
    let topParentId=await getParentId()
    data.topParentId=topParentId
    return axios.request({
        url: "business/CarbonEmissionView/Trend",
        params:data
    })
}

export const alarm=async(data)=>{
    let topParentId=await getParentId()
    data.topParentId=topParentId
    return axios.request({
        url: "cms-cloud-service/AlarmLog/queryPageList",
        method:"post",
        data
    })
}