import axios from "@/lib/axios"


export const alarmStatis = (params) => {
    return axios.request({
        url: '1135538034867961856',
        headers: {
            token: "b974cd2273c34810836ab24a380686a8",
            appid: "1135538034867961856"
        },
        params
    })
}


export const alarmList = (params) => {
    return axios.request({
        url: '1135602924370526208',
        headers: {
            token: "b7af3bdb0b2c44aaa3bb0d85f9699335",
            appid: "1135602924370526208"
        },
        params
    })
}

export const getEvent=(params)=>{
    return axios.request({
        url: '1136328236255412224',
        headers: {
            token: "4d2622304a0b482f870edde3003e5cc8",
            appid: "1136328236255412224"
        },
        params
    })
}

export const getEventPer=(params)=>{
    return axios.request({
        url: '1136339118939176960',
        headers: {
            token: "be19145a7d3b4b3ba05e6d44e2da7c10",
            appid: "1136339118939176960"
        },
        params
    })
}

export const getEventRank=(params)=>{
    return axios.request({
        url: '1136341579699585024',
        headers: {
            token: "0de7660370554ab697c3e33b5fb67a4a",
            appid: "1136341579699585024"
        },
        params
    })
}