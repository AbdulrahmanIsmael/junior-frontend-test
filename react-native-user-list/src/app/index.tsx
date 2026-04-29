import { StyleSheet, View } from "react-native";

import UserListScreen from "../screens/UserListScreen";

export default function Index() {
  return (
    <View style={styles.container}>
      <UserListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
