import { NavigationContainer } from "@react-navigation/native";

import { RootNavigator } from "@/navigations/StackNavigator";

export const Navigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};
