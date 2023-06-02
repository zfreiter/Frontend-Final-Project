import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  groups: [],
  owned: [],
  stockPrices: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.token = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setGroups: (state, action) => {
      state.groups = action.payload.groups;
    },
    setOwned: (state, action) => {
      state.owned = action.payload.owned;
    },
    setStockPrices: (state, action) => {
      state.stockPrices = action.payload.owned;
    },
  },
});

export const { setLogin, setLogout, setUser, setGroups, setOwned, setStockPrices } =
  authSlice.actions;
export default authSlice.reducer;
