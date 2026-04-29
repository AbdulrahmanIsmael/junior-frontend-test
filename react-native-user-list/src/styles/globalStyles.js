/**
 * globalStyles.js
 * Shared layout primitives and typography tokens.
 * Import individual keys into component stylesheets as needed.
 */

import { StyleSheet } from 'react-native';

import colors from './colors';

// ─── Typography scale ────────────────────────────────────────────────────────

export const typography = StyleSheet.create({
  /** Screen / section header */
  heading1: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  /** Card title / prominent label */
  heading2: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.1,
  },
  /** Body copy */
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  /** De-emphasised / meta text */
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textMuted,
    lineHeight: 16,
  },
});

// ─── Spacing scale (pt) ──────────────────────────────────────────────────────

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// ─── Border radii ────────────────────────────────────────────────────────────

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};

// ─── Shadow presets ──────────────────────────────────────────────────────────

export const shadow = {
  /** Subtle card shadow */
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,          // Android
  },
};

// ─── Common layout helpers ───────────────────────────────────────────────────

export const layout = StyleSheet.create({
  flex1: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },
  screenPadding: { paddingHorizontal: spacing.lg },
});
