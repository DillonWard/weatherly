<script setup lang="ts">
import { onBeforeMount } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import WeatherReportHistory from './components/WeatherReportHistory.vue'
import { useCityStore } from '@/modules/city/store'

const cityStore = useCityStore()

onBeforeMount(() =>  cityStore.selectCity(null))

</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="col-start-2 col-span-2">
      <div class="border rounded-sm border-gray-300 p-4">
        <div class="flex justify-center">
          <div class="relative w-[300px]">
            <SearchBar />
          </div>
        </div>
      </div>
      <div>
        <WeatherReportHistory />
      </div>
    </div>

  </div>
</template>
