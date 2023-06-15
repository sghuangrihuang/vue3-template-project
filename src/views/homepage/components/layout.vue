<script setup lang="ts">
const props = defineProps({
  /** 是否开启滚动条 */
  scrollbar: Boolean
})

</script>

<template>
  <el-row class="layout-view">
    <el-col :span="4"></el-col>
    <el-col class="layout-container" :span="16">
      <template v-if="props.scrollbar">
        <el-scrollbar>
          <slot></slot>
        </el-scrollbar>
      </template>
      <template v-else>
        <slot></slot>
      </template>
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