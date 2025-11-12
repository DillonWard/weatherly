<script setup>
import './index.css'
import Header from './components/Header.vue';
</script>

<template>
  <div class="min-h-screen min-w-screen bg-blue-white max-h-screen">
    <div>
      <Header />
    </div>
    <div class="h-[calc(100vh-50px)]">
      <div class="pt-10">
      <RouterView></RouterView>

      </div>

    </div>
  </div>
</template>

<style scoped></style>
