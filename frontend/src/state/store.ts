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
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['your/action/type'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['items.dates'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

