<script setup lang="ts">
import { onBeforeMount } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import WeatherReportWidget from './components/WeatherReportWidget.vue'
import { useCityStore } from '@/modules/city/store'
import { computed } from 'vue';
import { useWeatherStore } from '@/modules/weather/store';

const weatherStore = useWeatherStore()
const reports = computed(() => weatherStore.weatherReportHistory)

const cityStore = useCityStore()

onBeforeMount(() =>  cityStore.selectCity(null))

</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="col-start-2 col-span-2">
      <div class="border rounded-sm border-gray-300 p-4 ">
        <div class="flex justify-center">
          <div class="relative w-[300px]">
            <SearchBar />
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div class="pt-2" v-for="report in reports" :key="report.city.name + '-' + report.city.country">
          <WeatherReportWidget :report="report" />
        </div>

      </div>
      </div>
  </div>
</template>
