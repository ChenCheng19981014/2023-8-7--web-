# Web

## 切换页面到综合态势 
    $emit("overview")
## 切换页面到园区安防
    $emit("safe")
## 切换页面到便携通行
    $emit("travel")
## 切换页面到能源管理  
    $emit("energy")

## 切换到设备管理
    $emit("device)

## 鸟瞰视角
    $emit("back")

## 切换到地图界面
    $emit("map")
## 显示隐藏便捷通行界面点位
    $emit("displayTravelPoint",'online',true) 
    $emit("displayTravelPoint",'online',false)
    $emit("displayTravelPoint",'offline',true) 
    $emit("displayTravelPoint",'offline',false)

## 显示隐藏能源页面点位
    $emit("displayEnergyPoint",'online',true) 
    $emit("displayEnergyPoint",'online',false)
    $emit("displayEnergyPoint",'offline',true) 
    $emit("displayEnergyPoint",'offline',false)

# UE发送 -three

## 显示安全系统监控弹框 
    $emit("displaySafeDialog",楼名称)

## 3D地图选择宜兴点击
    $emit("over-view")


<!-- three-scene -->
    1、.env不上传
    2、数字加单位使用v-html fmt方法
    3、加背景