<script setup lang="ts">
import { toggleDark, isDark } from "~/composables";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { ref } from "vue";
const defaultRouter: string = '/homepage/home'
const routerActive = ref(defaultRouter)
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
  <div class="homepage-header">
    <div class="homepage-logo"></div>
    <el-menu class="homepage-menu" router :default-active="routerActive" :ellipsis="false" mode="horizontal">
      <el-menu-item v-for="item in roterList" :index="item.path" :key="item.path">{{ item.title }}</el-menu-item>
    </el-menu>
    <div class="homepage-setting" @click="toggleDark()">
      <el-icon class="border-none w-full bg-transparent cursor-pointer" :size="20" style="height: var(--el-menu-item-height)">
        <component :is="isDark ? Sunny : Moon"></component>
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.homepage-header {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px var(--el-menu-border-color);
  .homepage-logo {
    flex: 0 0 50px;
    width: 50px;
  }
  .homepage-menu {
    border-bottom: none;
  }
  .homepage-setting {
    flex: 0 0 50px;
    width: 50px;
  }
}
</style>