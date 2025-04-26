import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        // Тут будуть наші редюсери
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 