import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/redux/store";
import UserListScreen from "./src/screens/UserListScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <View style={styles.container}>
          <UserListScreen />
        </View>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
