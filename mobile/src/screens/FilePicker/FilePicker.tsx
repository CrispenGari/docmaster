import React, { useLayoutEffect } from "react";
import { AppNavProps } from "../../params";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { COLORS } from "../../constants";
import { AppBackButton } from "../../components";
import PdfMeta from "../../components/PdfMeta/PdfMeta";
import PDF2Word from "../../components/PDF2Word/PDF2Word";
import Word2PDF from "../../components/Word2PDF/Word2PDF";
import PDFSize from "../../components/PDFSize/PDFSize";
import PDFMerge from "../../components/PDFMerge/PDFMerge";
import DecryptPDF from "../../components/Decrypt/Decrypt";
import EncryptPDF from "../../components/Encrypt/Encrypt";
import TextExtractions from "../../components/TextExtraction/TextExtraction";
import ImagesExtractions from "../../components/ImagesExtraction/ImagesExtraction";
import TablesExtractions from "../../components/TablesExtraction/TablesExtraction";

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
      <Wrapper withTextInputs>
        <PDFSize params={route.params} navigation={navigation} />
      </Wrapper>
    );
  }
  if (service === "merge") {
    return (
      <Wrapper>
        <PDFMerge params={route.params} navigation={navigation} />
      </Wrapper>
    );
  }
  if (service === "decrypt") {
    return (
      <Wrapper>
        <DecryptPDF params={route.params} navigation={navigation} />
      </Wrapper>
    );
  }
  if (service === "encrypt") {
    return (
      <Wrapper withTextInputs>
        <EncryptPDF params={route.params} navigation={navigation} />
      </Wrapper>
    );
  }
  if (service === "text") {
    return (
      <Wrapper withTextInputs>
        <TextExtractions params={route.params} navigation={navigation} />
      </Wrapper>
    );
  }
  if (service === "images") {
    return (
      <Wrapper withTextInputs>
        <ImagesExtractions params={route.params} navigation={navigation} />
      </Wrapper>
    );
  }
  if (service === "tables") {
    return (
      <Wrapper withTextInputs>
        <TablesExtractions params={route.params} navigation={navigation} />
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

const Wrapper: React.FunctionComponent<{
  children: React.ReactNode;
  withTextInputs?: boolean;
}> = ({ children, withTextInputs = false }) => {
  if (withTextInputs) {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: COLORS.main_secondary,
        }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={{
            padding: 10,
            backgroundColor: COLORS.main_secondary,
            flex: 1,
          }}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
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
};
