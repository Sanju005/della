import React from "react";
import { Text, View } from "react-native";

import { AppScreen, HeroCard, InfoPanel, ScreenHeader } from "../components/ui";

export function EntryScreen({
  onCustomerPress,
  onProviderPress,
}: {
  onCustomerPress: () => void;
  onProviderPress: () => void;
}) {
  return (
    <AppScreen>
      <ScreenHeader
        eyebrow="Prototype"
        title="Choose your DELLA journey"
        subtitle="Preview both marketplace experiences inside one app UI: customer booking and provider onboarding."
      />

      <HeroCard
        title="Find nearby help in minutes."
        subtitle="Browse curated service categories, compare trusted providers, book quickly, and stay connected with live chat and booking updates."
        primaryLabel="Open customer app"
        secondaryLabel="Open provider app"
        onPrimaryPress={onCustomerPress}
        onSecondaryPress={onProviderPress}
      />

      <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
        <InfoPanel
          icon="account-heart-outline"
          title="Customer flow"
          description="Splash, auth, home, categories, nearby providers, profile, booking, chat, and account screens."
        />
        <InfoPanel
          icon="briefcase-account-outline"
          title="Provider flow"
          description="Auth, onboarding, pricing, service radius, documents, portfolio, dashboard, bookings, and earnings."
        />
      </View>

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
        <Text style={{ fontSize: 20, fontWeight: "800", color: "#0D1B12" }}>
          DELLA prototype notes
        </Text>
        <Text style={{ fontSize: 14, lineHeight: 22, color: "#5A6A61" }}>
          This prototype uses mock data only and focuses on premium marketplace
          UX, modern cards, green brand styling, and clean screen structure.
        </Text>
      </View>
    </AppScreen>
  );
}
