import { fetchWeatherApi } from "openmeteo";
import { useSearchStore } from "@/modules/search/store";


const url = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherReport(latitude: number, longitude: number) {
    const searchStore = useSearchStore()

    searchStore.toggleIsLoading()

    const params = {
        latitude,
        longitude,
        hourly: "temperature_2m"
    }

    const responses = await fetchWeatherApi(url, params)
    const response = responses[0]

    const elevation = response.elevation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    console.log(
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
    );

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

    console.log("\nHourly data:\n", weatherData.hourly)
    searchStore.toggleIsLoading()


}