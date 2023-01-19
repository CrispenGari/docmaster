import { View, Text, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { AppNavProps } from "../../params";
import { AppBackButton, PdfMetaResults } from "../../components";
import { COLORS } from "../../constants";

const Results: React.FunctionComponent<AppNavProps<"Results">> = ({
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
      <PdfMetaResults results={route.params.results} />
    </ScrollView>
  );
};

export default Results;
