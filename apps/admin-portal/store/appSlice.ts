import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface UserProps {
  name: string;
  email: string;
  role: string;
  username: string;
}

const initialState = {
  user: {
    name: null,
    email: null,
    role: null,
    username: null,
  },
  authorized: false,
};
// Actual Slice
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearStore: () => initialState,
    setUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.app,
      };
    },
  },
});

export const { clearStore, setUser, setAuthorized } = appSlice.actions;

export default appSlice.reducer;
