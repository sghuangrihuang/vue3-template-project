<script setup lang="ts">
import { ref } from "vue";
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
    <div class="z-homepage-header">
      <div class="z-homepage-logo"></div>
      <el-menu class="z-homepage-menu" router :default-active="routerActive" :ellipsis="false" mode="horizontal">
        <el-menu-item v-for="item in roterList" :index="item.path" :key="item.path">{{ item.title }}</el-menu-item>
      </el-menu>
      <div class="z-homepage-setting"></div>
    </div>
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
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px var(--el-menu-border-color);
    .z-homepage-logo {
      flex: 0 0 50px;
      width: 50px;
    }
    .z-homepage-menu {
      border-bottom: none;
    }
    .z-homepage-setting {
      flex: 0 0 50px;
      width: 50px;
    }
  }
  .z-homepage-container {
    flex: 1;
    overflow: hidden;
  }
}
</style>