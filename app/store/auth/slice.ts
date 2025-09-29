import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isAuthenticated: boolean;
};

const initialState: InitialState = {
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    getIsAuthenticated: (state) => state.isAuthenticated
  },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    }
  }
});

export const AuthSliceReducer = authSlice.reducer;
export const AuthSliceActions = authSlice.actions;
export const AuthSliceSelectors = authSlice.selectors;
