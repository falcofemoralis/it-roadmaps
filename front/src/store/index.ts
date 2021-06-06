import { createStore } from 'vuex'
import Opinion from "@/models/Opinion";
import Roadmap from "@/models/Roadmap";

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
