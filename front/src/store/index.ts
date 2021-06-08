import { createStore } from 'vuex'
import Opinion from "@/models/Opinion";
import User from '@/models/User';
import { VueCookieNext } from 'vue-cookie-next'

export interface State {
  opinions: Array<Opinion>
  token: string,
}

export const store = createStore({
  state: {
    opinions: [],
    token: '',
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
