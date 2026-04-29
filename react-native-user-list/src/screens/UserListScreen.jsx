import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useCallback, useEffect } from "react";
import {
  getUsers,
  loadMoreUsers,
  setQuery,
} from "@/redux/features/users/usersSlice";
import { layout, radius, shadow, spacing } from "../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";

import ErrorView from "../components/ErrorView";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import UserCardSkeleton from "../components/UserCardSkeleton";
import UserListEmpty from "../components/UserListEmpty";
import UserListHeader from "../components/UserListHeader";
import colors from "../styles/colors";

export default function UserListScreen() {
  const dispatch = useDispatch();

  const {
    filteredUsers,
    allUsers,
    query,
    loading,
    loadingMore,
    error,
    hasMore,
    fromCache,
  } = useSelector((state) => state.users);

  // fetch users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // optimized cached search change event handler
  const handleSearchChange = useCallback(
    (text) => {
      dispatch(setQuery(text));
    },
    [dispatch],
  );

  // optimized load more event handler
  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      dispatch(loadMoreUsers());
    }
  }, [dispatch, loadingMore, hasMore]);

  // optimized retry event handler
  const handleRetry = useCallback(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // optimized render item
  const renderItem = useCallback(({ item }) => <UserCard user={item} />, []);

  // optimized key extractor
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  // skeleton loading for users cards
  if (loading) {
    return (
      <SafeAreaView style={[layout.flex1, styles.safeArea]} edges={["top"]}>
        <UserListHeader userCount={0} />
        <View style={styles.searchWrapper}>
          <SearchBar value="" />
        </View>
        <View style={styles.skeletonList}>
          {Array.from({ length: 5 }).map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  // error handling
  if (error) {
    return (
      <SafeAreaView style={[layout.flex1, styles.safeArea]} edges={["top"]}>
        <ErrorView onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  const ListHeader = (
    <View style={styles.listHeader}>
      {fromCache && (
        <View style={styles.offlineBanner}>
          <Feather name="wifi-off" size={13} color={colors.primary} />
          <Text style={styles.offlineBannerText}>
            Offline · showing cached data
          </Text>
          <TouchableOpacity
            onPress={handleRetry}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.offlineRetryLink}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      <UserListHeader userCount={allUsers.length} />
      <View style={styles.searchWrapper}>
        <SearchBar value={query} onChangeText={handleSearchChange} />
      </View>
    </View>
  );

  // load more button footer
  const ListFooter = hasMore ? (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.loadMoreBtn, loadingMore && styles.loadMoreBtnDisabled]}
        onPress={handleLoadMore}
        activeOpacity={0.75}
        disabled={loadingMore}
      >
        {loadingMore ? (
          <View style={styles.loadMoreInner}>
            <ActivityIndicator size="small" color={colors.textOnPrimary} />
            <Text style={styles.loadMoreText}>Loading…</Text>
          </View>
        ) : (
          <View style={styles.loadMoreInner}>
            <Feather
              name="chevrons-down"
              size={18}
              color={colors.textOnPrimary}
            />
            <Text style={styles.loadMoreText}>Load More</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  ) : filteredUsers.length > 0 ? (
    <View style={styles.endOfList}>
      <View style={styles.endLine} />
      <Text style={styles.endText}>All users shown</Text>
      <View style={styles.endLine} />
    </View>
  ) : null;

  return (
    <SafeAreaView style={[layout.flex1, styles.safeArea]} edges={["top"]}>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={UserListEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
  },

  offlineBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs + 2,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    paddingVertical: spacing.xs + 1,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary + "33",
  },
  offlineBannerText: {
    flex: 1,
    fontSize: 12,
    color: colors.primary,
    fontWeight: "500",
  },
  offlineRetryLink: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "700",
    textDecorationLine: "underline",
  },

  listContent: {
    paddingBottom: spacing.xxxl,
  },

  listHeader: {
    paddingBottom: spacing.md,
  },
  searchWrapper: {
    paddingHorizontal: spacing.lg,
  },

  skeletonList: {
    marginTop: spacing.md,
  },

  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  loadMoreBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.md + 2,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.card,
    shadowOpacity: 0.14,
  },
  loadMoreBtnDisabled: {
    opacity: 0.75,
  },
  loadMoreInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  loadMoreText: {
    color: colors.textOnPrimary,
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  endOfList: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  endLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  endText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: "500",
  },
});
