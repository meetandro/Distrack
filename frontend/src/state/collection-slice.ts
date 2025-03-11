import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/api";
import { Collection } from "../models/collection";
import { RootState } from "./store";

interface CollectionState {
    collections: Collection[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: CollectionState = {
    collections: [],
    status: 'idle'
}

export const fetchCollections = createAsyncThunk(
    "collections/fetchCollections",
    async () => {
        const response = await api.get('/collections')
        return response.data
    }
)

export const createCollection = createAsyncThunk(
    "collections/createCollections",
    async (data: Partial<Collection>) => {
        const response = await api.post('/collections', data)
        return { ...data, id: response.data } as Collection;
    }
)

export const updateCollection = createAsyncThunk(
    "collections/updateCollection",
    async (data: Partial<Collection>) => {
        const response = await api.put(`/collections/${data.id}`, data);
        return { ...response.data, id: data.id } as Collection;
    }
)

export const deleteCollection = createAsyncThunk(
    "collections/deleteCollection",
    async (id: Collection['id']) => {
        await api.delete(`/collections/${id}`);
        return id;
    }
)

const collectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollections.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchCollections.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.collections = action.payload;
            })
            .addCase(fetchCollections.rejected, (state) => {
                state.status = 'failed';
            })

            .addCase(createCollection.fulfilled, (state, action) => {
                state.collections.push(action.payload)
            })

            .addCase(updateCollection.fulfilled, (state, action) => {
                const index = state.collections.findIndex(tag => tag.id === action.payload.id);
                if (index !== -1) {
                    state.collections[index] = { ...action.payload, createdDate: state.collections[index].createdDate };
                }
            })

            .addCase(deleteCollection.fulfilled, (state, action) => {
                state.collections = state.collections.filter(tag => tag.id !== action.payload)
            })
    }
});

export default collectionSlice.reducer;

export const selectAllCollections = (state: RootState) => state.collections.collections;
export const selectCollectionsStatus = (state: RootState) => state.collections.status;

