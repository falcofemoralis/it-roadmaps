import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import 'reflect-metadata';
import { VueCookieNext } from 'vue-cookie-next'

store.state.token = VueCookieNext.getCookie("token")

console.log(store.state);

createApp(App).use(VueCookieNext).use(store).use(router).mount('#app')
