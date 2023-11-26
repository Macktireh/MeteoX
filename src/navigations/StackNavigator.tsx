import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigator } from "@/navigations/BottomTabNavigator";

import { RootStackParamList } from "@/types/navigationTyping";
import { SearchScreen, SearchResulScreen } from "@/screens";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResulScreen}
        options={{ headerShown: false, animation: "slide_from_left" }}
        initialParams={{ payload: null }}
      />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
