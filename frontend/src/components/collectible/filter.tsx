import { Box, Button, ColorSwatch, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tag } from "../../models/tag";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../state/categorySlice";
import { getTags } from "../../state/tagSlice";
import { applyFilters, clearFilter, clearFilters, handleSortChange, handleSortOrderToggle, updateFilter } from "../../state/collectibleSlice";

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Filter = ({ setPage }: Props) => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { categories } = useSelector((state: RootState) => state.categories);
    const { tags } = useSelector((state: RootState) => state.tags)
    const { tempFilters } = useSelector((state: RootState) => state.collectibles);

    useEffect(() => {
        dispatch(getTags(Number(id)))
    }, [id, dispatch]);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    const toggleSelection = (key: string, value: string) => {
        const currentSelection = tempFilters[key] || [];

        const updatedSelection = currentSelection.includes(value)
            ? currentSelection.filter((item: string) => item !== value) // Remove if already selected
            : [...currentSelection, value]; // Add if not selected

        dispatch(updateFilter({ [key]: updatedSelection }));
    };

    const toggleBooleanFilter = (key: string, value: boolean) => {
        if (tempFilters[key] === value) {
            dispatch(updateFilter({ [key]: null }));
        } else {
            dispatch(updateFilter({ [key]: value }));
        }
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
                        onChange={(e) => dispatch(updateFilter({ 'searchQuery': e.target.value }))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                    />
                    {tempFilters.searchQuery && (
                        <button
                            onClick={() => dispatch(clearFilter('searchQuery'))}
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
                        onChange={(e) => dispatch(updateFilter({ 'currency': e.target.value }))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                    />
                    {tempFilters.currency && (
                        <Button
                            onClick={() => dispatch(clearFilter('currency'))}
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
                            onChange={(e) => dispatch(updateFilter({ 'minValue': Number(e.target.value) }))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 w-1/4"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={tempFilters.maxValue || ''}
                            onChange={(e) => dispatch(updateFilter({ 'maxValue': Number(e.target.value) }))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 w-1/4"
                        />
                    </Box>
                    {tempFilters.minValue !== null && (
                        <Button
                            onClick={() => dispatch(clearFilter('minValue'))}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Min Value
                        </Button>
                    )}
                    {tempFilters.maxValue !== null && (
                        <Button
                            onClick={() => dispatch(clearFilter('maxValue'))}
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
                            onChange={(e) => dispatch(updateFilter({ 'acquiredFrom': e.target.value }))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 w-1/2"
                        />
                        <input
                            type="date"
                            value={tempFilters.acquiredTo || ''}
                            onChange={(e) => dispatch(updateFilter({ 'acquiredTo': e.target.value }))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 w-1/2"
                        />
                    </Box>
                    {tempFilters.acquiredFrom && (
                        <Button
                            onClick={() => dispatch(clearFilter('acquiredFrom'))}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Acquired Date From
                        </Button>
                    )}
                    {tempFilters.acquiredTo && (
                        <Button
                            onClick={() => dispatch(clearFilter('acquiredTo'))}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Acquired Date To
                        </Button>
                    )}
                </Box>
            </Box>

            <Box className="flex flex-col space-y-2">
                <Text className="text-gray-200">Colors</Text>
                <Box className="flex flex-wrap gap-2">
                    {['Black', 'Blue', 'Bronze', 'Crimson', 'Cyan', 'DarkGray', 'ForestGreen', 'Gold', 'Gray', 'Green', 'Lime', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'Violet', 'Wheat', 'White', 'Yellow'].map((color) => (
                        <Box
                            key={color}
                            onClick={() => toggleSelection('colors', color)}
                            className={`cursor-pointer px-3 py-1 rounded-lg text-sm ${tempFilters.colors.includes(color)
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-600 text-white'
                                } hover:bg-gray-700 hover:text-white`}
                        >
                            {color}
                        </Box>
                    ))}
                </Box>
                {tempFilters.colors.length > 0 && (
                    <Button
                        onClick={() => dispatch(clearFilter('colors'))}
                        className="text-xs text-red-500 mt-2"
                    >
                        Clear Colors
                    </Button>
                )}
            </Box>

            <Box className="flex flex-col space-y-2">
                <Text className="text-gray-200">Conditions</Text>
                <Box className="flex flex-wrap gap-2">
                    {['Mint', 'VeryGood', 'Good', 'Acceptable', 'Damaged'].map((condition) => (
                        <Box
                            key={condition}
                            onClick={() => toggleSelection('conditions', condition)}
                            className={`cursor-pointer px-3 py-1 rounded-lg text-sm ${tempFilters.conditions.includes(condition)
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-600 text-white'
                                } hover:bg-gray-700 hover:text-white`}
                        >
                            {condition}
                        </Box>
                    ))}
                </Box>
                {tempFilters.conditions.length > 0 && (
                    <Button
                        onClick={() => dispatch(clearFilter('conditions'))}
                        className="text-xs text-red-500 mt-2"
                    >
                        Clear Conditions
                    </Button>
                )}
            </Box>

            {categories.length > 0 && (
                <Box className="flex flex-col space-y-2">
                    <Text className="text-gray-200">Categories</Text>
                    <Box className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Box
                                key={category.id}
                                onClick={() => toggleSelection('categories', category.id.toString())}
                                className={`cursor-pointer px-3 py-1 rounded-lg text-sm ${tempFilters.categories.includes(category.id.toString())
                                    ? 'bg-gray-800 text-white'
                                    : 'bg-gray-600 text-white'
                                    } hover:bg-gray-700 hover:text-white`}
                            >
                                {category.name}
                            </Box>
                        ))}
                    </Box>
                    {tempFilters.categories.length > 0 && (
                        <Button
                            onClick={() => dispatch(clearFilter('categories'))}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Categories
                        </Button>
                    )}
                </Box>
            )}

            {tags.length > 0 && (
                <Box className="flex flex-col space-y-2">
                    <Text className="text-gray-200">Tags</Text>
                    <Box className="flex flex-wrap gap-2">
                        {tags.map((tag: Tag) => (
                            <Box
                                key={tag.id}
                                onClick={() => toggleSelection('tags', tag.id.toString())}
                                className={`cursor-pointer px-3 py-1 rounded-lg text-sm ${tempFilters.tags.includes(tag.id.toString())
                                    ? 'bg-gray-800 text-white'
                                    : 'bg-gray-600 text-white'
                                    } hover:bg-gray-700 hover:text-white`}
                            >
                                <ColorSwatch value={tag.hex} boxSize={"0.82em"} /> {tag.name}
                            </Box>
                        ))}
                    </Box>
                    {tempFilters.tags.length > 0 && (
                        <Button
                            onClick={() => dispatch(clearFilter('tags'))}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Tags
                        </Button>
                    )}
                </Box>
            )}

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
                        onClick={() => dispatch(clearFilter('isPatented'))}
                        className="text-xs text-red-500 mt-2"
                    >
                        Clear Patented
                    </Button>
                )}
            </Box>

            <Box className="flex flex-col space-y-4 mt-4">
                <select
                    value={tempFilters.sortBy}
                    onChange={(e) => dispatch(handleSortChange(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3"
                >
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="value">Value</option>
                    <option value="acquireddate">Acquired Date</option>
                </select>

                <Button
                    onClick={() => dispatch(handleSortOrderToggle())}
                    className="py-2 px-4 text-sm font-medium bg-zinc-700 text-white rounded-lg hover:bg-zinc-800"
                >
                    Order ({tempFilters.sortOrder.toUpperCase()})
                </Button>
            </Box>

            <Button
                onClick={() => { dispatch(applyFilters()); setPage(1); }}
                className="py-2 px-4 mt-4 bg-zinc-700 text-white rounded-lg hover:bg-zinc-800"
            >
                Apply
            </Button>
            <Button className="bg-red-500 py-2 px-4 text-white rounded-lg hover:bg-red-600 ml-2" onClick={() => dispatch(clearFilters())}>Clear All</Button>
        </Box >
    );
};

export default Filter;
