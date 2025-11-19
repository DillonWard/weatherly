<script setup lang="ts">
import { useWidgetData } from './composables/useWidgetData';
import { useRouter } from 'vue-router'
import { useQueryHandler } from '@/composables/query'

const { formatQuery } = useQueryHandler()

const router = useRouter()

interface Props {
  report: {
    city: {
      name: string;
      country: string;
      lat: number;
      lng: number;
    };
    temperature: number;
  };
}

const props = defineProps<Props>();
const { report, loading, error } = useWidgetData(props.report.city)

function goToReport() {
  router.push({
    name: 'city',
    params: {
      country: formatQuery(props.report.city.country, true),
      city: formatQuery(props.report.city.name, true)
    }
  })

}

</script>

<template>
  <div class="border rounded-sm border-gray-300 p-4 cursor-pointer w-64 flex items-center justify-center" @click="goToReport">
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else-if="report">
      {{ report.city.name }} - {{ report.temperature }}°C
    </div>
  </div>
</template>
