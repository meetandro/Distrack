import { Box, Button, Text } from "@chakra-ui/react";

interface Props {
    tempFilters: any;
    updateFilter: (key: string, value: any) => void;
    clearFilter: (key: string) => void;
    applyFilters: () => void;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Filter = ({ tempFilters, updateFilter, clearFilter, applyFilters, setPage }: Props) => {
    const toggleSelection = (key: string, value: string) => {
        const currentSelection = tempFilters[key];
        if (currentSelection.includes(value)) {
            updateFilter(key, currentSelection.filter((item: string) => item !== value));
        } else {
            updateFilter(key, [...currentSelection, value]);
        }
    };

    const toggleBooleanFilter = (key: string, value: boolean) => {
        if (tempFilters[key] === value) {
            updateFilter(key, null);
        } else {
            updateFilter(key, value);
        }
    };

    return (
        <Box className="space-y-4">
            <Text className="text-lg font-semibold text-gray-100">Filters</Text>
            <Box className="flex flex-col space-y-4">
                <Box className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={tempFilters.searchQuery}
                        onChange={(e) => updateFilter('searchQuery', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                        placeholder="Currency (e.g., USD)"
                        value={tempFilters.currency}
                        onChange={(e) => updateFilter('currency', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                    <Text className="text-gray-200">Colors</Text>
                    <Box className="flex flex-wrap gap-2">
                        {['Black', 'Blue', 'Bronze', 'Crimson', 'Cyan', 'DarkGray', 'ForestGreen', 'Gold', 'Gray', 'Green', 'Lime', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'Violet', 'Wheat', 'White', 'Yellow'].map((color) => (
                            <Box
                                key={color}
                                onClick={() => toggleSelection('colors', color)}
                                className={`cursor-pointer px-3 py-1 rounded-full text-sm ${tempFilters.colors.includes(color)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-900'
                                    } hover:bg-blue-500 hover:text-white`}
                            >
                                {color}
                            </Box>
                        ))}
                    </Box>
                    {tempFilters.colors.length > 0 && (
                        <Button
                            onClick={() => clearFilter('colors')}
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
                                className={`cursor-pointer px-3 py-1 rounded-full text-sm ${tempFilters.conditions.includes(condition)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-900'
                                    } hover:bg-blue-500 hover:text-white`}
                            >
                                {condition}
                            </Box>
                        ))}
                    </Box>
                    {tempFilters.conditions.length > 0 && (
                        <Button
                            onClick={() => clearFilter('conditions')}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Conditions
                        </Button>
                    )}
                </Box>

                <Box className="flex flex-col space-y-2">
                    <Text className="text-gray-200">Is Patented</Text>
                    <Box className="flex gap-4">
                        <Box
                            onClick={() => toggleBooleanFilter('isPatented', true)}
                            className={`cursor-pointer px-3 py-1 rounded-full text-sm ${tempFilters.isPatented === true
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-900'
                                } hover:bg-blue-500 hover:text-white`}
                        >
                            Yes
                        </Box>
                        <Box
                            onClick={() => toggleBooleanFilter('isPatented', false)}
                            className={`cursor-pointer px-3 py-1 rounded-full text-sm ${tempFilters.isPatented === false
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-900'
                                } hover:bg-blue-500 hover:text-white`}
                        >
                            No
                        </Box>
                    </Box>
                    {tempFilters.isPatented !== null && (
                        <Button
                            onClick={() => clearFilter('isPatented')}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Is Patented
                        </Button>
                    )}
                </Box>

                <Box className="flex flex-col">
                    <input
                        type="number"
                        placeholder="Min Value"
                        value={tempFilters.minValue || ''}
                        onChange={(e) => updateFilter('minValue', Number(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {tempFilters.minValue !== null && (
                        <Button
                            onClick={() => clearFilter('minValue')}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Min Value
                        </Button>
                    )}
                </Box>

                <Box className="flex flex-col">
                    <input
                        type="number"
                        placeholder="Max Value"
                        value={tempFilters.maxValue || ''}
                        onChange={(e) => updateFilter('maxValue', Number(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {tempFilters.maxValue !== null && (
                        <Button
                            onClick={() => clearFilter('maxValue')}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Max Value
                        </Button>
                    )}
                </Box>

                <Box className="flex flex-col">
                    <input
                        type="date"
                        value={tempFilters.acquiredFrom || ''}
                        onChange={(e) => updateFilter('acquiredFrom', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {tempFilters.acquiredFrom && (
                        <Button
                            onClick={() => clearFilter('acquiredFrom')}
                            className="text-xs text-red-500 mt-2"
                        >
                            Clear Acquired Date From
                        </Button>
                    )}
                </Box>

                <Box className="flex flex-col">
                    <input
                        type="date"
                        value={tempFilters.acquiredTo || ''}
                        onChange={(e) => updateFilter('acquiredTo', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
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

            <Button
                onClick={() => { applyFilters(); setPage(1); }}
                className="py-2 px-4 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
                Apply Filters
            </Button>
        </Box>
    );
};

export default Filter;
