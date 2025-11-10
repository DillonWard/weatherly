<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useCityStore, City } from '@/modules/city/store'
import { useRoute } from 'vue-router'

const route = useRoute()

const searchQuery = ref('')
const cityStore = useCityStore()

const results = computed(() => cityStore.searchCity(searchQuery.value))
const showResults = ref(false)

const inputRef = ref<HTMLElement | null>(null)
const resultsRef = ref<HTMLElement | null>(null)

const showSearchBar = computed(() => route.name !== 'home' ? true : false)

function handleClickOutsideEvent(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (inputRef.value && resultsRef.value && !inputRef.value.contains(target) && !resultsRef.value.contains(target)) {
        showResults.value = false
    }
}

function selectCity(city: City) {
    cityStore.selectCity(city)
}

function checkIfQuery(){
    if(searchQuery.value.length > 3 && results.value.length > 0)
        showResults.value = true
}

watch(results, (after, before) => {
    showResults.value = after.length > 0 ? true : false
})
onMounted(() => {
    document.addEventListener('click', handleClickOutsideEvent)
})
onBeforeUnmount(() => {
    document.addEventListener('click', handleClickOutsideEvent)
})

</script>

<template>
    <div class="min-w-screen h-[50px] bg-blue-400 border-b border-gray-400 text-2xl flex items-center px-4 gap-4">
        <div class="text-gray-50 hover:cursor-pointer">Weatherly</div>
        <div class="relative ml-auto">
            <input v-show="showSearchBar" v-model="searchQuery" ref="inputRef" @focus="checkIfQuery()" class="bg-white rounded-sm text-lg px-2 focus:outline-none"
                placeholder="Search city..." />
            <ul v-if="showResults" ref="resultsRef" class="absolute bg-white shadow-md mt-1 w-full max-h-60 overflow-auto">
                <li v-for="(c, index) in results" :key="index" @click="selectCity(c)"
                    class="p-2 hover:bg-gray-200 cursor-pointer text-lg">
                    {{ c.name }}, {{ c.country }}
                </li>
            </ul>
        </div>
    </div>
</template>
