import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, serverBaseURL } from "../../constants";
import Divider from "../Divider/Divider";
import * as DocumentPicker from "expo-document-picker";
import { ServicesType } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";
import DoubleCircular from "../DoubleCircularIndicator/DoubleCircularIndicator";
import { useEncryptPdfMutation } from "../../graphql/generated/graphql";
import { generateRNFile } from "../../utils";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import IndeterminateProgress from "../LinearProgress/LinearProgress";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
interface Props {
  params: Readonly<{
    nFiles: number;
    service: ServicesType;
    headerTitle: string;
  }>;
  navigation: StackNavigationProp<AppParamList, "FilePicker", undefined>;
}
const EncryptPDF: React.FunctionComponent<Props> = ({ params, navigation }) => {
  const [doc, setDoc] = useState<DocumentPicker.DocumentResult>();
  const [progress, setProgress] = useState(0);
  const [previewURL, setPreviewURL] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfPassword, setHideConfPassword] = useState<boolean>(true);
  const [conf, setConf] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [encrypt, { loading, data }] = useEncryptPdfMutation({
    fetchPolicy: "network-only",
  });
  const encryptPDF = async () => {
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

    if (password.trim() !== conf.trim()) {
      setError("The two passwords must match.");
      return;
    }
    if (password.trim().length < 5) {
      setError("The password must be at least 5 characters.");
      return;
    }

    await encrypt({
      variables: {
        input: {
          file,
          password: password.trim(),
        },
      },
    });
  };

  const share = async () => {
    if (data?.encryptPDF?.response) {
      setProgress(0.01);
      const downloadResumable = FileSystem.createDownloadResumable(
        data?.encryptPDF.response.url.replace(
          "http://127.0.0.1:3001",
          serverBaseURL
        ),
        FileSystem.documentDirectory +
          data.encryptPDF.response?.documentName.replace(" ", "_"),
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

      setConf("");
      setPassword("");
    }
    return () => {
      mounted = false;
    };
  }, [error]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!data?.encryptPDF?.error) {
      setError(data.encryptPDF.error.message);
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
        Encrypt PDF Document
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          marginBottom: 10,
          marginTop: 5,
          color: "white",
        }}
      >
        Secure your PDF document by adding a password.
      </Text>
      <Divider title="Add Password to PDF" />
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
        </View>
      </View>

      {!!doc ? (
        <View>
          <CustomTextInput
            leftIcon={<AntDesign name="lock" size={24} color={COLORS.main} />}
            placeholder="password"
            text={password}
            onChangeText={(text) => setPassword(text)}
            keyboardType="default"
            containerStyles={{
              marginBottom: 10,
            }}
            rightIcon={
              !hidePassword ? (
                <FontAwesome name="eye" size={24} color={COLORS.main} />
              ) : (
                <FontAwesome name="eye-slash" size={24} color={COLORS.main} />
              )
            }
            secureTextEntry={hidePassword}
            onRightIconPress={() => setHidePassword((state) => !state)}
          />
          <CustomTextInput
            leftIcon={<AntDesign name="lock" size={24} color={COLORS.main} />}
            placeholder="confirm password"
            text={conf}
            onChangeText={(text) => setConf(text)}
            keyboardType="default"
            containerStyles={{
              marginBottom: 10,
            }}
            rightIcon={
              !hideConfPassword ? (
                <FontAwesome name="eye" size={24} color={COLORS.main} />
              ) : (
                <FontAwesome name="eye-slash" size={24} color={COLORS.main} />
              )
            }
            secureTextEntry={hideConfPassword}
            onRightIconPress={() => setHideConfPassword((state) => !state)}
            onSubmitEditing={encryptPDF}
          />
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
            onPress={encryptPDF}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 16,
                color: "white",
              }}
            >
              LOCK PDF
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {data?.encryptPDF?.success ? (
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
              Encryption Successful. Now you can share your document.
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
          >{`File name: ${data.encryptPDF.response?.documentName.replace(
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
                    fileName: previewURL
                      ?.split("/")
                      [previewURL?.split("/").length - 1].replace(
                        "%20",
                        " "
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

export default EncryptPDF;
