import { defineStore } from 'pinia'
import { IUser } from "~~/interfaces/IUser"

export type RootState = {
  user: IUser | null
}

export const useUserStore = defineStore({
  id: "userStore",
  state: (): RootState => {
    const user = useSupabaseUser()
    if (!user) return { user: null }
    const { id, email, user_metadata, created_at, updated_at } = user.value
    return {
      user: {
        id,
        email,
        user_metadata,
        created_at,
        updated_at
      }
    }
  },
  getters: {
    getUser: (state: RootState) => state.user,
  },
  actions: {
    setUser(user: IUser) {
      this.user = user
    },
    clearUser() {
      this.user = null
    }
  }
})