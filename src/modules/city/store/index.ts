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
        getCityFromParams(cityParam: string, countryParam: string): boolean {
            const cityName = cityParam.toLowerCase()
            const countryName = countryParam.toLowerCase()
            if (!this.city || this.city.name.toLowerCase() !== cityName || this.city.country.toLowerCase() !== countryName) {
                this.city = this.cities.find(c => c.name.toLowerCase() === cityName && c.country.toLowerCase() === countryName) || null
                return true
            }
            return false
        },
        getSetCity(city: string, country: string): void{
            this.city = this.cities.find(c => c.name.toLowerCase() === city && c.country.toLowerCase() === country) || null
        },
        selectCity(city: City | null): void {
            this.city = city
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