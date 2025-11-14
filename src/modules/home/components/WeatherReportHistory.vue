<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherStore } from '@/modules/weather/store';

const weatherStore = useWeatherStore()
const reports = computed(() => weatherStore.weatherReportHistory)
</script>

<template>
  <div v-for="report in reports" :key="report.city.name + '-' + report.city.country">
    {{ report.city.name }} - {{ report.temperature }}°C
  </div>
</template>
