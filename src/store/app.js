export const SET_DARK_THEME = 'DARK_THEME'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const TOGGLE_WITHOUT_ANIMATION = 'TOGGLE_WITHOUT_ANIMATION'

const state = {
  darkTheme: localStorage.getItem('darkTheme') === 'true',
  drawer: localStorage.getItem('drawer') === 'true'
}

export function onLoad (store) {
  window.addEventListener('storage', event => {
    switch (event.key) {
        case 'darkTheme':
            store.commit(SET_DARK_THEME, event.newValue === 'true')
            break;
        case 'drawer':
            store.commit(TOGGLE_DRAWER, event.newValue === 'true')
            break;
    }
  }, false)
}

const mutations = {
  [SET_DARK_THEME] (state, darkTheme) {
    state.darkTheme = darkTheme
  },
  [TOGGLE_DRAWER] (state, drawer) {
      state.drawer = drawer
  }
}

const actions = {
  setDarkTheme({ commit }, darkTheme) {
    commit(SET_DARK_THEME, darkTheme)
    localStorage.setItem('darkTheme', darkTheme)
  },
  toggleDrawer({ commit }, drawer) {
    commit(TOGGLE_DRAWER, drawer)
    localStorage.setItem('drawer', drawer)
  }
}

const getters = {
    darkTheme: ({ darkTheme }) => darkTheme,
    drawer: ({ drawer }) => drawer
}

export default {
  state,
  mutations,
  actions,
  getters
}