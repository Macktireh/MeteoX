import { useEffect, useState } from "react";
import { View, Platform, ScrollView } from "react-native";
import { NavigationProp } from "@react-navigation/native";

import { BookmarkButton } from "@/components/BookmarkButton";
import { ButtonBack } from "@/components/ButtonBack";
import { ListDays } from "@/components/ListDays";
import { ListHours } from "@/components/ListHours";
import { WeatherInfo } from "@/components/WeatherInfo";
import { useWeather } from "@/contexts/WeatherContext";
import { WrapperScreen } from "@/screens/WrapperScreen";
import { ScreenSkeleton } from "@/screens/SkeletonScreen";
import { WeatherService } from "@/services/weather.service";
import { SearchLocation, Weather } from "@/types";

type Props = {
  route: any;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

export const SearchResultScreen = ({ route, navigation }: Props) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const { payload }: { payload: SearchLocation | null } = route.params;
  const { weathers, addWeather, removeWeather } = useWeather();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!payload) {
        return;
      }
      try {
        const data = await WeatherService.fetchWeatherForecastByCity(
          payload.name
        );
        setWeather(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [payload]);

  const onSave = async () => {
    if (!weather) return;

    const isBookmarked = weathers?.some(
      (w: Weather) => w.location.name === weather.location.name
    );

    if (weathers && isBookmarked) {
      removeWeather(weather.location.name);
    } else {
      addWeather(weather);
    }
  };

  const renderBookmarkButton = () => {
    if (!weather) return null;
    if (weathers.length < 8) {
    } else {
      return null;
    }
  };

  return !weather || loading ? (
    <ScreenSkeleton>
      <ButtonBack />
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
        {weathers.length >= 8 ? (
          weathers.some(
            (w: Weather) => w.location.name === weather.location.name
          ) ? (
            <BookmarkButton
              isBookmarked={weathers.some(
                (w: Weather) => w.location.name === weather.location.name
              )}
              onSave={onSave}
            />
          ) : null
        ) : (
          <BookmarkButton
            isBookmarked={weathers.some(
              (w: Weather) => w.location.name === weather.location.name
            )}
            onSave={onSave}
          />
        )}
        <ButtonBack />
        <View style={{ alignItems: "center" }}>
          <WeatherInfo weather={weather} />
          <ListHours weather={weather} />
          <ListDays weather={weather} />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
};
