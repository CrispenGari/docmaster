import React, { useLayoutEffect } from "react";
import { AppNavProps } from "../../params";
import { ScrollView } from "react-native";
import { COLORS } from "../../constants";
import { AppBackButton } from "../../components";
import PdfMeta from "../../components/PdfMeta/PdfMeta";
import PDF2Word from "../../components/PDF2Word/PDF2Word";
import Word2PDF from "../../components/Word2PDF/Word2PDF";
import PDFSize from "../../components/PDFSize/PDFSize";

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

  const { service } = route.params;
  if (service === "2pdf") {
    return (
      <Wrapper>
        <Word2PDF params={route.params} navigation={navigation} />
      </Wrapper>
    );
  }
  if (service === "meta") {
    return (
      <Wrapper>
        <PdfMeta params={route.params} navigation={navigation} />
      </Wrapper>
    );
  }
  if (service === "2word") {
    return (
      <Wrapper>
        <PDF2Word params={route.params} navigation={navigation} />
      </Wrapper>
    );
  }
  if (service === "compress") {
    return (
      <Wrapper>
        <PDFSize params={route.params} navigation={navigation} />
      </Wrapper>
    );
  }

  return (
    <ScrollView
      style={{
        padding: 10,
        backgroundColor: COLORS.main_secondary,
        flex: 1,
      }}
    ></ScrollView>
  );
};
export default FilePicker;

const Wrapper: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ScrollView
    style={{
      padding: 10,
      backgroundColor: COLORS.main_secondary,
      flex: 1,
    }}
  >
    {children}
  </ScrollView>
);
