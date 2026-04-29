import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { radius, shadow, spacing, typography } from "../styles/globalStyles";
import colors from "../styles/colors";

interface ErrorViewProps {
  onRetry?: () => void;
}

export default function ErrorView({ onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      {/* Icon ring */}
      <View style={styles.iconRing}>
        <View style={styles.iconCircle}>
          <Feather name="wifi-off" size={32} color={colors.primary} />
        </View>
      </View>

      {/* Text block */}
      <View style={styles.textBlock}>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.body}>
          We couldn't load the user list. Please check your connection and try
          again.
        </Text>
      </View>

      {/* Retry button */}
      {onRetry && (
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Feather name="refresh-cw" size={16} color={colors.textOnPrimary} />
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}

      {/* Decorative card */}
      <View style={styles.decorCard}>
        <View style={styles.decorRow}>
          <View style={[styles.decorDot, { backgroundColor: "#FF6B6B" }]} />
          <View style={[styles.decorDot, { backgroundColor: "#FFD93D" }]} />
          <View style={[styles.decorDot, { backgroundColor: "#6BCB77" }]} />
        </View>
        <View style={styles.decorLines}>
          <View style={[styles.decorLine, { width: "70%" }]} />
          <View style={[styles.decorLine, { width: "50%" }]} />
          <View style={[styles.decorLine, { width: "60%" }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.xxxl * 2,
    gap: spacing.xl,
  },

  // ── Icon ────────────────────────────────────────────────────────────────────
  iconRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.primary + "33",
    ...shadow.card,
    shadowOpacity: 0.1,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.card,
  },

  // ── Text ────────────────────────────────────────────────────────────────────
  textBlock: {
    gap: spacing.sm,
    alignItems: "center",
  },
  title: {
    ...typography.heading2,
    fontSize: 20,
    textAlign: "center",
    color: colors.textPrimary,
  },
  body: {
    ...typography.body,
    textAlign: "center",
    color: colors.textMuted,
    lineHeight: 22,
  },

  // ── Retry button ────────────────────────────────────────────────────────────
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    ...shadow.card,
    shadowOpacity: 0.18,
  },
  retryText: {
    color: colors.textOnPrimary,
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  // ── Decorative broken card ───────────────────────────────────────────────────
  decorCard: {
    width: "80%",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    gap: spacing.sm,
    opacity: 0.5,
    ...shadow.card,
  },
  decorRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  decorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.7,
  },
  decorLines: {
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  decorLine: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceSubtle,
  },
});
