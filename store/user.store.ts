import { defineStore } from 'pinia'
import { getProfilePic } from '~~/services/bucket/profilePic'
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
    getProfilePicture: (state: RootState) => {
      const client = useSupabaseClient()
      const [profilePic, profilePicError] = getProfilePic(client, state.user?.email)
      if (profilePicError) return '/default-profile-pic.png'
      return [profilePic, null]
    },
    getUserId: (state: RootState) => {
      return state.user?.id
    }
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