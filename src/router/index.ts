import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta:{
             title: "Byke App"
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/map',
            name: 'map',
            component: () => import('../views/MapView.vue')
        }
    ]
})


router.beforeEach(
    (to,
     from,
     next) => {
        document.title = `${to.meta.title}`;
        next();
    });

export default router
