import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { getCategories } from "../state/categorySlice";

export const useCategories = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories } = useSelector((state: RootState) => state.categories)

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    return categories;
}

