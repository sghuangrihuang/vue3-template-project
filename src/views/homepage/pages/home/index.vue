<script setup lang="ts">
import Layout from "./../../components/layout.vue";
import GenerateText2Img from './components/GenerateText2Img.vue'
import Img2Blowup from './components/Img2Blowup.vue'
import Img2Tag from './components/Img2Tag.vue'
</script>

<template>
  <Layout>
    <el-tabs type="border-card" style="margin-top: 10px;">
      <el-tab-pane label="图片生成"><GenerateText2Img/></el-tab-pane>
      <el-tab-pane label="图片无损放大"><Img2Blowup /></el-tab-pane>
      <el-tab-pane label="图片解析tag"><Img2Tag /></el-tab-pane>
      <el-tab-pane label="以图生图（待做）">以图生图（待做）</el-tab-pane>
      <el-tab-pane label="模型格式查询（待做）"></el-tab-pane>
    </el-tabs>
  </Layout>
</template>

<style scoped lang="scss">

</style>