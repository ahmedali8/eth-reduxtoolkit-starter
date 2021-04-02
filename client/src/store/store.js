import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { initWeb3Reducer } from './reducers/initWeb3Slice';

export const store = configureStore({
  reducer: {
    initWeb3Reducer: initWeb3Reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});
