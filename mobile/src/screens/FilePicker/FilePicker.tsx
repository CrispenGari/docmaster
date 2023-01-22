import React, { useLayoutEffect } from "react";
import { AppNavProps } from "../../params";
import { ScrollView } from "react-native";
import { COLORS } from "../../constants";
import { AppBackButton } from "../../components";
import PdfMeta from "../../components/PdfMeta/PdfMeta";
import PDF2Word from "../../components/PDF2Word/PDF2Word";

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
      {/* <PdfMeta params={route.params} navigation={navigation} />
       */}
      <PDF2Word params={route.params} navigation={navigation} />
    </ScrollView>
  );
};

export default FilePicker;
