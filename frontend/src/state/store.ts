import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice"
import tagReducer from "./tagSlice"

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        tags: tagReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

