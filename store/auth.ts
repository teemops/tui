import { GetterTree, ActionTree, MutationTree } from 'vuex'
import User from '@/types/user'

export const state = () => ({
  user: {} as User,
  username: '' as string,
  token: {} as string | null
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  user: state => state.user
}

export const mutations: MutationTree<RootState> = {
  SET_USER_NAME: (state, username: string) => (state.username = username),
  SET_USER: (state, user: User) => (state.user = user)
}
//TODO: Wire up auth to teemops API
export const actions: ActionTree<RootState, RootState> = {
  async register({ commit }, user: User) {
    console.log('Register')
    console.log(JSON.stringify(user))
    try {
      const result=this.$axios.$post(`users`, {
        ...user
      })
      if (result) {
        console.log(result)
        //update first name and last name
        
        this.$router.push({ name: 'thanks' })
      }
    } catch (e) {
      throw e
    }
  },
  async login({ commit }, params: { email: string; password: string }) {
    console.log('Login')
    
  },
  async reset({ commit }, params: { email: string }) {
    
  },
  async verifyResetCode({ commit }, params: { code: string }) {
    
  },
  async completeReset(
    { commit },
    params: { code: string; newPassword: string }
  ) {
    
  }
}
