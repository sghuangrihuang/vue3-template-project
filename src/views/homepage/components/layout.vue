<script setup lang="ts">
</script>

<template>
  <el-row class="layout-view">
    <el-col :span="4"></el-col>
    <el-col class="layout-container" :span="16">
      <slot></slot>
    </el-col>
    <el-col :span="4"></el-col>
  </el-row>
</template>

<style scoped lang="scss">
.layout-view {
  position: relative;
  height: 100%;
  overflow: hidden;
  .layout-container {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}
</style>