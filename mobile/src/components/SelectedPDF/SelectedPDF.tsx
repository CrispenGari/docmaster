import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  onPress?: () => void;
  doc: {
    doc: {
      name: string;
      size?: number | undefined;
      uri: string;
      mimeType?: string | undefined;
    };
    pages: Array<number>;
    id: number;
  };
  documentNumber: number;
  onRemoveButtonPress?: () => void;
  setDocumentsToMerge: React.Dispatch<
    React.SetStateAction<
      {
        doc: {
          name: string;
          size?: number | undefined;
          uri: string;
          mimeType?: string | undefined;
        };
        pages: Array<number>;
        id: number;
      }[]
    >
  >;
}
const SelectedPDF: React.FunctionComponent<Props> = ({
  doc,
  documentNumber,
  onPress,
  onRemoveButtonPress,
  setDocumentsToMerge,
}) => {
  const [pages, setPages] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!pages) {
      // validate pages
      const _pages = pages.replace(/\s+/g, "").trim();

      if (pages.indexOf("-") !== -1) {
        const ___pages = _pages
          .split("-")
          .map((n) => Number.parseInt(n))
          .filter(Boolean);
        if (___pages.length === 1) {
          setError(false);
          setDocumentsToMerge((state) =>
            state.map((doc) => {
              if (doc.id === documentNumber) {
                return {
                  ...doc,
                  pages: ___pages,
                };
              } else {
                return doc;
              }
            })
          );
          return;
        }
        if (___pages.length !== 2) {
          setError(true);
          return;
        } else {
          setError(false);
          const [i, j] = ___pages;
          if (i >= j) {
            setError(true);
            return;
          } else {
            setError(false);
          }
          let pageNumbers: number[] = [];
          for (let k = i; k <= j; k++) {
            pageNumbers.push(k);
          }

          setDocumentsToMerge((state) =>
            state.map((doc) => {
              if (doc.id === documentNumber) {
                return {
                  ...doc,
                  pages: pageNumbers,
                };
              } else {
                return doc;
              }
            })
          );
        }
      }
      if (pages.indexOf(",") !== -1) {
        setError(false);
        const pageNumbers = _pages
          .split(",")
          .map((n) => Number.parseInt(n))
          .filter(Boolean);
        setDocumentsToMerge((state) =>
          state.map((doc) => {
            if (doc.id === documentNumber) {
              return {
                ...doc,
                pages: pageNumbers,
              };
            } else {
              return doc;
            }
          })
        );
        return;
      }
    }
    return () => {
      mounted = false;
    };
  }, [pages, documentNumber]);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 150,
        height: 200,
        backgroundColor: COLORS.main_primary,
        borderRadius: 5,
        alignItems: "center",
        padding: 10,
        marginRight: 5,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onRemoveButtonPress}
        style={{
          width: 40,
          height: 40,
          backgroundColor: COLORS.main_secondary,
          zIndex: 10,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 5,
          right: 5,
          borderRadius: 40,
        }}
      >
        <MaterialIcons name="delete-sweep" size={24} color="white" />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: COLORS.main,
          width: 25,
          height: 25,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 10,
          left: 10,
          borderRadius: 25,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: FONTS.regular,
          }}
        >
          {documentNumber + 1}
        </Text>
      </View>
      <AntDesign name="pdffile1" size={70} color="white" />
      <Text
        style={{
          color: "white",
          marginTop: 10,
        }}
      >
        Select Pages
      </Text>
      <TextInput
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          fontFamily: FONTS.regular,
          backgroundColor: "#f5f5f5",
          width: "100%",
          borderRadius: 5,
          borderColor: error ? "red" : "transparent",
          borderWidth: 1,
        }}
        placeholder="1, 3, 5 or 2 - 10"
        keyboardType="number-pad"
        value={pages}
        onChangeText={(text) => setPages(text)}
      />
      <Text
        style={{
          textAlign: "center",
          color: "white",
          marginTop: 10,
          fontFamily: FONTS.regular,
          position: "absolute",
          bottom: 0,
          paddingVertical: 10,
        }}
      >
        {doc.doc.name}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectedPDF;
