import { View, Animated } from "react-native";
import React from "react";

interface Props {
  color: string;
  width: number;
}
const IndeterminateProgress: React.FunctionComponent<Props> = ({
  color,
  width,
}) => {
  const indicatorAnimation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(indicatorAnimation, {
        toValue: 1,
        delay: 0,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const translateX = indicatorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });
  return (
    <View
      style={{
        width,
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        borderRadius: 999,
        paddingVertical: 3,
        paddingHorizontal: 10,
        overflow: "hidden",
        maxWidth: 300,
      }}
    >
      <Animated.View
        style={{
          backgroundColor: color,
          width: "30%",
          height: 10,
          transform: [{ translateX }],
          position: "absolute",
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default IndeterminateProgress;
