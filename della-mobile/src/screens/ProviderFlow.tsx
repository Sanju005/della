import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import {
  AppScreen,
  BookingCard,
  BottomTabs,
  ChatCard,
  MetricCard,
  OutlineField,
  PrimaryButton,
  ScreenHeader,
  SecondaryButton,
  SectionTitle,
  StatusBadge,
} from "../components/ui";
import { providerBookings, providerChats } from "../data/mockData";
import { colors } from "../theme";

type ProviderRoute =
  | "provider-login"
  | "provider-register"
  | "provider-verify"
  | "provider-service-details"
  | "provider-rates"
  | "provider-portfolio"
  | "pending-approval"
  | "provider-dashboard"
  | "provider-bookings"
  | "provider-chat"
  | "earnings"
  | "provider-profile";

type RegistrationStep =
  | "provider-register"
  | "provider-verify"
  | "provider-service-details"
  | "provider-rates"
  | "provider-portfolio";

type ServiceForm = {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  yearsExperience: string;
  specialties: string;
  availability: string;
  location: string;
  radiusKm: string;
  serviceDescription: string;
  perDayRate: string;
  perHourRate: string;
  minimumBookingHours: string;
  payments: string[];
  portfolio: { id: string; title: string; caption: string; image: string }[];
};

const providerTabs = [
  { key: "provider-dashboard", label: "Dashboard", icon: "grid-outline" },
  { key: "provider-bookings", label: "Bookings", icon: "calendar-outline" },
  { key: "provider-chat", label: "Chat", icon: "chatbubbles-outline" },
  { key: "earnings", label: "Earnings", icon: "wallet-outline" },
  { key: "provider-profile", label: "Profile", icon: "person-circle-outline" },
] as const;

const registrationSteps: { key: RegistrationStep; title: string }[] = [
  { key: "provider-register", title: "Personal" },
  { key: "provider-verify", title: "Verify" },
  { key: "provider-service-details", title: "Service" },
  { key: "provider-rates", title: "Rates" },
  { key: "provider-portfolio", title: "Portfolio" },
];

const allPaymentOptions = ["Cash", "QR", "Transfer"] as const;

const premiumCard = {
  backgroundColor: colors.surface,
  borderRadius: 28,
  padding: 18,
  borderWidth: 1,
  borderColor: "rgba(57,230,11,0.12)",
  gap: 14,
} as const;

const providerProfile = {
  firstName: "Amina",
  lastName: "Rahman",
  dateOfBirth: "14 Aug 1991",
  residentialAddress: "Mont Kiara, Kuala Lumpur",
  emailAddress: "amina.provider@della.app",
  phoneNumber: "+60 12-778 4921",
  idNumber: "A33445567",
  profilePhotoLabel: "Provider portrait selected",
  verificationEmail: "amina.provider@della.app",
  verificationPhone: "+60 12-778 4921",
};

