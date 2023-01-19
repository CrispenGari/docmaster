import { View, Text } from "react-native";
import React from "react";
import { FONTS } from "../../constants";

interface Props {
  title: string;
}
const Divider: React.FunctionComponent<Props> = ({ title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <Text
        style={{
          textTransform: "uppercase",
          marginRight: 10,
          fontSize: 20,
          fontFamily: FONTS.regularBold,
          color: "white",
          letterSpacing: 1,
        }}
      >
        {title}
      </Text>

      <View
        style={{
          flex: 1,
          borderTopColor: "white",
          borderTopWidth: 0.5,
        }}
      />
    </View>
  );
};

export default Divider;
