import { City } from "@/modules/city/store";
import { defineStore } from "pinia";
import { getWeatherReport } from "../services";

interface State {
    weatherReport: WeatherData | null
    weatherReportHistory: WeatherData[]
    isLoading: boolean
}

export const useWeatherStore = defineStore('weather', {
    state: (): State => {
        return {
            weatherReport: null as WeatherData | null,
            weatherReportHistory: [] as WeatherData[],
            isLoading: false as boolean
        }
    },
    getters: {
        getWeatherHistory(): WeatherData[] {
            return this.weatherReport
        }
    },
    actions: {
        cacheWeatherReport(weatherReport: WeatherData): void {
            const index = this.weatherReportHistory.findIndex(
                (i) => i.city.name === weatherReport.city.name &&
                i.city.country === weatherReport.city.country
            )
            if(index >= 0)
                this.weatherReportHistory.splice(index, 1)
            
            if(this.weatherReportHistory.length >= 3)
                this.weatherReportHistory.pop()

            this.weatherReportHistory.unshift(weatherReport)
        },
        async fetchWeatherReport(city: City): Promise<void> {
            this.isLoading = true
            const report = await getWeatherReport(city)
            this.setWeatherReport(report)
            this.isLoading = false
        },
        setWeatherReport(weatherReport : WeatherData): void {
            this.weatherReport = weatherReport
            this.cacheWeatherReport(weatherReport)
        },
        toggleIsLoading(): void{
            this.isLoading = !this.isLoading
        }
    },
    persist: {
        pick: ["weatherReport", 'weatherReportHistory']
    }
})


export interface WeatherData {
    city: City
    temperature: number
    timestamp?: Date
}