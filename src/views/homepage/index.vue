<script setup lang="ts">
import { ref } from "vue";
import HomePageHeader from "./components/header.vue";
const routerActive = ref('/homepage/home')
const roterList = ref([
  {
    title: '主页',
    path: '/homepage/home'
  },
  {
    title: 'Stable Diffusion在线版',
    path: '/homepage/other'
  },
  {
    title: 'ChatGpt 在线版',
    path: '/homepage/chatgpt'
  }
])
</script>

<template>
  <div class="z-homepage-container">
    <HomePageHeader class="z-homepage-header" />
    <div class="z-homepage-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.z-homepage-container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .z-homepage-header {
    position: relative;
    border-bottom: solid 1px var(--el-menu-border-color);
  }
  .z-homepage-container {
    flex: 1;
    overflow: hidden;
  }
}
</style>