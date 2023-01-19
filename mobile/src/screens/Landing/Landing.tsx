import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { AppNavProps } from "../../params";
import { COLORS, FONTS } from "../../constants";
import * as Animatable from "react-native-animatable";
import { useRef } from "react";
const Landing: React.FunctionComponent<AppNavProps<"Landing">> = ({
  navigation,
}) => {
  const animationRef = useRef<any>(null);
  useLayoutEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      navigation.setOptions({
        headerShown: false,
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.main,
        padding: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          flex: 0.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.regularBold,
            fontSize: 30,
            color: "white",
            textTransform: "uppercase",
            marginBottom: 20,
            textDecorationLine: "underline",
            textDecorationColor: "white",
          }}
        >
          docmaster
        </Text>

        <Animatable.Image
          animation={"bounce"}
          duration={2000}
          iterationCount={1}
          easing={"linear"}
          direction={"normal"}
          useNativeDriver={false}
          source={{
            uri: Image.resolveAssetSource(require("../../../assets/logo.png"))
              .uri,
          }}
          style={{
            width: 100,
            height: 100,
            marginBottom: 10,
          }}
        />
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: "white",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          DOCMASTER is a tool that you can use to manipulate your pdf and word
          documents.
        </Text>
      </View>
      <View
        style={{
          flex: 0.5,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Animatable.View
          ref={animationRef}
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              maxWidth: 300,
              width: "100%",
              borderRadius: 5,
              backgroundColor: COLORS.main_primary,
              justifyContent: "center",
              paddingVertical: 15,
              alignItems: "center",
            }}
            onPress={() => {
              if (animationRef) {
                animationRef.current?.bounce();
              }
              navigation.replace("Home");
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,
                color: "white",
                fontSize: 20,
              }}
            >
              OPEN TOOL
            </Text>
          </TouchableOpacity>
        </Animatable.View>
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
      </View>
    </View>
  );
};

export default Landing;
