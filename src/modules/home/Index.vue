<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCityStore, City } from '../city/store';

const cityStore = useCityStore()
const searchQuery = ref('')

const results = computed(() => cityStore.searchCity(searchQuery.value))

function selectCity(city: City) {
  cityStore.selectCity(city)
}
</script>

<template>
  <!-- <input v-model="searchQuery" placeholder="Search city..." />

  <ul>
    <li v-for="(c, index) in results" :key="index" @click="selectCity(c)">
      {{ c.name }}, {{ c.country }}
    </li>
  </ul>

  <div v-if="cityStore.city">
    Selected: {{ cityStore.city.name }}, {{ cityStore.city.country }}
  </div> -->
</template>
