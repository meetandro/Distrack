import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../state/store";
import { fetchCategories, selectAllCategories, selectCategoriesStatus } from "../state/categorySlice";

export const useCategories = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector(selectAllCategories);
    const status = useSelector(selectCategoriesStatus);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [dispatch, status])

    return categories;
}

