import { defineStore } from 'pinia'
import UserInfo from '~/utils/types/user-info'

const useUserStore = defineStore('user', {
  state: (): UserInfo => new UserInfo(),
  getters: {
    getUserKey: (state: UserInfo) => state.user_key
  }
})

export default useUserStore