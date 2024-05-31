import { configureStore } from '@reduxjs/toolkit';
import cultivationReducerA from './cultivation';

export default configureStore({
  reducer: {
    cultivations: cultivationReducerA,
  },
});
