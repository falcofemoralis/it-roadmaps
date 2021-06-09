import { createStore } from 'vuex'
import { VueCookieNext } from 'vue-cookie-next'

export interface State {
  token: string
}

export const store = createStore({
  state: {
    token: '' as string,
    isAdmin: false as boolean
  },
  getters: {
    getToken: state => {
      return state.token;
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      VueCookieNext.setCookie("token", token)
      state.token = token;
    },
    RESET: state => {
      VueCookieNext.removeCookie("token");
      state.token = "";
    }
  },
  actions: {
    login: ({ commit }, { token }) => {
      commit('SET_TOKEN', token);
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    }
  }
})
