import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters } from "../../state/collectible-slice";
import { useCategories } from "../../hooks/use-categories";
import { useTags } from "../../hooks/use-tags";
import { FilterList } from "./filter-list";
import { useState } from "react";

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Filter = ({ setPage }: Props) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const filters = useSelector((state: RootState) => state.collectibles.filters);
    const [tempFilters, setTempFilters] = useState(filters);
    const categories = useCategories();
    const tags = useTags(Number(id));
    const navigate = useNavigate();

    const handleSortChange = (val: string) => {
        setTempFilters(prevFilters => ({
            ...prevFilters,
            sortBy: val
        }));
    };

    const handleSortOrderToggle = () => {
        setTempFilters(prevFilters => ({
            ...prevFilters,
            sortOrder: prevFilters.sortOrder === "asc" ? "desc" : "asc"
        }));
    };

    const updateFilter = (action: object) => {
        setTempFilters(prevFilters => ({
            ...prevFilters,
            ...action
        }));
    }

    const clearFilter = (key: string) => {
        setTempFilters(prevFilters => ({
            ...prevFilters,
            [key]: ["colors", "conditions", "categories", "tags"].includes(key) ? [] : null,
        }));
    }

    const clearFilters = () => {
        setTempFilters({
            searchQuery: "",
            colors: [],
            currency: "",
            minValue: null,
            maxValue: null,
            conditions: [],
            categories: [],
            tags: [],
            acquiredFrom: null,
            acquiredTo: null,
            isPatented: null,
            sortBy: "",
            sortOrder: "",
        })
    }

    const toggleSelection = (key: string, value: string) => {
        const currentSelection = tempFilters[key] || [];

        const updatedSelection = currentSelection.includes(value)
            ? currentSelection.filter((item: string) => item !== value) // Remove if already selected
            : [...currentSelection, value]; // Add if not selected

        updateFilter({ [key]: updatedSelection });
    };

    const toggleBooleanFilter = (key: string, value: boolean) => {
        if (tempFilters[key] === value) {
            updateFilter({ [key]: null });
        } else {
            updateFilter({ [key]: value });
        }
    };

    const updateUrlParams = () => {
        const params = new URLSearchParams();

        Object.entries(tempFilters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => params.append(key, v));
            } else if (value !== null && value !== "") {
                params.set(key, value.toString());
            }
        });

        navigate({
            pathname: location.pathname,
            search: params.toString(),
        }, { replace: true });
    };

    return (
        <Box className="space-y-4">
            <Text className="text-lg font-semibold text-gray-100">Filters</Text>
            <Box className="flex flex-col space-y-4">
                <Box className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Search"
                        value={tempFilters.searchQuery}
                        onChange={(e) => updateFilter({ 'searchQuery': e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                    />
                    {tempFilters.searchQuery && (
                        <button
                            onClick={() => clearFilter('searchQuery')}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Search
                        </button>
                    )}
                </Box>

                <Box className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Currency"
                        value={tempFilters.currency}
                        onChange={(e) => updateFilter({ 'currency': e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                    />
                    {tempFilters.currency && (
                        <Button
                            onClick={() => clearFilter('currency')}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Currency
                        </Button>
                    )}
                </Box>

                <Box className="flex flex-col space-y-2">
                    <Text className="text-gray-200">Value</Text>
                    <Box className="w-full flex gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={tempFilters.minValue || ''}
                            onChange={(e) => updateFilter({ 'minValue': Number(e.target.value) })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 w-1/4"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={tempFilters.maxValue || ''}
                            onChange={(e) => updateFilter({ 'maxValue': Number(e.target.value) })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 w-1/4"
                        />
                    </Box>
                    {tempFilters.minValue !== null && (
                        <Button
                            onClick={() => clearFilter('minValue')}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Min Value
                        </Button>
                    )}
                    {tempFilters.maxValue !== null && (
                        <Button
                            onClick={() => clearFilter('maxValue')}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Max Value
                        </Button>
                    )}
                </Box>

                <Box className="flex flex-col space-y-2">
                    <Text className="text-gray-200">Acquired Date</Text>
                    <Box className="flex gap-3">
                        <input
                            type="date"
                            value={tempFilters.acquiredFrom || ''}
                            onChange={(e) => updateFilter({ 'acquiredFrom': e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 w-1/2"
                        />
                        <input
                            type="date"
                            value={tempFilters.acquiredTo || ''}
                            onChange={(e) => updateFilter({ 'acquiredTo': e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 w-1/2"
                        />
                    </Box>
                    {tempFilters.acquiredFrom && (
                        <Button
                            onClick={() => clearFilter('acquiredFrom')}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Acquired Date From
                        </Button>
                    )}
                    {tempFilters.acquiredTo && (
                        <Button
                            onClick={() => clearFilter('acquiredTo')}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Acquired Date To
                        </Button>
                    )}
                </Box>
            </Box>

            <FilterList
                title="Colors"
                items={['Black', 'Blue', 'Bronze', 'Crimson', 'Cyan', 'DarkGray', 'ForestGreen', 'Gold', 'Gray', 'Green', 'Lime', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'Violet', 'Wheat', 'White', 'Yellow']}
                selectedItems={tempFilters.colors}
                toggleSelection={toggleSelection}
                clearFilter={clearFilter}
                filterKey="colors"
                isObject={false}
            />

            <FilterList
                title="Conditions"
                items={['Mint', 'VeryGood', 'Good', 'Acceptable', 'Damaged']}
                selectedItems={tempFilters.conditions}
                toggleSelection={toggleSelection}
                clearFilter={clearFilter}
                filterKey={"conditions"}
                isObject={false}
            />

            <FilterList
                title="Categories"
                items={categories}
                selectedItems={tempFilters.categories}
                toggleSelection={toggleSelection}
                clearFilter={clearFilter}
                filterKey={"categories"}
                isObject={true}
            />

            <FilterList
                title="Tags"
                items={tags}
                selectedItems={tempFilters.tags}
                toggleSelection={toggleSelection}
                clearFilter={clearFilter}
                filterKey={"tags"}
                isObject={true}
            />

            <Box className="flex flex-col space-y-2">
                <Text className="text-gray-200">Patented</Text>
                <Box className="flex gap-2">
                    <Box
                        onClick={() => toggleBooleanFilter('isPatented', true)}
                        className={`cursor-pointer px-3 py-1 rounded-lg text-sm ${tempFilters.isPatented === true
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-600 text-white'
                            } hover:bg-gray-700 hover:text-white`}
                    >
                        Patented
                    </Box>
                    <Box
                        onClick={() => toggleBooleanFilter('isPatented', false)}
                        className={`cursor-pointer px-3 py-1 rounded-lg text-sm ${tempFilters.isPatented === false
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-600 text-white'
                            } hover:bg-gray-700 hover:text-white`}
                    >
                        Not Patented
                    </Box>
                </Box>
                {tempFilters.isPatented !== null && (
                    <Button
                        onClick={() => clearFilter('isPatented')}
                        className="text-xs text-red-500 mt-2"
                    >
                        Clear Patented
                    </Button>
                )}
            </Box>

            <Box className="flex flex-col space-y-4 mt-4">
                <select
                    value={tempFilters.sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3"
                >
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="value">Value</option>
                    <option value="acquireddate">Acquired Date</option>
                </select>

                <Button
                    onClick={() => handleSortOrderToggle()}
                    className="py-2 px-4 text-sm font-medium bg-zinc-700 text-white rounded-lg hover:bg-zinc-800"
                >
                    Order ({tempFilters.sortOrder.toUpperCase()})
                </Button>
            </Box>

            <Button
                onClick={() => { dispatch(applyFilters(tempFilters)); setPage(1); updateUrlParams() }}
                className="py-2 px-4 mt-4 bg-zinc-700 text-white rounded-lg hover:bg-zinc-800"
            >
                Apply
            </Button>
            <Button className="bg-red-500 py-2 px-4 text-white rounded-lg hover:bg-red-600 ml-2" onClick={() => clearFilters()}>Clear All</Button>
        </Box >
    );
};

export default Filter;

