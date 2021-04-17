import { GetterTree, ActionTree, MutationTree } from 'vuex'
import User from '@/types/user'


export const state = () => ({
  intro: true
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: (state) => state.name,
}

export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
}

/**
 * Examples of using this.$router.push
 * // object
router.push({ path: 'home' })

// named route
router.push({ name: 'user', params: { userId: '123' } })

// with query, resulting in /register?plan=private
router.push({ path: 'register', query: { plan: 'private' } })
 */
export const actions: ActionTree<RootState, RootState> = {
  /**
   * Adds a new conference and if no date/time it will
   * automatically redirect to the new video conference
   *
   * @param commit | used to commit to local mutations
   * @param conf | New Conference Details
   */
  async myFunctions(
    { commit },
    params: { conf: Object; instant: boolean }
  ) {
    
    commit('CHANGE_NAME', "blah")
  },
  /**
   * Gets something
   *
   * @param commit | used to commit to local mutations
   */
  async getSomething({ commit }) {
    

    commit("CHANGE_NAME", "blah")
    
  }
}
