<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useCityStore } from './store';
import { useRoute } from 'vue-router'
import { useWeatherStore } from '../weather/store';
import { getWeatherReport } from '@/modules/weather/services'
import { useQueryHandler } from '@/composables/query'

const route = useRoute()
const { paramToString, formatQuery } = useQueryHandler()

const cityStore = useCityStore()
const weatherStore = useWeatherStore()

const report = computed(() => weatherStore.weatherReport)
const isLoading = computed(() => weatherStore.isLoading)

async function fetchWeatherForRoute() {
    const cityParam = formatQuery(paramToString(route.params.city))
    const countryParam = formatQuery(paramToString(route.params.country))

    const changed = cityStore.getCityFromParams(cityParam, countryParam)
    if (changed || !cityStore.city) {
        cityStore.getSetCity(cityParam, countryParam)
        await getWeatherReport(cityStore.city)
    }
    else {
        await getWeatherReport(cityStore.city)
    }
}

watch(() => [route.params.city, route.params.country], () => {
    fetchWeatherForRoute()
}, { immediate: true })

onMounted(() => {
    fetchWeatherForRoute()
})

</script>

<template>
    <div v-if="isLoading || !report">
        Is loading...
    </div>
    <div v-else>
        {{ report.city.name }} - {{ report.temperature }}°C
    </div>


</template>