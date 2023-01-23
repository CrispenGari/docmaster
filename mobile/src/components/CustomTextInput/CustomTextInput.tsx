import {
  View,
  StyleProp,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
} from "react-native";
import React from "react";
import { FONTS } from "../../constants";

interface Props {
  containerStyles?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  keyboardType?: KeyboardTypeOptions;
  text?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  editable?: boolean;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  onRightIconPress?: () => void;
  numberOfLines?: number;
  multiline?: boolean;
}
const CustomTextInput: React.FunctionComponent<Props> = ({
  placeholder,
  containerStyles,
  inputStyle,
  leftIcon,
  rightIcon,
  keyboardType,
  text,
  onChangeText,
  editable,
  onSubmitEditing,
  secureTextEntry,
  onRightIconPress,
  multiline,
  numberOfLines,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          width: "100%",
          backgroundColor: "white",
          borderRadius: 5,
          padding: 10,
          alignItems: "center",
        },
        containerStyles,
      ]}
    >
      {leftIcon}
      <TextInput
        placeholder={placeholder}
        style={[
          {
            flex: 1,
            backgroundColor: "#f5f5f5",
            marginHorizontal: 10,
            borderRadius: 5,
            fontFamily: FONTS.regular,
            fontSize: 18,
            paddingVertical: 5,
            paddingHorizontal: 10,
          },
          inputStyle,
        ]}
        keyboardType={keyboardType}
        value={text}
        onChangeText={onChangeText}
        editable={editable}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        numberOfLines={numberOfLines}
        multiline={multiline}
      />
      <TouchableOpacity activeOpacity={0.7} onPress={onRightIconPress}>
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};

export default CustomTextInput;
