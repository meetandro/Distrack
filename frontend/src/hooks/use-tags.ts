import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../state/store";
import { fetchTags, selectAllTags, selectTagsStatus } from "../state/tag-slice";

export const useTags = (collectionId: number) => {
    const dispatch = useDispatch<AppDispatch>();
    const tags = useSelector(selectAllTags);
    const status = useSelector(selectTagsStatus);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTags(collectionId));
        }
    }, [dispatch, collectionId, status])

    return tags;
}