const initialServices: ServiceForm[] = [
  {
    id: "chef",
    name: "Chef",
    shortLabel: "chef",
    description: "Private dining, meal prep, event cooking, and home chefs.",
    yearsExperience: "5",
    specialties: "Arabic, Malay",
    availability: "Any time, weekends, 8 AM - 5 PM",
    location: "Mont Kiara, Kuala Lumpur",
    radiusKm: "12",
    serviceDescription:
      "Private chef service for family dining, intimate gatherings, and fresh weekly meal preparation.",
    perDayRate: "100",
    perHourRate: "40",
    minimumBookingHours: "3",
    payments: ["Cash", "QR", "Transfer"],
    portfolio: [
      {
        id: "chef-1",
        title: "Arabic set menu",
        caption: "Mixed grill, saffron rice, and mezze platter for family dinners.",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "chef-2",
        title: "Malay comfort menu",
        caption: "Nasi lemak, ayam rendang, and sambal sides prepared fresh on site.",
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "chef-3",
        title: "Weekend family buffet",
        caption: "Chef-curated buffet line for birthdays and weekend home events.",
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "maid",
    name: "Maid",
    shortLabel: "maid",
    description: "Routine cleaning, deep cleaning, laundry, and home support.",
    yearsExperience: "4",
    specialties: "Deep cleaning, laundry, kitchen reset",
    availability: "Weekdays, 9 AM - 6 PM",
    location: "Sri Hartamas, Kuala Lumpur",
    radiusKm: "10",
    serviceDescription:
      "Reliable home support for recurring cleaning, laundry care, guest-ready setup, and kitchen organization.",
    perDayRate: "120",
    perHourRate: "35",
    minimumBookingHours: "4",
    payments: ["Cash", "Transfer"],
    portfolio: [
      {
        id: "maid-1",
        title: "Living room refresh",
        caption: "Deep-cleaned living room setup with polished surfaces and organized styling.",
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "maid-2",
        title: "Bedroom reset",
        caption: "Fresh linen change, wardrobe reset, and tidy bedroom finishing.",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "maid-3",
        title: "Kitchen detailing",
        caption: "Countertop sanitation, sink treatment, and appliance wipe-down service.",
        image:
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];

function RegistrationProgress({ route }: { route: RegistrationStep }) {
  const currentIndex = registrationSteps.findIndex((step) => step.key === route);

  return (
    <View style={{ ...premiumCard, padding: 16, gap: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 12, fontWeight: "800", letterSpacing: 1.1, color: colors.brandDark }}>
          PROVIDER APPLICATION
        </Text>
        <Text style={{ fontSize: 13, fontWeight: "700", color: colors.slate }}>
          Step {currentIndex + 1} of {registrationSteps.length}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {registrationSteps.map((step, index) => (
          <View
            key={step.key}
            style={{
              flex: 1,
              height: 8,
              borderRadius: 999,
              backgroundColor: index <= currentIndex ? colors.brand : "#E4EDE6",
            }}
          />
        ))}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
        {registrationSteps.map((step) => (
          <Text
            key={step.key}
            style={{ flex: 1, fontSize: 11, fontWeight: "700", color: route === step.key ? colors.ink : "#7B8B82" }}
          >
            {step.title}
          </Text>
        ))}
      </View>
    </View>
  );
}

function PremiumHero({
  eyebrow,
  title,
  subtitle,
  status,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  status?: string;
}) {
  return (
    <View
      style={{
        borderRadius: 32,
        padding: 22,
        overflow: "hidden",
        backgroundColor: "#132610",
        gap: 12,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: -30,
          right: -20,
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: "rgba(57,230,11,0.15)",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: -55,
          left: -15,
          width: 170,
          height: 170,
          borderRadius: 85,
          backgroundColor: "rgba(57,230,11,0.12)",
        }}
      />
      <Text style={{ fontSize: 12, fontWeight: "800", letterSpacing: 1.2, color: "#B7FF9F" }}>{eyebrow}</Text>
      <Text style={{ fontSize: 30, lineHeight: 36, fontWeight: "900", color: "white", maxWidth: 300 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 15, lineHeight: 23, color: "#D2E2D5", maxWidth: 320 }}>{subtitle}</Text>
      {status ? (
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 999,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 12, fontWeight: "800" }}>{status}</Text>
        </View>
      ) : null}
    </View>
  );
}

function FeatureRow({
  icon,
  title,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string;
}) {
  return (
    <View style={{ ...premiumCard, flexDirection: "row", alignItems: "flex-start" }}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 18,
          backgroundColor: colors.brandSoft,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={icon} size={22} color={colors.brandDark} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>{title}</Text>
        <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{text}</Text>
      </View>
    </View>
  );
}

function VerificationCard({
  title,
  subtitle,
  icon,
  status,
}: {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  status: string;
}) {
  return (
    <View style={premiumCard}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}>
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 16,
              backgroundColor: colors.brandSoft,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name={icon} size={22} color={colors.brandDark} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>{title}</Text>
            <Text style={{ fontSize: 13, lineHeight: 20, color: colors.slate }}>{subtitle}</Text>
          </View>
        </View>
        <StatusBadge label={status} />
      </View>
    </View>
  );
}

function ServiceChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 999,
        backgroundColor: active ? colors.brand : colors.surface,
        borderWidth: 1,
        borderColor: active ? colors.brand : "#DDE7DF",
      }}
    >
      <Text style={{ color: active ? colors.ink : colors.slate, fontSize: 13, fontWeight: "800" }}>{label}</Text>
    </Pressable>
  );
}

