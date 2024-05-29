import { createSlice } from '@reduxjs/toolkit';
import { Role } from '../../types';

export const cultivationReducer = createSlice({
  name: 'cultivationReducer',
  initialState: {
    roles: [] as Role[],
  },
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const { setRoles } = cultivationReducer.actions;

export default cultivationReducer.reducer;
