<template>
  <template v-if="userStore.getUserKey">
    <router-view></router-view>
  </template>
</template>

<script lang="ts" setup>
import { getConfigParameters, getUserInfo, getConsumnerUserKey } from '~/api'
import TTUserInfo from '~/utils/types/tt-user-info'
import UserInfo from '~/utils/types/user-info'
import ttUserInfoJson from '~/mock/tt-userinfo.json'
import userInfoJson from '~/mock/userinfo.json'
import userKeyJson from '~/mock/get_consumer_user_key.json'
import useUserStore from '~/store/modules/user';
import useTtuserStore from '~/store/modules/ttuser';

const userStore = useUserStore()
const ttuserStore = useTtuserStore()

let userDataInfo: UserInfo = new UserInfo()

const handleUserKey = (data: any) => {
  if (data.user_key) {
    userDataInfo.user_key_list = data.user_key
    userDataInfo.user_key = data.user_key[0]
  }
  userStore.$patch(userDataInfo)
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
    const userList: any = await getUserInfo({
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
    ttUserInfo.nickName = ttUserInfo.nickName === '张三' ?  '弗拉格' : ttUserInfo.nickName
    ttuserStore.$patch(ttUserInfo)
    fetchUserInfo(ttUserInfo)
  }
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
        // @ts-ignore
        window.h5sdk.ready(() => {
        // @ts-ignore
        tt.getUserInfo({
          success(res: any) {
            handleTTUserInfo(res)
          },
        });
      })
      },
      onFail: (error: any) => {
        console.log('h5sdk', '鉴权异常', error)
      }
    });
  } catch (_) {
    console.log('getConfigParameters', _)
    handleTTUserInfo(ttUserInfoJson)
  }
}

onMounted(() => {
  fetchLogin()
})

</script>
<style scoped lang="scss">
</style>