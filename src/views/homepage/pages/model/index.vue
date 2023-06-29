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

const fetchData = async () => {
  try {
    const response =  await axios({
      url: '/getModels',
      method: 'GET',
    })
    // https://web-proxy.bitamin.ml/
    model_data.list = toRaw(response.data.data)
  } catch (error) {
    console.log(error)
    ElNotification({
      title: '服务器不在线',
      message: '服务器不在线或者故障！请联系管理员或者刷新页面！',
      duration: 0,
      type: 'error'
    })
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <Layout>
    <div class="model-container">
      <div class="model-header"></div>
      <el-scrollbar class="model-content">
        <Waterfall :list="model_data.list" :width="250" :gutter="16">
          <template #item="{ item }">
            <CardInfo :item="item"/>
          </template>
        </Waterfall>
      </el-scrollbar>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.model-container {
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .model-header {
    flex: 0 0 auto;
    width: auto;
  }
  .model-content {
    flex: 1;
    width: 100%;
    overflow: hidden;
  }
}
</style>