<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
import Services from '~/services'
export default {
  name: 'app',
  created() {
    this.login()
  },
  methods: {
    async login() {
      try {
      } catch (_) {
      }
    }
  }
}

</script>
<style scoped lang="scss">
</style>