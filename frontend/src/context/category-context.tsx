import React, { createContext, useReducer } from 'react';

import categoryReducer from './category-reducer';
import CategoryService from '../services/category-service';
import { Category } from '../models/category';

const initialState = {
    categories: await CategoryService.getAll(),
    addCategory: (category: Category) => { },
    editCategory: (category: Category) => { },
    removeCategory: (id: number) => { },
};

export const CategoryContext = createContext(initialState);

export const CategoryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoryReducer, initialState);

    async function addCategory(category: Category) {
        const id = await CategoryService.create(category)
        dispatch({
            type: "ADD_CATEGORY",
            payload: { ...category, id: id }
        });
    }

    async function editCategory(category: Category) {
        await CategoryService.update(category)
        dispatch({
            type: "EDIT_CATEGORY",
            payload: category
        });
    }

    async function removeCategory(id: number) {
        await CategoryService.delete(id)
        dispatch({
            type: "REMOVE_CATEGORY",
            payload: id
        });
    }

    return (
        <CategoryContext.Provider
            value={{
                categories: state.categories,
                addCategory,
                editCategory,
                removeCategory
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
};
