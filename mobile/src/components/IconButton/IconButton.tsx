import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";

interface Props {
  Icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}
const IconButton: React.FunctionComponent<Props> = ({
  Icon,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        backgroundColor: COLORS.main_primary,
        padding: 10,
        width: 100,
        alignItems: "center",
        height: 120,
        justifyContent: "center",
        borderRadius: 10,
        marginRight: 10,
      }}
    >
      {Icon}
      <Text
        style={{
          color: "white",
          fontFamily: FONTS.regular,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default IconButton;
