import { useNavigation } from "@react-navigation/native";
import { Dimensions, Text, Pressable, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { Weather } from "@/types";

type Props = {
  weather: Weather;
  onDismiss?: (Weather: Weather) => void;
};

const LIST_ITEM_HEIGHT = 100;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

export const WeatherCard: React.FC<Props> = ({ weather, onDismiss }) => {
  const navigation = useNavigation();
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginBottom = useSharedValue(15);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginBottom.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(weather);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
    );
    return { opacity };
  });

  const animatedWeatherContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginBottom: marginBottom.value,
      opacity: opacity.value,
    };
  });

  const onPress = () => {
    navigation.navigate("SearchResult", {
      payload: {
        id: parseInt(weather.location.tz_id),
        name: weather.location.name,
        lat: weather.location.lat,
        lon: weather.location.lon,
        region: weather.location.region,
        country: weather.location.country,
        url: "",
      },
    });
  };

  return (
    <Animated.View
      style={[
        {
          width: SCREEN_WIDTH - 30,
          height: LIST_ITEM_HEIGHT,
          alignItems: "center",
        },
        animatedWeatherContainerStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            right: 0,
            top: 0,
            width: SCREEN_WIDTH - 30,
            // width: Dimensions.get("window").width * 0.3,
            height: LIST_ITEM_HEIGHT,
            borderRadius: 10,
            backgroundColor: colors.red(0.6),
            justifyContent: "center",
            alignItems: "center",
          },
          animatedIconContainerStyle,
        ]}
      >
        <FontAwesome name="trash" size={30} color={colors.white(0.8)} />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH - 30,
              height: LIST_ITEM_HEIGHT,
              borderRadius: 10,
              // marginBottom: 12,
              backgroundColor: colors.gray(),
              // flexDirection: "column",
              // // padding: 12,
              // shadowOpacity: 0.08,
              // shadowRadius: 10,
              // shadowColor: `${colors.black(0.5)}`,
              // shadowOffset: {
              //   width: 0,
              //   height: 20,
              // },
            },
            animatedStyle,
          ]}
        >
          <Pressable
            onPress={onPress}
            style={{
              width: SCREEN_WIDTH - 30,
              height: LIST_ITEM_HEIGHT,
              borderRadius: 10,
              // marginBottom: 12,
              backgroundColor: colors.gray(),
              flexDirection: "column",
              padding: 12,
              shadowOpacity: 0.08,
              shadowRadius: 10,
              shadowColor: `${colors.black(0.5)}`,
              shadowOffset: {
                width: 0,
                height: 20,
              },
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  {weather.location.name}
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>
                  {weather.location.country}
                </Text>
              </View>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                {Math.round(weather.current.temp_c)}&#176;
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
              >
                {weather.current.condition.text}
              </Text>
              <Text style={{ fontSize: 14, color: "white" }}>
                Max. {Math.round(weather.forecast.forecastday[0].day.maxtemp_c)}
                &#176; Min.{" "}
                {Math.round(weather.forecast.forecastday[0].day.mintemp_c)}
                &#176;
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
