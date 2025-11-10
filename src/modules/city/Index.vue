<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCityStore, City } from './store';
import { useRoute } from 'vue-router'

const route = useRoute()

const cityStore = useCityStore()
const searchQUery = ref('')

const city = route.params["name"]

</script>

<template>
    {{ city }}

</template>