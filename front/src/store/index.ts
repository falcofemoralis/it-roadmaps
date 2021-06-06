import { createStore } from 'vuex'
import Opinion from "@/models/Opinion";
import Roadmap from "@/models/Roadmap";

export interface State {
  opinions: Array<Opinion>
  roadmap: Roadmap
}

export const store = createStore({
  state: {
    opinions: [],
    roadmap: {}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
