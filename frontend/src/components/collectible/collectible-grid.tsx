import { Link } from "react-router-dom"
import { mapColor, mapCondition } from "../../utils/enum-mapper"
import { ImageSlider } from "./image-slider"
import { Badge, Box, Center, GridItem, SimpleGrid, Text } from "@chakra-ui/react"
import { GetAllCollectiblesResponse } from "../../models/collectible";

interface Props {
    collectionId: number;
    collectibles: GetAllCollectiblesResponse[]
}

export const CollectibleGrid = ({ collectionId, collectibles }: Props) => {
    return (
        <Center>
            <SimpleGrid padding={5} width={'8/12'} gap={5}>
                {collectibles.map((collectible) => (
                    <GridItem
                        key={collectible.id}
                        className="bg-gray-700 p-4 rounded-lg shadow-lg text-gray-100 flex flex-col space-y-4"
                    >
                        <Text className="text-xl font-semibold">{collectible.name}</Text>
                        <Text as={'p'} className="text-gray-400">{collectible.description}</Text>
                        <Text as={'p'} className="text-gray-400">Color: {collectible.color !== undefined ? mapColor(collectible.color) : 'No color provided'}</Text>
                        <Text as={'p'} className="text-gray-400">Currency: {collectible.currency}</Text>
                        <Text as={'p'} className="text-gray-400">Value: {collectible.value}</Text>
                        <Text as={'p'} className="text-gray-400">Condition: {collectible.condition !== undefined ? mapCondition(Number(collectible.condition)) : 'No condition provided'}</Text>

                        {collectible.images.length > 0 && (
                            <Box className='h-full m-auto'>
                                <ImageSlider images={collectible.images} />
                            </Box>
                        )}

                        <Box className="flex flex-wrap gap-2 mt-2">
                            {collectible.isPatented && (
                                <Badge bg={'gray.500'} color={'white'}>P</Badge>
                            )}
                        </Box>
                        {collectible.tags.length > 0 && (
                            <Box>
                                {collectible.tags.map((tag) => (
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
                        )}
                        <Link to={`/collections/${collectionId}/collectibles/${collectible.id}`} className="text-blue-400 hover:underline">
                            Details
                        </Link>
                    </GridItem>
                ))}
            </SimpleGrid>
        </Center>
    )
}
