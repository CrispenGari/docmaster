import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, serverBaseURL } from "../../constants";
import Divider from "../Divider/Divider";
import * as DocumentPicker from "expo-document-picker";
import { ServicesType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import { Feather, MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import DoubleCircular from "../DoubleCircularIndicator/DoubleCircularIndicator";
import {
  GetPdfMetaDataDocument,
  useReadPdfMetaMutation,
  useSetPdfMetaMutation,
} from "../../graphql/generated/graphql";
import { generateRNFile, getSessionId } from "../../utils";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import { client } from "../../providers/GraphQLProvider";
import IndeterminateProgress from "../LinearProgress/LinearProgress";

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
  const [setMetaDataDocument, setSetMetaDataDocument] =
    useState<DocumentPicker.DocumentResult>();

  const [author, setAuthor] = useState<string>("");
  const [producer, setProducer] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewURL, setPreviewURL] = useState<string>("");

  const [_readMetaData, { loading: readMetaLoading, data: readMetaResults }] =
    useReadPdfMetaMutation({
      fetchPolicy: "network-only",
    });

  const [_update, { loading: setMetaLoading, data: setMetaResults }] =
    useSetPdfMetaMutation({ fetchPolicy: "network-only" });

  const share = async () => {
    if (setMetaResults?.setMetaData?.response) {
      setProgress(0.01);
      const downloadResumable = FileSystem.createDownloadResumable(
        setMetaResults?.setMetaData.response.url.replace(
          "http://127.0.0.1:3001",
          serverBaseURL
        ),
        FileSystem.documentDirectory +
          setMetaResults?.setMetaData.response?.documentName.replace(" ", "_"),
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
    if (mounted && !!setMetaResults?.setMetaData?.error) {
      setError(setMetaResults.setMetaData.error.message);
    }
    return () => {
      mounted = false;
    };
  }, [setMetaResults]);

  const readMetaData = async () => {
    if (!!!getMetaDataDocument) return;
    if (getMetaDataDocument.type === "cancel") return;
    const file = generateRNFile({
      mimeType: getMetaDataDocument.mimeType ?? "application/pdf",
      name: getMetaDataDocument.name,
      uri: getMetaDataDocument.uri,
    });
    const sid = await getSessionId();
    if (!file || !!!sid) {
      return;
    }
    await _readMetaData({
      variables: {
        input: {
          file,
          sessionId: sid,
        },
      },
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;

    if (mounted && !!readMetaResults) {
      if (readMetaResults.getPDFMetaData?.error) {
        Alert;
      } else {
        navigation.navigate("Results", {
          results: JSON.stringify(readMetaResults.getPDFMetaData?.response),
          service: "meta",
          headerTitle: "PDF Meta Data",
        });
      }
    }
    return () => {
      mounted = false;
    };
  }, [readMetaResults]);

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
    if (mounted && !!readMetaResults?.getPDFMetaData?.error) {
      setError(readMetaResults.getPDFMetaData.error.message);
    }
    return () => {
      mounted = false;
    };
  }, [readMetaResults]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!setMetaDataDocument) {
      (async () => {
        if (!!!setMetaDataDocument) return;
        if (setMetaDataDocument.type === "cancel") return;
        const file = generateRNFile({
          mimeType: setMetaDataDocument.mimeType ?? "application/pdf",
          name: setMetaDataDocument.name,
          uri: setMetaDataDocument.uri,
        });
        const sid = await getSessionId();
        if (!file || !!!sid) {
          return;
        }
        setLoading(true);
        const { loading, data } = await client.query({
          query: GetPdfMetaDataDocument,
          variables: {
            input: {
              file,
              sessionId: sid,
            },
          },
        });
        setLoading(loading);
        if (data?.meta?.success) {
          setAuthor(data?.meta?.response?.author ?? "");
          setProducer(data?.meta?.response?.producer ?? "");
          setCreator(data?.meta?.response?.creator ?? "");
          setCreatedAt(data?.meta?.response?.createdAt ?? "");
          setUpdatedAt(data?.meta?.response?.modifiedAt ?? "");
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [setMetaDataDocument]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!setMetaResults?.setMetaData?.success) {
      setAuthor(setMetaResults.setMetaData?.response?.author ?? "");
      setProducer(setMetaResults.setMetaData?.response?.producer ?? "");
      setCreator(setMetaResults.setMetaData?.response?.creator ?? "");
      setCreatedAt(setMetaResults.setMetaData?.response?.createdAt ?? "");
      setUpdatedAt(setMetaResults.setMetaData?.response?.modifiedAt ?? "");
    }
    return () => {
      mounted = false;
    };
  }, [setMetaResults]);

  const updateMeta = async () => {
    if (!!!setMetaDataDocument) return;
    if (setMetaDataDocument.type === "cancel") return;
    const sid = await getSessionId();
    const file = generateRNFile({
      mimeType: setMetaDataDocument.mimeType ?? "application/pdf",
      name: setMetaDataDocument.name,
      uri: setMetaDataDocument.uri,
    });
    if (!file || !!!sid) {
      return;
    }
    await _update({
      variables: {
        input: {
          file,
          sessionId: sid,
          author: author ? author : null,
          producer: producer ? producer : null,
          creator: creator ? creator : null,
        },
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {readMetaLoading || loading || setMetaLoading ? (
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
              {(setMetaDataDocument as any)?.name}
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
            borderRadius: 5,
            width: "100%",
            alignSelf: "flex-start",
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
            setSetMetaDataDocument(doc);
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: 16,
              color: "white",
            }}
          >
            {!!!setMetaDataDocument ? "SELECT PDF" : "RE-SELECT PDF"}
          </Text>
        </TouchableOpacity>

        {!!setMetaDataDocument ? (
          <View
            style={{
              marginVertical: 20,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <CustomTextInput
              leftIcon={
                <Feather name="user-check" size={24} color={COLORS.main} />
              }
              placeholder="Author"
              text={author}
              onChangeText={(text) => setAuthor(text)}
              keyboardType="default"
              containerStyles={{
                marginBottom: 10,
                maxWidth: 500,
                width: "100%",
              }}
            />
            <CustomTextInput
              leftIcon={
                <Feather name="user-check" size={24} color={COLORS.main} />
              }
              placeholder="Creator"
              text={creator}
              onChangeText={(text) => setCreator(text)}
              keyboardType="default"
              containerStyles={{
                marginBottom: 10,
                maxWidth: 500,
                width: "100%",
              }}
            />
            <CustomTextInput
              leftIcon={
                <Feather name="user-check" size={24} color={COLORS.main} />
              }
              placeholder="Producer"
              text={producer}
              onChangeText={(text) => setProducer(text)}
              keyboardType="default"
              containerStyles={{
                marginBottom: 10,
                maxWidth: 500,
                width: "100%",
              }}
            />

            <CustomTextInput
              leftIcon={
                <MaterialIcons
                  name="date-range"
                  size={24}
                  color={COLORS.main}
                />
              }
              placeholder="Created At"
              text={createdAt}
              onChangeText={(text) => setCreatedAt(text)}
              keyboardType="default"
              containerStyles={{
                marginBottom: 10,
                maxWidth: 500,
                width: "100%",
              }}
              editable={false}
            />
            <CustomTextInput
              editable={false}
              leftIcon={
                <MaterialIcons
                  name="date-range"
                  size={24}
                  color={COLORS.main}
                />
              }
              placeholder="Updated At"
              text={updatedAt}
              onChangeText={(text) => setUpdatedAt(text)}
              keyboardType="default"
              containerStyles={{
                marginBottom: 10,
                maxWidth: 500,
                width: "100%",
              }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: COLORS.main,
                maxWidth: 300,
                paddingVertical: 10,
                alignItems: "center",
                borderRadius: 5,
                width: "100%",
                alignSelf: "flex-start",
                marginTop: 10,
              }}
              onPress={updateMeta}
            >
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  color: "white",
                }}
              >
                UPDATE META
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {setMetaResults?.setMetaData?.success ? (
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
                Compression Successful. Now you can share your document.
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
            >{`File name: ${setMetaResults?.setMetaData.response?.documentName.replace(
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
                <IndeterminateProgress
                  color={COLORS.main_tertiary}
                  width={500}
                />
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
                      fileName:
                        setMetaResults.setMetaData?.response?.documentName.replace(
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
    </View>
  );
};

export default PdfMeta;
