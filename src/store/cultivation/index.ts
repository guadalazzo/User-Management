import { createSlice } from '@reduxjs/toolkit';
import { cultivation, Role } from '@/types';

export const cultivationReducer = createSlice({
  name: 'cultivationReducer',
  initialState: {
    roles: [] as Role[],
    cultivations: [] as cultivation[],
    currentCultivation: {} as cultivation,
  },
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setCultivationsList: (state, action) => {
      state.cultivations = action.payload;
    },
    setCurrentCultivation: (state, action) => {
      state.currentCultivation = action.payload;
    },
  },
});

export const { setRoles, setCultivationsList, setCurrentCultivation } = cultivationReducer.actions;

export default cultivationReducer.reducer;
