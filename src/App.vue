<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { getConfigParameters } from './api'

export default {
  name: 'app',
  created() {
    this.login()
  },
  methods: {
    async login() {
      try {
        await getConfigParameters()
      } catch (_) {
      }
    }
  }
}

</script>
<style scoped lang="scss">
</style>