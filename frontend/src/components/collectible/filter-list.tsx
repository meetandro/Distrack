import { useState } from "react";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import {
    Button,
    ColorSwatch,
    Stack,
    Text
} from "@chakra-ui/react";

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

    return (
        <Stack gap={2}>
            <Text className="text-gray-200">{title}</Text>
            <Stack
                direction="row"
                display="flex"
                flexWrap="wrap"
                gap={2}
            >
                {visibleItems.map((item) => {
                    const itemKey = isObject ? item.id.toString() : item;
                    const itemName = isObject ? item.name : item;

                    return (
                        <Button
                            key={itemKey}
                            onClick={() => toggleSelection(filterKey, itemKey)}
                            bg={selectedItems.includes(itemKey) ? "gray.800" : "none"}
                            borderColor="gray.700"
                            size="xs"
                            _hover={{
                                bg: "gray.800",
                            }}
                            color="white"
                        >
                            {item.hex ? <><ColorSwatch value={item.hex} boxSize={"0.82em"} marginRight={1} />{itemName}</> : itemName}
                        </Button>
                    );
                })}
                {items.length > MAX_VISIBLE_ITEMS && (
                    <Button
                        onClick={() => setExpanded(!expanded)}
                        size="xs"
                        bg="none"
                        borderColor="gray.600"
                        _hover={{
                            bg: "gray.800"
                        }}
                        color="white"
                        display="flex"
                        alignItems="center"
                    >
                        {expanded ? <IoClose /> : <PiDotsThreeOutlineLight />}
                    </Button>
                )}
            </Stack>
            {selectedItems.length > 0 && (
                <Button
                    onClick={() => clearFilter(filterKey)}
                    fontSize="xs"
                    color="red.500"
                    bg="none"
                >
                    Clear {title}
                </Button>
            )}
        </Stack>
    );
};

