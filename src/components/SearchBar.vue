<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useCityStore, City } from '@/modules/city/store'
import { useRouter } from 'vue-router'
import { useQueryHandler } from '@/composables/query.ts'

const { formatQuery } = useQueryHandler()

const cityStore = useCityStore()
const city = computed(() => cityStore.city)

const searchQuery = ref(city.value ? `${city.value.name}, ${city.value.country}` : '')

const router = useRouter()

const showResults = ref(false)
const results = computed(() => cityStore.searchCity(searchQuery.value.replace(/[^a-zA-Z ]/g, "")))

const inputRef = ref<HTMLElement | null>(null)
const resultsRef = ref<HTMLElement | null>(null)

function selectCity(city: City): void {
    searchQuery.value = `${city.name}, ${city.country}`

    cityStore.selectCity(city)
    showResults.value = false
    router.push({
        name: 'city',
        params: {
            country: formatQuery(city.country, true),
            city: formatQuery(city.name, true)
        }
    })
}

function checkIfQuery(): void {
    if (searchQuery.value.length >= 3 && results.value.length > 0) {
        showResults.value = true
    }
}

function handlePointerDownOutside(event: PointerEvent) {
    const path = (event.composedPath && event.composedPath()) || (event as any).path
    const target = event.target as Node

    const clickedInsideInput = inputRef.value && (path ? path.includes(inputRef.value) : inputRef.value.contains(target))
    const clickedInsideResults = resultsRef.value && (path ? path.includes(resultsRef.value) : resultsRef.value.contains(target))

    if (!clickedInsideInput && !clickedInsideResults) {
        showResults.value = false
    }
}

watch(results, (after) => {
    showResults.value = after.length > 0 ? true : false
})

watch(city, (newCity) => {
  searchQuery.value = newCity ? `${newCity.name}, ${newCity.country}` : ''
}, { immediate: true })


onMounted(() => {
    document.addEventListener('pointerdown', handlePointerDownOutside, { capture: true })
})

onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', handlePointerDownOutside, { capture: true })
})


</script>

<template>
    <div>
        <input v-model="searchQuery" ref="inputRef" @focus="checkIfQuery()"
            class="bg-white rounded-sm text-lg px-2 focus:outline-none border border-gray-300 w-full"
            placeholder="Search city..." />
        <ul v-if="showResults" ref="resultsRef"
            class="absolute bg-white shadow-md mt-1 w-full max-h-60 overflow-auto border border-gray-300 rounded-sm z-10">
            <li v-for="(c, index) in results" :key="index" @click="selectCity(c)"
                class="p-2 hover:bg-gray-200 cursor-pointer text-lg">
                {{ c.name }}, {{ c.country }}
            </li>
        </ul>

    </div>
</template>