import { configureStore } from "@reduxjs/toolkit";
import Mail from "./Mail";

const store = configureStore({
  reducer: { mails: Mail },
});

export default store;
