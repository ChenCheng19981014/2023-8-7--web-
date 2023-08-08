<template>
<div>
    <iframe style="width:100%;border:none;outline:none;height:1000px" :src="src" frameborder="0"></iframe>
</div>
</template>

<script>
import {$on,$send} from "@/lib/custom-bus"
// console.log(window);
// if(window.locaiton.href.indexOf('iframe')>=0){
   
// }
export default {
    data(){
        return{
            src:"http://localhost/#/point-popup-safe-other?id=1"
        }
    },
    created(){

        
        $on("displaySafeDialogUe",(id)=>{
            $send("displaySafeDialog",id)
        })
        $on("iframe",(url)=>{
            this.src=''
            setTimeout(() => {
                this.src=url
            }, 200);
        })

         window.$send=$send
    }

}
</script>