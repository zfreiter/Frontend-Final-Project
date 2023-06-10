import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  groups: [],
  owned: [],
  currentStocks: [],
  currentStockInfo: null,
  stockString: '',
  stories: [],
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
    setCurrentStocks: (state, action) => {
      state.currentStocks = action.payload.currentStocks;
    },
    setCurrentStockInfo: (state, action) => {
      state.currentStockInfo = action.payload.currentStockInfo;
    },
    setStockString: (state, action) => {
      state.stockString = action.payload.stockString;
    },
    setStories: (state, action) => {
      state.stories = action.payload.stories;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setUser,
  setGroups,
  setOwned,
  setCurrentStocks,
  setCurrentStockInfo,
  setStockString,
  setStories,
} = authSlice.actions;
export default authSlice.reducer;
