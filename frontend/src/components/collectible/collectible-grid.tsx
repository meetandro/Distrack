import { Link } from "react-router-dom";
import { LuPaintbrushVertical } from "react-icons/lu";
import { PiSparkle } from "react-icons/pi";
import { mapColor, mapCondition } from "../../utils/enum-mapper";
import { ImageSlider } from "./image-slider";
import { Collectible } from "../../models/collectible";
import {
    Badge,
    Box,
    Center,
    GridItem,
    SimpleGrid,
    Stack,
    Text
} from "@chakra-ui/react";

interface Props {
    collectionId: number;
    collectibles: Collectible[];
}

export const CollectibleGrid = ({ collectionId, collectibles }: Props) => {
    return (
        <Center>
            <SimpleGrid
                p={5}
                width="10/12"
                gap={5}
            >
                {collectibles.map((collectible) => (
                    <GridItem
                        key={collectible.id}
                        bg="gray.800"
                        p={4}
                        rounded="lg"
                        shadow="lg"
                        color="gray.100"
                        display="flex"
                        flexDirection={{ base: "column", md: "row" }}
                        gap={4}
                    >
                        {collectible.images && collectible.images.length > 0 && (
                            <ImageSlider images={collectible.images} collectionId={collectionId} collectibleId={collectible.id} />
                        )}

                        <Box spaceY={1}>
                            <Text
                                color="gray.300"
                                fontSize="xl"
                            >
                                <Link to={`/collections/${collectionId}/collectibles/${collectible.id}`}>
                                    {collectible.name}
                                </Link>
                            </Text>

                            <Text
                                color="gray.400"
                                fontSize="sm"
                            >
                                {collectible.description.length > 300 ? collectible.description.substring(0, 300) + "..." : collectible.description}
                            </Text>

                            <Stack gap={1}>
                                <Badge
                                    variant="solid"
                                    size="md"
                                    bg="none"
                                    color="gray.400"
                                    p={0}
                                >
                                    <LuPaintbrushVertical size={20} />
                                    {collectible.color !== undefined ? mapColor(collectible.color) : 'No color provided'}
                                </Badge>

                                <Badge
                                    variant="solid"
                                    size="md"
                                    bg="none"
                                    color="gray.400"
                                    p={0}
                                >
                                    <PiSparkle size={20} />
                                    {collectible.condition !== undefined ? mapCondition(Number(collectible.condition)) : 'No condition provided'}
                                </Badge>
                            </Stack>

                            <Box
                                display="flex"
                                gap={1}
                            >
                                {collectible.isPatented && (
                                    <Badge
                                        bg="gray.500"
                                        color="white"
                                    >
                                        P
                                    </Badge>
                                )}
                                {collectible.tags && collectible.tags.length > 0 && collectible.tags.map((tag) => (
                                    <Badge
                                        key={tag.id}
                                        variant="solid"
                                        size="md"
                                        marginRight="1"
                                        color="white"
                                        style={{
                                            backgroundColor: tag.hex
                                        }}
                                    >
                                        {tag.name}
                                    </Badge>
                                ))}
                            </Box>

                            {collectible.value > 0 && (
                                <Text
                                    color="gray.400"
                                    fontSize="lg"
                                >
                                    {collectible.value} {collectible.currency}
                                </Text>
                            )}
                        </Box>
                    </GridItem>
                ))}
            </SimpleGrid>
        </Center>
    );
};

