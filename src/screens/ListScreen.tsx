import { useCallback } from "react";
import { Image, Text, Platform, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

import { colors } from "@/constants/colors";
import { SearchBarIcon } from "@/components/SearchBar";
import { WeatherCard } from "@/components/WeatherCard";
import { useWeather } from "@/contexts/WeatherContext";
import { WrapperScreen } from "@/screens/WrapperScreen";
import { Weather } from "@/types";

export type Props = {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

export const ListScreen: React.FC<Props> = ({ navigation }) => {
  const { weathers, removeWeather } = useWeather();

  const onDismiss = useCallback(
    (weather: Weather) => removeWeather(weather.location.name),
    [weathers]
  );

  return weathers.length === 0 ? (
    <WrapperScreen>
      <Text
        style={{
          textAlign: "center",
          fontSize: 28,
          fontWeight: "bold",
          color: colors.white(),
          marginTop: 100,
        }}
      >
        Weather List
      </Text>
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/Macktireh/clone-twitter-frontend/main/public/static/img/book-in-bird-cage.png",
        }}
        style={{ width: 250, height: 250, marginTop: 40, alignSelf: "center" }}
      />
      <TouchableOpacity
        style={{
          marginTop: 40,
          padding: 15,
          borderRadius: 10,
          backgroundColor: colors.white(0.2),
          width: "auto",
          alignSelf: "center",
        }}
        onPress={() => navigation.navigate("Search")}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: colors.white(),
          }}
        >
          Search new weather
        </Text>
      </TouchableOpacity>
    </WrapperScreen>
  ) : (
    <WrapperScreen>
      <View
        style={{
          marginTop: Platform.OS === "android" ? 50 : 20,
          paddingRight: 12,
        }}
      >
        <SearchBarIcon />
      </View>
      <GestureHandlerRootView>
        <ScrollView
          style={{
            position: "relative",
            marginTop: 15,
            marginHorizontal: 8,
            // height: "100%",
          }}
          contentContainerStyle={{ alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          {weathers.map((weather) => (
            <WeatherCard
              key={weather.location.name}
              weather={weather}
              onDismiss={onDismiss}
            />
          ))}
          <View style={{ marginTop: 70 }}></View>
        </ScrollView>
      </GestureHandlerRootView>
    </WrapperScreen>
  );
};
