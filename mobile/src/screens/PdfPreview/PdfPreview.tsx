import { View } from "react-native";
import React, { useLayoutEffect } from "react";
import { AppNavProps } from "../../params";
import { AppBackButton } from "../../components";
import { COLORS } from "../../constants";
import { WebView } from "react-native-webview";
const PdfPreview: React.FunctionComponent<AppNavProps<"PdfPreview">> = ({
  navigation,
  route,
}) => {
  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerTitle: route.params.fileName,
        headerLeft: ({ label }) => (
          <AppBackButton
            label={label as string}
            onPress={() => navigation.goBack()}
          />
        ),
      });
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <View
      style={{
        backgroundColor: COLORS.main_secondary,
        flex: 1,
      }}
    >
      <WebView
        style={{
          flex: 1,
        }}
        source={{ uri: route.params.uri }}
        originWhitelist={["file://"]}
      />
    </View>
  );
};

export default PdfPreview;
