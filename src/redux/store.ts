import { configureStore } from '@reduxjs/toolkit';
import active from './slices/activeSectionSlice';

export const store = configureStore({
  reducer: { active },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
