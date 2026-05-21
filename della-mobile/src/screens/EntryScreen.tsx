import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { AppScreen, PrimaryButton } from "../components/ui";
import { services } from "../data/mockData";
import { colors } from "../theme";

type EntrySlide = 0 | 1 | 2;

const entryPalette = {
  background: "#F3FBEF",
  panel: "#FFFFFF",
  panelSoft: "#EAF9E4",
  accent: "#39E60B",
  accentSoft: "rgba(57, 230, 11, 0.12)",
  accentGlow: "rgba(57, 230, 11, 0.2)",
  text: "#12210F",
  muted: "#49634A",
  border: "rgba(57, 230, 11, 0.18)",
};

export function EntryScreen({
  onLoginPress,
  onSignupPress,
  onProviderPress,
}: {
  onLoginPress: () => void;
  onSignupPress: () => void;
  onProviderPress: () => void;
}) {
  const [slide, setSlide] = useState<EntrySlide>(0);

  const featuredServices = useMemo(() => services.slice(0, 6), []);

  return (
    <AppScreen>
      <View
        style={{
          minHeight: 700,
          borderRadius: 32,
          backgroundColor: entryPalette.background,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: entryPalette.border,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: 110,
            backgroundColor: entryPalette.accentSoft,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: -60,
            left: -40,
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: entryPalette.accentSoft,
          }}
        />

        <View style={{ padding: 24, gap: 20, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: colors.brandDark,
                }}
              >
                DELLA
              </Text>
              <Text style={{ color: entryPalette.muted, fontSize: 13, marginTop: 4 }}>
                Home and lifestyle marketplace
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 8 }}>
              {[0, 1, 2].map((dot) => (
                <View
                  key={dot}
                  style={{
                    width: dot === slide ? 28 : 8,
                    height: 8,
                    borderRadius: 99,
                    backgroundColor:
                      dot === slide ? colors.brand : "rgba(18,33,15,0.14)",
                  }}
                />
              ))}
            </View>
          </View>

          {slide === 0 ? (
            <View style={{ gap: 20, flex: 1 }}>
              <View style={{ gap: 12 }}>
                <Text
                  style={{
                    fontSize: 42,
                    lineHeight: 48,
                    fontWeight: "900",
                    color: entryPalette.text,
                  }}
                >
                  All your services in one DELLA app
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 26,
                    color: entryPalette.muted,
                    maxWidth: 300,
                  }}
                >
                  Book chefs, tutors, plumbers, electricians, drivers, maids,
                  and babysitters through one modern marketplace.
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: entryPalette.panel,
                  borderRadius: 28,
                  padding: 16,
                  gap: 14,
                  borderWidth: 1,
                  borderColor: entryPalette.border,
                }}
              >
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
                  }}
                  style={{
                    width: "100%",
                    height: 240,
                    borderRadius: 24,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  {featuredServices.map((service) => (
                    <View
                      key={service.id}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 9,
                        backgroundColor: entryPalette.panelSoft,
                        borderRadius: 999,
                      }}
                    >
                      <Text
                        style={{
                          color: entryPalette.text,
                          fontSize: 13,
                          fontWeight: "700",
                        }}
                      >
                        {service.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : null}

          {slide === 1 ? (
            <View style={{ gap: 20, flex: 1 }}>
              <View style={{ gap: 12 }}>
                <Text
                  style={{
                    fontSize: 42,
                    lineHeight: 48,
                    fontWeight: "900",
                    color: entryPalette.text,
                  }}
                >
                  Why DELLA
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 26,
                    color: entryPalette.muted,
                    maxWidth: 320,
                  }}
                >
                  Faster discovery, cleaner booking, trusted providers, and one
                  place for home, family, and lifestyle support.
                </Text>
              </View>

              <View style={{ gap: 14 }}>
                {[
                  {
                    icon: "shield-checkmark-outline",
                    title: "Trusted providers",
                    text: "Profiles, ratings, service radius, and transparent pricing before you book.",
                  },
                  {
                    icon: "flash-outline",
                    title: "Fast marketplace flow",
                    text: "Search, compare, chat, and confirm jobs with fewer steps and better clarity.",
                  },
                  {
                    icon: "apps-outline",
                    title: "One app, many services",
                    text: "From urgent repairs to family care, DELLA keeps every service journey in one place.",
                  },
                ].map((item) => (
                  <View
                    key={item.title}
                    style={{
                      backgroundColor: entryPalette.panel,
                      borderRadius: 24,
                      padding: 18,
                      flexDirection: "row",
                      gap: 14,
                      borderWidth: 1,
                      borderColor: entryPalette.border,
                    }}
                  >
                    <View
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 18,
                        backgroundColor: entryPalette.accentGlow,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons
                        name={item.icon as never}
                        size={24}
                        color={colors.brand}
                      />
                    </View>
                    <View style={{ flex: 1, gap: 6 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "800",
                          color: entryPalette.text,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          color: entryPalette.muted,
                          fontSize: 14,
                          lineHeight: 22,
                        }}
                      >
                        {item.text}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {slide === 2 ? (
            <View style={{ gap: 20, flex: 1, justifyContent: "space-between" }}>
              <View style={{ gap: 12 }}>
                <Text
                  style={{
                    fontSize: 42,
                    lineHeight: 48,
                    fontWeight: "900",
                    color: entryPalette.text,
                  }}
                >
                  Start with DELLA
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 26,
                    color: entryPalette.muted,
                    maxWidth: 320,
                  }}
                >
                  Sign up as a customer, log in to continue, or register as a
                  service provider and grow your business with DELLA.
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: entryPalette.panel,
                  borderRadius: 28,
                  padding: 18,
                  gap: 14,
                  borderWidth: 1,
                  borderColor: entryPalette.border,
                }}
              >
                <PrimaryButton label="Log in" onPress={onLoginPress} />
                <View>
                  <Pressable
                    onPress={onSignupPress}
                    style={{
                      backgroundColor: entryPalette.panelSoft,
                      borderRadius: 18,
                      paddingVertical: 15,
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: entryPalette.border,
                    }}
                  >
                    <Text
                      style={{
                        color: entryPalette.text,
                        fontSize: 15,
                        fontWeight: "800",
                      }}
                    >
                      Sign up
                    </Text>
                  </Pressable>
                </View>
                <Pressable
                  onPress={onProviderPress}
                  style={{
                    borderRadius: 18,
                    paddingHorizontal: 18,
                    paddingVertical: 15,
                    borderWidth: 1,
                    borderColor: colors.brandDark,
                    minWidth: 140,
                    alignItems: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <Text style={{ color: colors.brandDark, fontSize: 15, fontWeight: "700" }}>
                    Register as service provider
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          <View
            style={{
              marginTop: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => setSlide((current) => Math.max(0, current - 1) as EntrySlide)}
              disabled={slide === 0}
              style={{
                opacity: slide === 0 ? 0.35 : 1,
                paddingVertical: 12,
                paddingHorizontal: 4,
              }}
            >
              <Text style={{ color: entryPalette.muted, fontSize: 14, fontWeight: "700" }}>
                Back
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                if (slide < 2) {
                  setSlide((current) => (current + 1) as EntrySlide);
                } else {
                  onLoginPress();
                }
              }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: colors.brand,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-forward" size={24} color={colors.ink} />
            </Pressable>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}
