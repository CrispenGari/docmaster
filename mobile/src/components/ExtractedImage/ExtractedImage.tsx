import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { serverBaseURL, COLORS, FONTS } from "../../constants";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Entypo, AntDesign } from "@expo/vector-icons";
import IndeterminateProgress from "../LinearProgress/LinearProgress";
interface Props {
  uri: string;
}

const ExtractedImage: React.FunctionComponent<Props> = ({ uri }) => {
  const [progress, setProgress] = useState(0);
  const [previewURL, setPreviewURL] = useState<string>("");

  const saveToLibary = async () => {
    if (previewURL) {
      await MediaLibrary.saveToLibraryAsync(previewURL);
      await Alert.alert(
        "docmaster",
        "The image was saved successifully!",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
    } else {
      setProgress(0.01);
      const downloadResumable = FileSystem.createDownloadResumable(
        uri.replace("http://127.0.0.1:3001", serverBaseURL),
        FileSystem.documentDirectory +
          uri.split("/")[uri.split("/").length - 1],
        {},
        ({ totalBytesExpectedToWrite, totalBytesWritten }) =>
          setProgress(totalBytesWritten / totalBytesExpectedToWrite)
      );
      try {
        const response = await downloadResumable.downloadAsync();
        if (response) {
          await MediaLibrary.saveToLibraryAsync(response.uri);
          await Alert.alert(
            "docmaster",
            "The image was saved successifully!",
            [
              {
                text: "OK",
              },
            ],
            { cancelable: false }
          );
          setPreviewURL(response.uri);
        }
      } catch (e) {
        console.error(e);
        setProgress(0);
      }
    }
  };

  const share = async () => {
    setProgress(0.01);
    const downloadResumable = FileSystem.createDownloadResumable(
      uri.replace("http://127.0.0.1:3001", serverBaseURL),
      FileSystem.documentDirectory + uri.split("/")[uri.split("/").length - 1],
      {},
      ({ totalBytesExpectedToWrite, totalBytesWritten }) =>
        setProgress(totalBytesWritten / totalBytesExpectedToWrite)
    );

    try {
      const response = await downloadResumable.downloadAsync();
      if (response) {
        await Sharing.shareAsync(response.uri, {
          dialogTitle: "Share Image",
        });
        setPreviewURL(response.uri);
      }
    } catch (e) {
      console.error(e);
      setProgress(0);
    }
  };

  return (
    <View style={{ width: 300, borderRadius: 5 }}>
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
          <IndeterminateProgress color={COLORS.main_tertiary} width={270} />
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
      <Image
        style={{
          width: 300,
          height: 400,
          borderRadius: 5,
          marginRight: 5,
        }}
        source={{
          uri: uri.replace("http://127.0.0.1:3001", serverBaseURL),
        }}
      />
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: COLORS.main,
            paddingVertical: 10,
            alignItems: "center",
            flex: 1,
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
            SHARE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: COLORS.main_primary,
            marginLeft: 5,
            paddingVertical: 10,
            alignItems: "center",
            flex: 1,
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={saveToLibary}
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
            SAVE PHOTOS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExtractedImage;
