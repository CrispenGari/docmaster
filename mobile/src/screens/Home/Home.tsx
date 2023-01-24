import { ScrollView, View, Image, SafeAreaView, Text } from "react-native";
import React from "react";
import { AppNavProps } from "../../params";
import { COLORS, FONTS } from "../../constants";
import {
  AntDesign,
  Entypo,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Divider, IconButton } from "../../components";
import { useLayoutEffect } from "react";
import * as Animatable from "react-native-animatable";

const Home: React.FunctionComponent<AppNavProps<"Home">> = ({ navigation }) => {
  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerLeft() {
          return (
            <Animatable.Image
              animation={"bounce"}
              duration={2000}
              iterationCount={1}
              easing={"linear"}
              direction={"normal"}
              useNativeDriver={false}
              source={{
                uri: Image.resolveAssetSource(
                  require("../../../assets/logo.png")
                ).uri,
              }}
              style={{
                width: 50,
                height: 50,
                marginLeft: 10,
              }}
            />
          );
        },
      });
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <ScrollView
      style={{
        padding: 10,
        backgroundColor: COLORS.main_secondary,
        position: "relative",
      }}
    >
      <Divider title="BASICS" />
      <View style={{ width: "100%", marginBottom: 10 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <IconButton
            Icon={<AntDesign name="infocirlce" size={30} color="white" />}
            title="PDF Meta Data"
            onPress={() => {
              navigation.navigate("FilePicker", {
                headerTitle: "PDF Meta Data",
                nFiles: 1,
                service: "meta",
              });
            }}
          />
          <IconButton
            Icon={
              <MaterialIcons
                name="panorama-photosphere"
                size={30}
                color="white"
              />
            }
            title="PDF Annotations"
          />
          <IconButton
            Icon={
              <MaterialCommunityIcons
                name="watermark"
                size={30}
                color="white"
              />
            }
            title="PDF Watermarks"
          />
        </ScrollView>
      </View>

      <Divider title="TRANSFORMS" />
      <View style={{ width: "100%", marginBottom: 10 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <IconButton
            Icon={<Foundation name="page-export-pdf" size={30} color="white" />}
            title="PDF to Word Document"
            onPress={() => {
              navigation.navigate("FilePicker", {
                headerTitle: "PDF to Word Document",
                nFiles: 1,
                service: "2word",
              });
            }}
          />
          <IconButton
            Icon={
              <MaterialCommunityIcons
                name="microsoft-word"
                size={30}
                color="white"
              />
            }
            title="Word Document to PDF"
            onPress={() => {
              navigation.navigate("FilePicker", {
                headerTitle: "Word Document to PDF Document",
                nFiles: 1,
                service: "2word",
              });
            }}
          />
        </ScrollView>
      </View>
      <Divider title="STORAGE" />
      <View style={{ width: "100%", marginBottom: 10 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <IconButton
            Icon={<Entypo name="resize-100" size={30} color="white" />}
            title="PDF Compressor"
            onPress={() => {
              navigation.navigate("FilePicker", {
                headerTitle: "PDF Compressor",
                nFiles: 1,
                service: "compress",
              });
            }}
          />
        </ScrollView>
      </View>

      <Divider title="EXTRACTIONS" />
      <View style={{ width: "100%", marginBottom: 10 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <IconButton
            Icon={<AntDesign name="table" size={30} color="white" />}
            title="Extract table from PDF"
          />
          <IconButton
            Icon={<Entypo name="images" size={30} color="white" />}
            title="Extract images from PDF"
          />
          <IconButton
            Icon={<Entypo name="text" size={30} color="white" />}
            title="Extract TEXT from PDF"
          />
        </ScrollView>
      </View>

      <Divider title="COMPILING" />
      <View style={{ width: "100%", marginBottom: 10 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <IconButton
            Icon={<Entypo name="merge" size={30} color="white" />}
            title="Merge PDFs"
            onPress={() => {
              navigation.navigate("FilePicker", {
                headerTitle: "Merge PDFs",
                nFiles: 1,
                service: "merge",
              });
            }}
          />
        </ScrollView>
      </View>
      <Divider title={"Encryption and Decryption".toUpperCase()} />
      <View style={{ width: "100%", marginBottom: 10 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <IconButton
            Icon={
              <MaterialCommunityIcons
                name="archive-lock"
                size={30}
                color="white"
              />
            }
            title="Encrypt PDF Document"
            onPress={() => {
              navigation.navigate("FilePicker", {
                headerTitle: "Lock PDF",
                nFiles: 1,
                service: "encrypt",
              });
            }}
          />
          <IconButton
            Icon={
              <MaterialCommunityIcons
                name="archive-lock-open"
                size={30}
                color="white"
              />
            }
            title="Decrypt PDF Document"
            onPress={() => {
              navigation.navigate("FilePicker", {
                headerTitle: "Unlock PDF",
                nFiles: 1,
                service: "decrypt",
              });
            }}
          />
        </ScrollView>
      </View>
      <View style={{ height: 50 }} />

      <SafeAreaView
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: "white",
            marginTop: 20,
            width: "100%",
            textAlign: "center",
            position: "absolute",
            bottom: 0,
          }}
        >
          Copyright © {new Date().getFullYear()} docmaster Inc. All rights
          reserved.
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
