import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type User = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  country: string;
  city: string;
  dateOfBirth: string;
  biography: string;
  goal: string;
};

type InitialState = {
  users: User[];
};

const initialState: InitialState = {
  users: []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  selectors: {
    getUsers: (state) => state.users
  },
  reducers: {
    createUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    }
  }
});

export const UsersReducer = usersSlice.reducer;
export const UsersActions = usersSlice.actions;
export const UsersSelectors = usersSlice.selectors;
