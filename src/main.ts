import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import ApiService from "@/common/api.service";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



ApiService.init()

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
