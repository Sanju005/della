import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { AppScreen, PrimaryButton, SecondaryButton } from "../components/ui";
import { services } from "../data/mockData";
import { colors } from "../theme";

type EntrySlide = 0 | 1 | 2;

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
          backgroundColor: colors.brandDeep,
          overflow: "hidden",
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
            backgroundColor: "rgba(11, 203, 78, 0.18)",
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
            backgroundColor: "rgba(11, 203, 78, 0.14)",
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
                  color: "#9BFFB9",
                }}
              >
                DELLA
              </Text>
              <Text style={{ color: "#D6E5DB", fontSize: 13, marginTop: 4 }}>
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
                      dot === slide ? colors.brand : "rgba(255,255,255,0.25)",
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
                    color: "white",
                  }}
                >
                  All your services in one DELLA app
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 26,
                    color: "#D6E5DB",
                    maxWidth: 300,
                  }}
                >
                  Book chefs, tutors, plumbers, electricians, drivers, maids,
                  and babysitters through one modern marketplace.
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: 28,
                  padding: 16,
                  gap: 14,
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
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderRadius: 999,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
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
                    color: "white",
                  }}
                >
                  Why DELLA
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 26,
                    color: "#D6E5DB",
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
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderRadius: 24,
                      padding: 18,
                      flexDirection: "row",
                      gap: 14,
                    }}
                  >
                    <View
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 18,
                        backgroundColor: "rgba(11,203,78,0.18)",
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
                          color: "white",
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          color: "#D6E5DB",
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
                    color: "white",
                  }}
                >
                  Start with DELLA
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 26,
                    color: "#D6E5DB",
                    maxWidth: 320,
                  }}
                >
                  Sign up as a customer, log in to continue, or register as a
                  service provider and grow your business with DELLA.
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: 28,
                  padding: 18,
                  gap: 14,
                }}
              >
                <PrimaryButton label="Log in" onPress={onLoginPress} />
                <View>
                  <Pressable
                    onPress={onSignupPress}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 18,
                      paddingVertical: 15,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: colors.brandDeep,
                        fontSize: 15,
                        fontWeight: "800",
                      }}
                    >
                      Sign up
                    </Text>
                  </Pressable>
                </View>
                <SecondaryButton
                  label="Register as service provider"
                  onPress={onProviderPress}
                />
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
              <Text style={{ color: "#D6E5DB", fontSize: 14, fontWeight: "700" }}>
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
