import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections, selectAllCollections, selectCollectionsStatus } from "../state/collection-slice";
import { AppDispatch } from "../state/store";

export const useCollections = () => {
    const dispatch = useDispatch<AppDispatch>();
    const collections = useSelector(selectAllCollections)
    const collectionStatus = useSelector(selectCollectionsStatus)

    useEffect(() => {
        if (collectionStatus === 'idle') {
            dispatch(fetchCollections());
        }
    }, [dispatch, collectionStatus])

    return collections;
}

