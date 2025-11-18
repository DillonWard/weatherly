import type { RouteRecordRaw } from "vue-router";
import Home from '@/modules/home/Index.vue'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/:country/:city',
        name: 'city',
        component: () => import("@/modules/city/Index.vue")

    }
]