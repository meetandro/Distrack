import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../state/store";
import { fetchCollectibles, selectAllCollectibles, selectCollectiblesStatus, selectCollectiblesTotalCount } from "../state/collectible-slice";
import { Filters } from "../models/filters";
import { useLocation } from "react-router-dom";

export const useCollectibles = (collectionId: number, page: number, pageSize: number) => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const collectibles = useSelector(selectAllCollectibles)
    const status = useSelector(selectCollectiblesStatus)
    const totalCount = useSelector(selectCollectiblesTotalCount)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const getQueryArray = (key: string) => queryParams.get(key)?.split(',') || [];
        const getQueryValue = (key: string, defaultValue: string | null = null) => queryParams.get(key) || defaultValue;

        const filters: Filters = {
            searchQuery: getQueryValue("searchQuery", ""),
            colors: getQueryArray("colors"),
            conditions: getQueryArray("conditions"),
            categories: getQueryArray("categories"),
            tags: getQueryArray("tags"),
            currency: getQueryValue("currency", ""),
            minValue: getQueryValue("minValue"),
            maxValue: getQueryValue("maxValue"),
            acquiredFrom: getQueryValue("acquiredFrom"),
            acquiredTo: getQueryValue("acquiredTo"),
            isPatented: queryParams.get("isPatented") ? JSON.parse(queryParams.get("isPatented")!) : null,
            sortBy: getQueryValue("sortBy", ""),
            sortOrder: getQueryValue("sortOrder", "asc"),
        };

        dispatch(fetchCollectibles({ collectionId, page, pageSize, filters }));

    }, [collectionId, dispatch, page, pageSize, location.search]);

    return { collectibles, totalCount, status };
}

