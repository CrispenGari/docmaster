import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, serverBaseURL } from "../../constants";
import Divider from "../Divider/Divider";
import * as DocumentPicker from "expo-document-picker";
import { ServicesType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import DoubleCircular from "../DoubleCircularIndicator/DoubleCircularIndicator";
import { useMergePdFsMutation } from "../../graphql/generated/graphql";
import { generateRNFile, getSessionId } from "../../utils";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import IndeterminateProgress from "../LinearProgress/LinearProgress";
import { ScrollView } from "react-native-gesture-handler";
import AddPDFButton from "../AddPDFButton/AddPDFButton";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import SelectedPDF from "../SelectedPDF/SelectedPDF";
interface Props {
  params: Readonly<{
    nFiles: number;
    service: ServicesType;
    headerTitle: string;
  }>;
  navigation: StackNavigationProp<AppParamList, "FilePicker", undefined>;
}
const PDFMerge: React.FunctionComponent<Props> = ({ params, navigation }) => {
  const [documentsToMerge, setDocumentsToMerge] = useState<
    Array<{
      doc: {
        name: string;
        size?: number | undefined;
        uri: string;
        mimeType?: string | undefined;
      };
      pages: Array<number>;
      id: number;
    }>
  >([]);
  const [progress, setProgress] = useState(0);
  const [previewURL, setPreviewURL] = useState<string>("");
  const [outputName, setOutputName] = useState<string>("");
  const [merge, { loading, data }] = useMergePdFsMutation({
    fetchPolicy: "network-only",
  });

  const addPDFToStack = async () => {
    const doc = await DocumentPicker.getDocumentAsync({
      multiple: params.nFiles !== 1,
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    if (doc.type === "cancel") {
      return;
    }
    setDocumentsToMerge((state) => [
      ...state,
      {
        doc: {
          name: doc.name,
          size: doc.size,
          uri: doc.uri,
          mimeType: doc.mimeType,
        },
        pages: [],
        id: documentsToMerge.length,
      },
    ]);
  };

  const mergePDFs = async () => {
    setPreviewURL("");
    if (!!!outputName.trim()) {
      Alert.alert(
        "docmaster",
        "Output Name for the document is required.",
        [
          { text: "OK", style: "default" },
          { text: "CANCEL", style: "destructive" },
        ],
        {
          cancelable: false,
        }
      );
      return;
    }
    const sid = await getSessionId();

    if (documentsToMerge.length === 0) {
      return;
    }
    if (!!!sid) return;

    await merge({
      variables: {
        input: {
          pdfs: [
            ...documentsToMerge.map(({ doc, pages, id }) => ({
              file: generateRNFile({
                mimeType: doc.mimeType ?? "application/pdf",
                name: doc.name,
                uri: doc.uri,
              }),
              pages: pages,
              documentNumber: id,
              sessionId: sid,
            })),
          ],
          saveName: outputName,
          sessionId: sid,
        },
      },
    });
  };
  const share = async () => {
    if (data?.mergePDFs?.response) {
      setProgress(0.01);
      const downloadResumable = FileSystem.createDownloadResumable(
        data.mergePDFs.response.url.replace(
          "http://127.0.0.1:3001",
          serverBaseURL
        ),
        FileSystem.documentDirectory +
          data.mergePDFs.response?.documentName.replace(" ", "_"),
        {},
        ({ totalBytesExpectedToWrite, totalBytesWritten }) =>
          setProgress(totalBytesWritten / totalBytesExpectedToWrite)
      );

      try {
        const response = await downloadResumable.downloadAsync();
        if (response) {
          await Sharing.shareAsync(response.uri, {
            dialogTitle: "Save PDF Document",
          });
          setPreviewURL(response.uri);
        }
      } catch (e) {
        console.error(e);
        setProgress(0);
      }
    }
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
    if (mounted && !!data?.mergePDFs?.error) {
      setError(data.mergePDFs.error.message);
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
        Merge PDF Documents
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          marginBottom: 10,
          marginTop: 5,
          color: "white",
        }}
      >
        Merge at least 2 PDF Documents.
      </Text>
      <Divider title="Merge PDF Documents" />

      <ScrollView
        style={{}}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {documentsToMerge.map((doc, index) => (
          <SelectedPDF
            key={doc.id}
            doc={doc}
            documentNumber={doc.id}
            onRemoveButtonPress={() => {
              setDocumentsToMerge((state) =>
                state.filter((doc) => doc.id !== index)
              );
            }}
            onPress={() => {
              navigation.navigate("PdfPreview", {
                fileName: doc.doc.name,
                uri: doc.doc.uri,
              });
            }}
            setDocumentsToMerge={setDocumentsToMerge}
          />
        ))}
        {/* only 5 documents */}
        <AddPDFButton
          onPress={addPDFToStack}
          disabled={documentsToMerge.length === 5}
        />
      </ScrollView>
      <Text
        style={{
          color: "white",
          marginVertical: 10,
          fontFamily: FONTS.regular,
        }}
      >
        Note: "These documents will be merged based on the order of selection,
        as they are numbered from 1-N".
      </Text>

      <CustomTextInput
        leftIcon={
          <MaterialIcons
            name="drive-file-rename-outline"
            size={24}
            color={COLORS.main_primary}
          />
        }
        containerStyles={{
          marginTop: 10,
          maxWidth: 500,
        }}
        text={outputName}
        onChangeText={(text) => setOutputName(text)}
        placeholder="Enter output name (eg. output.pdf)"
      />

      {documentsToMerge.length > 1 ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: COLORS.main,
            maxWidth: 300,
            paddingVertical: 10,
            alignItems: "center",
            flex: 1,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={mergePDFs}
        >
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: 16,
              color: "white",
            }}
          >
            MERGE {`'${documentsToMerge.length}'`} PDFs
          </Text>
        </TouchableOpacity>
      ) : null}
      {data?.mergePDFs?.success ? (
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
              Conversion Successful. Now you can share your document.
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 10,
              color: "white",
              fontFamily: FONTS.regular,
              fontSize: 20,
              marginVertical: 20,
            }}
          >{`File name: ${data.mergePDFs.response?.documentName.replace(
            " ",
            "_"
          )}`}</Text>

          {progress > 0 && progress < 1 ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  marginRight: 5,
                  fontFamily: FONTS.regular,
                  color: "white",
                }}
              >
                {(progress * 100).toFixed(0) + "%"}
              </Text>
              <IndeterminateProgress color={COLORS.main_tertiary} width={500} />
              {progress === 1 ? (
                <AntDesign
                  name="checkcircle"
                  size={16}
                  color={COLORS.main_tertiary}
                  style={{ marginLeft: 5 }}
                />
              ) : null}
            </View>
          ) : null}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                flexDirection: "row",
                justifyContent: "center",
              }}
              onPress={share}
            >
              <Entypo
                name="creative-commons-share"
                size={24}
                color={COLORS.main_tertiary}
              />
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  color: "white",
                  marginLeft: 10,
                }}
              >
                DOWNLOAD AND SHARE
              </Text>
            </TouchableOpacity>
            {!!previewURL ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  marginLeft: 10,
                  backgroundColor: COLORS.main_tertiary,
                  width: 100,
                  paddingVertical: 13,
                  alignItems: "center",
                  borderRadius: 5,
                }}
                onPress={() => {
                  navigation.navigate("PdfPreview", {
                    uri: previewURL,
                    fileName: data.mergePDFs?.response?.documentName.replace(
                      " ",
                      "_"
                    ) as any,
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
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default PDFMerge;
