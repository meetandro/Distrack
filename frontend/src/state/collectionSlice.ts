import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/api";
import { Collection } from "../models/collection";

interface CollectionState {
    collections: Collection[]
}

const initialState: CollectionState = {
    collections: []
}

export const getCollections = createAsyncThunk(
    "collections/getCollections",
    async () => {
        const response = await api.get(`/collections`);
        return response.data;
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
            .addCase(getCollections.fulfilled, (state, action) => {
                state.collections = action.payload;
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

