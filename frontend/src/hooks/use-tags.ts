import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../state/store";
import { fetchTags, selectAllTags } from "../state/tag-slice";

export const useTags = (collectionId: number) => {
    const dispatch = useDispatch<AppDispatch>();
    const tags = useSelector(selectAllTags);

    useEffect(() => {
        dispatch(fetchTags(collectionId));
    }, [dispatch, collectionId])

    return tags;
}

