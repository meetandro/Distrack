import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './category-slice'
import tagReducer from "./tag-slice"
import collectionReducer from './collection-slice'
import collectibleReducer from './collectible-slice'

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

