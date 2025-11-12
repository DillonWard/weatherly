import { City } from "@/modules/city/store";
import { defineStore } from "pinia";

interface State {

}


export interface WeatherData {
    city: City
    temperature: number
    
}