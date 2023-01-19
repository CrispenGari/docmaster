import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS } from "../../constants";
import Divider from "../Divider/Divider";
import * as DocumentPicker from "expo-document-picker";
import { ServicesType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import DoubleCircular from "../DoubleCircularIndicator/DoubleCircularIndicator";
import { useReadPdfMetaMutation } from "../../graphql/generated/graphql";
import { generateRNFile } from "../../utils";

interface Props {
  params: Readonly<{
    nFiles: number;
    service: ServicesType;
    headerTitle: string;
  }>;
  navigation: StackNavigationProp<AppParamList, "FilePicker", undefined>;
}
const PdfMeta: React.FunctionComponent<Props> = ({ params, navigation }) => {
  const [getMetaDataDocument, setGetMetaDataDocument] =
    useState<DocumentPicker.DocumentResult>();
  const [setMetaDataDocument, setSetGetMetaDataDocument] =
    useState<DocumentPicker.DocumentResult>();

  const [_readMetaData, { loading, data }] = useReadPdfMetaMutation({
    fetchPolicy: "network-only",
  });
  const readMetaData = async () => {
    if (!!!getMetaDataDocument) return;
    if (getMetaDataDocument.type === "cancel") return;
    const file = generateRNFile({
      mimeType: getMetaDataDocument.mimeType ?? "application/pdf",
      name: getMetaDataDocument.name,
      uri: getMetaDataDocument.uri,
    });
    if (!file) {
      return;
    }
    await _readMetaData({
      variables: {
        input: {
          file,
        },
      },
    }).then(() => {
      if (!data) return;
      if (data.getPDFMetaData?.error) {
        Alert;
      } else {
        navigation.navigate("Results", {
          results: data.getPDFMetaData?.response,
          service: "meta",
          headerTitle: "PDF Meta Data",
        });
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <DoubleCircular color={"white"} size={40} />
        </View>
      ) : null}
      <Text
        style={{
          fontFamily: FONTS.regularExtraBold,
          fontSize: 25,
          color: "white",
          letterSpacing: 1,
        }}
      >
        PDF Meta Data
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          marginBottom: 10,
          marginTop: 5,
          color: "white",
        }}
      >
        Getting PDF Meta Data or create your own Meta Data.
      </Text>
      <Divider title="Get Meta Data" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {!!getMetaDataDocument ? (
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 16,
                color: "white",
              }}
            >
              {(getMetaDataDocument as any)?.name}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                marginLeft: 20,
                backgroundColor: COLORS.main_tertiary,
                width: 100,
                paddingVertical: 10,
                alignItems: "center",
              }}
              onPress={() => {
                if (getMetaDataDocument.type === "cancel") return;
                navigation.navigate("PdfPreview", {
                  uri: getMetaDataDocument.uri,
                  fileName: getMetaDataDocument.name,
                });
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  color: "white",
                }}
              >
                PREVIEW
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View
          style={{ width: "100%", flexDirection: "row", marginVertical: 30 }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: COLORS.main_primary,
              maxWidth: 300,
              paddingVertical: 10,
              alignItems: "center",
              flex: 1,
              borderRadius: 5,
            }}
            onPress={async () => {
              const doc = await DocumentPicker.getDocumentAsync({
                multiple: params.nFiles !== 1,
                type: "application/pdf",
                copyToCacheDirectory: true,
              });
              if (doc.type === "cancel") {
                return;
              }
              setGetMetaDataDocument(doc);
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 16,
                color: "white",
              }}
            >
              {!!!getMetaDataDocument ? "SELECT PDF" : "RE-SELECT PDF"}
            </Text>
          </TouchableOpacity>

          {!!getMetaDataDocument ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: COLORS.main,
                maxWidth: 300,
                paddingVertical: 10,
                alignItems: "center",
                flex: 1,
                marginLeft: 10,
                borderRadius: 5,
              }}
              onPress={readMetaData}
            >
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  color: "white",
                }}
              >
                READ META DATA
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <Divider title="Set Meta Data" />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {!!setMetaDataDocument ? (
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 16,
                color: "white",
              }}
            >
              Selected 3.pdf
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                marginLeft: 20,
                backgroundColor: COLORS.main_tertiary,
                width: 100,
                paddingVertical: 10,
                alignItems: "center",
              }}
              onPress={() => {
                if (setMetaDataDocument.type === "cancel") return;
                console.log({
                  setMetaDataDocument,
                });
                navigation.navigate("PdfPreview", {
                  uri: setMetaDataDocument.uri,
                  fileName: setMetaDataDocument.name,
                });
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  color: "white",
                }}
              >
                PREVIEW
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: COLORS.main_primary,
            maxWidth: 300,
            paddingVertical: 10,
            alignItems: "center",
            width: "100%",
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: 16,
              color: "white",
            }}
          >
            SELECT PDF
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PdfMeta;
