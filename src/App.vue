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
        const data = await getConfigParameters()
        console.log(data)
      } catch (_) {
      }
    }
  }
}

</script>
<style scoped lang="scss">
</style>