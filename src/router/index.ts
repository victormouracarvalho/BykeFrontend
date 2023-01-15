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
            component: () => import('../views/LoginView.vue'),
            meta: {
                title: "Connexion",
            },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue'),
            meta: {
                title: "Inscription",
            },
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: {
                title: "Profil",
            },
        },
        {
            path: '/sorties',
            name: 'sortie-list',
            component: () => import('../views/SortieListView.vue'),
            meta: {
                title: "Sorties",
            },
        },
        {
            path: '/map',
            name: 'map-test',
            component: () => import('../views/MapTestView.vue'),
            meta: {
                title: "Leaflet",
            },
        },
        {
            path: '/sortiesView/:id',
            name: 'sortie-view',
            component: () => import('../views/SortieDisplayView.vue'),
            meta: {
                title: "Sortie - Modify",
            },
        },
        {
            path: '/sortiesCreate',
            name: 'sortie-create',
            component: () => import('../views/SortieCreateView.vue'),
            meta: {
                title: "Sortie - Create",
            }
        }
    ]
})


router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
});

export default router
