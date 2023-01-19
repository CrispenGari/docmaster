import { Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { AppNavProps } from "../../params";
import { ScrollView } from "react-native";
import { COLORS, FONTS } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const FilePicker: React.FunctionComponent<AppNavProps<"FilePicker">> = ({
  navigation,
  route,
}) => {
  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerTitle: route.params.headerTitle,

        headerLeft(props) {
          console.log({ props });
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color={COLORS.main_tertiary}
              />

              <Text
                style={{
                  marginLeft: 2,
                  color: COLORS.main_tertiary,
                  fontFamily: FONTS.regular,
                  fontSize: 20,
                }}
              >
                {props.label}
              </Text>
            </TouchableOpacity>
          );
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <ScrollView
      style={{
        padding: 10,
        backgroundColor: COLORS.main_secondary,
      }}
    >
      <Text>FilePicker</Text>
    </ScrollView>
  );
};

export default FilePicker;
