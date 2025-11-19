import { ref } from 'vue'
import { WeatherData } from '@/modules/weather/store'
import { getWeatherReport } from '@/modules/weather/services'
import { City } from '@/modules/city/store'

export function useWidgetData(city: City){
    const report = ref<WeatherData | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchReport = async(city: City) => {
        loading.value = true
        error.value = null
        try {
            const data = await getWeatherReport(city)
            if(data){
                report.value = data
            } else {
                error.value = 'No data available'
            }
        } catch (e) {
            error.value = 'Failed to fetch data'
        } finally {
            loading.value = false
        }

    }
    fetchReport(city)
    return { report, loading, error, fetchReport }
}