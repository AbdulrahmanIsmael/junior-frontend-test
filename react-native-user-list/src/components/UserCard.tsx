import { StyleSheet, Text, View } from "react-native";
import { radius, shadow, spacing, typography } from "../styles/globalStyles";

import { Feather } from "@expo/vector-icons";
import React from "react";
import { T_user } from "@/types/users-types";
import colors from "../styles/colors";

interface UserCardProps {
  user?: Partial<T_user>;
}

export default function UserCard({ user = {} }: UserCardProps) {
  const { name = "", username = "", email = "", address } = user;

  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const addressLine = [address?.street, address?.city, address?.zipcode]
    .filter(Boolean)
    .join(", ");

  return (
    <View style={styles.card}>
      {/* Header: avatar + name + username badge */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>

        <View style={styles.headerText}>
          <Text style={[typography.heading2, styles.name]} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.usernameBadge}>
            <Text style={styles.usernameText}>@{username}</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Info rows */}
      <View style={styles.infoGrid}>
        {email && <InfoRow icon="mail" label={email} />}
        {addressLine && <InfoRow icon="map-pin" label={addressLine} />}
      </View>
    </View>
  );
}

interface InfoRowProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
}

function InfoRow({ icon, label }: InfoRowProps) {
  if (!label) return null;
  return (
    <View style={styles.infoRow}>
      <Feather
        name={icon}
        size={14}
        color={colors.textSecondary}
        style={styles.infoIcon}
      />
      <Text style={[typography.caption, styles.infoText]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

// style constants
const AVATAR_SIZE = 52;

// styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs + 2,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.divider,
    ...shadow.card,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderWidth: 2,
    borderColor: colors.primary + "33",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
  },

  headerText: {
    flex: 1,
    gap: spacing.xs - 2,
  },
  name: {},
  usernameBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  usernameText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
    letterSpacing: 0.2,
  },

  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: -spacing.xs + 2,
  },

  infoGrid: {
    gap: spacing.xs + 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  infoIcon: {
    width: 16,
    textAlign: "center",
  },
  infoText: {
    flex: 1,
    color: colors.textSecondary,
  },
});
