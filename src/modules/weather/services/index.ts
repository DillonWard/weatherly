import { fetchWeatherApi } from "openmeteo";
import { City } from "@/modules/city/store";
import { useWeatherStore, WeatherData } from "../store";

const url = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherReport(city: City) : Promise<WeatherData | null> {

    const params = {
        latitude: city.lat,
        longitude: city.lng,
        hourly: "temperature_2m"
    }

    const responses = await fetchWeatherApi(url, params)
    const response = responses[0]

    const utcOffsetSeconds = response.utcOffsetSeconds();

    const hourly = response.hourly()!;

    const weatherData = {
        hourly: {
            time: Array.from(
                { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
                (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature_2m: hourly.variables(0)!.valuesArray(),
        },
    };

    const now = Date.now()

    const index = weatherData.hourly.time.reduce((closestIdx, curr, idx, arr) => {
        const currTime = new Date(curr).getTime()
        const closestTime = new Date(arr[closestIdx]).getTime()
        return Math.abs(currTime - now) < Math.abs(closestTime - now) ? idx : closestIdx
    }, 0)


    return {
        city: city,
        temperature: Math.round(weatherData.hourly.temperature_2m[index])
    }



}