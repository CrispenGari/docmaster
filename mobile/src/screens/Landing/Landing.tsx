import { View, Text, Button } from "react-native";
import React from "react";
import * as DocumentPicker from "expo-document-picker";
import { useReadPdfMetaMutation } from "../../graphql/generated/graphql";
import { generateRNFile } from "../../utils";
const Landing = () => {
  const [readMeta, { data, loading }] = useReadPdfMetaMutation({
    fetchPolicy: "network-only",
  });

  console.log(JSON.stringify({ data, loading }, null, 2));
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Landing</Text>
      <Button
        title="Choose documnent"
        onPress={async () => {
          const res = await DocumentPicker.getDocumentAsync({
            multiple: false,
            copyToCacheDirectory: true,
          });

          if (res.type === "cancel") {
            return;
          }
          await readMeta({
            variables: {
              input: {
                file: generateRNFile({
                  mimeType: res.mimeType as string,
                  uri: res.uri,
                  name: res.name,
                }),
              },
            },
          });
        }}
      />
    </View>
  );
};

export default Landing;
