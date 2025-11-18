<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'

const route = useRoute()
const router = useRouter()

const showSearchBar = computed(() => route.name !== 'home')

const returnToHomepage = () => {
  if (route.name !== 'home') {
    router.push({ name: 'home' })
  }
}
</script>

<template>
    <header class="w-full h-[50px] bg-blue-400 border-b border-gray-400 flex items-center px-4 gap-4">
        <h1 
            class="text-2xl text-gray-50 cursor-pointer select-none transition-opacity hover:opacity-80" 
            @click="returnToHomepage"
        >
            Weatherly
        </h1>
        <div class="ml-auto">
            <Suspense>
              <SearchBar v-if="showSearchBar" />
              <template #fallback>
                <div class="w-[300px] h-10 bg-gray-200 animate-pulse rounded"></div>
              </template>
            </Suspense>
        </div>
    </header>
</template>