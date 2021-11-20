import { GetterTree, ActionTree, MutationTree } from 'vuex'
import User from '@/types/user'

export const state = () => ({
  user: {} as User,
  token: {} as string | null,
  beenHere: false as Boolean
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  user: state => state.user,
  token: state => state.token,
  beenHere: state=>state.beenHere
}

export const mutations: MutationTree<RootState> = {
  SET_USER: (state, user: User) => (state.user = user),
  SET_TOKEN: (state, token: string) => (state.token = token),
  SET_HAS_LOGGED_IN: (state) => (state.beenHere = true),
  SET_NO_LOGIN: (state) => (state.beenHere = false)
}
//TODO: Wire up auth to teemops API
export const actions: ActionTree<RootState, RootState> = {
  /**
   * Get user details
   * 
   * @param param0 
   * @returns 
   */
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
  /**
   * Check user exists (automatically email)
   * 
   * @param param0 
   * @param email 
   * @returns 
   */
  async check({ commit }, email: string) {
    console.log('Check user exists')
    var result=await this.$axios.$get(`users/check/${email}`)
    return result.result
  },
  /**
   * Register new email address
   * 
   * @param param0 
   * @param email 
   * @returns 
   */
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
  /**
   * Login as user
   * 
   * @param param0 
   * @param params 
   * @returns 
   */
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
  /**
   * Reset password step 1
   * 
   * @param param0 
   * @param email 
   * @returns 
   */
  async reset({ commit }, email: string ) {
    try {
      const result=await this.$axios.$post(`users/reset`, {
        email: email
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
  /**
   * Registers user and sets status to 1
   * 
   * @param param0 
   * @param params 
   * @returns 
   */
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
  /**
   * TODO
   * @param param0 
   * @param params 
   */
  async completeReset(
    { commit },
    params: { code: string; newPassword: string }
  ) {
    
  },
  /**
   * Generate a unique code and stsexternalId for adding a new AWS Account via CloudFormation
   * See https://docs.teemops.com/api
   * 
   * @param param0 
   * @returns 
   */
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
  /**
   * Logout and set token to null
   * 
   * @param param0 
   */
  logout({state, commit}){
    commit("SET_TOKEN", null)
    commit("SET_USER", null)
    this.$router.push('login')
    

    //window.location.href='/login'
    
  },
  /**
   * This is triggered from the login form "cancel" link
   * 
   * Clears the login history and forces redirect to start page.
   * This updates 'beenHere' to false so that all subsequent visits
   * will go directly to home page (unless login again)
   * 
   * @param param
   */
  clear({state, commit}){
    commit("SET_NO_LOGIN", null)
    this.$router.push('/')
  }
}
