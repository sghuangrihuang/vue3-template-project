<script setup lang="ts">
import Layout from "./../../components/layout.vue";
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import { toRaw } from '@vue/reactivity'
import 'vue-waterfall-plugin-next/dist/style.css'

import { reactive, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import axios from 'axios'

const model_data = reactive({
  list: []
})

onMounted(async () => {
  await axios({
    url: '/getModels',
    method: 'GET',
  }).then(response => {
    model_data.list = toRaw(response.data.data)
    // https://web-proxy.bitamin.ml/

  }).catch(error => {
    console.log(error)
    ElNotification({
      title: '服务器不在线',
      message: '服务器不在线或者故障！请联系管理员或者刷新页面！',
      duration: 0,
      type: 'error'
    })
  })

})
</script>

<template>
  <Layout scrollbar>
    <Waterfall :list="model_data.list">
      <template #item="{ item }">
        <div class="card" v-if="item.model_images && item.model_images.length > 0">
          <LazyImg :url="item.model_images[0].url" />
          <p class="text">{{item.name}}</p>
        </div>
      </template>
    </Waterfall>
  </Layout>
</template>

<style scoped lang="scss">

</style>