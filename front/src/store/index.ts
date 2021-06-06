import { createStore } from 'vuex'
import { Opinion } from "../models/Node"

export interface State {
  opinions: Array<Opinion>
}

export const store = createStore({
  state: {
    opinions: [],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
