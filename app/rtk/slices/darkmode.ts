import { createSlice } from "@reduxjs/toolkit";

export let darkMode = createSlice({
    initialState: "dark",
    name: "darkMode",
    reducers: {
        change: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})

export const { change } = darkMode.actions
export default darkMode.reducer