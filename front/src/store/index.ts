import { createStore } from 'vuex'
import Opinion from "@/models/Opinion";

export interface State {
  opinions: Array<Opinion>
}

const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

export const store = createStore({
  state: {
    opinions: [],
    token: '',
    user: {}
  },
  getters: {
    isLoggedIn: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    login: ({ commit, dispatch }, { token, user }) => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
      // set auth header
      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    }
  }
})
