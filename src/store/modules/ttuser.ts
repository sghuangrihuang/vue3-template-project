import { defineStore } from 'pinia'
import TTUserInfo from '~/utils/types/tt-user-info'

const useTtuserStore = defineStore('ttuser', {
  state: (): TTUserInfo => new TTUserInfo()
})

export default useTtuserStore