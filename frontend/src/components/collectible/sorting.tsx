import { Box, Button } from '@chakra-ui/react';
import React from 'react';

interface Props {
    tempFilters: any;
    handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSortOrderToggle: () => void;
}

const Sorting = ({ tempFilters, handleSortChange, handleSortOrderToggle }: Props) => {
    return (
        <Box className="flex flex-col space-y-4">
            <select
                value={tempFilters.sortBy}
                onChange={handleSortChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="value">Value</option>
                <option value="acquireddate">Acquired Date</option>
            </select>

            <Button
                onClick={handleSortOrderToggle}
                className="py-2 px-4 text-sm font-medium bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
                Toggle Order ({tempFilters.sortOrder.toUpperCase()})
            </Button>
        </Box>
    );
};

export default Sorting;
