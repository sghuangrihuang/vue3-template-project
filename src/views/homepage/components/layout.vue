<script setup lang="ts">
</script>

<template>
  <el-row class="layout-view">
    <el-col :span="4"></el-col>
    <el-col :span="16">
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
}
</style>