import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  email: string;
  phone: string;
};

const initialState: InitialState = {
  email: '',
  phone: ''
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  selectors: {
    getState: (state) => state
  },
  reducers: {
    setUserInfo(state, action: PayloadAction<InitialState>) {
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    }
  }
});

export const ForgotPasswordReducer = forgotPasswordSlice.reducer;
export const ForgotPasswordActions = forgotPasswordSlice.actions;
export const ForgotPasswordSelectors = forgotPasswordSlice.selectors;
