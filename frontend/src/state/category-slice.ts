import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../models/category";
import { api } from "../utils/api";
import { RootState } from "./store";

interface CategoryState {
    categories: Category[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: CategoryState = {
    categories: [],
    status: 'idle'
}

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        const response = await api.get('/categories');
        return response.data;
    }
)

export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (data: Partial<Category>) => {
        const response = await api.post('/categories', data)
        return { ...data, id: response.data } as Category;
    }
)

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async (data: Partial<Category>) => {
        const response = await api.put(`/categories/${data.id}`, data);
        return { ...response.data, id: data.id } as Category;
    }
)

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id: number) => {
        await api.delete(`/categories/${id}`);
        return id;
    }
)

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.status = 'failed';
            })

            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload)
            })

            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(cat => cat.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })

            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(c => c.id !== action.payload)
            })
    }
});

export default categorySlice.reducer;

export const selectAllCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesStatus = (state: RootState) => state.categories.status;

