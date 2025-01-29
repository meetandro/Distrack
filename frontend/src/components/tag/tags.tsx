import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Tag } from '../../models/tag';
import {
    Badge,
    Box,
    Button,
    Card,
    GridItem,
    SimpleGrid,
    Text
} from '@chakra-ui/react';
import { TagForm } from './tag-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { deleteTag, getTags } from '../../state/tagSlice';

export const Tags = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { tags } = useSelector((state: RootState) => state.tags)
    const [activeTag, setActiveTag] = useState<Tag | null | undefined>(undefined);

    useEffect(() => {
        dispatch(getTags(Number(id)));
    }, [id, dispatch])

    return (
        <Box>
            <Text className="text-xl font-semibold">Tags for Collection {id}</Text>
            <SimpleGrid gap={5}>
                {tags.map((tag: Tag) => (
                    <GridItem key={tag.id} className="bg-gray-800 p-4 rounded-lg text-gray-100 shadow-md">
                        <Card.Root width={'1/2'} bg={'gray'}>
                            <Card.Body>
                                <Card.Title mt="2" color={'white'} opacity={1}>{tag.name}</Card.Title>
                                <Badge width={'1/3'} background={tag.hex}>{tag.name}</Badge>
                            </Card.Body>
                            <Card.Footer>
                                <Box className="space-x-2">
                                    <Button bg={'green'} onClick={() => setActiveTag(tag)}>Edit</Button>
                                    <Button
                                        onClick={() => dispatch(deleteTag(tag.id))}
                                        className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-500 transition-all"
                                    >
                                        Delete
                                    </Button>
                                </Box>
                                {tag.collectibleIds?.length > 0 ? (
                                    <Text fontSize={'md'}>Associated with {tag.collectibleIds.length} collectible(s).</Text>
                                ) : (
                                    <Text>No associated collectibles.</Text>
                                )}
                            </Card.Footer>
                        </Card.Root>
                    </GridItem>
                ))}
            </SimpleGrid>

            <button
                onClick={() => setActiveTag(null)}
                className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all"
            >
                Create Tag
            </button>

            {activeTag !== undefined && (
                <div className="mt-4">
                    <TagForm existingTag={activeTag} onClose={() => setActiveTag(undefined)} />
                </div>
            )}
        </Box>
    );
};
