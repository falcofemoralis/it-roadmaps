import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { api } from "@/services/api";
import 'reflect-metadata';

// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

const app = createApp(App)
app.config.globalProperties.$api = api;
app.use(store).use(router).mount('#app')
