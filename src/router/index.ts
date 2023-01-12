import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                title: "Byke App"
            },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue')
        },
        {
            path: '/sorties',
            name: 'sortie-list',
                component: () => import('../views/SortieListView.vue')
        },
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
