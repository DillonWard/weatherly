import { defineStore } from 'pinia'
import citiesData from 'cities.json'
import { getWeatherReport } from '@/modules/weather/services'

const cities: City[] = (citiesData as CityJson[]).map(c => ({
    name: c.name,
    lat: parseFloat(c.lat),
    lng: parseFloat(c.lng),
    country: c.country
}))

interface State {
    city: City | null
    cities: City[]
}

export const useCityStore = defineStore('city', {
    state: (): State => {
        return {
            city: null as City | null,
            cities: cities as City[],
        }
    },

    getters: {
        getCity: (state): City | null => state.city
    },

    actions: {
        searchCity(query: string): City[] {
            if (!query || query.trim().length < 3) return []
            return this.cities.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
        },
        async selectCity(city: City | null): Promise<void> {
            this.city = city
            if(city !== null)
                await getWeatherReport(city)
        },
    },
    persist: {
        pick: ['city']
    }
})


interface CityJson {
    name: string
    lat: string
    lng: string
    country: string
}


export interface City {
    name: string
    lat: number
    lng: number
    country: string
}