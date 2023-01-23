import { Dimensions } from "react-native";

export const uri: string = "https://a881-41-246-128-36.ngrok.io/graphql/";
export const serverBaseURL = "https://a881-41-246-128-36.ngrok.io";
export const SCREEN_WIDTH: number = Dimensions.get("screen").width;
export const SCREEN_HEIGHT: number = Dimensions.get("screen").height;

export const COLORS = {
  main: "#1a2f4b",
  main_secondary: "#28475c",
  main_primary: "#2f8886",
  main_tertiary: "#84c69b",
};

export const Fonts = {
  EpilogueItalic: require("../../assets/fonts/static/Epilogue-Italic.ttf"),
  Epilogue: require("../../assets/fonts/Epilogue-VariableFont_wght.ttf"),
  EpilogueBold: require("../../assets/fonts/static/Epilogue-Bold.ttf"),
  EpilogueBoldItalic: require("../../assets/fonts/static/Epilogue-BoldItalic.ttf"),
  EpilogueExtraBold: require("../../assets/fonts/static/Epilogue-ExtraBold.ttf"),
  EpilogueExtraBoldItalic: require("../../assets/fonts/static/Epilogue-ExtraBoldItalic.ttf"),
};

export const FONTS = {
  regular: "Epilogue",
  italic: "EpilogueItalic",
  italicBold: "EpilogueBoldItalic",
  italicExtraBold: "EpilogueExtraBoldItalic",
  regularBold: "EpilogueBold",
  regularExtraBold: "EpilogueExtraBold",
};
