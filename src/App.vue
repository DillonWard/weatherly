<script setup>
import './index.css'
import Header from './components/Header.vue';
</script>

<template>
  <div class="min-h-screen bg-blue-white flex flex-col">
    <Header />
    <main class="flex-1 overflow-auto">
      <div class="pt-10 px-4">
        <RouterView v-slot="{ Component }">
          <Suspense>
            <component :is="Component" />
            <template #fallback>
              <div class="flex items-center justify-center h-32">
                <div class="text-lg text-gray-600">Loading...</div>
              </div>
            </template>
          </Suspense>
        </RouterView>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  contain: layout style;
}
</style>