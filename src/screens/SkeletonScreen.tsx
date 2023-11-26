import { PropsWithChildren } from "react";
import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";

import { Skeleton } from "@/components/Skeleton";
import { WrapperScreen } from "@/screens/WrapperScreen";

type PropsType = PropsWithChildren<{
  children: React.ReactNode;
}>;

export const ScreenSkeleton: React.FC<PropsType> = ({ children }) => {
  return (
    <WrapperScreen>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {children}
        <View style={{ alignItems: "center" }}>
          <Skeleton width={220} height={30} style={{ borderRadius: 8 }} />
          <Skeleton
            width={100}
            height={100}
            style={{ borderRadius: 50, marginVertical: 16 }}
          />
          <Skeleton
            width={100}
            height={30}
            style={{ borderRadius: 8, marginBottom: 16 }}
          />
          <Skeleton
            width={Dimensions.get("window").width - 40}
            height={150}
            style={{ borderRadius: 20 }}
          />
          <Skeleton
            width={Dimensions.get("window").width - 40}
            height={210}
            style={{ borderRadius: 20, marginVertical: 16 }}
          />
        </View>
      </ScrollView>
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: Platform.OS === "android" ? 50 : 20,
    marginHorizontal: 8,
  },
});
