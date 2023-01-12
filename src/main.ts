import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import ApiService from "@/common/api.service";

import 'bootstrap/dist/css/bootstrap.css'
import './assets/main.css'

ApiService.init()

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
