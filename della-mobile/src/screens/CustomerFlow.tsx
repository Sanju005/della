import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import {
  AppScreen,
  BookingCard,
  BottomTabs,
  ChatCard,
  GalleryStrip,
  HeroCard,
  MetricCard,
  OutlineField,
  PrimaryButton,
  ProviderCard,
  ScreenHeader,
  SecondaryButton,
  SectionTitle,
  ServiceCard,
  StatusBadge,
} from "../components/ui";
import { customerBookings, customerChats, providers, services } from "../data/mockData";
import { colors } from "../theme";

type CustomerRoute =
  | "login"
  | "register"
  | "home"
  | "categories"
  | "nearby"
  | "provider-profile"
  | "booking-form"
  | "booking-confirmation"
  | "bookings"
  | "chat"
  | "profile";

const tabItems = [
  { key: "home", label: "Home", icon: "home-outline" },
  { key: "bookings", label: "Bookings", icon: "calendar-outline" },
  { key: "chat", label: "Chat", icon: "chatbubble-ellipses-outline" },
  { key: "profile", label: "Profile", icon: "person-outline" },
] as const;

export function CustomerFlow({
  initialRoute = "login",
  onExit,
}: {
  initialRoute?: "login" | "register";
  onExit: () => void;
}) {
  const [route, setRoute] = useState<CustomerRoute>(initialRoute);
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);
  const [selectedProviderId, setSelectedProviderId] = useState(providers[0].id);
  const [bookingAddress, setBookingAddress] = useState("Mont Kiara, Kuala Lumpur");
  const [bookingNotes, setBookingNotes] = useState("");

  useEffect(() => {
    setRoute(initialRoute);
  }, [initialRoute]);

  const selectedService =
    services.find((service) => service.id === selectedServiceId) ?? services[0];
  const filteredProviders = useMemo(
    () => providers.filter((provider) => provider.serviceIds.includes(selectedService.id)),
    [selectedService.id],
  );
  const selectedProvider =
    providers.find((provider) => provider.id === selectedProviderId) ??
    filteredProviders[0] ??
    providers[0];

  function openProvider(providerId: string) {
    setSelectedProviderId(providerId);
    setRoute("provider-profile");
  }

  function goToTab(tab: string) {
    setRoute(tab as CustomerRoute);
  }

  const showTabs = route === "home" || route === "bookings" || route === "chat" || route === "profile";
  const contentContainerStyle = showTabs ? { paddingBottom: 130 } : undefined;

  return (
    <View style={{ flex: 1 }}>
      <AppScreen contentContainerStyle={contentContainerStyle}>
        {route === "login" ? (
          <>
            <ScreenHeader
              eyebrow="Customer app"
              title="Log in to DELLA"
              subtitle="Continue with your customer account to discover nearby providers and manage bookings."
              onBack={onExit}
            />
            <HeroCard
              title="Everything you need, from one app."
              subtitle="A cleaner, more premium booking flow for home, family, and lifestyle support."
              primaryLabel="Continue to home"
              secondaryLabel="Create account"
              onPrimaryPress={() => setRoute("home")}
              onSecondaryPress={() => setRoute("register")}
            />
            <OutlineField label="Email" placeholder="customer@della.app" value="sara@della.app" />
            <OutlineField label="Password" placeholder="Enter password" value="password123" />
            <PrimaryButton label="Log in" onPress={() => setRoute("home")} />
            <SecondaryButton label="Sign up instead" onPress={() => setRoute("register")} />
          </>
        ) : null}

        {route === "register" ? (
          <>
            <ScreenHeader
              eyebrow="Customer app"
              title="Create your account"
              subtitle="Set up your DELLA account to browse services, compare providers, and manage bookings."
              onBack={() => setRoute("login")}
            />
            <OutlineField label="Full name" placeholder="Your name" value="Sara Abdullah" />
            <OutlineField label="Email" placeholder="your@email.com" value="sara@della.app" />
            <OutlineField label="Phone number" placeholder="+60" value="+60 12-456 7890" />
            <OutlineField label="Password" placeholder="Create password" value="password123" />
            <PrimaryButton label="Sign up" onPress={() => setRoute("home")} />
          </>
        ) : null}

        {route === "home" ? (
          <>
            <View
              style={{
                backgroundColor: colors.brandDeep,
                borderRadius: 30,
                padding: 20,
                gap: 18,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <Pressable
                    onPress={() => setRoute("profile")}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: "rgba(255,255,255,0.12)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name="person" size={22} color="white" />
                  </Pressable>
                  <View>
                    <Text style={{ color: "#A4F8BF", fontSize: 12, fontWeight: "700", letterSpacing: 1.1 }}>
                      GOOD AFTERNOON
                    </Text>
                    <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>
                      Sara
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Pressable
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      backgroundColor: "rgba(255,255,255,0.12)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name="notifications-outline" size={20} color="white" />
                  </Pressable>
                  <Pressable
                    onPress={onExit}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      backgroundColor: "rgba(255,255,255,0.12)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name="swap-horizontal-outline" size={20} color="white" />
                  </Pressable>
                </View>
              </View>

              <Pressable
                onPress={() => setRoute("categories")}
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderRadius: 18,
                  paddingHorizontal: 16,
                  paddingVertical: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Ionicons name="search" size={18} color="#D6E5DB" />
                <Text style={{ color: "#D6E5DB", fontSize: 14 }}>
                  Search for a service, provider, or job
                </Text>
              </Pressable>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
              >
                {[
                  {
                    label: "Book now",
                    icon: "flash-outline",
                    color: "#0BCB4E",
                  },
                  {
                    label: "My bookings",
                    icon: "calendar-outline",
                    color: "#7FFFB5",
                  },
                  {
                    label: "Chats",
                    icon: "chatbubbles-outline",
                    color: "#9BFFB9",
                  },
                ].map((item) => (
                  <Pressable
                    key={item.label}
                    onPress={() => {
                      if (item.label === "Book now") {
                        setRoute("categories");
                      } else if (item.label === "My bookings") {
                        setRoute("bookings");
                      } else {
                        setRoute("chat");
                      }
                    }}
                    style={{
                      width: 118,
                      backgroundColor: "rgba(255,255,255,0.10)",
                      borderRadius: 22,
                      padding: 14,
                      gap: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 16,
                        backgroundColor: item.color,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons name={item.icon as never} size={20} color={colors.ink} />
                    </View>
                    <Text style={{ color: "white", fontWeight: "700", fontSize: 14 }}>
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <MetricCard label="Nearby providers" value="42" />
              <MetricCard label="Live offers" value="12" />
              <MetricCard label="Fast response" value="8m" />
            </View>

            <SectionTitle
              title="Services"
              subtitle="Tap a category to start booking like Grab-style quick actions."
              actionLabel="See all"
              onActionPress={() => setRoute("categories")}
            />

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              {services.slice(0, 6).map((service) => (
                <View key={service.id} style={{ width: "31%" }}>
                  <Pressable
                    onPress={() => {
                      setSelectedServiceId(service.id);
                      setRoute("nearby");
                    }}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 22,
                      padding: 14,
                      borderWidth: 1,
                      borderColor: "#DDE7DF",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 18,
                        backgroundColor: service.accent,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons
                        name={service.icon as never}
                        size={24}
                        color={colors.brandDark}
                      />
                    </View>
                    <Text
                      style={{
                        color: colors.ink,
                        fontSize: 12,
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                    >
                      {service.name}
                    </Text>
                  </Pressable>
                </View>
              ))}
            </View>

            <View
              style={{
                backgroundColor: "#DDFBE6",
                borderRadius: 28,
                overflow: "hidden",
              }}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
                }}
                style={{ width: "100%", height: 180 }}
              />
              <View style={{ padding: 18, gap: 8 }}>
                <Text style={{ color: colors.brandDark, fontSize: 12, fontWeight: "800", letterSpacing: 1.2 }}>
                  DELLA PROMO
                </Text>
                <Text style={{ fontSize: 24, lineHeight: 30, fontWeight: "800", color: colors.ink }}>
                  Book trusted help faster with one app
                </Text>
                <Text style={{ color: "#4F6358", fontSize: 14, lineHeight: 22 }}>
                  Cleaner discovery, quick booking, and nearby professionals with
                  clear pricing and live chat.
                </Text>
              </View>
            </View>

            <SectionTitle
              title="Nearby providers"
              subtitle="Top-rated help around your saved location."
              actionLabel="Open list"
              onActionPress={() => setRoute("nearby")}
            />
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                serviceLabel={selectedService.name}
                onPress={() => openProvider(provider.id)}
              />
            ))}
          </>
        ) : null}

        {route === "categories" ? (
          <>
            <ScreenHeader
              eyebrow="Services"
              title="All service categories"
              subtitle="Choose the kind of support you need and jump into nearby provider discovery."
              onBack={() => setRoute("home")}
            />
            <View style={{ gap: 12 }}>
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={service.id === selectedServiceId}
                  onPress={() => {
                    setSelectedServiceId(service.id);
                    setRoute("nearby");
                  }}
                />
              ))}
            </View>
          </>
        ) : null}

        {route === "nearby" ? (
          <>
            <ScreenHeader
              eyebrow={selectedService.name}
              title="Nearby providers"
              subtitle="Compare provider cards with ratings, distance, starting price, and service radius."
              onBack={() => setRoute("home")}
            />
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 24,
                borderWidth: 1,
                borderColor: "#DDE7DF",
                padding: 16,
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "800", color: "#0D1B12" }}>
                {selectedService.name} around your area
              </Text>
              <Text style={{ fontSize: 14, lineHeight: 22, color: "#5A6A61" }}>
                Showing providers within service radius, with transparent pricing
                and live chat support.
              </Text>
            </View>
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                serviceLabel={`${provider.distanceKm} km away • RM ${provider.startingPrice} start`}
                onPress={() => openProvider(provider.id)}
              />
            ))}
          </>
        ) : null}

        {route === "provider-profile" ? (
          <>
            <ScreenHeader
              eyebrow="Provider profile"
              title={selectedProvider.name}
              subtitle="Check price, rating, radius, photos, and trust badges before you book."
              onBack={() => setRoute("nearby")}
            />
            <Image
              source={{ uri: selectedProvider.photos[0] }}
              style={{ width: "100%", height: 240, borderRadius: 24 }}
            />
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 24,
                padding: 18,
                gap: 12,
                borderWidth: 1,
                borderColor: "#DDE7DF",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: "800", color: "#0D1B12", flex: 1 }}>
                  {selectedProvider.name}
                </Text>
                <StatusBadge label={selectedProvider.status} />
              </View>
              <Text style={{ color: "#5A6A61", fontSize: 14, lineHeight: 22 }}>
                ⭐ {selectedProvider.rating.toFixed(1)} ({selectedProvider.reviewCount} reviews) •{" "}
                {selectedProvider.distanceKm} km away • Covers {selectedProvider.radiusKm} km radius
              </Text>
              <Text style={{ color: "#5A6A61", fontSize: 14, lineHeight: 22 }}>
                {selectedProvider.bio}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {selectedProvider.badges.map((badge) => (
                  <View
                    key={badge}
                    style={{
                      backgroundColor: "#E8FFF0",
                      borderRadius: 999,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                    }}
                  >
                    <Text style={{ color: "#0A6B2A", fontWeight: "700", fontSize: 12 }}>
                      {badge}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <MetricCard label="Starts from" value={`RM ${selectedProvider.startingPrice}`} />
                <MetricCard label="Experience" value={`${selectedProvider.experienceYears} yrs`} />
              </View>
            </View>
            <SectionTitle title="Portfolio" subtitle="Recent work and service setup" />
            <GalleryStrip images={selectedProvider.photos} />
            <PrimaryButton label="Book this provider" onPress={() => setRoute("booking-form")} />
          </>
        ) : null}

        {route === "booking-form" ? (
          <>
            <ScreenHeader
              eyebrow="Booking form"
              title={`Book ${selectedService.name}`}
              subtitle="Choose the service details, preferred schedule, and add booking notes."
              onBack={() => setRoute("provider-profile")}
            />
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 24,
                padding: 18,
                gap: 10,
                borderWidth: 1,
                borderColor: "#DDE7DF",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "800", color: "#0D1B12" }}>
                {selectedProvider.name}
              </Text>
              <Text style={{ color: "#5A6A61", fontSize: 14 }}>
                Starting from RM {selectedProvider.startingPrice}
              </Text>
            </View>
            <OutlineField label="Address" placeholder="Enter address" value={bookingAddress} onChangeText={setBookingAddress} />
            <OutlineField label="Preferred date and time" placeholder="Choose schedule" value="Tomorrow, 4:30 PM" />
            <OutlineField label="Notes" placeholder="Add instructions for the provider" value={bookingNotes} onChangeText={setBookingNotes} multiline />
            <PrimaryButton label="Confirm booking" onPress={() => setRoute("booking-confirmation")} />
          </>
        ) : null}

        {route === "booking-confirmation" ? (
          <>
            <ScreenHeader
              eyebrow="Booking confirmed"
              title="Your request is in"
              subtitle="The provider has been notified. You can now chat directly and track the booking from My Bookings."
              onBack={() => setRoute("home")}
            />
            <HeroCard
              title="Booking sent successfully"
              subtitle={`${selectedService.name} with ${selectedProvider.name} has been submitted for review and confirmation.`}
              primaryLabel="Open my bookings"
              secondaryLabel="Chat with provider"
              onPrimaryPress={() => setRoute("bookings")}
              onSecondaryPress={() => setRoute("chat")}
            />
          </>
        ) : null}

        {route === "bookings" ? (
          <>
            <ScreenHeader
              eyebrow="My bookings"
              title="Track every service"
              subtitle="See approval status, schedules, addresses, and pricing in one place."
              onBack={onExit}
              actionLabel="Customer"
            />
            {customerBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </>
        ) : null}

        {route === "chat" ? (
          <>
            <ScreenHeader
              eyebrow="Chat"
              title="Conversations"
              subtitle="Keep every booking aligned with direct provider messaging."
              onBack={onExit}
            />
            {customerChats.map((thread) => (
              <ChatCard key={thread.id} thread={thread} />
            ))}
          </>
        ) : null}

        {route === "profile" ? (
          <>
            <ScreenHeader
              eyebrow="Profile"
              title="Customer profile"
              subtitle="Manage your account, saved addresses, and service preferences."
              onBack={onExit}
            />
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 24,
                padding: 20,
                borderWidth: 1,
                borderColor: "#DDE7DF",
                gap: 12,
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "800", color: "#0D1B12" }}>
                Sara Abdullah
              </Text>
              <Text style={{ color: "#5A6A61", fontSize: 14, lineHeight: 22 }}>
                Frequent home services customer focused on family care, tutoring,
                and premium recurring bookings.
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <MetricCard label="Bookings made" value="18" />
                <MetricCard label="Saved providers" value="7" />
              </View>
            </View>
          </>
        ) : null}
      </AppScreen>

      {showTabs ? (
        <BottomTabs items={[...tabItems]} activeKey={route} onPress={goToTab} />
      ) : null}
    </View>
  );
}
