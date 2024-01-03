import { useEffect, useState } from "react";
import { View, Platform, ScrollView } from "react-native";
import * as geoLocation from "expo-location";

import { SearchBarIcon } from "@/components/SearchBar";
import { ListDays } from "@/components/ListDays";
import { ListHours } from "@/components/ListHours";
import { WeatherInfo } from "@/components/WeatherInfo";
import { useAsyncStorage } from "@/hooks/useAsyncStorage";
import { ScreenSkeleton } from "@/screens/SkeletonScreen";
import { WrapperScreen } from "@/screens/WrapperScreen";
import { WeatherService } from "@/services/weather.service";
import { Weather } from "@/types";

export const HomeScreen = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { storedValue: currentPosition, setStoredValue: setCurrentPosition } =
    useAsyncStorage("currentPosition", null, 15);

  const getGeoLocation = async () => {
    let { status } = await geoLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      throw new Error("Permission to access location was denied");
    }

    return await geoLocation.getCurrentPositionAsync({});
  };

  const fetchData = async () => {
    setLoading(true);

    if (await currentPosition) {
      const data = await WeatherService.fetchWeatherForecastByCoordinates(
        ((await currentPosition) as geoLocation.LocationObject).coords.latitude,
        ((await currentPosition) as geoLocation.LocationObject).coords.longitude
      );
      setWeather(data);
      setLoading(false);
      return;
    }

    try {
      const position = await getGeoLocation();
      const data = await WeatherService.fetchWeatherForecastByCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );
      setWeather(data);
      setCurrentPosition(position);
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [weather?.location.name]);

  return !weather || loading ? (
    <ScreenSkeleton>
      <SearchBarIcon />
    </ScreenSkeleton>
  ) : (
    <WrapperScreen>
      <ScrollView
        style={{
          position: "relative",
          marginTop: Platform.OS === "android" ? 50 : 20,
          marginHorizontal: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        <SearchBarIcon />
        <View style={{ alignItems: "center" }}>
          <WeatherInfo weather={weather} />
          <ListHours weather={weather} />
          <ListDays weather={weather} />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
};