function PaymentToggle({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 999,
        backgroundColor: active ? colors.brand : colors.surface,
        borderWidth: 1,
        borderColor: active ? colors.brand : "#DDE7DF",
      }}
    >
      <Text style={{ color: active ? colors.ink : colors.slate, fontSize: 13, fontWeight: "800" }}>{label}</Text>
    </Pressable>
  );
}

function PortfolioCard({
  title,
  caption,
  image,
}: {
  title: string;
  caption: string;
  image: string;
}) {
  return (
    <View style={{ ...premiumCard, padding: 14 }}>
      <Image source={{ uri: image }} style={{ width: "100%", height: 190, borderRadius: 22 }} />
      <View style={{ gap: 4 }}>
        <Text style={{ fontSize: 17, fontWeight: "800", color: colors.ink }}>{title}</Text>
        <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{caption}</Text>
      </View>
    </View>
  );
}

function ServiceSection({
  service,
  onChange,
}: {
  service: ServiceForm;
  onChange: (field: keyof ServiceForm, value: string) => void;
}) {
  return (
    <View style={premiumCard}>
      <View style={{ gap: 4 }}>
        <Text style={{ fontSize: 21, fontWeight: "900", color: colors.ink }}>{service.name}</Text>
        <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{service.description}</Text>
      </View>
      <OutlineField
        label={`${service.name} Years of Experience`}
        placeholder="Years of Experience"
        value={service.yearsExperience}
        onChangeText={(value) => onChange("yearsExperience", value)}
      />
      <OutlineField
        label={`${service.name} Specialties`}
        placeholder={service.id === "chef" ? "Arabic, Malay" : "Deep cleaning, laundry"}
        value={service.specialties}
        onChangeText={(value) => onChange("specialties", value)}
      />
      <OutlineField
        label={`${service.name} Availability`}
        placeholder="Availability"
        value={service.availability}
        onChangeText={(value) => onChange("availability", value)}
      />
      <OutlineField
        label={`${service.name} Location`}
        placeholder="Location"
        value={service.location}
        onChangeText={(value) => onChange("location", value)}
      />
      <OutlineField
        label={`${service.name} Service Radius (km)`}
        placeholder="Radius"
        value={service.radiusKm}
        onChangeText={(value) => onChange("radiusKm", value)}
      />
      <OutlineField
        label={`${service.name} Service Description`}
        placeholder="Describe the service"
        value={service.serviceDescription}
        onChangeText={(value) => onChange("serviceDescription", value)}
        multiline
      />
    </View>
  );
}

