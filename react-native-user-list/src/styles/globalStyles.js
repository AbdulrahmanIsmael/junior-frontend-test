import { StyleSheet } from "react-native";
import colors from "./colors";

export const typography = StyleSheet.create({
  heading1: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  heading2: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    letterSpacing: -0.1,
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.textMuted,
    lineHeight: 16,
  },
});

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};

export const shadow = {
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
};

export const layout = StyleSheet.create({
  flex1: { flex: 1 },
  row: { flexDirection: "row", alignItems: "center" },
  screenPadding: { paddingHorizontal: spacing.lg },
});
