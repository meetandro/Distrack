import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { getTags } from "../state/tagSlice";

export const useTags = (collectionId: number) => {
    const dispatch = useDispatch<AppDispatch>();
    const { tags } = useSelector((state: RootState) => state.tags)

    useEffect(() => {
        dispatch(getTags(collectionId));
    }, [dispatch, collectionId])

    return tags;
}

