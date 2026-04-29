import { Provider } from "react-redux";
import { Stack } from "expo-router";
import { store } from "@/redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
