import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ServicesType } from "../types";

export type AppParamList = {
  Home: undefined;
  Landing: undefined;
  FilePicker: {
    nFiles: number;
    service: ServicesType;
    headerTitle: string;
  };
  Results: undefined;
};

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: StackNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};
