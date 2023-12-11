<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
import { getAddrsList } from './api'
export default {
  name: 'app',
  created() {
    this.login()
  },
  methods: {
    async login() {
      try {
        await getAddrsList()
      } catch (_) {
      }
    }
  }
}

</script>
<style scoped lang="scss">
</style>