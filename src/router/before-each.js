/**
 * @description 路由导航守卫
 */
import { $send } from "@/lib/custom-bus"
import store from "@/store"
import { isFish } from "../utils"
let canRouter = true
export default (router) => {
    router.beforeEach(async (to, from, next) => {
        if (to.name == null) {
            next({
                name: "map"
            })
            return
        }

        //banner页面处理
        if (document.getElementsByClassName('ui-banner').length >= 1) {

            for (let el of document.getElementsByClassName('ui-banner-left')) {
                el.style.marginLeft = (0 - el.offsetWidth - 36) + 'px'
            }

            for (let el of document.getElementsByClassName('ui-banner-right')) {
                el.style.marginRight = (0 - el.offsetWidth - 36) + 'px'
            }

            
            //延时切换
            setTimeout(() => {
                //发送到3d
                $send(to.name)

                //判断是否是鱼
                if(!isFish()){
                    store.state.showLeft1=true
                    store.state.showRight1=false
                    store.state.showLeft2=false
                    store.state.showRight2=true
                }

                next()
            }, 1000);
        } else {
            next()
        }
    })

    window.router = router
}

