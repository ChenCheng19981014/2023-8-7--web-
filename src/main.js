import Vue from "vue"
import App from "./App"

//vuex & router
import router from "./router"
import store from "./store"

//mock数据
import "./mock"

//element ui
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI);

//公共样式
import "./design/index.scss"

//公共组件
import "./components"
//mixin
import "./mixin"
import { update } from "@tweenjs/tween.js"
import { isFish } from "./utils"
function animate() {
  requestAnimationFrame(animate);
  update()
}
animate();


if(process.env.VUE_APP_BASE_IS_UE){
  setTimeout(() => {
    store.state.fish=isFish()
    if(!store.state.fish){
      store.state.showLeft1=true
      store.state.showRight1=false
      store.state.showLeft2=false
      store.state.showRight2=true
  }else{
    store.state.showLeft1=true
    store.state.showRight1=true
    store.state.showLeft2=true
    store.state.showRight2=true
  }
    new Vue({
      el: "#app",
      router,
      store,
      render: (h) => h(App),
    })
  }, 500);
}else{
  new Vue({
    el: "#app",
    router,
    store,
    render: (h) => h(App),
  })
}


