<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { getConfigParameters, getUserInfo, getConsumnerUserKey } from '~/api'
import TTUserInfo from '~/utils/types/tt-user-info'
import UserInfo from '~/utils/types/user-info'
import ttUserInfoJson from '~/mock/tt-userinfo.json'
import userInfoJson from '~/mock/userinfo.json'
import userKeyJson from '~/mock/get_consumer_user_key.json'

let userDataInfo: UserInfo = new UserInfo()

const handleUserKey = (data: any) => {
  if (data.user_key) {
    userDataInfo.user_key = data.user_key[0]
  }
}

const fetchUserKey = async () => {
  try {
    const res: any = await getConsumnerUserKey({
      user_email: userDataInfo.email,
    })
    handleUserKey(res)
  } catch (_) {
    console.log('fetchUserKey', _)
    handleUserKey(userKeyJson)
  }
}

const handleUserInfo = (userList: UserInfo[]) => {
  const user = userList[0]
  userDataInfo = new UserInfo(user)
  fetchUserKey()
}

const fetchUserInfo = async (ttUserInfo: TTUserInfo) => {
  try {
    const userList: UserInfo[] = await getUserInfo({
      name: ttUserInfo.nickName,
    })
    handleUserInfo(userList)
  } catch (_) {
    console.log('getUserInfo', _)
    handleUserInfo(userInfoJson)
  }
}

const handleTTUserInfo = (res: any) => {
  if (res.errMsg === 'getUserInfo:ok') {
    const ttUserInfo = new TTUserInfo(res.userInfo)
    fetchUserInfo(ttUserInfo)
  }
}

const userInfo = () => {
  // @ts-ignore
  window.h5sdk.ready(() => {
    // @ts-ignore
    tt.getUserInfo({
      success(res: any) {
        handleTTUserInfo(res)
      },
    });
  })
}

const fetchLogin = async () => {
  try {
    const url = location.href.split("#")[0]
    const res: any = await getConfigParameters({
      url
    })
    // @ts-ignore
    window.h5sdk.config({
      appId: res.appid,
      timestamp: res.timestamp,
      nonceStr: res.noncestr,
      signature: res.signature,
      onSuccess: (_: any) => {
        userInfo()
      },
      onFail: (error: any) => {
        console.log('h5sdk', '鉴权异常')
      }
    });
  } catch (_) {
    console.log('getConfigParameters', _)
    handleTTUserInfo(ttUserInfoJson)
  }
}

fetchLogin()

</script>
<style scoped lang="scss">
</style>