import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCategories } from "../../hooks/use-categories";
import { useTags } from "../../hooks/use-tags";
import { selectCollectiblesFilters } from "../../state/collectible-slice";
import { FilterList } from "./filter-list";
import {
    Box,
    Button,
    Input,
    Stack,
    Text
} from "@chakra-ui/react";

interface Props {
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Filter = ({ setPage }: Props) => {
    const { id } = useParams<{ id: string }>();
    const filters = useSelector(selectCollectiblesFilters)
    const [tempFilters, setTempFilters] = useState(filters);
    const categories = useCategories();
    const tags = useTags(Number(id));
    const [searchParams, setSearchParams] = useSearchParams();

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
            [key]: ["colors", "conditions", "categories", "tags"].includes(key) ? [] : ["searchQuery", "currency"].includes(key) ? "" : null,
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
            sortOrder: "asc",
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
                if (value.length > 0) {
                    params.set(key, value.join(','));
                }
            } else if (value !== null && value !== "") {
                params.set(key, value.toString());
            }
        });

        setSearchParams(params);
    };

    return (
        <Box spaceY={4}>
            <Text
                fontSize="lg"
                fontWeight="semibold"
            >
                Filters
            </Text>
            <Stack gap={4}>
                <Stack>
                    <Input
                        type="text"
                        placeholder="Search"
                        value={tempFilters.searchQuery}
                        onChange={(e) => updateFilter({ 'searchQuery': e.target.value })}
                        borderColor="gray.600"
                    />
                    {tempFilters.searchQuery && (
                        <Button
                            onClick={() => clearFilter('searchQuery')}
                            bg="none"
                            fontSize="xs"
                            color="red.500"
                        >
                            Clear Search
                        </Button>
                    )}
                    <Input
                        type="text"
                        placeholder="Currency"
                        value={tempFilters.currency}
                        onChange={(e) => updateFilter({ 'currency': e.target.value })}
                        borderColor="gray.600"
                    />
                    {tempFilters.currency && (
                        <Button
                            onClick={() => clearFilter('currency')}
                            bg="none"
                            fontSize="xs"
                            color="red.500"
                        >
                            Clear Currency
                        </Button>
                    )}
                    <Text color="gray.200">Value</Text>
                    <Stack direction="row" gap={2}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={tempFilters.minValue || ''}
                            onChange={(e) => updateFilter({ 'minValue': Number(e.target.value) })}
                            borderColor="gray.600"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={tempFilters.maxValue || ''}
                            onChange={(e) => updateFilter({ 'maxValue': Number(e.target.value) })}
                            borderColor="gray.600"
                        />
                    </Stack>
                    {tempFilters.minValue !== null && (
                        <Button
                            onClick={() => clearFilter('minValue')}
                            bg="none"
                            fontSize="xs"
                            color="red.500"
                        >
                            Clear Min Value
                        </Button>
                    )}
                    {tempFilters.maxValue !== null && (
                        <Button
                            onClick={() => clearFilter('maxValue')}
                            bg="none"
                            fontSize="xs"
                            color="red.500"
                        >
                            Clear Max Value
                        </Button>
                    )}
                    <Text color="gray.200">Acquired Date</Text>
                    <Stack direction="row" gap={2}>
                        <Input
                            type="date"
                            value={tempFilters.acquiredFrom || ''}
                            onChange={(e) => updateFilter({ 'acquiredFrom': e.target.value })}
                            borderColor="gray.600"
                        />
                        <Input
                            type="date"
                            value={tempFilters.acquiredTo || ''}
                            onChange={(e) => updateFilter({ 'acquiredTo': e.target.value })}
                            borderColor="gray.600"
                        />
                    </Stack>
                    {tempFilters.acquiredFrom && (
                        <Button
                            onClick={() => clearFilter('acquiredFrom')}
                            bg="none"
                            fontSize="xs"
                            color="red.500"
                        >
                            Clear Acquired Date From
                        </Button>
                    )}
                    {tempFilters.acquiredTo && (
                        <Button
                            onClick={() => clearFilter('acquiredTo')}
                            bg="none"
                            fontSize="xs"
                            color="red.500"
                        >
                            Clear Acquired Date To
                        </Button>
                    )}
                </Stack>

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

                <Text color="gray.200">Patented</Text>
                <Stack direction="row" gap={2}>
                    <Button
                        onClick={() => toggleBooleanFilter('isPatented', true)}
                        color="white"
                        bg={tempFilters.isPatented === true
                            ? "gray.800"
                            : "none"
                        }
                        borderColor="gray.700"
                        _hover={{
                            bg: "gray.800"
                        }}
                    >
                        Patented
                    </Button>
                    <Button
                        onClick={() => toggleBooleanFilter('isPatented', false)}
                        color="white"
                        bg={tempFilters.isPatented === false
                            ? "gray.800"
                            : "none"
                        }
                        borderColor="gray.700"
                        _hover={{
                            bg: "gray.800"
                        }}
                    >
                        Not Patented
                    </Button>
                </Stack>
                {tempFilters.isPatented !== null && (
                    <Button
                        onClick={() => clearFilter('isPatented')}
                        bg="none"
                        fontSize="xs"
                        color="red.500"
                    >
                        Clear Patented
                    </Button>
                )}

                <Box asChild
                    borderWidth={1}
                    bg="gray.900"
                    borderColor="gray.700"
                    cursor="pointer"
                    fontSize="sm"
                    rounded="sm"
                    p={3}
                    color="white"
                >
                    <select
                        value={tempFilters.sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="name">Name</option>
                        <option value="value">Value</option>
                        <option value="acquireddate">Acquired Date</option>
                    </select>
                </Box>
                <Button
                    onClick={() => handleSortOrderToggle()}
                    bg="none"
                    borderColor="gray.700"
                    _hover={{
                        bg: "gray.800"
                    }}
                    fontSize="sm"
                    fontWeight="medium"
                    color="white"
                >
                    Order ({tempFilters.sortOrder.toUpperCase()})
                </Button>
            </Stack>

            <Stack direction="row" gap={2}>
                <Button
                    onClick={() => { setPage(1); updateUrlParams() }}
                    bg="none"
                    borderColor="gray.700"
                    _hover={{
                        bg: "green.600"
                    }}
                    color="white"
                >
                    Apply
                </Button>
                <Button
                    bg="red.600"
                    _hover={{
                        bg: "red.500"
                    }}
                    color="white"
                    onClick={() => clearFilters()}
                >
                    Clear All
                </Button>
            </Stack>
        </Box>
    );
};

export default Filter;

