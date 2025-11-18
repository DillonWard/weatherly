import { createRouter, createWebHistory } from "vue-router";
import { routes } from './routes'
import { getWeatherReport } from '@/modules/weather/services'
import { useCityStore } from "@/modules/city/store";
import { computed } from 'vue'


const router = createRouter({
    history: createWebHistory(),
    routes
})

function paramToString(param: string | string[] | undefined): string {
    return Array.isArray(param) ? param[0] : param ?? ''
}

router.beforeEach(async (to, from, next) => {
    const cityStore = useCityStore()

    const city = computed(() => cityStore.getCity)

    if (to.name === "city") {
        const cityParam = paramToString(to.params.city)
        const countryParam = paramToString(to.params.country)

        const changed = cityStore.getCityFromParams(cityParam, countryParam)
        if (changed && cityStore.city) {
            await getWeatherReport(cityStore.city)
        }
        else {
            await getWeatherReport(city.value!)
        }
    }
        next()

})
export default router