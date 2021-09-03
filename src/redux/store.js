import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./reducers";

const store = configureStore({
  reducer: {
    contactsReducer,
  },
});

export default store;
