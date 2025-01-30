import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { fetchCollectibles } from "../state/collectibleSlice";

export const useCollectibles = (collectionId: number, page: number, pageSize: number, filters: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const { collectibles } = useSelector((state: RootState) => state.collectibles)

    useEffect(() => {
        dispatch(fetchCollectibles({ collectionId, page, pageSize, filters }));
    }, [dispatch, collectionId, filters])

    return collectibles;
}

