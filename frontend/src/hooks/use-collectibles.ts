import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../state/store";
import { applyFilters, fetchCollectibles, selectAllCollectibles, selectCollectiblesStatus, selectCollectiblesTotalCount } from "../state/collectible-slice";

export const useCollectibles = (collectionId: number, page: number, pageSize: number) => {
    const dispatch = useDispatch<AppDispatch>();
    const collectibles = useSelector(selectAllCollectibles)
    const status = useSelector(selectCollectiblesStatus)
    const totalCount = useSelector(selectCollectiblesTotalCount)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const filters = {
            searchQuery: queryParams.get("searchQuery") || "",
            colors: queryParams.getAll("colors"),
            currency: queryParams.get("currency") || "",
            minValue: queryParams.get("minValue") ? queryParams.get("minValue") : null,
            maxValue: queryParams.get("maxValue") ? queryParams.get("maxValue") : null,
            conditions: queryParams.getAll("conditions"),
            categories: queryParams.getAll("categories"),
            tags: queryParams.getAll("tags"),
            acquiredFrom: queryParams.get("acquiredFrom") || null,
            acquiredTo: queryParams.get("acquiredTo") || null,
            isPatented: queryParams.get("isPatented") ? JSON.parse(queryParams.get("isPatented")!) : null,
            sortBy: queryParams.get("sortBy") || "",
            sortOrder: queryParams.get("sortOrder") || "asc",
        };

        dispatch(applyFilters(filters))
        dispatch(fetchCollectibles({ collectionId, page, pageSize, filters }));

    }, [collectionId, dispatch, page, pageSize, location.search]);

    return { collectibles, totalCount, status };
}

