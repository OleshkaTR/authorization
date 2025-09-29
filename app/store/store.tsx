import { configureStore } from '@reduxjs/toolkit';
import { SignUpReducer as signUp } from './sign-up/slice';
import { AuthSliceReducer as auth } from './auth/slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      signUp,
      auth
    }
  })
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
