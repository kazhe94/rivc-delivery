import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { 
        path: '/',
        component: () => import('../pages/MainPage.vue')
    },
    { 
        path: '/menu',
        component: () => import('../pages/MenuPage.vue')
    },
    {
        path: '/cart',
        component: () => import('../pages/CartPage.vue')
    },
    {
        path: '/login',
        component: () => import('../pages/LoginPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
});

export default router;