<template>
    <button @click="click">点击</button>
</template>

<script>
import {$send} from "@/lib/custom-bus"
export default {
    methods:{   
        click(){
               $send("displaySafeDialog", "一號大樓");       
        }
    }
}
</script>
