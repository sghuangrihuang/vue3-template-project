import { defineStore } from 'pinia'

interface IUserState {
  firstName: string
  lastName: string
}
const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    firstName: 'Liu',
    lastName: 'Dehua'
  }),
  getters: {
    fullName(): string {
      return this.firstName + ' ' + this.lastName
    }
  }
})

export default useUserStore