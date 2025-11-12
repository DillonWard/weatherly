import type { RouteRecordRaw } from "vue-router";
import Home from '@/modules/home/Index.vue'
import City from "@/modules/city/Index.vue";

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
        path: '/city/:name',
        name: 'city',
        component: City

    }
]