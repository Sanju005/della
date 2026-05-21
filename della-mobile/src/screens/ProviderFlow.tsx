import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import {
  buildProviderAssetPath,
  getEmailVerificationStatus,
  type LocalUploadAsset,
  sendEmailVerification,
  sendPhoneOtp,
  submitProviderApplication,
  uploadLocalAssetToStorage,
  verifyPhoneOtp,
} from "../lib/providerApplications";
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

type PortfolioItem = {
  id: string;
  title: string;
  caption: string;
  image: string;
  imageAsset?: LocalUploadAsset | null;
};

type AvailabilityMode = "Always available" | "9 to 5" | "Weekends only";

type ServiceForm = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  shortLabel: string;
  description: string;
  yearsExperience: string;
  specialties: string;
  radiusKm: string;
  serviceDescription: string;
  perHourRate: string;
  minimumBookingHours: string;
  payments: string[];
  availabilityModes: AvailabilityMode[];
  certificatesLabel: string;
  certificateAsset?: LocalUploadAsset | null;
  drivingLicenseLabel?: string;
  drivingLicenseAsset?: LocalUploadAsset | null;
  portfolio: PortfolioItem[];
};

type SubmissionState = "idle" | "submitting" | "success" | "error";
type PhoneVerificationState = "idle" | "sending" | "code_sent" | "verifying" | "verified" | "error";
type EmailVerificationState = "idle" | "sending" | "sent" | "checking" | "verified" | "error";

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

const demoProfilePhotoUrl =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80";

function createPortfolioSlots(serviceId: string): PortfolioItem[] {
  return Array.from({ length: 3 }, (_, index) => ({
    id: `${serviceId}-portfolio-${index + 1}`,
    title: "",
    caption: "",
    image: "",
    imageAsset: null,
  }));
}

const providerProfile = {
  firstName: "Amina",
  lastName: "Rahman",
  dateOfBirth: "14 Aug 1991",
  residentialAddress: "Mont Kiara, Kuala Lumpur",
  currentLocation: "Mont Kiara, Kuala Lumpur",
  emailAddress: "amina.provider@della.app",
  phoneNumber: "+60 12-778 4921",
  idNumber: "A33445567",
  profilePhotoLabel: "No profile photo selected yet",
  verificationEmail: "amina.provider@della.app",
  verificationPhone: "+60 12-778 4921",
};

