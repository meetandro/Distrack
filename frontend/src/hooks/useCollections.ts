import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollections } from "../state/collectionSlice";
import { AppDispatch, RootState } from "../state/store";

export const useCollections = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { collections } = useSelector((state: RootState) => state.collections)

    useEffect(() => {
        dispatch(getCollections());
    }, [dispatch])

    return collections;
}

