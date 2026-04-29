import { StyleSheet, Text, View } from "react-native";
import { spacing, typography } from "../styles/globalStyles";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../styles/colors";

export default function UserListEmpty() {
  return (
    <View style={styles.emptyState}>
      <MaterialIcons name="error" size={50} color={colors.primary} />
      <Text style={[typography.heading2, styles.emptyTitle]}>
        No users found
      </Text>
      <Text style={[typography.body, styles.emptyBody]}>
        Try adjusting your search or load more users below.
      </Text>
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    paddingHorizontal: spacing.xxxl,
    paddingTop: spacing.xxxl * 2,
    gap: spacing.md,
  },
  emptyTitle: {
    textAlign: "center",
  },
  emptyBody: {
    textAlign: "center",
    color: colors.textMuted,
  },
});
