/**
 * @description axios配置管理
 */
import axios from "axios"
import router from "@/router"
import { Notification } from "element-ui"
import CryptoJS from 'crypto'
import qs from "querystring"
let token = null
let tokenType = null
const user = 'admin'
const password = 'witPark@2023'
const isc = true
let instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_ENERGY_URL,
    timeout: 100000,
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
})

instance.interceptors.request.use(async config => {
    // let token = getCookie("Authorization")
   config.headers.Authorization = `${tokenType} ${token}`;
    return config
})

instance.interceptors.response.use(data => {
    if (data.data.success) {
        return data.data

    } else {
        if (data.data.code == 401) {
            token = null
            router.replace({
                name: "energy",
                query: {
                    date: new Date()
                }
            })

        }
        Notification.error(data.data.msg)
        throw new Error(data.data.msg)

    }


})
function getKey(username) {
    return axios.request({
        baseURL: process.env.VUE_APP_BASE_ENERGY_URL,
        url: '/poros-authcenter/secret/' + username
    })
}

export async function getToken() {
    let res = await getKey(user)
    let data = {
        username: user,
        password,
        grant_type: 'password'
    }
    data.password = encryptByDES(data.password, res.data.data)
    let resu = await axios.request({
        baseURL: process.env.VUE_APP_BASE_ENERGY_URL,
        url: '/poros-authcenter/login',
        method: 'post',
        data: qs.stringify(data)
    })
    token = resu.data.data.accessToken
    tokenType = resu.data.data.tokenType

}

function encryptByDES(str, key) {
    var keyHex = Buffer.from(key)
    var iv = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8])
    var cipher = CryptoJS.createCipheriv('des-cbc', keyHex, iv)
    cipher.setAutoPadding(true) // default true
    var ciph = cipher.update(str, 'utf8', 'base64')
    ciph += cipher.final('base64')
    return ciph
}


export default instance