<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import { useCityStore, City } from '@/modules/city/store'

const cityStore = useCityStore()

const city = computed(()=> cityStore.city)

</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="col-start-2 col-span-2">
      <div class="border rounded-sm border-gray-300 p-4">
        <div class="flex justify-center">
          <div class="relative w-[300px]">
            <SearchBar />
            {{ city }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
