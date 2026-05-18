import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";

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
  ScreenHeader,
  SecondaryButton,
  SectionTitle,
  ServiceCard,
  StatusBadge,
} from "../components/ui";
import { providerBookings, providerChats, services } from "../data/mockData";

type ProviderRoute =
  | "provider-login"
  | "provider-register"
  | "provider-profile-setup"
  | "add-services"
  | "set-pricing"
  | "set-radius"
  | "upload-documents"
  | "upload-portfolio"
  | "pending-approval"
  | "provider-dashboard"
  | "provider-bookings"
  | "provider-chat"
  | "earnings"
  | "provider-profile";

const providerTabs = [
  { key: "provider-dashboard", label: "Dashboard", icon: "grid-outline" },
  { key: "provider-bookings", label: "Bookings", icon: "calendar-outline" },
  { key: "provider-chat", label: "Chat", icon: "chatbubbles-outline" },
  { key: "earnings", label: "Earnings", icon: "wallet-outline" },
  { key: "provider-profile", label: "Profile", icon: "person-circle-outline" },
] as const;

export function ProviderFlow({ onExit }: { onExit: () => void }) {
  const [route, setRoute] = useState<ProviderRoute>("provider-login");
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(["maid", "babysitter"]);
  const [radiusKm, setRadiusKm] = useState("18");

  const selectedServices = useMemo(
    () => services.filter((service) => selectedServiceIds.includes(service.id)),
    [selectedServiceIds],
  );

  function toggleService(serviceId: string) {
    setSelectedServiceIds((current) =>
      current.includes(serviceId)
        ? current.filter((value) => value !== serviceId)
        : [...current, serviceId],
    );
  }

  const showTabs =
    route === "provider-dashboard" ||
    route === "provider-bookings" ||
    route === "provider-chat" ||
    route === "earnings" ||
    route === "provider-profile";

  return (
    <View style={{ flex: 1 }}>
      <AppScreen contentContainerStyle={showTabs ? { paddingBottom: 130 } : undefined}>
        {route === "provider-login" ? (
          <>
            <ScreenHeader
              eyebrow="Provider app"
              title="Provider login"
              subtitle="Sign in to manage bookings, pricing, documents, and your DELLA provider profile."
              onBack={onExit}
            />
            <HeroCard
              title="Grow your service business."
              subtitle="One app for multiple services, flexible pricing, radius control, booking visibility, and earnings tracking."
              primaryLabel="Continue to dashboard"
              secondaryLabel="Register as provider"
              onPrimaryPress={() => setRoute("provider-dashboard")}
              onSecondaryPress={() => setRoute("provider-register")}
            />
            <OutlineField label="Email" placeholder="provider@della.app" value="aina@della.app" />
            <OutlineField label="Password" placeholder="Password" value="password123" />
            <PrimaryButton label="Sign in" onPress={() => setRoute("provider-dashboard")} />
            <SecondaryButton label="Create provider account" onPress={() => setRoute("provider-register")} />
          </>
        ) : null}

        {route === "provider-register" ? (
          <>
            <ScreenHeader
              eyebrow="Provider app"
              title="Register as provider"
              subtitle="Create your DELLA provider account and continue into onboarding."
              onBack={() => setRoute("provider-login")}
            />
            <OutlineField label="Full name / team name" placeholder="Enter provider name" value="Aina Home Care" />
            <OutlineField label="Email" placeholder="provider@email.com" value="aina@della.app" />
            <OutlineField label="Phone number" placeholder="+60" value="+60 17-345 6789" />
            <OutlineField label="Password" placeholder="Create password" value="password123" />
            <PrimaryButton label="Start onboarding" onPress={() => setRoute("provider-profile-setup")} />
          </>
        ) : null}

        {route === "provider-profile-setup" ? (
          <>
            <ScreenHeader
              eyebrow="Step 1 of 7"
              title="Provider profile setup"
              subtitle="Describe your service brand, experience, and what makes you trustworthy."
              onBack={() => setRoute("provider-register")}
            />
            <OutlineField label="Display name" placeholder="Aina Home Care" value="Aina Home Care" />
            <OutlineField label="Bio" placeholder="Tell customers about your services" value="Premium childcare and recurring home support team with strong customer reviews." multiline />
            <OutlineField label="Experience years" placeholder="e.g. 6" value="6" />
            <PrimaryButton label="Continue to services" onPress={() => setRoute("add-services")} />
          </>
        ) : null}

        {route === "add-services" ? (
          <>
            <ScreenHeader
              eyebrow="Step 2 of 7"
              title="Add services"
              subtitle="Select multiple services that this provider can offer."
              onBack={() => setRoute("provider-profile-setup")}
            />
            <View style={{ gap: 12 }}>
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  selected={selectedServiceIds.includes(service.id)}
                  onPress={() => toggleService(service.id)}
                />
              ))}
            </View>
            <PrimaryButton label="Set pricing" onPress={() => setRoute("set-pricing")} />
          </>
        ) : null}

        {route === "set-pricing" ? (
          <>
            <ScreenHeader
              eyebrow="Step 3 of 7"
              title="Set pricing"
              subtitle="Configure hourly, daily, per-job, and per-trip models for every selected service."
              onBack={() => setRoute("add-services")}
            />
            {selectedServices.map((service) => (
              <View
                key={service.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: 24,
                  padding: 18,
                  borderWidth: 1,
                  borderColor: "#DDE7DF",
                  gap: 12,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "800", color: "#0D1B12" }}>
                  {service.name}
                </Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <OutlineField label="Per hour" placeholder="RM" value="45" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <OutlineField label="Per day" placeholder="RM" value="320" />
                  </View>
                </View>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <OutlineField label="Per job" placeholder="RM" value="90" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <OutlineField label="Per trip" placeholder="RM" value="35" />
                  </View>
                </View>
              </View>
            ))}
            <PrimaryButton label="Set service radius" onPress={() => setRoute("set-radius")} />
          </>
        ) : null}

        {route === "set-radius" ? (
          <>
            <ScreenHeader
              eyebrow="Step 4 of 7"
              title="Set service radius"
              subtitle="Choose how far you’re willing to travel for work."
              onBack={() => setRoute("set-pricing")}
            />
            <HeroCard
              title={`${radiusKm} km coverage`}
              subtitle="Customers nearby will discover your profile first when your coverage and pricing are clear."
              primaryLabel="Upload documents"
              secondaryLabel="Adjust radius"
              onPrimaryPress={() => setRoute("upload-documents")}
              onSecondaryPress={() => setRadiusKm(radiusKm === "18" ? "25" : "18")}
            />
            <View style={{ flexDirection: "row", gap: 12 }}>
              <MetricCard label="Current radius" value={`${radiusKm} km`} />
              <MetricCard label="Estimated reach" value="320 leads" />
            </View>
          </>
        ) : null}

        {route === "upload-documents" ? (
          <>
            <ScreenHeader
              eyebrow="Step 5 of 7"
              title="Upload documents"
              subtitle="Prototype the approval checklist with your required identity and service documents."
              onBack={() => setRoute("set-radius")}
            />
            <View style={{ gap: 12 }}>
              {["National ID", "Service certification", "Bank account proof"].map((item) => (
                <View
                  key={item}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 24,
                    padding: 18,
                    borderWidth: 1,
                    borderColor: "#DDE7DF",
                    gap: 8,
                  }}
                >
                  <Text style={{ fontSize: 17, fontWeight: "800", color: "#0D1B12" }}>{item}</Text>
                  <Text style={{ fontSize: 14, lineHeight: 22, color: "#5A6A61" }}>
                    Upload document placeholder for approval review. In the live app this will open file or camera upload.
                  </Text>
                  <StatusBadge label="Pending" />
                </View>
              ))}
            </View>
            <PrimaryButton label="Upload portfolio" onPress={() => setRoute("upload-portfolio")} />
          </>
        ) : null}

        {route === "upload-portfolio" ? (
          <>
            <ScreenHeader
              eyebrow="Step 6 of 7"
              title="Upload portfolio images"
              subtitle="Show customers the quality of your service with a simple gallery."
              onBack={() => setRoute("upload-documents")}
            />
            <GalleryStrip images={providerBookings.map(() => "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80")} />
            <PrimaryButton label="Submit for approval" onPress={() => setRoute("pending-approval")} />
          </>
        ) : null}

        {route === "pending-approval" ? (
          <>
            <ScreenHeader
              eyebrow="Step 7 of 7"
              title="Pending approval"
              subtitle="Your profile is waiting for DELLA admin review before it goes live."
              onBack={() => setRoute("upload-portfolio")}
            />
            <HeroCard
              title="Approval in progress."
              subtitle="Your services, pricing, radius, documents, and portfolio are submitted. Admin review will unlock dashboard access."
              primaryLabel="Open dashboard preview"
              secondaryLabel="Back to login"
              onPrimaryPress={() => setRoute("provider-dashboard")}
              onSecondaryPress={() => setRoute("provider-login")}
            />
          </>
        ) : null}

        {route === "provider-dashboard" ? (
          <>
            <ScreenHeader
              eyebrow="Provider dashboard"
              title="Good afternoon, Aina"
              subtitle="Track bookings, chats, earnings, and service availability in one DELLA workspace."
              onBack={onExit}
              actionLabel="Switch flow"
              onActionPress={onExit}
            />
            <HeroCard
              title="You’re visible to nearby customers."
              subtitle="Your multi-service profile, radius, and pricing are now helping customers discover and book you faster."
              primaryLabel="View bookings"
              secondaryLabel="Open profile"
              onPrimaryPress={() => setRoute("provider-bookings")}
              onSecondaryPress={() => setRoute("provider-profile")}
            />
            <View style={{ flexDirection: "row", gap: 12 }}>
              <MetricCard label="Active bookings" value="12" />
              <MetricCard label="Weekly earnings" value="RM 1.8k" />
              <MetricCard label="Response rate" value="98%" />
            </View>
            <SectionTitle title="Active services" subtitle="What customers can currently book from you." />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {selectedServices.map((service) => (
                <View key={service.id} style={{ width: "48%" }}>
                  <ServiceCard service={service} selected />
                </View>
              ))}
            </View>
          </>
        ) : null}

        {route === "provider-bookings" ? (
          <>
            <ScreenHeader
              eyebrow="Provider bookings"
              title="Your booking queue"
              subtitle="Manage approved jobs, pending confirmations, and completed work."
              onBack={onExit}
            />
            {providerBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </>
        ) : null}

        {route === "provider-chat" ? (
          <>
            <ScreenHeader
              eyebrow="Provider chat"
              title="Customer messages"
              subtitle="Keep job details aligned before and after each visit."
              onBack={onExit}
            />
            {providerChats.map((thread) => (
              <ChatCard key={thread.id} thread={thread} />
            ))}
          </>
        ) : null}

        {route === "earnings" ? (
          <>
            <ScreenHeader
              eyebrow="Earnings"
              title="Track your income"
              subtitle="See monthly growth, payouts, and how each service contributes to earnings."
              onBack={onExit}
            />
            <View style={{ flexDirection: "row", gap: 12 }}>
              <MetricCard label="This month" value="RM 6.4k" />
              <MetricCard label="Pending payout" value="RM 840" />
              <MetricCard label="Avg ticket" value="RM 132" />
            </View>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 24,
                padding: 18,
                borderWidth: 1,
                borderColor: "#DDE7DF",
                gap: 14,
              }}
            >
              {["Home cleaning • RM 2,400", "Babysitting • RM 2,050", "Laundry support • RM 1,950"].map((line) => (
                <Text key={line} style={{ fontSize: 15, color: "#0D1B12", fontWeight: "700" }}>
                  {line}
                </Text>
              ))}
            </View>
          </>
        ) : null}

        {route === "provider-profile" ? (
          <>
            <ScreenHeader
              eyebrow="Provider profile"
              title="Aina Home Care"
              subtitle="How your public provider profile looks inside DELLA."
              onBack={onExit}
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
                <Text style={{ fontSize: 24, fontWeight: "800", color: "#0D1B12" }}>
                  Aina Home Care
                </Text>
                <StatusBadge label="Approved" />
              </View>
              <Text style={{ fontSize: 14, lineHeight: 22, color: "#5A6A61" }}>
                Multi-service home support provider focused on family care, recurring cleaning, and fast communication.
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <MetricCard label="Rating" value="4.9" />
                <MetricCard label="Radius" value={`${radiusKm} km`} />
                <MetricCard label="Experience" value="6 yrs" />
              </View>
            </View>
            <SectionTitle title="Portfolio" subtitle="Public gallery shown to customers" />
            <GalleryStrip
              images={[
                "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
              ]}
            />
          </>
        ) : null}
      </AppScreen>

      {showTabs ? (
        <BottomTabs
          items={[...providerTabs]}
          activeKey={route}
          onPress={(key) => setRoute(key as ProviderRoute)}
        />
      ) : null}
    </View>
  );
}