const serviceTemplates: ServiceForm[] = [
  {
    id: "chef",
    name: "Chef",
    icon: "restaurant-outline",
    shortLabel: "chef",
    description: "Private dining, meal prep, event cooking, and home chefs.",
    yearsExperience: "5",
    specialties: "Arabic, Malay",
    radiusKm: "12",
    serviceDescription:
      "Private chef service for family dining, intimate gatherings, and fresh weekly meal preparation.",
    perHourRate: "40",
    minimumBookingHours: "3",
    payments: ["Cash", "QR", "Transfer"],
    availabilityModes: ["Always available", "9 to 5", "Weekends only"],
    certificatesLabel: "Food handling certificate",
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
    icon: "sparkles-outline",
    shortLabel: "maid",
    description: "Routine cleaning, deep cleaning, laundry, and home support.",
    yearsExperience: "4",
    specialties: "Deep cleaning, laundry, kitchen reset",
    radiusKm: "10",
    serviceDescription:
      "Reliable home support for recurring cleaning, laundry care, guest-ready setup, and kitchen organization.",
    perHourRate: "35",
    minimumBookingHours: "4",
    payments: ["Cash", "Transfer"],
    availabilityModes: ["9 to 5"],
    certificatesLabel: "Housekeeping certificate",
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
  {
    id: "tutor",
    name: "Tutor",
    icon: "school-outline",
    shortLabel: "tutor",
    description: "Home tuition, exam coaching, language, and skills classes.",
    yearsExperience: "3",
    specialties: "Maths, English, homework coaching",
    radiusKm: "8",
    serviceDescription:
      "Personalized home tuition and guided learning sessions for primary and secondary students.",
    perHourRate: "60",
    minimumBookingHours: "2",
    payments: ["Transfer", "QR"],
    availabilityModes: ["9 to 5", "Weekends only"],
    certificatesLabel: "Teaching certificate",
    portfolio: [
      {
        id: "tutor-1",
        title: "Math coaching session",
        caption: "One-to-one maths support with personalized worksheets and practice flow.",
        image:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "tutor-2",
        title: "Homework support desk",
        caption: "Structured after-school study support focused on consistency and confidence.",
        image:
          "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "tutor-3",
        title: "Reading and language guidance",
        caption: "Calm guided language coaching for comprehension, grammar, and speaking practice.",
        image:
          "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "plumber",
    name: "Plumber",
    icon: "water-outline",
    shortLabel: "plumber",
    description: "Leaks, fittings, installations, and urgent repair support.",
    yearsExperience: "6",
    specialties: "Pipe repair, fittings, water heater support",
    radiusKm: "14",
    serviceDescription: "Responsive plumbing support for urgent repairs, installations, and maintenance jobs.",
    perHourRate: "55",
    minimumBookingHours: "2",
    payments: ["Cash", "Transfer"],
    availabilityModes: ["Always available", "9 to 5"],
    certificatesLabel: "Trade certificate",
    portfolio: [
      {
        id: "plumber-1",
        title: "Kitchen sink repair",
        caption: "Leak inspection and under-sink fitting replacement service.",
        image:
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "plumber-2",
        title: "Bathroom fixture install",
        caption: "Clean installation of shower and tap fittings for condo units.",
        image:
          "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "plumber-3",
        title: "Water heater servicing",
        caption: "Preventive servicing and troubleshooting for home water heaters.",
        image:
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "electrician",
    name: "Electrician",
    icon: "flash-outline",
    shortLabel: "electrician",
    description: "Wiring, lighting, sockets, appliances, and troubleshooting.",
    yearsExperience: "7",
    specialties: "Lighting, switches, rewiring",
    radiusKm: "16",
    serviceDescription: "Certified electrical support for residential troubleshooting and installation work.",
    perHourRate: "65",
    minimumBookingHours: "2",
    payments: ["Cash", "Transfer", "QR"],
    availabilityModes: ["Always available", "9 to 5"],
    certificatesLabel: "Electrical certificate",
    portfolio: [
      {
        id: "electrician-1",
        title: "Lighting installation",
        caption: "Ceiling light replacement and fixture alignment for modern interiors.",
        image:
          "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "electrician-2",
        title: "Switch panel repair",
        caption: "Safe troubleshooting and replacement for damaged wall switch panels.",
        image:
          "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "electrician-3",
        title: "Appliance power check",
        caption: "Electrical testing and socket inspection for home appliance issues.",
        image:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "driver",
    name: "Driver",
    icon: "car-sport-outline",
    shortLabel: "driver",
    description: "On-demand rides, private drivers, and errand transport.",
    yearsExperience: "8",
    specialties: "Private rides, family transport, airport transfer",
    radiusKm: "20",
    serviceDescription: "Professional driving support for school runs, airport transfers, and private bookings.",
    perHourRate: "45",
    minimumBookingHours: "2",
    payments: ["Cash", "Transfer", "QR"],
    availabilityModes: ["Always available", "Weekends only"],
    certificatesLabel: "PSV or transport certificate",
    drivingLicenseLabel: "Class D driving license uploaded",
    portfolio: [
      {
        id: "driver-1",
        title: "Airport transfer service",
        caption: "Comfortable point-to-point airport support with luggage assistance.",
        image:
          "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "driver-2",
        title: "Private family transport",
        caption: "Safe and punctual transport for family errands and appointments.",
        image:
          "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "driver-3",
        title: "Weekend booking route",
        caption: "Flexible hourly bookings for weekend transport and waiting service.",
        image:
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    id: "babysitter",
    name: "Baby Sitter",
    icon: "happy-outline",
    shortLabel: "babysitter",
    description: "Trusted childcare, after-school support, and family care.",
    yearsExperience: "5",
    specialties: "After-school care, toddler support, bedtime routine",
    radiusKm: "9",
    serviceDescription: "Warm and reliable childcare support for families needing trusted in-home help.",
    perHourRate: "38",
    minimumBookingHours: "3",
    payments: ["Cash", "Transfer"],
    availabilityModes: ["9 to 5", "Weekends only"],
    certificatesLabel: "Childcare certificate",
    portfolio: [
      {
        id: "babysitter-1",
        title: "Creative play session",
        caption: "Structured play and learning support for preschool children.",
        image:
          "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "babysitter-2",
        title: "Reading and homework time",
        caption: "After-school routine with reading and basic homework guidance.",
        image:
          "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "babysitter-3",
        title: "Evening care routine",
        caption: "Calm support for meals, bath time, and bedtime preparation.",
        image:
          "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];

function parseNullableNumber(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

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
      <Text style={{ fontSize: 30, lineHeight: 36, fontWeight: "900", color: "white", maxWidth: 310 }}>
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

function MessageCard({
  tone,
  title,
  text,
}: {
  tone: "error" | "success" | "info";
  title: string;
  text: string;
}) {
  const backgroundColor =
    tone === "error" ? "#FFF3F3" : tone === "success" ? "#F1FBEA" : "#F7FBF5";
  const borderColor =
    tone === "error" ? "#F1C7C7" : tone === "success" ? "#CDEAB7" : "#DDE7DF";
  const titleColor = tone === "error" ? "#A63F3F" : colors.ink;

  return (
    <View
      style={{
        borderRadius: 22,
        padding: 16,
        backgroundColor,
        borderWidth: 1,
        borderColor,
        gap: 6,
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: "800", color: titleColor }}>{title}</Text>
      <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{text}</Text>
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

function ServiceAddButton({ onPress, open }: { onPress: () => void; open: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 52,
        height: 52,
        borderRadius: 18,
        backgroundColor: colors.brandSoft,
        borderWidth: 1,
        borderColor: "rgba(57,230,11,0.22)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name={open ? "close" : "add"} size={24} color={colors.brandDark} />
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

function AvailabilityOption({
  label,
  active,
  onPress,
}: {
  label: AvailabilityMode;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 7,
          borderWidth: 1.5,
          borderColor: active ? colors.brandDark : "#BCC9BE",
          backgroundColor: active ? colors.brandSoft : colors.surface,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {active ? <Ionicons name="checkmark" size={14} color={colors.brandDark} /> : null}
      </View>
      <Text style={{ fontSize: 14, fontWeight: "700", color: colors.ink }}>{label}</Text>
    </Pressable>
  );
}

function SelectedServiceCard({ service }: { service: ServiceForm }) {
  return (
    <View style={{ ...premiumCard, flexDirection: "row", alignItems: "center", gap: 14 }}>
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: 18,
          backgroundColor: colors.brandSoft,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={service.icon} size={24} color={colors.brandDark} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: "800", color: colors.ink }}>{service.name}</Text>
        <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{service.description}</Text>
      </View>
    </View>
  );
}

function UploadPickerCard({
  title,
  subtitle,
  selectedLabel,
  actionLabel,
  onPress,
}: {
  title: string;
  subtitle: string;
  selectedLabel?: string | null;
  actionLabel: string;
  onPress: () => void;
}) {
  return (
    <View style={{ ...premiumCard, padding: 14, backgroundColor: "#F8FBF6" }}>
      <View style={{ gap: 4 }}>
        <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>{title}</Text>
        <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{subtitle}</Text>
      </View>
      <Text style={{ fontSize: 13, fontWeight: "700", color: colors.brandDark }}>
        {selectedLabel || "No file selected yet"}
      </Text>
      <PrimaryButton label={actionLabel} onPress={onPress} small />
    </View>
  );
}

function ServiceSection({
  service,
  providerLocation,
  onChange,
  onToggleAvailability,
  onRemove,
  onPickCertificate,
  onPickDrivingLicense,
}: {
  service: ServiceForm;
  providerLocation: string;
  onChange: (field: keyof ServiceForm, value: string) => void;
  onToggleAvailability: (label: AvailabilityMode) => void;
  onRemove: () => void;
  onPickCertificate: () => void;
  onPickDrivingLicense: () => void;
}) {
  return (
    <View style={premiumCard}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={{ fontSize: 21, fontWeight: "900", color: colors.ink }}>{service.name}</Text>
          <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{service.description}</Text>
        </View>
        <Pressable
          onPress={onRemove}
          style={{
            width: 42,
            height: 42,
            borderRadius: 16,
            backgroundColor: "#FFF6F6",
            borderWidth: 1,
            borderColor: "#F1D5D5",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="trash-outline" size={18} color="#B44747" />
        </Pressable>
      </View>
      <OutlineField
        label={`${service.name} Years of Experience`}
        placeholder="Years of Experience"
        value={service.yearsExperience}
        onChangeText={(value) => onChange("yearsExperience", value)}
      />
      <OutlineField
        label={`${service.name} Specialties`}
        placeholder={service.id === "chef" ? "Arabic, Malay" : "Describe this service specialty"}
        value={service.specialties}
        onChangeText={(value) => onChange("specialties", value)}
      />
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 13, fontWeight: "700", color: colors.ink }}>{service.name} Availability</Text>
        <AvailabilityOption
          label="Always available"
          active={service.availabilityModes.includes("Always available")}
          onPress={() => onToggleAvailability("Always available")}
        />
        <AvailabilityOption
          label="9 to 5"
          active={service.availabilityModes.includes("9 to 5")}
          onPress={() => onToggleAvailability("9 to 5")}
        />
        <AvailabilityOption
          label="Weekends only"
          active={service.availabilityModes.includes("Weekends only")}
          onPress={() => onToggleAvailability("Weekends only")}
        />
      </View>
      <View style={{ ...premiumCard, padding: 14, backgroundColor: "#F8FBF6" }}>
        <Text style={{ fontSize: 13, fontWeight: "700", color: colors.ink }}>Current provider location</Text>
        <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{providerLocation}</Text>
      </View>
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
      {service.id === "driver" ? (
        <UploadPickerCard
          title="Driving license"
          subtitle="Required for driver service."
          selectedLabel={service.drivingLicenseAsset?.name ?? service.drivingLicenseLabel ?? null}
          actionLabel={service.drivingLicenseAsset ? "Replace driving license" : "Upload driving license"}
          onPress={onPickDrivingLicense}
        />
      ) : null}
      <OutlineField
        label={`${service.name} Certificate Note (Optional)`}
        placeholder="Food handling certificate, childcare course, trade cert..."
        value={service.certificatesLabel}
        onChangeText={(value) => onChange("certificatesLabel", value)}
      />
      <UploadPickerCard
        title="Optional certificates"
        subtitle="Upload a supporting certificate only if you want to show one for this service."
        selectedLabel={service.certificateAsset?.name ?? null}
        actionLabel={service.certificateAsset ? "Replace certificate" : "Upload certificate"}
        onPress={onPickCertificate}
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
      <OutlineField
        label="Per Hour Start From (RM)"
        placeholder="40"
        value={service.perHourRate}
        onChangeText={(value) => onChange("perHourRate", value)}
      />
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

function PortfolioCard({
  item,
  serviceName,
  index,
  onChange,
  onPickImage,
}: {
  item: PortfolioItem;
  serviceName: string;
  index: number;
  onChange: (field: "title" | "caption", value: string) => void;
  onPickImage: () => void;
}) {
  return (
    <View style={{ ...premiumCard, padding: 14 }}>
      <Text style={{ fontSize: 17, fontWeight: "800", color: colors.ink }}>
        {serviceName} image {index + 1}
      </Text>
      {item.image ? (
        <Image source={{ uri: item.image }} style={{ width: "100%", height: 190, borderRadius: 22 }} />
      ) : (
        <View
          style={{
            height: 190,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: "#DDE7DF",
            backgroundColor: "#F8FBF6",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Ionicons name="image-outline" size={30} color={colors.brandDark} />
          <Text style={{ fontSize: 14, color: colors.slate }}>No image selected yet</Text>
        </View>
      )}
      <PrimaryButton
        label={item.imageAsset ? "Replace image" : "Choose image"}
        onPress={onPickImage}
        small
      />
      <OutlineField
        label="Title"
        placeholder="Arabic dish, deep clean result, airport transfer..."
        value={item.title}
        onChangeText={(value) => onChange("title", value)}
      />
      <OutlineField
        label="Description"
        placeholder="Describe what this image shows"
        value={item.caption}
        onChangeText={(value) => onChange("caption", value)}
        multiline
      />
    </View>
  );
}

export function ProviderFlow({ onExit }: { onExit: () => void }) {
  const [route, setRoute] = useState<ProviderRoute>("provider-login");
  const [form, setForm] = useState(providerProfile);
  const [enabledServiceIds, setEnabledServiceIds] = useState<string[]>(["chef", "maid"]);
  const [profilePhotoAsset, setProfilePhotoAsset] = useState<LocalUploadAsset | null>(null);
  const [identityDocuments, setIdentityDocuments] = useState<{
    icFront: LocalUploadAsset | null;
    icBack: LocalUploadAsset | null;
  }>({
    icFront: null,
    icBack: null,
  });
  const [serviceForms, setServiceForms] = useState<ServiceForm[]>(
    serviceTemplates.map((service) => ({
      ...service,
      certificatesLabel: "",
      drivingLicenseLabel: "",
      certificateAsset: null,
      drivingLicenseAsset: null,
      portfolio: createPortfolioSlots(service.id),
    })),
  );
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSummary, setSubmissionSummary] = useState<{
    providerId: string;
    notificationId: string | null;
  } | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [phoneVerificationState, setPhoneVerificationState] =
    useState<PhoneVerificationState>("idle");
  const [phoneVerificationMessage, setPhoneVerificationMessage] = useState<string | null>(null);
  const [emailVerificationState, setEmailVerificationState] =
    useState<EmailVerificationState>("idle");
  const [emailVerificationMessage, setEmailVerificationMessage] = useState<string | null>(null);

  const activeServices = useMemo(
    () => serviceForms.filter((service) => enabledServiceIds.includes(service.id)),
    [enabledServiceIds, serviceForms],
  );

  const availableServices = useMemo(
    () => serviceForms.filter((service) => !enabledServiceIds.includes(service.id)),
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

  function addService(serviceId: string) {
    setEnabledServiceIds((current) => (current.includes(serviceId) ? current : [...current, serviceId]));
    setServiceMenuOpen(false);
  }

  function removeService(serviceId: string) {
    setEnabledServiceIds((current) => current.filter((value) => value !== serviceId));
  }

  function updateService(serviceId: string, field: keyof ServiceForm, value: string) {
    setServiceForms((current) =>
      current.map((service) => (service.id === serviceId ? { ...service, [field]: value } : service)),
    );
  }

  function updatePortfolioItem(
    serviceId: string,
    itemId: string,
    field: keyof Pick<PortfolioItem, "title" | "caption">,
    value: string,
  ) {
    setServiceForms((current) =>
      current.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              portfolio: service.portfolio.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item,
              ),
            }
          : service,
      ),
    );
  }

  function updateServiceAsset(
    serviceId: string,
    field: "certificateAsset" | "drivingLicenseAsset",
    asset: LocalUploadAsset | null,
  ) {
    setServiceForms((current) =>
      current.map((service) => (service.id === serviceId ? { ...service, [field]: asset } : service)),
    );
  }

  function updatePortfolioImage(serviceId: string, itemId: string, asset: LocalUploadAsset | null) {
    setServiceForms((current) =>
      current.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              portfolio: service.portfolio.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      image: asset?.uri ?? "",
                      imageAsset: asset,
                    }
                  : item,
              ),
            }
          : service,
      ),
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

  function toggleAvailability(serviceId: string, mode: AvailabilityMode) {
    setServiceForms((current) =>
      current.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              availabilityModes: service.availabilityModes.includes(mode)
                ? service.availabilityModes.filter((item) => item !== mode)
                : [...service.availabilityModes, mode],
            }
          : service,
      ),
    );
  }

  async function pickImageAsset() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      throw new Error("Media library permission is required to select images.");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.9,
    });

    if (result.canceled || !result.assets[0]) {
      return null;
    }

    const asset = result.assets[0];
    return {
      uri: asset.uri,
      name: asset.fileName ?? `image-${Date.now()}.jpg`,
      mimeType: asset.mimeType ?? "image/jpeg",
    } satisfies LocalUploadAsset;
  }

  async function pickDocumentAsset() {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled || !result.assets[0]) {
      return null;
    }

    const asset = result.assets[0];
    return {
      uri: asset.uri,
      name: asset.name,
      mimeType: asset.mimeType ?? "application/octet-stream",
    } satisfies LocalUploadAsset;
  }

  async function handlePickProfilePhoto() {
    try {
      const asset = await pickImageAsset();

      if (!asset) {
        return;
      }

      setProfilePhotoAsset(asset);
      updateField("profilePhotoLabel", asset.name);
    } catch (error) {
      setSubmissionState("error");
      setSubmissionError(error instanceof Error ? error.message : "Failed to select profile photo.");
    }
  }

  async function handlePickIdentityDocument(type: "icFront" | "icBack") {
    try {
      const asset = await pickDocumentAsset();

      if (!asset) {
        return;
      }

      setIdentityDocuments((current) => ({ ...current, [type]: asset }));
    } catch (error) {
      setSubmissionState("error");
      setSubmissionError(error instanceof Error ? error.message : "Failed to select document.");
    }
  }

  async function handlePickServiceDocument(
    serviceId: string,
    field: "certificateAsset" | "drivingLicenseAsset",
  ) {
    try {
      const asset = await pickDocumentAsset();

      if (!asset) {
        return;
      }

      updateServiceAsset(serviceId, field, asset);
    } catch (error) {
      setSubmissionState("error");
      setSubmissionError(error instanceof Error ? error.message : "Failed to select service document.");
    }
  }

  async function handlePickPortfolioImage(serviceId: string, itemId: string) {
    try {
      const asset = await pickImageAsset();

      if (!asset) {
        return;
      }

      updatePortfolioImage(serviceId, itemId, asset);
    } catch (error) {
      setSubmissionState("error");
      setSubmissionError(error instanceof Error ? error.message : "Failed to select portfolio image.");
    }
  }

  function validateSubmission() {
    if (!form.firstName.trim()) {
      return "First name is required.";
    }

    if (!form.lastName.trim()) {
      return "Last name is required.";
    }

    if (!form.residentialAddress.trim()) {
      return "Residential address is required.";
    }

    if (!form.currentLocation.trim()) {
      return "Current location is required.";
    }

    if (!form.emailAddress.trim()) {
      return "Email address is required.";
    }

    if (!form.phoneNumber.trim()) {
      return "Phone number is required.";
    }

    if (!form.idNumber.trim()) {
      return "IC / Passport number is required.";
    }

    if (!profilePhotoAsset) {
      return "Profile photo is required.";
    }

    if (!identityDocuments.icFront) {
      return "IC front document is required.";
    }

    if (!identityDocuments.icBack) {
      return "IC back document is required.";
    }

    if (!form.verificationEmail.trim() || !form.verificationPhone.trim()) {
      return "Verified email and phone are required before submission.";
    }

    if (phoneVerificationState !== "verified") {
      return "Phone number must be verified with OTP before submission.";
    }

    if (emailVerificationState !== "verified") {
      return "Email address must be verified before submission.";
    }

    if (activeServices.length === 0) {
      return "Add at least one service before submitting.";
    }

    for (const service of activeServices) {
      if (!service.yearsExperience.trim()) {
        return `${service.name}: years of experience is required.`;
      }

      if (!service.specialties.trim()) {
        return `${service.name}: specialties are required.`;
      }

      if (service.availabilityModes.length === 0) {
        return `${service.name}: select at least one availability option.`;
      }

      if (!service.radiusKm.trim()) {
        return `${service.name}: radius is required.`;
      }

      if (!service.serviceDescription.trim()) {
        return `${service.name}: service description is required.`;
      }

      if (!service.perHourRate.trim()) {
        return `${service.name}: hourly rate is required.`;
      }

      if (!service.minimumBookingHours.trim()) {
        return `${service.name}: minimum booking hours is required.`;
      }

      if (service.id === "driver" && !service.drivingLicenseAsset) {
        return "Driver service requires a driving license upload.";
      }

      if (service.certificatesLabel.trim() && !service.certificateAsset) {
        return `${service.name}: upload the certificate file or clear the certificate note.`;
      }

      const completedPortfolioItems = service.portfolio.filter(
        (item) => item.title.trim() || item.caption.trim() || item.imageAsset,
      );

      if (completedPortfolioItems.length === 0) {
        return `${service.name}: add at least one portfolio image.`;
      }

      if (completedPortfolioItems.length > 3) {
        return `${service.name}: maximum 3 portfolio images are allowed.`;
      }

      for (const item of completedPortfolioItems) {
        if (!item.title.trim() || !item.caption.trim() || !item.imageAsset) {
          return `${service.name}: each portfolio item needs an image, title, and description.`;
        }
      }
    }

    return null;
  }

  async function handleSendPhoneOtp() {
    if (!form.verificationPhone.trim()) {
      setPhoneVerificationState("error");
      setPhoneVerificationMessage("Enter a phone number before sending OTP.");
      return;
    }

    setPhoneVerificationState("sending");
    setPhoneVerificationMessage(null);

    try {
      await sendPhoneOtp(form.verificationPhone.trim());
      setPhoneVerificationState("code_sent");
      setPhoneVerificationMessage("OTP sent successfully. Enter the code to verify this phone number.");
    } catch (error) {
      setPhoneVerificationState("error");
      setPhoneVerificationMessage(
        error instanceof Error ? error.message : "Failed to send OTP.",
      );
    }
  }

  async function handleVerifyPhoneOtp() {
    if (!form.verificationPhone.trim()) {
      setPhoneVerificationState("error");
      setPhoneVerificationMessage("Phone number is required for OTP verification.");
      return;
    }

    if (!otpCode.trim()) {
      setPhoneVerificationState("error");
      setPhoneVerificationMessage("Enter the OTP code before verifying.");
      return;
    }

    setPhoneVerificationState("verifying");
    setPhoneVerificationMessage(null);

    try {
      await verifyPhoneOtp(form.verificationPhone.trim(), otpCode.trim());
      setPhoneVerificationState("verified");
      setPhoneVerificationMessage("Phone number verified successfully.");
    } catch (error) {
      setPhoneVerificationState("error");
      setPhoneVerificationMessage(
        error instanceof Error ? error.message : "Failed to verify OTP.",
      );
    }
  }

  async function handleSendEmailVerification() {
    if (!form.verificationEmail.trim()) {
      setEmailVerificationState("error");
      setEmailVerificationMessage("Enter an email address before sending verification.");
      return;
    }

    setEmailVerificationState("sending");
    setEmailVerificationMessage(null);

    try {
      await sendEmailVerification(form.verificationEmail.trim());
      setEmailVerificationState("sent");
      setEmailVerificationMessage(
        "Verification email sent. Open the email link, then come back here and check verification status.",
      );
    } catch (error) {
      setEmailVerificationState("error");
      setEmailVerificationMessage(
        error instanceof Error ? error.message : "Failed to send verification email.",
      );
    }
  }

  async function handleCheckEmailVerification() {
    if (!form.verificationEmail.trim()) {
      setEmailVerificationState("error");
      setEmailVerificationMessage("Email address is required.");
      return;
    }

    setEmailVerificationState("checking");
    setEmailVerificationMessage(null);

    try {
      const result = await getEmailVerificationStatus(form.verificationEmail.trim());

      if (result.status === "verified") {
        setEmailVerificationState("verified");
        setEmailVerificationMessage("Email address verified successfully.");
      } else {
        setEmailVerificationState("sent");
        setEmailVerificationMessage("Email is still pending verification. Open the email link first, then check again.");
      }
    } catch (error) {
      setEmailVerificationState("error");
      setEmailVerificationMessage(
        error instanceof Error ? error.message : "Failed to check email verification.",
      );
    }
  }

  async function handleSubmitApplication() {
    const validationError = validateSubmission();

    if (validationError) {
      setSubmissionState("error");
      setSubmissionError(validationError);
      return;
    }

    setSubmissionState("submitting");
    setSubmissionError(null);

    try {
      const profilePhotoUrl = await uploadLocalAssetToStorage({
        asset: profilePhotoAsset!,
        storagePath: buildProviderAssetPath({
          firstName: form.firstName,
          lastName: form.lastName,
          folder: "profile-photos",
          fileLabel: "profile-photo",
        }),
      });

      const uploadedServices = await Promise.all(
        activeServices.map(async (service) => {
          const completedPortfolioItems = service.portfolio.filter(
            (item) => item.title.trim() || item.caption.trim() || item.imageAsset,
          );

          const portfolio = await Promise.all(
            completedPortfolioItems.slice(0, 3).map(async (item) => ({
              title: item.title,
              caption: item.caption,
              image_url: await uploadLocalAssetToStorage({
                asset: item.imageAsset!,
                storagePath: buildProviderAssetPath({
                  firstName: form.firstName,
                  lastName: form.lastName,
                  folder: "provider-portfolios",
                  fileLabel: `${service.id}-${item.id}`,
                }),
              }),
            })),
          );

          return {
            service_id: service.id,
            service_name: service.name,
            years_experience: parseNullableNumber(service.yearsExperience),
            specialties: service.specialties.trim(),
            radius_km: parseNullableNumber(service.radiusKm),
            service_description: service.serviceDescription.trim(),
            hourly_price: parseNullableNumber(service.perHourRate),
            minimum_booking_hours: parseNullableNumber(service.minimumBookingHours),
            payments: service.payments,
            availability_modes: service.availabilityModes,
            certificates_label: service.certificateAsset ? service.certificatesLabel || `${service.name} certificate` : null,
            driving_license_label: service.drivingLicenseAsset ? service.drivingLicenseLabel || "Driving license" : null,
            portfolio,
          };
        }),
      );

      const documentDrafts = [
        {
          document_type: "ic_front",
          label: "IC Front",
          asset: identityDocuments.icFront!,
          notes: "Submitted during provider registration.",
        },
        {
          document_type: "ic_back",
          label: "IC Back",
          asset: identityDocuments.icBack!,
          notes: "Submitted during provider registration.",
        },
        ...activeServices
          .filter((service) => service.id === "driver" && service.drivingLicenseAsset)
          .map((service) => ({
            document_type: "driving_license",
            label: `${service.name} Driving License`,
            asset: service.drivingLicenseAsset!,
            notes: service.drivingLicenseLabel || "Required for driver service.",
          })),
        ...activeServices
          .filter((service) => service.certificateAsset)
          .map((service) => ({
            document_type: "certificate",
            label: `${service.name} Certificate`,
            asset: service.certificateAsset!,
            notes: service.certificatesLabel || `${service.name} optional certificate`,
          })),
      ];

      const uploadedDocuments = await Promise.all(
        documentDrafts.map(async (document) => ({
          document_type: document.document_type,
          label: document.label,
          file_url: await uploadLocalAssetToStorage({
            asset: document.asset,
            storagePath: buildProviderAssetPath({
              firstName: form.firstName,
              lastName: form.lastName,
              folder: "provider-documents",
              fileLabel: document.label,
            }),
          }),
          notes: document.notes,
        })),
      );

      const result = await submitProviderApplication({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        date_of_birth: form.dateOfBirth.trim(),
        residential_address: form.residentialAddress.trim(),
        current_location: form.currentLocation.trim(),
        email: form.emailAddress.trim(),
        phone_number: form.phoneNumber.trim(),
        id_number: form.idNumber.trim(),
        profile_photo_url: profilePhotoUrl,
        verification_email: form.verificationEmail.trim(),
        verification_phone: form.verificationPhone.trim(),
        documents: uploadedDocuments,
        services: uploadedServices,
      });

      setSubmissionSummary({
        providerId: result.providerId ?? "",
        notificationId: result.notificationId ?? null,
      });
      setSubmissionState("success");
      setRoute("pending-approval");
    } catch (error) {
      setSubmissionState("error");
      setSubmissionError(
        error instanceof Error ? error.message : "Failed to submit provider application.",
      );
    }
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
              subtitle="Providers complete identity and contact setup first, receive a verified message, then continue building chef, maid, driver, tutor, and other service profiles."
            />
            <FeatureRow
              icon="shield-checkmark-outline"
              title="Connected registration flow"
              text="The mobile provider form now validates fields, uploads assets to Supabase Storage, and submits to the backend API."
            />
            <FeatureRow
              icon="notifications-outline"
              title="Admin review queue"
              text="Each successful submission creates a pending provider record and a notification for the admin panel."
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
              subtitle="Start with profile photo, contact information, residential address, current location, and IC or passport number."
            />
            <View style={premiumCard}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Profile photo</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                <Image
                  source={{ uri: profilePhotoAsset?.uri ?? demoProfilePhotoUrl }}
                  style={{ width: 88, height: 88, borderRadius: 26 }}
                />
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ fontSize: 15, fontWeight: "800", color: colors.ink }}>{form.profilePhotoLabel}</Text>
                  <Text style={{ fontSize: 13, lineHeight: 20, color: colors.slate }}>
                    Choose a real profile image from the phone gallery before submitting.
                  </Text>
                </View>
              </View>
              <PrimaryButton
                label={profilePhotoAsset ? "Replace profile photo" : "Choose profile photo"}
                onPress={() => {
                  void handlePickProfilePhoto();
                }}
                small
              />
            </View>
            <UploadPickerCard
              title="IC Front"
              subtitle="Upload the front of the IC or passport document."
              selectedLabel={identityDocuments.icFront?.name ?? null}
              actionLabel={identityDocuments.icFront ? "Replace IC front" : "Upload IC front"}
              onPress={() => {
                void handlePickIdentityDocument("icFront");
              }}
            />
            <UploadPickerCard
              title="IC Back"
              subtitle="Upload the back of the IC. If using passport only, you can still attach the same document here for now."
              selectedLabel={identityDocuments.icBack?.name ?? null}
              actionLabel={identityDocuments.icBack ? "Replace IC back" : "Upload IC back"}
              onPress={() => {
                void handlePickIdentityDocument("icBack");
              }}
            />
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
              label="Current Location"
              placeholder="Current provider location"
              value={form.currentLocation}
              onChangeText={(value) => updateField("currentLocation", value)}
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
              status={phoneVerificationState === "verified" ? "Phone verified" : "Ready to verify"}
            />
            <VerificationCard
              title="Phone verification"
              subtitle="Send an OTP through Twilio Verify, then confirm the code before continuing."
              icon="call-outline"
              status={phoneVerificationState === "verified" ? "Verified" : "Pending"}
            />
            <OutlineField
              label="Verified Phone Number"
              placeholder="+60"
              value={form.verificationPhone}
              onChangeText={(value) => {
                updateField("verificationPhone", value);
                setOtpCode("");
                setPhoneVerificationState("idle");
                setPhoneVerificationMessage(null);
              }}
            />
            <PrimaryButton
              label={
                phoneVerificationState === "sending"
                  ? "Sending OTP..."
                  : phoneVerificationState === "code_sent" || phoneVerificationState === "verified"
                    ? "Resend OTP"
                    : "Send OTP"
              }
              onPress={() => {
                void handleSendPhoneOtp();
              }}
              disabled={phoneVerificationState === "sending" || phoneVerificationState === "verifying"}
            />
            <OutlineField
              label="OTP Code"
              placeholder="Enter OTP code"
              value={otpCode}
              onChangeText={setOtpCode}
            />
            <PrimaryButton
              label={phoneVerificationState === "verifying" ? "Verifying OTP..." : "Verify phone OTP"}
              onPress={() => {
                void handleVerifyPhoneOtp();
              }}
              disabled={phoneVerificationState === "sending" || phoneVerificationState === "verifying"}
            />
            {phoneVerificationMessage ? (
              <MessageCard
                tone={phoneVerificationState === "error" ? "error" : "info"}
                title={phoneVerificationState === "verified" ? "Phone verified" : "Phone OTP status"}
                text={phoneVerificationMessage}
              />
            ) : null}
            <VerificationCard
              title="Email verification"
              subtitle="Send a real verification email, open the link, then check the verification status here before continuing."
              icon="mail-outline"
              status={emailVerificationState === "verified" ? "Verified" : "Pending"}
            />
            <OutlineField
              label="Verified Email"
              placeholder="Email address"
              value={form.verificationEmail}
              onChangeText={(value) => {
                updateField("verificationEmail", value);
                setEmailVerificationState("idle");
                setEmailVerificationMessage(null);
              }}
            />
            <PrimaryButton
              label={
                emailVerificationState === "sending"
                  ? "Sending verification email..."
                  : emailVerificationState === "sent" || emailVerificationState === "verified"
                    ? "Resend verification email"
                    : "Send verification email"
              }
              onPress={() => {
                void handleSendEmailVerification();
              }}
              disabled={emailVerificationState === "sending" || emailVerificationState === "checking"}
            />
            <PrimaryButton
              label={emailVerificationState === "checking" ? "Checking email verification..." : "Check email verification"}
              onPress={() => {
                void handleCheckEmailVerification();
              }}
              disabled={emailVerificationState === "sending" || emailVerificationState === "checking"}
            />
            {emailVerificationMessage ? (
              <MessageCard
                tone={emailVerificationState === "error" ? "error" : "info"}
                title={emailVerificationState === "verified" ? "Email verified" : "Email verification status"}
                text={emailVerificationMessage}
              />
            ) : null}
            <View style={premiumCard}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Verification result email</Text>
              <Text style={{ fontSize: 14, lineHeight: 22, color: colors.slate }}>
                Email message: "Now you are verified, you can upload your services."
              </Text>
              <StatusBadge
                label={
                  phoneVerificationState === "verified" && emailVerificationState === "verified"
                    ? "Ready"
                    : "Pending"
                }
              />
            </View>
            <PrimaryButton
              label="Continue to create services"
              onPress={() => setRoute("provider-service-details")}
              disabled={phoneVerificationState !== "verified" || emailVerificationState !== "verified"}
            />
          </>
        ) : null}

        {route === "provider-service-details" ? (
          <>
            <ScreenHeader
              eyebrow="Provider registration"
              title="Create services"
              subtitle="Add from the dropdown, remove any selected service, and keep the provider location shared across all services."
              onBack={() => setRoute("provider-verify")}
            />
            <RegistrationProgress route={route} />
            <View style={premiumCard}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Create services</Text>
                  <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>
                    Tap `+` to add another service from the dropdown menu. Selected services can be removed inside each service section.
                  </Text>
                </View>
                <ServiceAddButton onPress={() => setServiceMenuOpen((current) => !current)} open={serviceMenuOpen} />
              </View>
              {serviceMenuOpen ? (
                <View style={{ gap: 10 }}>
                  {availableServices.length > 0 ? (
                    availableServices.map((service) => (
                      <Pressable
                        key={service.id}
                        onPress={() => addService(service.id)}
                        style={{
                          padding: 14,
                          borderRadius: 18,
                          backgroundColor: "#F7FBF5",
                          borderWidth: 1,
                          borderColor: "#DDE7DF",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <Ionicons name={service.icon} size={20} color={colors.brandDark} />
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 15, fontWeight: "800", color: colors.ink }}>{service.name}</Text>
                          <Text style={{ fontSize: 13, lineHeight: 19, color: colors.slate }}>{service.description}</Text>
                        </View>
                      </Pressable>
                    ))
                  ) : (
                    <Text style={{ fontSize: 13, color: colors.slate }}>
                      All available services have already been added.
                    </Text>
                  )}
                </View>
              ) : null}
            </View>
            <View style={{ gap: 12 }}>
              {activeServices.map((service) => (
                <SelectedServiceCard key={service.id} service={service} />
              ))}
            </View>
            {activeServices.map((service) => (
              <ServiceSection
                key={service.id}
                service={service}
                providerLocation={form.currentLocation}
                onChange={(field, value) => updateService(service.id, field, value)}
                onToggleAvailability={(mode) => toggleAvailability(service.id, mode)}
                onRemove={() => removeService(service.id)}
                onPickCertificate={() => {
                  void handlePickServiceDocument(service.id, "certificateAsset");
                }}
                onPickDrivingLicense={() => {
                  void handlePickServiceDocument(service.id, "drivingLicenseAsset");
                }}
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
              subtitle="Each selected service gets its own individual hourly pricing card."
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
              title="Per-service portfolio"
              subtitle="Each service provider uploads up to 3 images and descriptions for each service."
              onBack={() => setRoute("provider-rates")}
            />
            <RegistrationProgress route={route} />
            {submissionError ? (
              <MessageCard tone="error" title="Submission blocked" text={submissionError} />
            ) : null}
            {submissionState === "success" && submissionSummary ? (
              <MessageCard
                tone="success"
                title="Submission complete"
                text={`Provider ${submissionSummary.providerId} was created and admin notification ${submissionSummary.notificationId ?? "queued"} was recorded.`}
              />
            ) : null}
            <View style={premiumCard}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Submission flow</Text>
              <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>
                On submit, the app uploads your chosen profile photo, identity documents, certificates, driver license if needed, and each service portfolio image to Supabase Storage before sending the provider application to the backend API.
              </Text>
            </View>
            {activeServices.map((service) => (
              <View key={service.id} style={{ gap: 12 }}>
                <View style={premiumCard}>
                  <Text style={{ fontSize: 21, fontWeight: "900", color: colors.ink }}>{service.name} portfolio</Text>
                  <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>
                    Maximum 3 images with description for this service.
                  </Text>
                </View>
                {service.portfolio.slice(0, 3).map((item, index) => (
                  <PortfolioCard
                    key={item.id}
                    item={item}
                    serviceName={service.name}
                    index={index}
                    onPickImage={() => {
                      void handlePickPortfolioImage(service.id, item.id);
                    }}
                    onChange={(field, value) => updatePortfolioItem(service.id, item.id, field, value)}
                  />
                ))}
              </View>
            ))}
            <View style={premiumCard}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Admin approval status</Text>
              <Text style={{ fontSize: 14, lineHeight: 22, color: colors.slate }}>
                Successful submission creates the provider with status `pending_review`, stores uploaded assets, and creates an admin notification.
              </Text>
              <StatusBadge label={submissionState === "submitting" ? "Submitting" : "Pending" } />
            </View>
            <PrimaryButton
              label={submissionState === "submitting" ? "Submitting application..." : "Submit provider application"}
              onPress={() => {
                void handleSubmitApplication();
              }}
              disabled={submissionState === "submitting"}
            />
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
            {submissionSummary ? (
              <MessageCard
                tone="success"
                title="Backend submission linked"
                text={`Provider id ${submissionSummary.providerId} is now in pending review and linked to an admin notification.`}
              />
            ) : null}
            <FeatureRow
              icon="mail-outline"
              title="Verified email already sent"
              text={`A verification email was sent to ${form.verificationEmail} with the message that the provider can now upload services.`}
            />
            <FeatureRow
              icon="briefcase-outline"
              title="Service packages uploaded"
              text={`${activeServices.map((service) => service.name).join(", ")} now each include service details, hourly pricing, and up to 3 image examples with descriptions.`}
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
                icon={service.icon}
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
                  <MetricCard label="Per hour" value={`RM ${service.perHourRate}`} />
                  <MetricCard label="Minimum" value={`${service.minimumBookingHours} hrs`} />
                  <MetricCard label="Radius" value={`${service.radiusKm} km`} />
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
                  source={{ uri: profilePhotoAsset?.uri ?? demoProfilePhotoUrl }}
                  style={{ width: 90, height: 90, borderRadius: 28 }}
                />
                <View style={{ flex: 1, gap: 4 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 23, fontWeight: "800", color: colors.ink }}>{`${form.firstName} ${form.lastName}`}</Text>
                    <StatusBadge label="Pending" />
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: colors.brandDark }}>Phone and email verified</Text>
                  <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{form.currentLocation}</Text>
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
