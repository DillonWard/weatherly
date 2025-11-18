import { createRouter, createWebHistory } from "vue-router";
import { routes } from './routes'
import { getWeatherReport } from '@/modules/weather/services'
import { useCityStore } from "@/modules/city/store";
import { computed } from 'vue'


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router