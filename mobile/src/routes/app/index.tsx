import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import { Landing, Home } from "../../screens";

const Stack = createStackNavigator<AppParamList>();
const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppStack;
