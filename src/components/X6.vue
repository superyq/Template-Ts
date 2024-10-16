<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map: any = ref(null);

onMounted(() => {
  AMapLoader.load({
    key: "5650f52e49ff91430866ad5a5db80699", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap: any) => {
      map.value = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
      });
      //点标记显示内容
      const markerContent = `<div class="custom-content-marker">
<img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">
<div class="close-btn" onclick="clearMarker()">X</div>
</div>`;
      const position = new AMap.LngLat(116.397428, 39.90923); //Marker 经纬度
      const marker = new AMap.Marker({
        position: position,
        content: markerContent, //将 html 传给 content
        offset: new AMap.Pixel(-13, -30), //以 icon 的 [center bottom] 为原点
      });
      map.value?.add(marker);
    })
    .catch((e: any) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map.value?.destroy();
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
