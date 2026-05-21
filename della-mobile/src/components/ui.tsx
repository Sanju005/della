import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ScrollViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radii, shadows, spacing } from "../theme";
import type { Booking, ChatThread, Provider, Service } from "../types/models";

export function AppScreen({
  children,
  scroll = true,
  contentContainerStyle,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  contentContainerStyle?: ScrollViewProps["contentContainerStyle"];
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {scroll ? (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.screenScroll, contentContainerStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.screenStatic}>{children}</View>
      )}
    </SafeAreaView>
  );
}

export function ScreenHeader({
  eyebrow,
  title,
  subtitle,
  onBack,
  actionLabel,
  onActionPress,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  actionLabel?: string;
  onActionPress?: () => void;
}) {
  return (
    <View style={styles.headerWrap}>
      <View style={styles.headerTopRow}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={22} color={colors.ink} />
          </Pressable>
        ) : (
          <View style={styles.iconButtonGhost} />
        )}
        {actionLabel ? (
          <Pressable onPress={onActionPress} style={styles.headerPill}>
            <Text style={styles.headerPillText}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function HeroCard({
  title,
  subtitle,
  primaryLabel,
  secondaryLabel,
  onPrimaryPress,
  onSecondaryPress,
}: {
  title: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
}) {
  return (
    <View style={styles.heroCard}>
      <Text style={styles.heroLabel}>DELLA marketplace</Text>
      <Text style={styles.heroTitle}>{title}</Text>
      <Text style={styles.heroSubtitle}>{subtitle}</Text>
      <View style={styles.heroActions}>
        <PrimaryButton label={primaryLabel} onPress={onPrimaryPress} />
        {secondaryLabel ? (
          <SecondaryButton label={secondaryLabel} onPress={onSecondaryPress} />
        ) : null}
      </View>
    </View>
  );
}

export function SectionTitle({
  title,
  subtitle,
  actionLabel,
  onActionPress,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}) {
  return (
    <View style={styles.sectionRow}>
      <View style={styles.sectionTextWrap}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      </View>
      {actionLabel ? (
        <Pressable onPress={onActionPress}>
          <Text style={styles.sectionAction}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  small = false,
  disabled = false,
}: {
  label: string;
  onPress?: () => void;
  small?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.primaryButton,
        small && styles.smallButton,
        disabled && { opacity: 0.55 },
      ]}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
  disabled = false,
}: {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.secondaryButton, disabled && { opacity: 0.55 }]}
    >
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

export function ServiceCard({
  service,
  onPress,
  selected = false,
}: {
  service: Service;
  onPress?: () => void;
  selected?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.serviceCard,
        { backgroundColor: service.accent },
        selected && styles.serviceCardSelected,
      ]}
    >
      <View style={styles.serviceIconWrap}>
        <Ionicons name={service.icon as never} size={24} color={colors.brandDark} />
      </View>
      <Text style={styles.serviceName}>{service.name}</Text>
      <Text style={styles.serviceDescription}>{service.description}</Text>
    </Pressable>
  );
}

export function ProviderCard({
  provider,
  serviceLabel,
  onPress,
}: {
  provider: Provider;
  serviceLabel: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.providerCard}>
      <Image source={{ uri: provider.photos[0] }} style={styles.providerImage} />
      <View style={styles.providerBody}>
        <View style={styles.providerTitleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.providerMeta}>{serviceLabel}</Text>
          </View>
          <StatusBadge label={provider.status} />
        </View>
        <View style={styles.providerStatsRow}>
          <Text style={styles.providerStatText}>⭐ {provider.rating.toFixed(1)}</Text>
          <Text style={styles.providerStatText}>• {provider.distanceKm} km away</Text>
          <Text style={styles.providerStatText}>• RM {provider.startingPrice} start</Text>
        </View>
        <Text numberOfLines={2} style={styles.providerBio}>
          {provider.bio}
        </Text>
      </View>
    </Pressable>
  );
}

export function BookingCard({ booking }: { booking: Booking }) {
  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bookingTitle}>{booking.serviceName}</Text>
          <Text style={styles.bookingProvider}>{booking.providerName}</Text>
        </View>
        <StatusBadge label={booking.status} />
      </View>
      <Text style={styles.bookingInfo}>{booking.schedule}</Text>
      <Text style={styles.bookingInfo}>{booking.address}</Text>
      <Text style={styles.bookingPrice}>{booking.priceLabel}</Text>
    </View>
  );
}

export function ChatCard({ thread }: { thread: ChatThread }) {
  return (
    <View style={styles.chatCard}>
      <View style={styles.chatAvatar}>
        <Text style={styles.chatAvatarText}>{thread.name.charAt(0)}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.chatRow}>
          <Text style={styles.chatName}>{thread.name}</Text>
          <Text style={styles.chatTime}>{thread.timestamp}</Text>
        </View>
        <Text numberOfLines={2} style={styles.chatMessage}>
          {thread.lastMessage}
        </Text>
      </View>
      {thread.unread > 0 ? (
        <View style={styles.chatUnread}>
          <Text style={styles.chatUnreadText}>{thread.unread}</Text>
        </View>
      ) : null}
    </View>
  );
}

export function StatusBadge({ label }: { label: string }) {
  const badgeStyle =
    label === "Approved"
      ? styles.statusApproved
      : label === "Pending"
        ? styles.statusPending
        : styles.statusCompleted;

  return (
    <View style={[styles.statusBadge, badgeStyle]}>
      <Text style={styles.statusText}>{label}</Text>
    </View>
  );
}

