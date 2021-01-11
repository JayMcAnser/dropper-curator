/**
 * Definition of a board (page)
 */

export const state = () => ({
  activeColumnIndex: 0
})

export const mutations = {
  activeIndex(state, index) {
    state.activeColumnIndex = index
  }
}

export const actions = {
  async activate(context, index) {
    context.commit('activeIndex', index)
  }
}
