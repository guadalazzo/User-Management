import { configureStore } from '@reduxjs/toolkit';
import cultivationReducer from './cultivation';

export default configureStore({
  reducer: {
    cultivations: cultivationReducer,
  },
});
