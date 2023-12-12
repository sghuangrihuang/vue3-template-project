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
        const url = encodeURIComponent(location.href.split("#")[0]);
        const res = await getConfigParameters({
          url
        })
        window.h5sdk.config({
          appId: res.appid,
          timestamp: res.timestamp,
          nonceStr: res.noncestr,
          signature: res.signature,
          jsApiList: [],
          //鉴权成功回调
          onSuccess: (res) => {
            console.log(`config success: ${JSON.stringify(res)}`);
          },
          //鉴权失败回调
          onFail: (err) => {
            throw `config failed: ${JSON.stringify(err)}`;
          },
        });
        window.h5sdk.ready(() => {
          // window.h5sdk.ready回调函数在环境准备就绪时触发
          // 调用 getUserInfo API 获取已登录用户的基本信息，详细文档参见https://open.feishu.cn/document/uYjL24iN/ucjMx4yNyEjL3ITM
          tt.getUserInfo({
            success(res) {
              console.log(`getUserInfo success: ${JSON.stringify(res)}`);
              console.log(res)
            },
            // getUserInfo API 调用失败回调
            fail(err) {
              console.log(`getUserInfo failed:`, JSON.stringify(err));
            },
          });
      } catch (_) {
      }
    }
  }
}

</script>
<style scoped lang="scss">
</style>