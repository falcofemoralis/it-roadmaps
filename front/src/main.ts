import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import 'reflect-metadata';
import { VueCookieNext } from 'vue-cookie-next'
import AuthService from '@/services/AuthService'

store.state.token = VueCookieNext.getCookie("token")
AuthService.checkPermission().then((isAdmin) => store.state.isAdmin = isAdmin);

createApp(App).use(VueCookieNext).use(store).use(router).mount('#app')
