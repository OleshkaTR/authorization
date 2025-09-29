import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SignUpUserInfo = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  city: string;
  dateOfBirth: string;
  biography: string;
  goal: string;
  confirm: boolean;
};

type InitialState = {
  step: number;
  userInfo: SignUpUserInfo;
};

const initialState: InitialState = {
  step: 0,
  userInfo: {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    country: '',
    city: '',
    dateOfBirth: '',
    biography: '',
    goal: '',
    confirm: true,
  }
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  selectors: {
    getStep: (state) => state.step,
    getUserInfo: (state) => state.userInfo
  },
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    setUserInfo(state, action: PayloadAction<Partial<SignUpUserInfo>>) {
      state.userInfo = { ...state.userInfo, ...action.payload }
    }
  }
});

export const SignUpReducer = signUpSlice.reducer;
export const SignUpActions = signUpSlice.actions;
export const SignUpSelectors = signUpSlice.selectors;
