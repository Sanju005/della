import React from "react";
import { Text, View } from "react-native";

import { AppScreen } from "../components/ui";
import { colors } from "../theme";

export function SplashScreen() {
  return (
    <AppScreen scroll={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.brandDeep,
          borderRadius: 32,
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          gap: 16,
        }}
      >
        <View
          style={{
            width: 84,
            height: 84,
            borderRadius: 28,
            backgroundColor: colors.brand,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 36, fontWeight: "800", color: colors.ink }}>
            D
          </Text>
        </View>
        <Text style={{ fontSize: 34, fontWeight: "900", color: "white" }}>
          DELLA
        </Text>
        <Text
          style={{
            fontSize: 15,
            lineHeight: 24,
            color: "#DAE8DD",
            textAlign: "center",
            maxWidth: 260,
          }}
        >
          Your premium multi-service marketplace for trusted home and lifestyle
          support.
        </Text>
      </View>
    </AppScreen>
  );
}
