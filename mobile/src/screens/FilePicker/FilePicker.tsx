import React, { useLayoutEffect } from "react";
import { AppNavProps } from "../../params";
import { ScrollView } from "react-native";
import { COLORS } from "../../constants";
import { AppBackButton, PdfMeta } from "../../components";

const FilePicker: React.FunctionComponent<AppNavProps<"FilePicker">> = ({
  navigation,
  route,
}) => {
  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerTitle: route.params.headerTitle,
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
    <ScrollView
      style={{
        padding: 10,
        backgroundColor: COLORS.main_secondary,
        flex: 1,
      }}
    >
      <PdfMeta params={route.params} navigation={navigation} />
    </ScrollView>
  );
};

export default FilePicker;