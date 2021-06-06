// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { State } from "@/store/index";
import { api } from "@/services/api";


declare module '@vue/runtime-core' {
    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $api: typeof api
        $store: Store<State>
    }
}