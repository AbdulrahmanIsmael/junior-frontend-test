import { StyleSheet, Text, View } from "react-native";
import { spacing, typography } from "../styles/globalStyles";

import colors from "../styles/colors";

export default function UserListHeader({ userCount = 0 }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Users</Text>
      </View>

      <View style={styles.countBadge}>
        <Text style={styles.countBadgeText}>{userCount}</Text>
      </View>
    </View>
  );
}

// style constants
const BADGE_SIZE = 36;

// styles
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerTitle: {
    ...typography.heading1,
    fontSize: 26,
    color: colors.primary,
  },

  countBadge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  countBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
});
