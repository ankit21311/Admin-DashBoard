import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import newsSlice from './slices/newsSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        news: newsSlice,
        ui: uiSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;