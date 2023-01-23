import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";
interface Props {
  onPress?: () => void;
  disabled?: boolean;
}
const AddPDFButton: React.FunctionComponent<Props> = ({
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        width: 150,
        height: 200,
        backgroundColor: COLORS.main_primary,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginRight: 5,
      }}
      activeOpacity={0.7}
    >
      <Foundation name="page-add" size={45} color="white" />
      <Text
        style={{
          textAlign: "center",
          color: "white",
          marginTop: 10,
          fontFamily: FONTS.regular,
        }}
      >
        Add PDF Document
      </Text>
    </TouchableOpacity>
  );
};

export default AddPDFButton;
