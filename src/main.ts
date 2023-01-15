import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import ApiService from "@/common/api.service";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

ApiService.init()

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
