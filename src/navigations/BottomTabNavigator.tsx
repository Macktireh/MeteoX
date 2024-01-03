import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { HomeScreen, ListScreen, ScreensName } from "@/screens";
import { RootTabParamList } from "@/types/navigationTyping";

const Tab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={ScreensName.Home}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.white(),
        tabBarInactiveTintColor: colors.white(0.5),
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: [
          {
            display: "flex",
            paddingBottom: 2,
            paddingTop: 2,
            height: 46,
            backgroundColor: colors.bg(),
          },
          null,
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          switch (rn) {
            case ScreensName.Home:
              iconName = focused ? "home" : "home-outline";
              break;
            case ScreensName.List:
              iconName = focused ? "list" : "list-outline";
              break;
            default:
              break;
          }
          return (
            <Ionicons name={iconName as any} size={24} color={colors.white()} />
          );
        },
      })}
    >
      <Tab.Screen name={ScreensName.Home} component={HomeScreen} />
      <Tab.Screen name={ScreensName.List} component={ListScreen} />
    </Tab.Navigator>
  );
};
