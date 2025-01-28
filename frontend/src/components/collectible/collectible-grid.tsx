import { Link } from "react-router-dom";
import { mapColor, mapCondition } from "../../utils/enum-mapper";
import { ImageSlider } from "./image-slider";
import { Badge, Box, Center, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { GetAllCollectiblesResponse } from "../../models/collectible";
import { LuPaintbrushVertical } from "react-icons/lu";
import { PiSparkle } from "react-icons/pi";

interface Props {
    collectionId: number;
    collectibles: GetAllCollectiblesResponse[];
}

export const CollectibleGrid = ({ collectionId, collectibles }: Props) => {
    return (
        <Center>
            <SimpleGrid
                padding={5}
                width={"10/12"}
                gap={5}
            >
                {collectibles.map((collectible) => (
                    <GridItem
                        key={collectible.id}
                        className="bg-zinc-800 p-4 rounded-lg shadow-lg text-gray-100 flex flex-col md:flex-row gap-4"
                    >
                        {collectible.images.length > 0 && (
                            <ImageSlider images={collectible.images} />
                        )}

                        <Box className="flex-1 max-h-full">
                            <Link to={`/collections/${collectionId}/collectibles/${collectible.id}`} className="text-gray-300 hover:underline text-xl">
                                {collectible.name}
                            </Link>
                            <Text className="text-lg font-semibold"></Text>
                            <Text as="p" className="text-gray-400 text-sm">{collectible.description.length > 300 ? collectible.description.substring(0, 300) + "..." : collectible.description}</Text>

                            <Text as="p" className="text-gray-400 text-sm inline">
                                <LuPaintbrushVertical size={20} className="inline" /> {collectible.color !== undefined ? mapColor(collectible.color) : 'No color provided'}
                            </Text>
                            <Text as="p" className="text-gray-400 text-sm">
                                <PiSparkle size={20} className="inline" /> {collectible.condition !== undefined ? mapCondition(Number(collectible.condition)) : 'No condition provided'}
                            </Text>

                            <Box className="flex flex-wrap gap-2 mt-2">
                                {collectible.isPatented && (
                                    <Badge bg={'gray.500'} color={'white'}>P</Badge>
                                )}
                                {collectible.tags.length > 0 && collectible.tags.map((tag) => (
                                    <Badge
                                        key={tag.id}
                                        variant={"solid"}
                                        size={"md"}
                                        marginRight={"1"}
                                        style={{ backgroundColor: tag.hex }}
                                    >
                                        {tag.name}
                                    </Badge>
                                ))}
                            </Box>

                            <Text as="p" className="text-gray-400 text-lg">{collectible.value} {collectible.currency}</Text>
                        </Box>
                    </GridItem>
                ))}
            </SimpleGrid>
        </Center >
    );
};

