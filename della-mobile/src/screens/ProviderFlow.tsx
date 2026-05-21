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
  ServiceCard,
  StatusBadge,
} from "../components/ui";
import { providerBookings, providerChats, services } from "../data/mockData";
import { colors } from "../theme";

type ProviderRoute =
  | "provider-login"
  | "provider-register"
  | "provider-service-details"
  | "provider-rates"
  | "provider-portfolio"
  | "provider-verification"
  | "pending-approval"
  | "provider-dashboard"
  | "provider-bookings"
  | "provider-chat"
  | "earnings"
  | "provider-profile";

type RegistrationStep =
  | "provider-register"
  | "provider-service-details"
  | "provider-rates"
  | "provider-portfolio"
  | "provider-verification";

type PortfolioItem = {
  id: string;
  title: string;
  caption: string;
  image: string;
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
  { key: "provider-service-details", title: "Service" },
  { key: "provider-rates", title: "Rates" },
  { key: "provider-portfolio", title: "Portfolio" },
  { key: "provider-verification", title: "Verify" },
];

const paymentOptions = ["Cash", "QR", "Transfer"] as const;

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
  emailAddress: "amina.chef@della.app",
  phoneNumber: "+60 12-778 4921",
  idNumber: "A33445567",
  profilePhotoLabel: "Chef profile portrait selected",
  serviceCategory: "Chef",
  yearsExperience: "5",
  specialties: "Arabic, Malay",
  availability: "Any time, weekends, 8 AM - 5 PM",
  location: "Mont Kiara, Kuala Lumpur",
  radiusKm: "12",
  serviceDescription:
    "Private home chef for family dining, healthy weekly meal prep, and intimate gatherings with Arabic and Malay menus.",
  perDayRate: "100",
  perHourRate: "40",
  minimumBookingHours: "3",
  verificationEmail: "amina.chef@della.app",
};

