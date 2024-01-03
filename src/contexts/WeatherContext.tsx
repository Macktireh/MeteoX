import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { AsyncStorageService } from "@/services/asyncStorage.service";
import { WeatherService } from "@/services/weather.service";
import { SearchLocation, Weather } from "@/types";

type propsContext = {
  weathers: Weather[];
  addWeather: (weather: Weather) => void;
  removeWeather: (name: string) => void;
};

const WeatherContext = createContext<propsContext | null>(null);

export const WeatherProvider = ({ children }: PropsWithChildren) => {
  const [weathers, setWeathers] = useState<Weather[]>([]);

  const addWeather = useCallback(
    async (weather: Weather) => {
      const storedCities = (await AsyncStorageService.get(
        "cities"
      )) as string[];
      setWeathers((prevWeathers) => {
        if (storedCities && !storedCities.includes(weather.location.name)) {
          AsyncStorageService.set("cities", [
            ...prevWeathers.map((w) => w.location.name),
            weather.location.name,
          ]);
        } else if (!storedCities) {
          AsyncStorageService.set("cities", [weather.location.name]);
        }
        return [...prevWeathers, weather];
      });

    },
    [weathers]
  );

  const removeWeather = useCallback(
    async (name: string) => {
      setWeathers(weathers.filter((weather) => weather.location.name !== name));
      const storedCities = (await AsyncStorageService.get(
        "cities"
      ));
      if (storedCities && storedCities.includes(name)) {
        AsyncStorageService.set("cities", storedCities.filter((city: string) => city !== name));
      }
    },
    [weathers]
  );

  useEffect(() => {
    (async () => {
      const storedCities = (await AsyncStorageService.get(
        "cities"
      ));
      if (storedCities) {
        const _weathers = [];
        for (const city of storedCities) {
          try {
            const data = await WeatherService.fetchWeatherForecastByCity(city);
            _weathers.push(data);
          } catch (error) {
          }
        }
        setWeathers(_weathers);
      }
    })();
  }, []);

  return (
    <WeatherContext.Provider value={{ weathers, addWeather, removeWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): propsContext => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useSearch must be used within a CitiesProvider");
  }
  return context;
};
