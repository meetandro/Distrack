import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/api";
import { Collectible } from "../models/collectible";
import { Filters } from "../models/filters";
import { RootState } from "./store";

interface CollectibleState {
    collectibles: Collectible[],
    totalCount: number,
    filters: Filters,
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: CollectibleState = {
    collectibles: [] as Collectible[],
    totalCount: 0,
    filters: {
        searchQuery: "",
        colors: [],
        currency: "",
        minValue: null,
        maxValue: null,
        conditions: [],
        categories: [],
        tags: [],
        acquiredFrom: null,
        acquiredTo: null,
        isPatented: null,
        sortBy: "",
        sortOrder: "asc",
    },
    status: 'idle'
}

export const fetchCollectibles = createAsyncThunk(
    "collectibles/fetchCollectibles",
    async ({ collectionId, page, pageSize, filters }: { collectionId: number; page: number; pageSize: number; filters: Filters }) => {
        const response = await api.get(`/collections/${collectionId}/collectibles`, {
            params: {
                page,
                pageSize,
                searchQuery: filters.searchQuery,
                colors: filters.colors.join(','),
                currency: filters.currency,
                minValue: filters.minValue,
                maxValue: filters.maxValue,
                conditions: filters.conditions.join(','),
                categories: filters.categories.join(','),
                tags: filters.tags.join(','),
                acquiredFrom: filters.acquiredFrom,
                acquiredTo: filters.acquiredTo,
                isPatented: filters.isPatented,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
            },
        });
        return response.data;
    },
);

export const createCollectible = createAsyncThunk(
    "collectibles/createCollectible",
    async ({ data, images }: { data: Collectible, images: File[] }) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('color', data.color.toString());
        formData.append('currency', data.currency);
        formData.append('value', data.value.toString());
        formData.append('condition', data.condition.toString());
        formData.append('acquiredDate', data.acquiredDate);
        formData.append('isPatented', data.isPatented.toString());
        formData.append('collectionId', data.collectionId.toString());
        formData.append('categoryId', data.categoryId.toString());
        images.forEach((image) => formData.append('images', image));

        const response = await api.post('/collectibles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { ...data, id: response.data } as Collectible;
    }
)

export const updateCollectible = createAsyncThunk(
    "collectibles/updateCollectible",
    async ({ data, images }: { data: Collectible, images: (string | File)[] }) => {
        const formData = new FormData();
        formData.append('id', data.id.toString());
        formData.append('name', data.name);
        formData.append('description', data.description ?? '');
        formData.append('color', data.color?.toString() ?? '');
        formData.append('currency', data.currency ?? '');
        formData.append('value', data.value?.toString() ?? '');
        formData.append('condition', data.condition?.toString() ?? '');
        formData.append('acquiredDate', data.acquiredDate);
        formData.append('isPatented', data.isPatented?.toString() ?? '');
        formData.append('collectionId', data.collectionId.toString());
        formData.append('categoryId', data.categoryId.toString());

        const existingUrls = images.filter((image) => typeof image === 'string') as string[];
        if (existingUrls && existingUrls.length > 0) {
            existingUrls.forEach((imageUrl) => formData.append('existingImages', imageUrl));
        }
        formData.append('existingImages', '');

        const newFiles = images.filter((image) => image instanceof File) as File[];
        if (newFiles && newFiles.length > 0) {
            newFiles.forEach((image) => formData.append('newImages', image));
        }

        const response = await api.put(`/collectibles/${data.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return { ...response.data, id: data.id };
    }
)

export const deleteCollectible = createAsyncThunk(
    "collectibles/deleteCollectible",
    async (id: number) => {
        await api.delete(`/collectibles/${id}`);
        return id;
    }
)

const collectibleSlice = createSlice({
    name: "collectibles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollectibles.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchCollectibles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.collectibles = action.payload.items;
                state.totalCount = action.payload.totalCount;
                state.filters = action.meta.arg.filters
            })
            .addCase(fetchCollectibles.rejected, (state) => {
                state.status = 'failed'
            })

            .addCase(createCollectible.fulfilled, (state, action) => {
                state.collectibles.push(action.payload)
            })

            .addCase(updateCollectible.fulfilled, (state, action) => {
                const index = state.collectibles.findIndex(tag => tag.id === action.payload.id);
                if (index !== -1) {
                    state.collectibles[index] = { ...action.payload, tags: state.collectibles[index].tags };
                }
            })

            .addCase(deleteCollectible.fulfilled, (state, action) => {
                state.collectibles = state.collectibles.filter(tag => tag.id !== action.payload)
            })
    }
});

export default collectibleSlice.reducer;

export const selectAllCollectibles = (state: RootState) => state.collectibles.collectibles
export const selectCollectiblesTotalCount = (state: RootState) => state.collectibles.totalCount
export const selectCollectiblesFilters = (state: RootState) => state.collectibles.filters
export const selectCollectiblesStatus = (state: RootState) => state.collectibles.status

