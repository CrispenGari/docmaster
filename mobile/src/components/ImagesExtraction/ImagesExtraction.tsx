import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";

import React, { useState } from "react";
import { COLORS, FONTS } from "../../constants";
import Divider from "../Divider/Divider";
import * as DocumentPicker from "expo-document-picker";
import { ServicesType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import DoubleCircular from "../DoubleCircularIndicator/DoubleCircularIndicator";
import { useExtractImagesMutation } from "../../graphql/generated/graphql";
import { generateRNFile, getSessionId } from "../../utils";
import { AntDesign, Octicons } from "@expo/vector-icons";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import ExtractedImage from "../ExtractedImage/ExtractedImage";
interface Props {
  params: Readonly<{
    nFiles: number;
    service: ServicesType;
    headerTitle: string;
  }>;
  navigation: StackNavigationProp<AppParamList, "FilePicker", undefined>;
}
const ImagesExtractions: React.FunctionComponent<Props> = ({
  params,
  navigation,
}) => {
  const [doc, setDoc] = useState<DocumentPicker.DocumentResult>();
  const [pageNumber, setPageNumber] = useState("");
  const [extract, { loading, data }] = useExtractImagesMutation({
    fetchPolicy: "network-only",
  });

  const extractImages = async () => {
    if (!!!doc) return;
    if (doc.type === "cancel") return;
    const file = generateRNFile({
      mimeType: doc.mimeType ?? "application/pdf",
      name: doc.name,
      uri: doc.uri,
    });
    const sid = await getSessionId();
    if (!file || !!!sid) {
      return;
    }
    const _pageNumber: number = Number.parseInt(pageNumber);
    if (!!!_pageNumber) {
      setError("Invalid page number.");
      return;
    }
    await extract({
      variables: {
        input: {
          file,
          pageNumber: _pageNumber,
          sessionId: sid,
        },
      },
    });
  };

  const [error, setError] = useState("");
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!error) {
      Alert.alert(
        "docmaster",
        error,
        [
          { text: "OK", style: "default" },
          { text: "CANCEL", style: "destructive" },
        ],
        { cancelable: false }
      );
    }
    return () => {
      mounted = false;
    };
  }, [error]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.extractImages?.error) {
      setError(data.extractImages.error.message);
    }
    return () => {
      mounted = false;
    };
  }, [data]);

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
        Extract Images
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          marginBottom: 10,
          marginTop: 5,
          color: "white",
        }}
      >
        Extract images from a PDF page.
      </Text>
      <Divider title="Extract Images" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {!!doc ? (
          <>
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
                {(doc as any)?.name}
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
                  if (doc.type === "cancel") return;
                  navigation.navigate("PdfPreview", {
                    uri: doc.uri,
                    fileName: doc.name,
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
            <CustomTextInput
              keyboardType="number-pad"
              placeholder="page number"
              containerStyles={{}}
              text={pageNumber}
              onChangeText={(text) => setPageNumber(text)}
              leftIcon={
                <Octicons name="number" size={24} color={COLORS.main} />
              }
            />
          </>
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
              setDoc(doc);
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 16,
                color: "white",
              }}
            >
              {!!!doc ? "SELECT PDF" : "RE-SELECT PDF"}
            </Text>
          </TouchableOpacity>

          {!!doc ? (
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
              onPress={extractImages}
            >
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  color: "white",
                }}
              >
                EXTRACT IMAGES
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {data?.extractImages?.success ? (
        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="checkcircle"
              size={24}
              color={COLORS.main_tertiary}
            />
            <Text
              style={{
                marginLeft: 10,
                color: "white",
                fontFamily: FONTS.regular,
                fontSize: 16,
              }}
            >
              {data.extractImages.response?.images.length === 0
                ? `Extraction Successful. But no images detected on page ${pageNumber}.`
                : "Extraction Successful. Now you can save your images."}
            </Text>
          </View>

          <ScrollView
            horizontal
            style={{
              paddingVertical: 5,
              marginVertical: 10,
              marginBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {data.extractImages.response?.images.map((uri, index) => (
              <ExtractedImage key={index.toString()} uri={uri} />
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

export default ImagesExtractions;
