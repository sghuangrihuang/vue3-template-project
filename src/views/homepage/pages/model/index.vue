<script setup lang="ts">
import Layout from "./../../components/layout.vue";
import { Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import CardInfo from "./components/card-info.vue";
import type { TabsPaneContext } from 'element-plus'

import { ElNotification } from 'element-plus'
import axios from 'axios'

const selectTab = ref('all')

const tabList = ref([
  {
    k: 'ALL',
    v: 'all'
  },
  {
    k: 'Small',
    v: 'small'
  }
])

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

const handleClick = (tab: TabsPaneContext) => {
  // const currenIndex = tab.index
  console.log(tab)
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <Layout>
    <div class="model-container">
      <el-tabs v-model="selectTab" class="model-header" @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList" :label="item.k" :name="item.v"></el-tab-pane>
      </el-tabs>
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
    :deep(.el-tabs__header) {
      .el-tabs__nav {
        gap: 8px;
      }
      .el-tabs__nav-wrap:after {
        content: none;
      }
      .el-tabs__active-bar {
        display: none;
      }
      .el-tabs__item {
        padding: 0px 8px;
        appearance: none;
        text-align: left;
        text-decoration: none;
        box-sizing: border-box;
        height: 26px;
        width: auto;
        border-radius: 4px;
        font-weight: 600;
        position: relative;
        line-height: 1;
        font-size: 14px;
        user-select: none;
        cursor: pointer;
        background: rgb(52, 58, 64);
        border: 1px solid transparent;
        color: rgb(255, 255, 255);
        text-transform: uppercase;
        margin-right: 8px;
        &.is-active {
          background: rgb(25, 113, 194);
        }
      }
    }
  }
  .model-content {
    flex: 1;
    width: 100%;
    overflow: hidden;
  }
}
</style>