function RatesSection({
  service,
  onChange,
  onTogglePayment,
}: {
  service: ServiceForm;
  onChange: (field: keyof ServiceForm, value: string) => void;
  onTogglePayment: (payment: string) => void;
}) {
  return (
    <View style={premiumCard}>
      <Text style={{ fontSize: 21, fontWeight: "900", color: colors.ink }}>{service.name} pricing</Text>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <OutlineField
            label="Per Day Start From (RM)"
            placeholder="100"
            value={service.perDayRate}
            onChangeText={(value) => onChange("perDayRate", value)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <OutlineField
            label="Per Hour Start From (RM)"
            placeholder="40"
            value={service.perHourRate}
            onChangeText={(value) => onChange("perHourRate", value)}
          />
        </View>
      </View>
      <OutlineField
        label="Minimum Booking Hours"
        placeholder="3"
        value={service.minimumBookingHours}
        onChangeText={(value) => onChange("minimumBookingHours", value)}
      />
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 13, fontWeight: "700", color: colors.ink }}>Accepted payment methods</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {allPaymentOptions.map((option) => (
            <PaymentToggle
              key={`${service.id}-${option}`}
              label={option}
              active={service.payments.includes(option)}
              onPress={() => onTogglePayment(option)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

export function ProviderFlow({ onExit }: { onExit: () => void }) {
  const [route, setRoute] = useState<ProviderRoute>("provider-login");
  const [form, setForm] = useState(providerProfile);
  const [enabledServiceIds, setEnabledServiceIds] = useState<string[]>(["chef", "maid"]);
  const [serviceForms, setServiceForms] = useState<ServiceForm[]>(initialServices);

  const activeServices = useMemo(
    () => serviceForms.filter((service) => enabledServiceIds.includes(service.id)),
    [enabledServiceIds, serviceForms],
  );

  const showTabs =
    route === "provider-dashboard" ||
    route === "provider-bookings" ||
    route === "provider-chat" ||
    route === "earnings" ||
    route === "provider-profile";

  function updateField(field: keyof typeof providerProfile, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleService(serviceId: string) {
    setEnabledServiceIds((current) =>
      current.includes(serviceId) ? current.filter((value) => value !== serviceId) : [...current, serviceId],
    );
  }

  function updateService(serviceId: string, field: keyof ServiceForm, value: string) {
    setServiceForms((current) =>
      current.map((service) => (service.id === serviceId ? { ...service, [field]: value } : service)),
    );
  }

  function toggleServicePayment(serviceId: string, payment: string) {
    setServiceForms((current) =>
      current.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              payments: service.payments.includes(payment)
                ? service.payments.filter((item) => item !== payment)
                : [...service.payments, payment],
            }
          : service,
      ),
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AppScreen contentContainerStyle={showTabs ? { paddingBottom: 130 } : undefined}>
        {route === "provider-login" ? (
          <>
            <ScreenHeader
              eyebrow="Provider app"
              title="Build a premium provider profile"
              subtitle="Register first, verify phone and email, then upload each service with its own details, pricing, and images."
              onBack={onExit}
            />
            <PremiumHero
              eyebrow="DELLA PROVIDER"
              title="Verify first, then upload services with confidence."
              subtitle="Providers complete identity and contact setup first, receive a verified message, then continue building chef, maid, and other service profiles."
            />
            <FeatureRow
              icon="shield-checkmark-outline"
              title="Early verification flow"
              text="Phone number and email are verified before service creation so the provider can continue with a trusted account."
            />
            <FeatureRow
              icon="images-outline"
              title="Per-service setup"
              text="Each service gets its own details, pricing card, and 3-image portfolio with captions."
            />
            <OutlineField
              label="Email Address"
              placeholder="provider@della.app"
              value={form.emailAddress}
              onChangeText={(value) => updateField("emailAddress", value)}
            />
            <OutlineField label="Password" placeholder="Password" value="password123" />
            <PrimaryButton label="Start provider registration" onPress={() => setRoute("provider-register")} />
            <SecondaryButton label="Open dashboard preview" onPress={() => setRoute("provider-dashboard")} />
          </>
        ) : null}

        {route === "provider-register" ? (
          <>
            <ScreenHeader
              eyebrow="Provider registration"
              title="Personal information"
              subtitle="Set up the provider identity before moving into phone and email verification."
              onBack={() => setRoute("provider-login")}
            />
            <RegistrationProgress route={route} />
            <PremiumHero
              eyebrow="STEP 1"
              title="Set up the person behind the services"
              subtitle="Start with profile photo, contact information, residential address, and IC or passport number."
            />
            <View style={premiumCard}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Profile photo</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
                  }}
                  style={{ width: 88, height: 88, borderRadius: 26 }}
                />
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ fontSize: 15, fontWeight: "800", color: colors.ink }}>{form.profilePhotoLabel}</Text>
                  <Text style={{ fontSize: 13, lineHeight: 20, color: colors.slate }}>
                    Use a clear portrait with bright lighting and a professional appearance.
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <OutlineField
                  label="First Name"
                  placeholder="First Name"
                  value={form.firstName}
                  onChangeText={(value) => updateField("firstName", value)}
                />
              </View>
              <View style={{ flex: 1 }}>
                <OutlineField
                  label="Last Name"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChangeText={(value) => updateField("lastName", value)}
                />
              </View>
            </View>
            <OutlineField
              label="Date of Birth"
              placeholder="DD MMM YYYY"
              value={form.dateOfBirth}
              onChangeText={(value) => updateField("dateOfBirth", value)}
            />
            <OutlineField
              label="Residential Address"
              placeholder="Residential Address"
              value={form.residentialAddress}
              onChangeText={(value) => updateField("residentialAddress", value)}
              multiline
            />
            <OutlineField
              label="Email Address"
              placeholder="Email Address"
              value={form.emailAddress}
              onChangeText={(value) => updateField("emailAddress", value)}
            />
            <OutlineField
              label="Phone Number"
              placeholder="+60"
              value={form.phoneNumber}
              onChangeText={(value) => updateField("phoneNumber", value)}
            />
            <OutlineField
              label="IC / Passport Number"
              placeholder="IC / Passport Number"
              value={form.idNumber}
              onChangeText={(value) => updateField("idNumber", value)}
            />
            <PrimaryButton label="Continue to verification" onPress={() => setRoute("provider-verify")} />
          </>
        ) : null}

        {route === "provider-verify" ? (
          <>
            <ScreenHeader
              eyebrow="Provider registration"
              title="Verify phone and email"
              subtitle="The provider must verify contact details first, then receives an email confirming they can start uploading services."
              onBack={() => setRoute("provider-register")}
            />
            <RegistrationProgress route={route} />
            <PremiumHero
              eyebrow="STEP 2"
              title="Now verify before creating services"
              subtitle="Once phone and email are confirmed, the provider receives a message saying they are verified and can upload services."
              status="Ready to verify"
            />
            <VerificationCard
              title="Phone verification"
              subtitle="Send OTP to the registered phone number and confirm the provider is reachable."
              icon="call-outline"
              status="Verified"
            />
            <OutlineField
              label="Verified Phone Number"
              placeholder="+60"
              value={form.verificationPhone}
              onChangeText={(value) => updateField("verificationPhone", value)}
            />
            <VerificationCard
              title="Email verification"
              subtitle="Send a verification link to the provider's email address before they upload services."
              icon="mail-outline"
              status="Verified"
            />
            <OutlineField
              label="Verified Email"
              placeholder="Email address"
              value={form.verificationEmail}
              onChangeText={(value) => updateField("verificationEmail", value)}
            />
            <View style={premiumCard}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Verification result email</Text>
              <Text style={{ fontSize: 14, lineHeight: 22, color: colors.slate }}>
                Email message: "Now you are verified, you can upload your services."
              </Text>
              <StatusBadge label="Verified" />
            </View>
            <PrimaryButton label="Continue to create services" onPress={() => setRoute("provider-service-details")} />
          </>
        ) : null}

        {route === "provider-service-details" ? (
          <>
            <ScreenHeader
              eyebrow="Provider registration"
              title="Create services"
              subtitle="No service browse card here. Just enable the services this provider offers, then fill the full details for each one."
              onBack={() => setRoute("provider-verify")}
            />
            <RegistrationProgress route={route} />
            <View style={premiumCard}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Create services</Text>
              <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>
                Start with chef, then add another service like maid. Each service must have its own full details.
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                {initialServices.map((service) => (
                  <ServiceChip
                    key={service.id}
                    label={service.name}
                    active={enabledServiceIds.includes(service.id)}
                    onPress={() => toggleService(service.id)}
                  />
                ))}
              </View>
            </View>
            {activeServices.map((service) => (
              <ServiceSection
                key={service.id}
                service={service}
                onChange={(field, value) => updateService(service.id, field, value)}
              />
            ))}
            <PrimaryButton label="Continue to pricing" onPress={() => setRoute("provider-rates")} />
          </>
        ) : null}

        {route === "provider-rates" ? (
          <>
            <ScreenHeader
              eyebrow="Provider registration"
              title="Per-service pricing"
              subtitle="Chef gets one pricing card, maid gets another, and each service keeps its own accepted payment methods."
              onBack={() => setRoute("provider-service-details")}
            />
            <RegistrationProgress route={route} />
            {activeServices.map((service) => (
              <RatesSection
                key={service.id}
                service={service}
                onChange={(field, value) => updateService(service.id, field, value)}
                onTogglePayment={(payment) => toggleServicePayment(service.id, payment)}
              />
            ))}
            <PrimaryButton label="Continue to portfolio" onPress={() => setRoute("provider-portfolio")} />
          </>
        ) : null}

        {route === "provider-portfolio" ? (
          <>
            <ScreenHeader
              eyebrow="Provider registration"
              title="Per-service images and descriptions"
              subtitle="Each service now gets 3 images with captions. Chef has three, maid has three, and more services can follow the same pattern."
              onBack={() => setRoute("provider-rates")}
            />
            <RegistrationProgress route={route} />
            {activeServices.map((service) => (
              <View key={service.id} style={{ gap: 12 }}>
                <View style={premiumCard}>
                  <Text style={{ fontSize: 21, fontWeight: "900", color: colors.ink }}>{service.name} portfolio</Text>
                  <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>
                    {service.name} has three image slots with a title and description for each example.
                  </Text>
                </View>
                {service.portfolio.map((item) => (
                  <PortfolioCard key={item.id} title={item.title} caption={item.caption} image={item.image} />
                ))}
              </View>
            ))}
            <View style={premiumCard}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Admin approval status</Text>
              <Text style={{ fontSize: 14, lineHeight: 22, color: colors.slate }}>
                After the provider submits these services, admin reviews the profile and can approve, reject, or ask for extra documents.
              </Text>
              <StatusBadge label="Pending" />
            </View>
            <PrimaryButton label="Submit provider application" onPress={() => setRoute("pending-approval")} />
          </>
        ) : null}

        {route === "pending-approval" ? (
          <>
            <ScreenHeader
              eyebrow="Application submitted"
              title="Submitted for admin review"
              subtitle="The provider already verified phone and email, then uploaded services, pricing, and images. Now the application waits for admin approval."
              onBack={() => setRoute("provider-portfolio")}
            />
            <PremiumHero
              eyebrow="STATUS"
              title="Your provider application has been submitted."
              subtitle="You are verified. Your services have been uploaded successfully. You will receive an email or in-app notification when your application is approved or if we need extra documents."
              status="Pending Review"
            />
            <FeatureRow
              icon="mail-outline"
              title="Verified email already sent"
              text={`A verification email was sent to ${form.verificationEmail} with the message that the provider can now upload services.`}
            />
            <FeatureRow
              icon="restaurant-outline"
              title="Service packages uploaded"
              text={`${activeServices.map((service) => service.name).join(" and ")} now each include service details, dedicated pricing, and three image examples with captions.`}
            />
            <FeatureRow
              icon="notifications-outline"
              title="Approval updates come next"
              text="Admin can approve the application or request extra documents through email and in-app notifications."
            />
            <PrimaryButton label="Open provider dashboard preview" onPress={() => setRoute("provider-dashboard")} />
            <SecondaryButton label="Back to provider login" onPress={() => setRoute("provider-login")} />
          </>
        ) : null}

        {route === "provider-dashboard" ? (
          <>
            <ScreenHeader
              eyebrow="Provider dashboard"
              title={`Welcome back, ${form.firstName}`}
              subtitle="Preview of the provider account after verification and service submission."
              onBack={onExit}
              actionLabel="Switch flow"
              onActionPress={onExit}
            />
            <PremiumHero
              eyebrow="APPLICATION STATUS"
              title="Verified account, services under review"
              subtitle="Phone and email are verified, and every enabled service package is waiting for admin approval."
              status="Pending Review"
            />
            <View style={{ flexDirection: "row", gap: 12 }}>
              <MetricCard label="Services" value={String(activeServices.length)} />
              <MetricCard label="Email" value="Verified" />
              <MetricCard label="Phone" value="Verified" />
            </View>
            <SectionTitle title="Service review summary" subtitle="Each service is reviewed as part of the provider application." />
            {activeServices.map((service) => (
              <FeatureRow
                key={service.id}
                icon={service.id === "chef" ? "restaurant-outline" : "sparkles-outline"}
                title={`${service.name} package ready`}
                text={`${service.yearsExperience} years experience, RM ${service.perHourRate}/hour, minimum ${service.minimumBookingHours} hours, accepting ${service.payments.join(", ")}.`}
              />
            ))}
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
              title="Projected earnings"
              subtitle="Preview how separate service pricing could perform once the profile is approved and live."
              onBack={onExit}
            />
            {activeServices.map((service) => (
              <View key={service.id} style={premiumCard}>
                <Text style={{ fontSize: 18, fontWeight: "800", color: colors.ink }}>{service.name}</Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <MetricCard label="Per day" value={`RM ${service.perDayRate}`} />
                  <MetricCard label="Per hour" value={`RM ${service.perHourRate}`} />
                  <MetricCard label="Minimum" value={`${service.minimumBookingHours} hrs`} />
                </View>
              </View>
            ))}
          </>
        ) : null}

        {route === "provider-profile" ? (
          <>
            <ScreenHeader
              eyebrow="Provider profile"
              title={`${form.firstName} ${form.lastName}`}
              subtitle="Preview of the premium provider profile shown inside DELLA."
              onBack={onExit}
            />
            <View style={{ ...premiumCard, padding: 20 }}>
              <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
                  }}
                  style={{ width: 90, height: 90, borderRadius: 28 }}
                />
                <View style={{ flex: 1, gap: 4 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 23, fontWeight: "800", color: colors.ink }}>{`${form.firstName} ${form.lastName}`}</Text>
                    <StatusBadge label="Pending" />
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: colors.brandDark }}>Phone and email verified</Text>
                  <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{form.residentialAddress}</Text>
                </View>
              </View>
            </View>
            <SectionTitle title="Active service packages" subtitle="Each service keeps its own details, pricing, and image examples." />
            {activeServices.map((service) => (
              <View key={service.id} style={premiumCard}>
                <Text style={{ fontSize: 20, fontWeight: "900", color: colors.ink }}>{service.name}</Text>
                <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{service.serviceDescription}</Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <MetricCard label="Experience" value={`${service.yearsExperience} yrs`} />
                  <MetricCard label="Radius" value={`${service.radiusKm} km`} />
                  <MetricCard label="Per hour" value={`RM ${service.perHourRate}`} />
                </View>
              </View>
            ))}
          </>
        ) : null}
      </AppScreen>

      {showTabs ? (
        <BottomTabs items={[...providerTabs]} activeKey={route} onPress={(key) => setRoute(key as ProviderRoute)} />
      ) : null}
    </View>
  );
}
