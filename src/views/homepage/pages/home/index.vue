<script setup lang="ts">
import Layout from "./../../components/layout.vue";
import Text2ImgPro from "./components/Text2ImgPro.vue";
import Img2ImgPro from "./components/Img2ImgPro.vue";
import Text2ImgSimple from "./components/Text2ImgSimple.vue";
import Img2ImgSimple from "./components/Img2ImgSimple.vue";
import ExtraSingleImage from "./components/ExtraSingleImage.vue";
import Img2Tag from './components/Img2Tag.vue'
import Png2Info from "./components/Png2Info.vue";

</script>

<template>
  <Layout>
    <el-tabs type="border-card">
      <el-tab-pane label="图片生成(专业版)" lazy><Text2ImgPro /></el-tab-pane>
      <el-tab-pane label="以图生图(专业版)" lazy><Img2ImgPro /></el-tab-pane>
      <el-tab-pane label="图片生成" lazy><Text2ImgSimple /></el-tab-pane>
      <el-tab-pane label="以图生图" lazy><Img2ImgSimple /></el-tab-pane>
      <el-tab-pane label="图片无损放大" lazy><ExtraSingleImage /></el-tab-pane>
      <el-tab-pane label="图片反推tag" lazy><Img2Tag /></el-tab-pane>
      <el-tab-pane label="图片解析tag" lazy><Png2Info /></el-tab-pane>
    </el-tabs>
  </Layout>
</template>

<style scoped lang="scss">

</style>