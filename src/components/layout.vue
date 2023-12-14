<script setup lang="ts">
import useUserStore from '~/store/modules/user';
const userStore = useUserStore()
</script>

<template>
  <div class="z-layout-container">
    <template v-if="userStore.getUserKey">
      <slot></slot>
    </template>
  </div>
</template>