const initialPortfolio: PortfolioItem[] = [
  {
    id: "arabic-platter",
    title: "Arabic set menu",
    caption: "Mixed grill, saffron rice, and mezze platter for family dinners.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "malay-dish",
    title: "Malay comfort table",
    caption: "Nasi lemak, ayam rendang, and sambal sides prepared fresh on site.",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
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
        {registrationSteps.map((step, index) => {
          const active = index <= currentIndex;
          return (
            <View
              key={step.key}
              style={{
                flex: 1,
                height: 8,
                borderRadius: 999,
                backgroundColor: active ? colors.brand : "#E4EDE6",
              }}
            />
          );
        })}
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
      <Text style={{ fontSize: 30, lineHeight: 36, fontWeight: "900", color: "white", maxWidth: 280 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 15, lineHeight: 23, color: "#D2E2D5", maxWidth: 310 }}>{subtitle}</Text>
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

function UploadCard({
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

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <View style={{ ...premiumCard, padding: 14 }}>
      <Image source={{ uri: item.image }} style={{ width: "100%", height: 190, borderRadius: 22 }} />
      <View style={{ gap: 4 }}>
        <Text style={{ fontSize: 17, fontWeight: "800", color: colors.ink }}>{item.title}</Text>
        <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{item.caption}</Text>
      </View>
    </View>
  );
}

export function ProviderFlow({ onExit }: { onExit: () => void }) {
  const [route, setRoute] = useState<ProviderRoute>("provider-login");
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(["chef"]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([...paymentOptions]);
  const [form, setForm] = useState(providerProfile);
  const [portfolioItems] = useState<PortfolioItem[]>(initialPortfolio);

  const selectedServices = useMemo(
    () => services.filter((service) => selectedServiceIds.includes(service.id)),
    [selectedServiceIds],
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
    setSelectedServiceIds((current) =>
      current.includes(serviceId) ? current.filter((value) => value !== serviceId) : [...current, serviceId],
    );
  }

  function togglePayment(label: string) {
    setSelectedPayments((current) =>
      current.includes(label) ? current.filter((value) => value !== label) : [...current, label],
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
              subtitle="Create a polished DELLA application with identity, service details, pricing, portfolio, and verification."
              onBack={onExit}
            />
            <PremiumHero
              eyebrow="DELLA PROVIDER"
              title="Apply once. Get reviewed fast. Grow with trust."
              subtitle="From chef profiles to home services, DELLA helps providers present their work beautifully and get approved with clarity."
            />
            <FeatureRow
              icon="sparkles-outline"
              title="Premium presentation"
              text="A structured application with profile photo, specialties, pricing, and image-backed service showcases."
            />
            <FeatureRow
              icon="mail-open-outline"
              title="Clear application updates"
              text="Providers receive a submission email first, then email or in-app notifications for approval or extra documents."
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
              subtitle="Set up the provider identity exactly as it will be reviewed by admin."
              onBack={() => setRoute("provider-login")}
            />
            <RegistrationProgress route={route} />
            <PremiumHero
              eyebrow="STEP 1"
              title="Professional first impression"
              subtitle="Collect legal identity, contact details, and the profile photo that will appear in the provider app."
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
                    Use a clear portrait with bright lighting and a friendly expression.
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
            <PrimaryButton label="Continue to service details" onPress={() => setRoute("provider-service-details")} />
          </>
        ) : null}

        {route === "provider-service-details" ? (
          <>
            <ScreenHeader
              eyebrow="Provider registration"
              title="Service details"
              subtitle="Show what this provider offers, how experienced they are, and where customers can discover them nearby."
              onBack={() => setRoute("provider-register")}
            />
            <RegistrationProgress route={route} />
            <View style={premiumCard}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Create service</Text>
              <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>
                A provider can launch with one service first and add more later.
              </Text>
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
            </View>
            <OutlineField
              label="Service Category"
              placeholder="Chef"
              value={form.serviceCategory}
              onChangeText={(value) => updateField("serviceCategory", value)}
            />
            <OutlineField
              label="Years of Experience"
              placeholder="5"
              value={form.yearsExperience}
              onChangeText={(value) => updateField("yearsExperience", value)}
            />
            <OutlineField
              label="Service Description"
              placeholder="Describe this provider's service"
              value={form.serviceDescription}
              onChangeText={(value) => updateField("serviceDescription", value)}
              multiline
            />
            <OutlineField
              label="What Dishes Can Make / Specialties"
              placeholder="Arabic, Malay"
              value={form.specialties}
              onChangeText={(value) => updateField("specialties", value)}
            />
            <OutlineField
              label="Availability"
              placeholder="Any time, weekends, 8 AM - 5 PM"
              value={form.availability}
              onChangeText={(value) => updateField("availability", value)}
            />
            <OutlineField
              label="Service Location"
              placeholder="Service base location"
              value={form.location}
              onChangeText={(value) => updateField("location", value)}
            />
            <OutlineField
              label="Service Radius (km)"
              placeholder="12"
              value={form.radiusKm}
              onChangeText={(value) => updateField("radiusKm", value)}
            />
            <View style={{ flexDirection: "row", gap: 12 }}>
              <MetricCard label="Selected services" value={String(selectedServiceIds.length)} />
              <MetricCard label="Nearby radius" value={`${form.radiusKm} km`} />
              <MetricCard label="Experience" value={`${form.yearsExperience} yrs`} />
            </View>
            <PrimaryButton label="Continue to rates" onPress={() => setRoute("provider-rates")} />
          </>
        ) : null}

        {route === "provider-rates" ? (
          <>
            <ScreenHeader
              eyebrow="Provider registration"
              title="Rates and payments"
              subtitle="Keep the pricing simple, transparent, and easy for customers to understand before they book."
              onBack={() => setRoute("provider-service-details")}
            />
            <RegistrationProgress route={route} />
            <PremiumHero
              eyebrow="STEP 3"
              title="Pricing that feels clear and premium"
              subtitle="Set your starting rates, minimum booking duration, and accepted payment methods."
            />
            <View style={{ ...premiumCard, gap: 16 }}>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <OutlineField
                    label="Per Day Start From (RM)"
                    placeholder="100"
                    value={form.perDayRate}
                    onChangeText={(value) => updateField("perDayRate", value)}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <OutlineField
                    label="Per Hour Start From (RM)"
                    placeholder="40"
                    value={form.perHourRate}
                    onChangeText={(value) => updateField("perHourRate", value)}
                  />
                </View>
              </View>
              <OutlineField
                label="Minimum Booking Hours"
                placeholder="3"
                value={form.minimumBookingHours}
                onChangeText={(value) => updateField("minimumBookingHours", value)}
              />
              <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 13, fontWeight: "700", color: colors.ink }}>Accepted payment methods</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  {paymentOptions.map((option) => (
                    <PaymentToggle
                      key={option}
                      label={option}
                      active={selectedPayments.includes(option)}
                      onPress={() => togglePayment(option)}
                    />
                  ))}
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <MetricCard label="Per day" value={`RM ${form.perDayRate}`} />
              <MetricCard label="Per hour" value={`RM ${form.perHourRate}`} />
              <MetricCard label="Minimum" value={`${form.minimumBookingHours} hrs`} />
            </View>
            <PrimaryButton label="Continue to portfolio" onPress={() => setRoute("provider-portfolio")} />
          </>
        ) : null}

        {route === "provider-portfolio" ? (
          <>
            <ScreenHeader
              eyebrow="Provider registration"
              title="Portfolio and service images"
              subtitle="Let customers see the provider's work with image cards and captions for each food style or service result."
              onBack={() => setRoute("provider-rates")}
            />
            <RegistrationProgress route={route} />
            <FeatureRow
              icon="images-outline"
              title="Image with caption works well"
              text="For example, an Arabic dish can have one photo and caption, while a Malay dish can have another photo and caption."
            />
            {portfolioItems.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
            <View style={premiumCard}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Portfolio notes</Text>
              <Text style={{ fontSize: 14, lineHeight: 22, color: colors.slate }}>
                In production this section would support adding more service images, editing captions, and reordering the portfolio.
              </Text>
            </View>
            <PrimaryButton label="Continue to verification" onPress={() => setRoute("provider-verification")} />
          </>
        ) : null}

        {route === "provider-verification" ? (
          <>
            <ScreenHeader
              eyebrow="Provider registration"
              title="Verification and submission"
              subtitle="Finish the application with identity uploads, email verification, and admin review status."
              onBack={() => setRoute("provider-portfolio")}
            />
            <RegistrationProgress route={route} />
            <UploadCard
              title="Upload IC Front"
              subtitle="Front side of the identity card for review."
              icon="card-outline"
              status="Pending"
            />
            <UploadCard
              title="Upload IC Back"
              subtitle="Back side of the identity card for review."
              icon="card-outline"
              status="Pending"
            />
            <UploadCard
              title="Or Upload Passport"
              subtitle="Passport can be used instead of IC documents."
              icon="document-text-outline"
              status="Pending"
            />
            <View style={premiumCard}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Email verification</Text>
                  <Text style={{ fontSize: 13, lineHeight: 20, color: colors.slate }}>
                    A verification link will be sent to the provider before admin review completes.
                  </Text>
                </View>
                <StatusBadge label="Pending" />
              </View>
              <OutlineField
                label="Verification Email"
                placeholder="Email address"
                value={form.verificationEmail}
                onChangeText={(value) => updateField("verificationEmail", value)}
              />
            </View>
            <View style={premiumCard}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>Admin approval status</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate, flex: 1 }}>
                  This is managed by admin after submission, not by the provider.
                </Text>
                <StatusBadge label="Pending" />
              </View>
              <Text style={{ fontSize: 14, lineHeight: 22, color: colors.slate }}>
                Once submitted, the provider receives an email confirming the application was received. Later they receive an email or in-app notification if approved or if extra documents are needed.
              </Text>
            </View>
            <PrimaryButton label="Submit application" onPress={() => setRoute("pending-approval")} />
          </>
        ) : null}

        {route === "pending-approval" ? (
          <>
            <ScreenHeader
              eyebrow="Application submitted"
              title="Submitted for admin review"
              subtitle="The provider now waits for DELLA review and receives status updates by email or in-app notification."
              onBack={() => setRoute("provider-verification")}
            />
            <PremiumHero
              eyebrow="STATUS"
              title="Your application has been submitted successfully."
              subtitle="Our team is now reviewing your profile and documents. You will receive an email or in-app notification when your application is approved or if we need additional documents from you."
              status="Pending Review"
            />
            <FeatureRow
              icon="mail-outline"
              title="Submission email sent"
              text={`A confirmation email goes to ${form.verificationEmail} right after registration is submitted.`}
            />
            <FeatureRow
              icon="notifications-outline"
              title="Approval or extra documents"
              text="Any approval update, rejection, or request for more documents is sent through email or in-app notification."
            />
            <FeatureRow
              icon="shield-checkmark-outline"
              title="Admin approval status"
              text="The application stays in Pending Review until DELLA admin approves the service provider account."
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
              subtitle="Preview how the provider experience looks after the application has been submitted."
              onBack={onExit}
              actionLabel="Switch flow"
              onActionPress={onExit}
            />
            <PremiumHero
              eyebrow="APPLICATION STATUS"
              title="Pending review, profile ready"
              subtitle="The provider profile, service pricing, verification package, and portfolio are now prepared for admin review."
              status="Pending Review"
            />
            <View style={{ flexDirection: "row", gap: 12 }}>
              <MetricCard label="Primary service" value={form.serviceCategory} />
              <MetricCard label="Per hour" value={`RM ${form.perHourRate}`} />
              <MetricCard label="Radius" value={`${form.radiusKm} km`} />
            </View>
            <SectionTitle title="Application highlights" subtitle="What will be reviewed by DELLA admin." />
            <FeatureRow
              icon="person-circle-outline"
              title="Verified profile setup"
              text={`${form.firstName} ${form.lastName}, ${form.phoneNumber}, and profile photo are ready for admin checks.`}
            />
            <FeatureRow
              icon="restaurant-outline"
              title="Chef service created"
              text={`${form.yearsExperience} years experience, specialties in ${form.specialties}, and availability set as ${form.availability}.`}
            />
            <FeatureRow
              icon="wallet-outline"
              title="Rates and payment methods"
              text={`Starting from RM ${form.perDayRate} per day, RM ${form.perHourRate} per hour, minimum ${form.minimumBookingHours} hours, accepting ${selectedPayments.join(", ")}.`}
            />
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
              subtitle="Preview how the chef pricing could appear once the profile is approved and live."
              onBack={onExit}
            />
            <View style={{ flexDirection: "row", gap: 12 }}>
              <MetricCard label="Per day" value={`RM ${form.perDayRate}`} />
              <MetricCard label="Per hour" value={`RM ${form.perHourRate}`} />
              <MetricCard label="Minimum booking" value={`${form.minimumBookingHours} hrs`} />
            </View>
            <View style={premiumCard}>
              {[
                `Private dinner service • RM ${Number(form.perDayRate) * 3}`,
                `Weekend meal prep • RM ${Number(form.perHourRate) * 6}`,
                `Family event support • RM ${Number(form.perDayRate) * 2}`,
              ].map((line) => (
                <Text key={line} style={{ fontSize: 15, fontWeight: "700", color: colors.ink }}>
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
                  <Text style={{ fontSize: 14, fontWeight: "700", color: colors.brandDark }}>{form.serviceCategory}</Text>
                  <Text style={{ fontSize: 14, lineHeight: 21, color: colors.slate }}>{form.serviceDescription}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <MetricCard label="Experience" value={`${form.yearsExperience} yrs`} />
                <MetricCard label="Nearby radius" value={`${form.radiusKm} km`} />
                <MetricCard label="Minimum booking" value={`${form.minimumBookingHours} hrs`} />
              </View>
            </View>
            <SectionTitle title="Specialties" subtitle="What the provider can make and when they are available." />
            <FeatureRow
              icon="restaurant-outline"
              title={`Cuisine styles: ${form.specialties}`}
              text={`Availability: ${form.availability}. Service location: ${form.location}.`}
            />
            <SectionTitle title="Portfolio" subtitle="Service images with captions for each featured style." />
            {portfolioItems.map((item) => (
              <PortfolioCard key={item.id} item={item} />
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
