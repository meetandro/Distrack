import { Box, Button, ColorSwatch, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { IoClose } from "react-icons/io5";

interface Props {
    title: any,
    items: any,
    selectedItems: any,
    toggleSelection: any,
    clearFilter: any,
    filterKey: any,
    isObject: boolean
}

const MAX_VISIBLE_ITEMS = 3;

export const FilterList = ({ title, items, selectedItems, toggleSelection, clearFilter, filterKey, isObject = false }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const visibleItems = expanded ? items : items.slice(0, MAX_VISIBLE_ITEMS);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <Box className="flex flex-col space-y-2">
            <Text className="text-gray-200">{title}</Text>
            <Box className="flex flex-wrap gap-2">
                {visibleItems.map((item) => {
                    const itemKey = isObject ? item.id.toString() : item;
                    const itemName = isObject ? item.name : item;

                    return (
                        <Box
                            key={itemKey}
                            onClick={() => toggleSelection(filterKey, itemKey)}
                            className={`cursor-pointer px-3 py-1 rounded-lg text-sm ${selectedItems.includes(itemKey)
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-600 text-white'
                                } hover:bg-gray-700 hover:text-white`}
                        >
                            {item.hex ? <><ColorSwatch value={item.hex} boxSize={"0.82em"} marginRight={1} />{itemName}</> : itemName}
                        </Box>
                    );
                })}
                {items.length > MAX_VISIBLE_ITEMS && (
                    <Box
                        onClick={() => setExpanded(!expanded)}
                        className="cursor-pointer px-3 py-1 rounded-lg text-base bg-gray-500 text-white hover:bg-gray-600 flex items-center justify-center"
                    >
                        {expanded ? <IoClose /> : <PiDotsThreeOutlineLight />}
                    </Box>
                )}
            </Box>
            {selectedItems.length > 0 && (
                <Button
                    onClick={() => dispatch(clearFilter(filterKey))}
                    className="text-xs text-red-500 mt-2"
                >
                    Clear {title}
                </Button>
            )}
        </Box>
    );
}
