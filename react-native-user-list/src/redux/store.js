import { configureStore } from "@reduxjs/toolkit";
import usersSliceReducer from "./features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersSliceReducer,
  },
});