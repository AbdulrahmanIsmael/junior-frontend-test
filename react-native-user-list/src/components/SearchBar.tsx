import { StyleSheet, TextInput, View } from "react-native";
import { radius, spacing } from "../styles/globalStyles";

import Feather from "@expo/vector-icons/Feather";
import React from "react";
import colors from "../styles/colors";
import { useState } from "react";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({
  value = "",
  onChangeText = () => {},
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={[
        styles.wrapper,
        isFocused && {
          borderColor: colors.primary,
          shadowColor: colors.primary,
        },
      ]}
    >
      <Feather
        name="search"
        size={24}
        color={isFocused ? colors.primary : colors.textMuted}
      />

      <TextInput
        style={[styles.input, isFocused && { outline: "none" }]}
        placeholder="Search users..."
        placeholderTextColor={colors.inputPlaceholder}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        clearButtonMode="while-editing"
        autoCorrect={false}
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    gap: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
    margin: 0,
  },
});
