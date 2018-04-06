import { APP_USER, APP_TOKEN, APP_REMEMBER } from 'genesis/support/index'
import { set, get } from 'genesis/infra/storage'
import { setToken } from 'genesis/infra/services/http/index'

export const CHANGE_USER = 'setAuthUser'

export const CHANGE_TOKEN = 'setAuthToken'

export const CHANGE_REMEMBER = 'setAuthRemember'

export const CHANGE_RECENT = 'setAuthRecent'

const state = {
  remember: get(APP_REMEMBER),
  user: undefined,
  token: undefined,
  recent: undefined
}

const getters = {
  getAuthRemember: (state) => state.remember,
  getAuthUser: (state) => state.user,
  getAuthToken: (state) => state.token,
  getAuthRecent: (state) => state.recent
}

const actions = {
  setAuthRemember: (store, remember) => {
    store.commit(CHANGE_REMEMBER, remember)
    set(APP_REMEMBER, remember, true)
  },
  setAuthUser: (store, user) => {
    store.commit(CHANGE_USER, user)
    set(APP_USER, user, !!store.getters.getAuthRemember)
  },
  setAuthToken: (store, token) => {
    store.commit(CHANGE_TOKEN, token)
    set(APP_TOKEN, token, !!store.getters.getAuthRemember)
    setToken(token)
  },
  setAuthRecent: (store, recent) => {
    store.commit(CHANGE_RECENT, recent)
  }
}

const mutations = {
  [CHANGE_REMEMBER] (state, remember) {
    state.remember = remember
  },
  [CHANGE_USER] (state, user) {
    state.user = user
  },
  [CHANGE_TOKEN] (state, token) {
    state.token = token
  },
  [CHANGE_RECENT] (state, recent) {
    state.recent = recent
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
