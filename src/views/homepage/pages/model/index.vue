<script setup lang="ts">
import Layout from "./../../components/layout.vue";
import { Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import CardInfo from "./components/card-info.vue";

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
    <Waterfall :list="model_data.list" :width="250" :gutter="16">
      <template #item="{ item }">
        <CardInfo :item="item"/>
      </template>
    </Waterfall>
  </Layout>
</template>

<style scoped lang="scss">

</style>