import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice"
import tagReducer from "./tagSlice"
import collectionReducer from './collectionSlice'
import collectibleReducer from './collectibleSlice'

export const store = configureStore({
    reducer: {
        collections: collectionReducer,
        collectibles: collectibleReducer,
        categories: categoryReducer,
        tags: tagReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

