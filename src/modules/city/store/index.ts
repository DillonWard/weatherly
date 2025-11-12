import { defineStore } from 'pinia'
import citiesData from 'cities.json' 


const cities: City[] = (citiesData as City[]).map(c => ({
    name: c.name,
    lat: c.lat,
    lng: c.lng,
    country: c.country
}))

interface State {
    city: City | null
    cities: City[]
    isLoading: boolean
}

export const useCityStore = defineStore('city', {
    state: (): State => {
        return {
            city: null,
            cities,
            isLoading: false
        }
    },

    getters: {
        getCity: (state) => state.city
    },

    actions:{
        searchCity(query: string): City[] {
            if(!query || query.trim().length < 3) return []
            return this.cities.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
        },
        selectCity(city: City){
            this.city = city
        }
    }

})



export interface City{
    name: string
    lat: string
    lng: string
    country: string
}