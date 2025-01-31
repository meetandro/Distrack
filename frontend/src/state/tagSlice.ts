import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Tag } from "../models/tag";
import { api } from "../utils/api";
import { RootState } from "./store";

interface TagState {
    tags: Tag[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: TagState = {
    tags: [],
    status: 'idle'
}

export const fetchTags = createAsyncThunk(
    "tags/fetchTags",
    async (collectionId: number) => {
        const response = await api.get(`/collections/${collectionId}/tags`);
        return response.data;
    }
)

export const createTag = createAsyncThunk(
    "tags/createTag",
    async (data: Partial<Tag>) => {
        const response = await api.post('/tags', data)
        return { ...data, id: response.data } as Tag;
    }
)

export const updateTag = createAsyncThunk(
    "tags/updateTag",
    async (data: Partial<Tag>) => {
        const response = await api.put(`/tags/${data.id}`, data);
        return { ...response.data, id: data.id } as Tag;
    }
)

export const deleteTag = createAsyncThunk(
    "tags/deleteTag",
    async (id: number) => {
        await api.delete(`/tags/${id}`);
        return id;
    }
)

export const addTagsToCollectible = createAsyncThunk(
    "tags/addTagsToCollectible",
    async (payload: { id: number, tagIds: number[] }) => {
        const response = await api.post(`/collectibles/${payload.id}/tags`, payload);
        return response.data;
    }
)

const tagSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags = action.payload;
            })

            .addCase(createTag.fulfilled, (state, action) => {
                state.tags.push(action.payload)
            })

            .addCase(updateTag.fulfilled, (state, action) => {
                const index = state.tags.findIndex(tag => tag.id === action.payload.id);
                if (index !== -1) {
                    state.tags[index] = action.payload;
                }
            })

            .addCase(deleteTag.fulfilled, (state, action) => {
                state.tags = state.tags.filter(tag => tag.id !== action.payload)
            })
    }
});

export default tagSlice.reducer;

export const selectAllTags = (state: RootState) => state.tags.tags;
export const selectTagsStatus = (state: RootState) => state.tags.status;

