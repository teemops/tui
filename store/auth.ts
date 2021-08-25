import { GetterTree, ActionTree, MutationTree } from 'vuex'
import User from '@/types/user'

export const state = () => ({
  user: {} as User,
  username: '' as string,
  token: {} as string | null,
  email: '' as string,
  beenHere: false as Boolean
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  user: state => state.user,
  token: state => state.token,
  beenHere: state=>state.beenHere
}

export const mutations: MutationTree<RootState> = {
  SET_USER_NAME: (state, username: string) => (state.username = username),
  SET_USER: (state, user: User) => (state.user = user),
  SET_TOKEN: (state, token: string) => (state.token = token),
  SET_EMAIL: (state, email: string) => (state.email = email),
  SET_HAS_LOGGED_IN: (state) => (state.beenHere = true)
}
//TODO: Wire up auth to teemops API
export const actions: ActionTree<RootState, RootState> = {
  async getUser({commit, state}){
    try {
      if(state.token){
        const result=await this.$axios.$get(`users/account`,{'headers': {
          'x-access-token': state.token
        }})
        if (result) {
          if(result.error!=undefined){
            throw result.error;
          }else{
            commit("SET_USER", result)
            return true;
          }
        
        }else{
          throw 'Error getting user details, token has expired'
        }
      }
    } catch (e) {
      console.error(e)
      commit("SET_TOKEN", null)
      commit("SET_USER", null)
      return false;
    }
  },
  async check({ commit }, email: string) {
    console.log('Check user exists')
    var result=await this.$axios.$get(`users/check/${email}`)
    return result.result
  },
  async register({ commit }, email: string) {
    try {
      const result=await this.$axios.$put(`users`, {
        email: email
      })
      if (result!=null && result.userId>0) {
        console.log(result)
        return true;
      }
    } catch (e) {
      throw e
    }
  },
  async login({ commit }, params: { email: string; password: string }) {
    try {
      const result=await this.$axios.$post(`users/login`, {
        email: params.email,
        password: params.password
      })
      if (result.status) {
        commit("SET_TOKEN", result.token)
        commit("SET_HAS_LOGGED_IN")
        return true
      }else{
        return false
      }
    } catch (e) {
      throw e
    }
  },
  async reset({ commit }, email: string ) {
    try {
      const result=await this.$axios.$post(`users/reset`, {
        email: email
      })
      if (result) {
        commit("SET_EMAIL", email)
        return true
      }else{
        return false
      }
    } catch (e) {
      throw e
    }
  },
  async verify({ commit, state }, params: {code: string, newPassword: string, email: string }) {
    try {
      const result=await this.$axios.$post(`users/verify`, {
        email: params.email,
        code: params.code,
        password: params.newPassword
      })
      if (result) {
        
        return true
      }else{
        return false
      }
    } catch (e) {
      throw e
    }
  },
  async completeReset(
    { commit },
    params: { code: string; newPassword: string }
  ) {
    
  },
  async generate({state}){
    try {
      const result=await this.$axios.$get(`users/generate`,{'headers': {
        'x-access-token': state.token
      }})
      if (result) {
        return result
      }else{
        throw 'Error getting codes'
      }
    } catch (e) {
      throw e
    }
  },
  logout({state, commit}){
    commit("SET_TOKEN", null)
    this.$router.push('login')
  }
}
