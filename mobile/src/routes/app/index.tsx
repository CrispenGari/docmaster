import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import { Landing, Home, FilePicker, Results, PdfPreview } from "../../screens";
import { COLORS, FONTS } from "../../constants";

const Stack = createStackNavigator<AppParamList>();
const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.main,
          height: 90,
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: "white",
          fontFamily: FONTS.regular,
          letterSpacing: 1,
        },
      }}
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FilePicker" component={FilePicker} />
      <Stack.Screen name="Results" component={Results} />
      <Stack.Screen name="PdfPreview" component={PdfPreview} />
    </Stack.Navigator>
  );
};

export default AppStack;
