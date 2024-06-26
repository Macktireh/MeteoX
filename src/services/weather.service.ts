import { SearchLocation, Weather } from "@/types";

const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const baseApiUrl = process.env.EXPO_PUBLIC_WEATHER_BASE_API_URL;

export class WeatherService {
  static async fetchLocationByCoordinates(lat: number, lon: number, lang: string = "en"): Promise<SearchLocation[]> {
    WeatherService.checkOrThrow();

    try {
       const response = await fetch(`${baseApiUrl}/search.json?key=${apiKey}&q=${lat},${lon}&lang=${lang}`);
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch location: ${error}`);
    }
  }

  static async fetchLocationByCity(city: string, lang: string = "en"): Promise<SearchLocation[]> {
    WeatherService.checkOrThrow();

    try {
      const response = await fetch(`${baseApiUrl}/search.json?key=${apiKey}&q=${city}&lang=${lang}`);
      if (!response.ok) {
        throw new Error('API request failed');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch location: ${error}`);
    }
  }

  static async fetchWeatherForecastByCoordinates(lat: number, lon: number, days: number = 3, lang: string = "en"): Promise<Weather> {
    WeatherService.checkOrThrow();

    try {
      const response = await fetch(`${baseApiUrl}/forecast.json?key=${apiKey}&q=${lat},${lon}&days=${days}&lang=${lang}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather forecast');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch weather forecast: ${error}`);
    }
  }

  static async fetchWeatherForecastByCity(city: string, days: number = 3, lang: string = "en"): Promise<Weather> {
    WeatherService.checkOrThrow();

    try {
      const response = await fetch(`${baseApiUrl}/forecast.json?key=${apiKey}&q=${city}&days=${days}&lang=${lang}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather forecast');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch weather forecast: ${error}`);
    }
  }

  private static checkOrThrow() {
    if (!baseApiUrl) {
      throw new Error('Missing base API URL');
    }
    if (!apiKey) {
      throw new Error('Missing API key');
    }
  }

}