export function OutlineField({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText?: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#90A39A"
        multiline={multiline}
        style={[styles.fieldInput, multiline && styles.fieldTextarea]}
      />
    </View>
  );
}

export function InfoPanel({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <View style={styles.infoPanel}>
      <MaterialCommunityIcons name={icon as never} size={22} color={colors.brandDark} />
      <Text style={styles.infoPanelTitle}>{title}</Text>
      <Text style={styles.infoPanelDescription}>{description}</Text>
    </View>
  );
}

export function GalleryStrip({ images }: { images: string[] }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {images.map((image) => (
        <Image key={image} source={{ uri: image }} style={styles.galleryImage} />
      ))}
    </ScrollView>
  );
}

export function BottomTabs({
  items,
  activeKey,
  onPress,
}: {
  items: { key: string; label: string; icon: string }[];
  activeKey: string;
  onPress: (key: string) => void;
}) {
  return (
    <View style={styles.bottomTabs}>
      {items.map((item) => {
        const active = item.key === activeKey;
        return (
          <Pressable
            key={item.key}
            onPress={() => onPress(item.key)}
            style={styles.bottomTabItem}
          >
            <Ionicons
              name={item.icon as never}
              size={22}
              color={active ? colors.brand : "#8A9B92"}
            />
            <Text style={[styles.bottomTabLabel, active && styles.bottomTabLabelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.surfaceAlt,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  screenScroll: {
    flexGrow: 1,
    padding: spacing.lg,
    paddingBottom: 120,
    gap: spacing.lg,
  },
  screenStatic: {
    flex: 1,
    width: "100%",
    padding: spacing.lg,
  },
  headerWrap: {
    gap: spacing.sm,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonGhost: {
    width: 40,
    height: 40,
  },
  headerPill: {
    borderRadius: 999,
    backgroundColor: colors.brandSoft,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  headerPillText: {
    color: colors.brandDark,
    fontWeight: "700",
    fontSize: 13,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: colors.brand,
  },
  headerTitle: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    color: colors.ink,
  },
  headerSubtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.slate,
  },
  heroCard: {
    backgroundColor: colors.brandDeep,
    borderRadius: radii.xl,
    padding: spacing.xl,
    gap: spacing.md,
    ...shadows.card,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#9BFFB9",
  },
  heroTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    color: colors.surface,
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 24,
    color: "#D6E5DB",
  },
  heroActions: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: spacing.md,
  },
  sectionTextWrap: {
    flex: 1,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.ink,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.slate,
  },
  sectionAction: {
    color: colors.brandDark,
    fontSize: 14,
    fontWeight: "700",
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 15,
    minWidth: 140,
    alignItems: "center",
  },
  smallButton: {
    minWidth: 100,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButton: {
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#2B8A4E",
    minWidth: 140,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  secondaryButtonText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: "700",
  },
  metricCard: {
    flex: 1,
    minWidth: 100,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.ink,
  },
  metricLabel: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.slate,
    marginTop: 4,
  },
  serviceCard: {
    flex: 1,
    minWidth: 150,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(11,203,78,0.12)",
  },
  serviceCardSelected: {
    borderColor: colors.brand,
    borderWidth: 2,
  },
  serviceIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceName: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.ink,
  },
  serviceDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.slate,
  },
  providerCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  providerImage: {
    width: "100%",
    height: 190,
  },
  providerBody: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  providerTitleRow: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "flex-start",
  },
  providerName: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.ink,
  },
  providerMeta: {
    fontSize: 13,
    color: colors.slate,
    marginTop: 4,
  },
  providerStatsRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  providerStatText: {
    fontSize: 13,
    color: colors.slate,
  },
  providerBio: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.slate,
  },
  bookingCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  bookingRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.ink,
  },
  bookingProvider: {
    fontSize: 14,
    color: colors.slate,
    marginTop: 2,
  },
  bookingInfo: {
    fontSize: 13,
    color: colors.slate,
  },
  bookingPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.brandDark,
    marginTop: 4,
  },
  chatCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.brandSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  chatAvatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.brandDark,
  },
  chatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
  chatName: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.ink,
    flex: 1,
  },
  chatTime: {
    fontSize: 12,
    color: colors.slate,
  },
  chatMessage: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.slate,
    marginTop: 4,
  },
  chatUnread: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
  },
  chatUnreadText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.ink,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  statusApproved: {
    backgroundColor: "#E9F9EF",
  },
  statusPending: {
    backgroundColor: "#FFF5DE",
  },
  statusCompleted: {
    backgroundColor: "#EEF4FF",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.ink,
  },
  fieldWrap: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.ink,
  },
  fieldInput: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: colors.ink,
  },
  fieldTextarea: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  infoPanel: {
    flex: 1,
    minWidth: 140,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 10,
  },
  infoPanelTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.ink,
  },
  infoPanelDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.slate,
  },
  galleryImage: {
    width: 170,
    height: 130,
    borderRadius: radii.md,
    marginRight: spacing.sm,
  },
  bottomTabs: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    ...shadows.card,
  },
  bottomTabItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
  },
  bottomTabLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8A9B92",
  },
  bottomTabLabelActive: {
    color: colors.brandDark,
  },
});
