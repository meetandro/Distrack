import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/api";
import { CreateCollectibleRequest } from "../models/collectible";

export interface Collectible {
    id: number;
    name: string;
    description: string;
    color: number;
    currency: string;
    value: number;
    condition: string;
    acquiredDate: Date;
    isPatented: boolean;
    collectionId: number;
    categoryId: number;
    images: { url: string }[];
    tags: { id: number; name: string; hex: string }[];
}

interface CollectibleState {
    collectibles: Collectible[],
    totalCount: number,
    tempFilters: any,
    filters: any
}

const initialState: CollectibleState = {
    collectibles: [] as Collectible[],
    totalCount: 0,
    tempFilters: {
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
    }
}

export const fetchCollectibles = createAsyncThunk(
    "collectibles/fetchCollectibles",
    async ({ collectionId, page, pageSize, filters }: { collectionId: number; page: number; pageSize: number; filters: any }) => {
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
    }
);

export const createCollectible = createAsyncThunk(
    "collectibles/createCollectible",
    async (data: CreateCollectibleRequest) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('color', data.color.toString());
        formData.append('currency', data.currency);
        formData.append('value', data.value.toString());
        formData.append('condition', data.condition.toString());

        const date = new Date(data.acquiredDate);
        formData.append('acquiredDate', date.toISOString());

        formData.append('isPatented', data.isPatented.toString());
        formData.append('collectionId', data.collectionId.toString());
        formData.append('categoryId', data.categoryId.toString());
        data.images.forEach((image) => formData.append('images', image));

        const response = await api.post('/collectibles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { ...data, id: response.data };
    }
)

interface Params {
    data: any,
    images: any,
}

export const updateCollectible = createAsyncThunk(
    "collectibles/updateCollectible",
    async ({ data, images }: Params) => {
        const existingUrls = images.filter((image) => typeof image === 'string') as string[];
        const newFiles = images.filter((image) => image instanceof File) as File[];

        const res = {
            id: data.id,
            name: data.name,
            description: data.description,
            color: data.color,
            currency: data.currency,
            value: data.value,
            condition: data.condition,
            acquiredDate: data.acquiredDate,
            isPatented: data.isPatented,
            categoryId: data.categoryId,
            collectionId: data.collectionId,
            existingImages: existingUrls,
            newImages: newFiles,
        }

        const formData = new FormData();
        formData.append('id', res.id.toString());
        formData.append('name', res.name);
        formData.append('description', res.description ?? '');
        formData.append('color', res.color?.toString() ?? '');
        formData.append('currency', res.currency ?? '');
        formData.append('value', res.value?.toString() ?? '');
        formData.append('condition', res.condition?.toString() ?? '');

        const date = new Date(res.acquiredDate);
        formData.append('acquiredDate', date.toISOString());

        formData.append('isPatented', res.isPatented?.toString() ?? '');
        formData.append('collectionId', res.collectionId.toString());
        formData.append('categoryId', res.categoryId.toString());

        if (res.existingImages && res.existingImages.length > 0) {
            res.existingImages.forEach((imageUrl) => formData.append('existingImages', imageUrl));
        }

        formData.append('existingImages', '');

        if (res.newImages && res.newImages.length > 0) {
            res.newImages.forEach((image) => formData.append('newImages', image));
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
    reducers: {
        updateFilter: (state, action) => {
            state.tempFilters = { ...state.tempFilters, ...action.payload };
        },
        clearFilter: (state, action) => {
            const key = action.payload;
            state.tempFilters[key] = ["colors", "conditions", "categories", "tags"].includes(key) ? [] : null;
        },
        clearFilters: (state) => {
            state.filters = {
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
            };
            state.tempFilters = state.filters;
        },
        applyFilters: (state) => {
            state.filters = { ...state.tempFilters };
        },
        handleSortChange: (state, action) => {
            state.tempFilters.sortBy = action.payload;
        },
        handleSortOrderToggle: (state) => {
            state.tempFilters.sortOrder = state.tempFilters.sortOrder === "asc" ? "desc" : "asc";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollectibles.fulfilled, (state, action) => {
                state.collectibles = action.payload.items;
                state.totalCount = action.payload.totalCount;
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

export const { updateFilter, clearFilter, clearFilters, applyFilters, handleSortChange, handleSortOrderToggle } = collectibleSlice.actions;
export default collectibleSlice.reducer;

