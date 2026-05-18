import React, { useMemo, useState } from "react";
import { Image, Text, View } from "react-native";

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
  onExit,
}: {
  onExit: () => void;
}) {
  const [route, setRoute] = useState<CustomerRoute>("login");
  const [selectedServiceId, setSelectedServiceId] = useState(services[0].id);
  const [selectedProviderId, setSelectedProviderId] = useState(providers[0].id);
  const [bookingAddress, setBookingAddress] = useState("Mont Kiara, Kuala Lumpur");
  const [bookingNotes, setBookingNotes] = useState("");

  const selectedService = services.find((service) => service.id === selectedServiceId) ?? services[0];
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
              title="Welcome back"
              subtitle="Sign in to discover nearby services, trusted professionals, and fast bookings."
              onBack={onExit}
            />
            <HeroCard
              title="Book top-rated help from one app."
              subtitle="Chefs, tutors, plumbers, electricians, drivers, maids, and babysitters, all with cleaner booking flow and live chat."
              primaryLabel="Continue to home"
              secondaryLabel="Create account"
              onPrimaryPress={() => setRoute("home")}
              onSecondaryPress={() => setRoute("register")}
            />
            <OutlineField label="Email" placeholder="customer@della.app" value="sara@della.app" />
            <OutlineField label="Password" placeholder="Enter password" value="password123" />
            <PrimaryButton label="Sign in" onPress={() => setRoute("home")} />
            <SecondaryButton label="Register instead" onPress={() => setRoute("register")} />
          </>
        ) : null}

        {route === "register" ? (
          <>
            <ScreenHeader
              eyebrow="Customer app"
              title="Create your DELLA account"
              subtitle="Set up your account to browse services, compare providers, and manage bookings."
              onBack={() => setRoute("login")}
            />
            <OutlineField label="Full name" placeholder="Your name" value="Sara Abdullah" />
            <OutlineField label="Email" placeholder="your@email.com" value="sara@della.app" />
            <OutlineField label="Phone number" placeholder="+60" value="+60 12-456 7890" />
            <OutlineField label="Password" placeholder="Create password" value="password123" />
            <PrimaryButton label="Create account" onPress={() => setRoute("home")} />
          </>
        ) : null}

        {route === "home" ? (
          <>
            <ScreenHeader
              eyebrow="Customer home"
              title="Hello, Sara"
              subtitle="Find the right service faster with premium discovery, transparent pricing, and nearby trusted providers."
              onBack={onExit}
              actionLabel="Switch flow"
              onActionPress={onExit}
            />
            <HeroCard
              title="Book nearby lifestyle support."
              subtitle="Compare ratings, service radius, starting prices, and provider photos before you book."
              primaryLabel="Browse services"
              secondaryLabel="View bookings"
              onPrimaryPress={() => setRoute("categories")}
              onSecondaryPress={() => setRoute("bookings")}
            />
            <View style={{ flexDirection: "row", gap: 12 }}>
              <MetricCard label="Active services" value="7" />
              <MetricCard label="Nearby providers" value="42" />
              <MetricCard label="Avg response" value="8m" />
            </View>
            <SectionTitle
              title="Popular services"
              subtitle="Modern categories designed for quick discovery."
              actionLabel="See all"
              onActionPress={() => setRoute("categories")}
            />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {services.slice(0, 4).map((service) => (
                <View key={service.id} style={{ width: "48%" }}>
                  <ServiceCard
                    service={service}
                    onPress={() => {
                      setSelectedServiceId(service.id);
                      setRoute("nearby");
                    }}
                  />
                </View>
              ))}
            </View>
            <SectionTitle
              title="Nearby providers"
              subtitle="High-trust professionals near your location."
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
              title="Service categories"
              subtitle="Choose the kind of help you need and jump straight into nearby provider discovery."
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
              subtitle="Filtered by service, distance, rating, and starting price."
              onBack={() => setRoute("categories")}
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
                Showing providers within their service radius who offer transparent
                pricing and live chat support.
              </Text>
            </View>
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                serviceLabel={`${provider.distanceKm} km • RM ${provider.startingPrice} start`}
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
              subtitle="Check pricing, radius, photos, reviews, and service specialties before you book."
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
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
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
              title="Your request is in."
              subtitle="The provider has been notified. You can now chat directly and follow the booking from My Bookings."
              onBack={() => setRoute("home")}
            />
            <HeroCard
              title="Booking sent successfully."
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
              subtitle="See approval status, schedules, addresses, and pricing all in one place."
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
              subtitle="Chat with providers and keep every booking aligned."
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
              subtitle="Manage your DELLA account, saved addresses, and preferences."
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
