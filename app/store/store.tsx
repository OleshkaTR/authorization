import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { SignUpReducer as signUp } from './sign-up/slice';
import { AuthSliceReducer as auth } from './auth/slice';
import { UsersReducer as users } from './users/slice';
import { ForgotPasswordReducer as forgotPassword } from './forgot-password/slice';

const rootReducer = combineReducers({
  signUp,
  auth,
  users,
  forgotPassword
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'users']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>['store'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
