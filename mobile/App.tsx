import "react-native-gesture-handler";
import { StyleSheet, Text, View, LogBox, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import ReduxProvider from "./src/providers/ReduxProvider";
import GraphQLProvider from "./src/providers/GraphQLProvider";
import { COLORS, Fonts } from "./src/constants";
import Routes from "./src/routes";

export default function App() {
  const [loaded] = useFonts(Fonts);

  LogBox.ignoreLogs;

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar animated barStyle={"light-content"} />
      <GraphQLProvider>
        <ReduxProvider>
          <Routes />
        </ReduxProvider>
      </GraphQLProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
