import bus from "@/lib/bus"
export const $send =function(){
    ue4(...arguments)
    bus.$emit(...arguments)
    // console.log(window.$parent);
    if(location.href.indexOf("iframe")<=0){
        // console.log( window.parent?.$send);
        if(window.parent.$send){
            window.parent.$send(...arguments)
            
        }
    }

}
export const $on = (name, func) => {
    ue.interface[name] = func
    bus.$on(name,func)
}

export const $off = (name) => {
    ue.interface[name] = null
    bus.$off(name)
}