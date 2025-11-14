<script setup lang="ts">
import { computed} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'

const route = useRoute()
const router = useRouter()

const showSearchBar = computed(() => route.name !== 'home' ? true : false)

function returnToHomepage(){
    router.push({name: 'home'})
}

</script>

<template>
    <div class="min-w-screen h-[50px] bg-blue-400 border-b border-gray-400 text-2xl flex items-center px-4 gap-4">
        <div class="text-gray-50 hover:cursor-pointer" v-once v-on:click="returnToHomepage">Weatherly</div>
        <div class="relative ml-auto">
            <SearchBar v-show="showSearchBar" />
        </div>
    </div>
</template>
