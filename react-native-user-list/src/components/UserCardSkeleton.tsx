import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { radius, shadow, spacing } from "../styles/globalStyles";
import colors from "../styles/colors";

// ─── Single shimmer block ─────────────────────────────────────────────────────

function ShimmerBlock({
  width,
  height,
  style,
}: {
  width: number | `${number}%`;
  height: number;
  style?: object;
}) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width, height, borderRadius: radius.sm, backgroundColor: colors.surfaceSubtle },
        { opacity },
        style,
      ]}
    />
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────

export default function UserCardSkeleton() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        {/* Avatar circle */}
        <View style={styles.avatarSkeleton} />
        {/* Name + username pill */}
        <View style={styles.headerText}>
          <ShimmerBlock width="60%" height={14} />
          <ShimmerBlock width="35%" height={10} style={{ marginTop: 6 }} />
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Info rows */}
      <View style={styles.infoGrid}>
        <View style={styles.infoRow}>
          <ShimmerBlock width={16} height={14} style={{ borderRadius: 4 }} />
          <ShimmerBlock width="70%" height={12} />
        </View>
        <View style={styles.infoRow}>
          <ShimmerBlock width={16} height={14} style={{ borderRadius: 4 }} />
          <ShimmerBlock width="55%" height={12} />
        </View>
      </View>
    </View>
  );
}

const AVATAR_SIZE = 52;

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
  avatarSkeleton: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.surfaceSubtle,
    flexShrink: 0,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
  infoGrid: {
    gap: spacing.xs + 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
});
