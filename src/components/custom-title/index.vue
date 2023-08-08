<style lang="scss" scoped>
.custom-title{
    display: flex;
    justify-content: space-between;
    width:100%;
    height: 38px;
    background-image: url('../../assets/common/title-bg.png');
    background-size: 100% 100%;
    padding-left: 49px;
    padding-right: 16px;
    .text{
        position: relative;
        top:6px;
        font-family: "pm";
        letter-spacing: 1.6px;
        font-size: 20px;
         background: linear-gradient(180deg, $white, $white 35%, #00ff85);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    }

}
</style>

<template>
    <div class="custom-title">

        <div class="text pm">{{title}}</div>
        <div class="right">
            <slot></slot>
        </div>

    </div>
</template>


<script>
export default {
    name:"custom-title",
    props:{
        title:String
    },

}
</script>