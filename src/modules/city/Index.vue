<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCityStore, City } from './store';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const city = route.params["name"]

const cityStore = useCityStore()
const hasSeached = computed(() => cityStore.city !== null)


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

</template>