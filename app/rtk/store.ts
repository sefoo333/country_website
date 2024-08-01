import { configureStore } from "@reduxjs/toolkit";
import darkMode from "./slices/darkmode";

export const store = configureStore({
    reducer: {
        dark: darkMode,
    }
})