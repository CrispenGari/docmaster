import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./app";
const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default Routes;
