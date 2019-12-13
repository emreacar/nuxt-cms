export const state = () => ({
  appData: {},
  page: {},
  positions: {
    CONTENT_TOP: [],
    CONTENT_TOP_LEFT: [],
    CONTENT_TOP_RIGHT: [],
    CONTENT_LEFT: [],
    CONTENT_RIGHT: [],
    CONTENT_BOTTOM: [],
    CONTENT_BOTTOM_LEFT: [],
    CONTENT_BOTTOM_RIGHT: []
  },
  modules: {}
})

export const mutations = {
  setPage (state, page) {
    state.page = page
    if (page.modules) {
      Object.keys(page.modules).forEach((position) => {
        state.positions[position] = page.modules[position]
      })
    }
  },
  setModules (state, modules) {
    state.modules = modules
  },
  setAppData (state, appData) {
    state.appData = appData
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { app }) {
    const { appData } = await app.$axios.$get('app')
    commit('setAppData', appData)
  }
}
