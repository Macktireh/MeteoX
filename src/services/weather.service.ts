import { SearchLocation, Weather } from "@/types";

const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export class WeatherService {
   static async fetchLocationByCoordinates(lat: number, lon: number): Promise<SearchLocation[]> {
    if (!apiKey) {
      throw new Error('API key is not defined');
    }

     try {
       const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${lat},${lon}`);
       if (!response.ok) {
         throw new Error('Failed to fetch location data');
       }
       return await response.json();
     } catch (error) {
      throw new Error(`Failed to fetch location: ${error}`);
     }
   }

  static async fetchLocationByCity(city: string): Promise<SearchLocation[]> {
    if (!apiKey) {
      throw new Error('API key is not defined');
    }

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`);
      if (!response.ok) {
        throw new Error('API request failed');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch location: ${error}`);
    }
  }

static async fetchWeatherForecastByCoordinates(lat: number, lon: number, days: number = 3): Promise<Weather> {
  if (!apiKey) {
    throw new Error('API key is not defined');
  }

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=${days}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather forecast');
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch weather forecast: ${error}`);
  }
}

  static async fetchWeatherForecastByCity(city: string, days: number = 3): Promise<Weather> {
    if (!apiKey) {
      throw new Error('API key is not defined');
    }

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather forecast');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch weather forecast: ${error}`);
    }
  }

}
