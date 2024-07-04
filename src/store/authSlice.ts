import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ email: string; name: string; token: string }>
    ) {
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload?.token);
      state.user = action.payload;
    },
    register(state, action: PayloadAction<{ email: string; name: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, register, logout } = authSlice.actions;

export default authSlice.reducer;
