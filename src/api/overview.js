import axios from "@/lib/axios";

//人员分析
export const personAnalysis = () => {
    return axios.request({
        url: '1133772116345225216',
        headers: {
            token: "249a8b4245bb458b9dcf3c8e5fbd0691",
            appid: "1133772116345225216"
        }
    })
}

//人员通行记录
export const personTarvel = () => {
    return axios.request({
        url: '1133785611325407232',
        headers: {
            token: "b8756c1d04004b39aa58722e59155c1f",
            appid: "1133785611325407232"
        }
    })
}

//车辆分析
export const carAnalysis = () => {
    return axios.request({
        url: '1133812962310488064',
        headers: {
            token: "c2cf17751fa64abfab2ac4c12926befd",
            appid: "1133812962310488064"
        }
    })
  
}

//车辆通行记录
export const carTravel = () => {
        return axios.request({
            url: '1133819529252569088',
            headers: {
                token: "cafecebc47064dc1b9527fbc446fa865",
                appid: "1133819529252569088"
            }
        })
      
}