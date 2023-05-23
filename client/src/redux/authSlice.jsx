import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  groups: [],
  owned: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.token = null;
    },
    setGroups: (state, action) => {
      state.groups = action.payload.groups;
    },
    setOwned: (state, action) => {
      state.owned = action.payload.owned;
    },
  },
});

export const { setLogin, setLogout, setGroups, setOwned } = authSlice.actions;
export default authSlice.reducer;
