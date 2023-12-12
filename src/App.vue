<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { getConfigParameters } from './api'

const userInfo = () => {
  window.h5sdk.ready(() => {
    // @ts-ignore
    tt.getUserInfo({
      success(res) {
        console.log(res)
      },
      fail(err) {
      },
    });
  })
}

const login = async () => {
  try {
    const url = location.href.split("#")[0]
    const res = await getConfigParameters({
      url
    })
    // @ts-ignore
    window.h5sdk.config({
      appId: res.appid,
      timestamp: res.timestamp,
      nonceStr: res.noncestr,
      signature: res.signature,
      onSuccess: res => {
        userInfo()
      },
      onFail: err => {
      },
    });
  } catch (_) {
  }
}

login()

</script>
<style scoped lang="scss">
</style>