import maxios from "@/lib/axios/monitor"
import axios from "@/lib/axios/index"

export const getEctList=()=>{
    return axios.request({
        url: '1135935648675397632',
        headers: {
            token: "a867d7e98d634388af3c994ec9c4991c",
            appid: "1135935648675397632"
        },
    })
}

export const getEct=()=>{
    return axios.request({
        url: '1135957543193935872',
        headers: {
            token: "ff59921f499e4fb680791d425f61dd6c",
            appid: "1135957543193935872"
        },
    })
}


export const getFind=()=>{
    return axios.request({
        url: '1136608929413857280',
        headers: {
            token: "6440471b17734c1aa805b7cd717278dd",
            appid: "1136608929413857280"
        },
    })
}

export const getConfirm=(params)=>{
    return axios.request({
        url:"1136347873399537664",
        headers:{
            token: "9bc74dca88944431a3cb6304e4d0f771",
            appid: "1136347873399537664"
        },
        params
    })
}

export const getErrorList=(params)=>{
    return axios.request({
        url:"1136350449331339264",
        headers:{
            token: "decb3339f09c4cefb61f54c4a9c6b514",
            appid: "1136350449331339264"
        },
        params
    })
}

export const getError=(params)=>{
    return axios.request({
        url:"1135969686635151360",
        headers:{
            token:"d8321caf0ea149a089669097c0eaf5d1",
            appid:"1135969686635151360"
        },
        params
    })
}

export const getErrorType=(params)=>{
    return axios.request({
        url:"1135965349586403328",
        headers:{
            token:'c9c2a76e97a6426e95a2a4dccbcdece1',
            appid:"1135965349586403328"
        },
        params
    })
}

export const getErrorLine=(params)=>{
    return axios.request({
        url:"1135977173530705920",
        headers:{
            token:'ee4930b2fe1046f9a1d7d84124f0f59a',
            appid:"1135977173530705920"
        },
        params
    })
}

export const getErrorLevel=(params)=>{
    return axios.request({
        url:"1135971695702573056",
        headers:{
            token:'cc27085932b345f3b48125203a7d4d14',
            appid:"1135971695702573056"
        },
        params
    })
}

export const getFindList=(params)=>{
    return axios.request({
        url:"1136615934711037952",
        headers:{
            token:'fc24d9889211488e8dc83967817760c9',
            appid:"1136615934711037952"
        },
        params
    })
}