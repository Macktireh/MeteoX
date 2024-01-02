import { View } from "react-native";

type Props = {
  gap?: number;
};

export const Separator = ({ gap = 8 }: Props) => <View style={[{ marginVertical: gap }]} />;
