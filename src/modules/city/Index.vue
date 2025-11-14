<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCityStore } from './store';
import { useRouter } from 'vue-router'
import { useWeatherStore } from '../weather/store';

const router = useRouter()

const cityStore = useCityStore()
const weatherStore = useWeatherStore()

const hasSeached = computed(() => cityStore.city !== null)

const report = computed(() => weatherStore.weatherReport)
const isLoading = computed(() => weatherStore.isLoading)


onMounted(() => {
    if(hasSeached.value == false)
        setTimeout(() => {
    router.push({name: 'home'})            
        }, 2000);
})

</script>

<template>
    <div v-if="!hasSeached">
        <p>
            You have not selected a city. Being redirected to home.
        </p>
    </div>
    
    <div v-else>
        <div v-if="isLoading"
        >
        Is loading...
        </div>
        <div v-else>
            {{ report.city.name }} - {{ report.temperature }}°C
        </div>

    </div>

</template>