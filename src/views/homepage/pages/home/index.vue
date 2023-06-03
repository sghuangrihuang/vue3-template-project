<script setup lang="ts">
import { ref } from "vue";
import Layout from "./../../components/layout.vue";
import Text2ImgPro from "./components/Text2ImgPro.vue";
import Img2ImgPro from "./components/Img2ImgPro.vue";
import Text2ImgSimple from "./components/Text2ImgSimple.vue";
import Img2ImgSimple from "./components/Img2ImgSimple.vue";
import ExtraSingleImage from "./components/ExtraSingleImage.vue";
import Img2Tag from './components/Img2Tag.vue'
import Png2Info from "./components/Png2Info.vue";

const selectComp = ref('图片生成(专业版)')
const dataList = ref([
  {
    title: '图片生成(专业版)',
    component: Text2ImgPro
  },
  {
    title: '以图生图(专业版)',
    component: Img2ImgPro
  },
  {
    title: '图片生成',
    component: Text2ImgSimple
  },
  {
    title: '以图生图',
    component: Img2ImgSimple
  },
  {
    title: '图片无损放大',
    component: ExtraSingleImage
  },
  {
    title: '图片反推tag',
    component: Img2Tag
  },
  {
    title: '图片解析tag',
    component: Png2Info
  }
])
</script>

<template>
  <Layout>
    <el-tabs class="tabs-container" v-model="selectComp" type="border-card">
      <el-tab-pane v-for="item in dataList" :key="item.title" :label="item.title" :name="item.title" lazy>
        <el-scrollbar>
          <component :is="item.component"></component>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </Layout>
</template>

<style lang="scss">
.tabs-container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-tabs__content {
    padding: 0;
    flex: 1;
    overflow: hidden;
  }
  .el-scrollbar__view {
    padding: 10px;
  }
  .el-tab-pane {
    position: relative;
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
  .el-tabs__header {
    flex: 0 0 auto;
  }
}
</style>