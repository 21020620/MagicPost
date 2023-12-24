import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        workplace: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.employee;
            state.workplace = action.payload.workplace;
        },
        logout: (state) => {
            state.user = null;
            state.workplace = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;