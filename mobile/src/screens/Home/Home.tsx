import { ScrollView, View, Image } from "react-native";
import React from "react";
import { AppNavProps } from "../../params";
import { COLORS } from "../../constants";
import {
  AntDesign,
  Entypo,
  Foundation,
  MaterialCommunityIcons,
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
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Home;
