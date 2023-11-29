import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          Light: require("../../assets/fonts/Roboto/Roboto-Light.ttf"),
          Regular: require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
          Medium: require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
          Bold: require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
          Black: require("../../assets/fonts/Roboto/Roboto-Black.ttf"),
          Thin: require("../../assets/fonts/Roboto/Roboto-Thin.ttf"),
          ThinItalic: require("../../assets/fonts/Roboto/Roboto-ThinItalic.ttf"),
          LightItalic: require("../../assets/fonts/Roboto/Roboto-LightItalic.ttf"),
          Italic: require("../../assets/fonts/Roboto/Roboto-Italic.ttf"),
          MediumItalic: require("../../assets/fonts/Roboto/Roboto-MediumItalic.ttf"),
          BoldItalic: require("../../assets/fonts/Roboto/Roboto-BoldItalic.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};
