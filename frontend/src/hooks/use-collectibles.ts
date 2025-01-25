import { useState, useEffect } from "react";
import CollectibleService from "../services/collectible-service";
import { GetAllCollectiblesResponse } from "../models/collectible";

export const useCollectibles = (collectionId: number, page: number, pageSize: number) => {
    const [collectibles, setCollectibles] = useState<GetAllCollectiblesResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [tempFilters, setTempFilters] = useState({
        searchQuery: '',
        colors: [],
        currency: '',
        minValue: null,
        maxValue: null,
        conditions: [],
        acquiredFrom: null,
        acquiredTo: null,
        isPatented: null,
        sortBy: '',
        sortOrder: 'asc',
    });
    const [filters, setFilters] = useState(tempFilters);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await CollectibleService.getAll(collectionId ?? 0, page, pageSize, filters);
                setCollectibles(data.items);
                setTotalCount(data.totalCount);
            } catch {
                setError('Failed to fetch collectibles. Please try again later.');
            } finally {
                setLoading(false);
            }
        })();
    }, [collectionId, page, pageSize, filters]);

    const updateFilter = (key: string, value: unknown) => {
        setTempFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilter = (key: string) => {
        const clearedFilters = { ...tempFilters, [key]: key === 'colors' || key === 'conditions' ? [] : null };
        setTempFilters(clearedFilters);
    };

    const applyFilters = () => {
        setFilters(tempFilters);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSortBy = e.target.value;
        updateFilter('sortBy', selectedSortBy);
    };

    const handleSortOrderToggle = () => {
        const newSortOrder = tempFilters.sortOrder === 'asc' ? 'desc' : 'asc';
        updateFilter('sortOrder', newSortOrder);
    };

    return { collectibles, tempFilters, loading, error, totalCount, updateFilter, clearFilter, applyFilters, handleSortChange, handleSortOrderToggle }
}
