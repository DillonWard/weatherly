import { defineStore } from 'pinia'
import { City } from '@/modules/city/store';

interface State {
    search: Search | null
    searches: Search []
    isLoading: boolean
}

export const useSearchStore = defineStore('search', {
    state: (): State => {
        return {
            search: null,
            searches: [],
            isLoading: false
        }
    },
    getters: {
        getSearches: (state) => state.searches
    },
    actions: {        
        addSearchEntry(city: City){
            this.searches.append({
                city,
                timestamp: new Date()
            })
        },
        toggleIsLoading(){
            this.isLoading = !this.isLoading
        }
    }
})

export interface Search {
    city: City
    timestamp: Date
}