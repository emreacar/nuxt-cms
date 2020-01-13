export const state = () => ({
  appData: {},
  page: {},
  content: [],
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
  modules: {},
  pagePath: []
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
  setCrumb (state, paths = []) {
    state.pagePath = []
    paths.forEach((p) => {
      if (!p.isMain) {
        state.pagePath.push({
          to: p.slug[state.appData.settings.defaultLang],
          title: p.title[state.appData.settings.defaultLang]
        })
      }
    })
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
  },
  async send ({ commit }, params) {
    const options = {
      path: params.path,
      data: params.data || {}
    }

    const response = await this.$axios.$post(params.path, options.data)
    return response
  }
}
