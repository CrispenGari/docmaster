import { View, Text, TouchableOpacity, Alert, Button } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS } from "../../constants";
import Divider from "../Divider/Divider";
import * as DocumentPicker from "expo-document-picker";
import { ServicesType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import DoubleCircular from "../DoubleCircularIndicator/DoubleCircularIndicator";
import { useConvertPdf2WordMutation } from "../../graphql/generated/graphql";
import { generateRNFile } from "../../utils";
import * as FileSystem from "expo-file-system";

interface Props {
  params: Readonly<{
    nFiles: number;
    service: ServicesType;
    headerTitle: string;
  }>;
  navigation: StackNavigationProp<AppParamList, "FilePicker", undefined>;
}
const PDF2Word: React.FunctionComponent<Props> = ({ params, navigation }) => {
  const [doc, setDoc] = useState<DocumentPicker.DocumentResult>();

  const [convert, { loading, data }] = useConvertPdf2WordMutation({
    fetchPolicy: "network-only",
  });

  const readMetaData = async () => {
    if (!!!doc) return;
    if (doc.type === "cancel") return;
    const file = generateRNFile({
      mimeType: doc.mimeType ?? "application/pdf",
      name: doc.name,
      uri: doc.uri,
    });
    if (!file) {
      return;
    }
    await convert({
      variables: {
        input: {
          file,
        },
      },
    });
  };

  console.log(JSON.stringify(data, null, 2));
  React.useEffect(() => {
    let mounted: boolean = true;

    if (mounted && !!data) {
      if (data.convertPDFToDocx?.error) {
        Alert;
      } else {
        // navigation.navigate("Results", {
        //   results: JSON.stringify(data.convertPDFToDocx?.response),
        //   service: "meta",
        //   headerTitle: "PDF Meta Data",
        // });
      }
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
        PDF Document To Word
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          marginBottom: 10,
          marginTop: 5,
          color: "white",
        }}
      >
        Convert a pdf document to Word Document.
      </Text>
      <Divider title="Convert to Word Document" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {!!doc ? (
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
              onPress={readMetaData}
            >
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  color: "white",
                }}
              >
                CONVERT TO WORD
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <Button
        title="download"
        onPress={async () => {
          console.log("downloading....");
          const downloadResumable = await FileSystem.createDownloadResumable(
            "http://techslides.com/demos/sample-videos/small.mp4",
            FileSystem.documentDirectory + "small.mp4",
            {},
            (downloadProgress) => {
              console.log(
                downloadProgress.totalBytesWritten /
                  downloadProgress.totalBytesExpectedToWrite
              );
            }
          );
          try {
            const result = await downloadResumable.downloadAsync();
            console.log("Finished downloading to ", { result });
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </View>
  );
};

export default PDF2Word;
