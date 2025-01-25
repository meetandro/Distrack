import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Tag } from '../../models/tag';
import {
    Badge,
    Box,
    Button,
    Card,
    Center,
    Collapsible,
    GridItem,
    SimpleGrid,
    Text
} from '@chakra-ui/react';
import { TagForm } from './tag-form';
import { CloseButton } from '../ui/close-button';
import { TagContext } from '../../context/tag-context';

export const Tags = () => {
    const { id } = useParams<{ id: string }>();
    const { tags, getTags, removeTag } = useContext(TagContext);

    useEffect(() => {
        const fetching = async () => {
            return await getTags(Number(id))
        }
        fetching()
    }, [id]);

    const [editingTag, setEditingTag] = useState<Tag | null>(null);
    const [isCreatingTag, setIsCreatingTag] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleTagCreated = () => {
        setIsCreatingTag(false);
    };

    if (tags.length === 0) return <div>No tags found for this collection.</div>;

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
                                    <Collapsible.Root open={isOpen}>
                                        <Collapsible.Trigger onClick={() => { setIsOpen(true); setEditingTag(tag) }} bg='white'>Edit</Collapsible.Trigger>
                                        <Collapsible.Content>
                                            <Center position={'fixed'} inset={0}>
                                                <Box bg={"white"} padding={5} rounded={5}>
                                                    <CloseButton onClick={() => { setIsOpen(false); }} float={"right"} />
                                                    {isOpen && (
                                                        <TagForm existingTag={editingTag} onClose={() => { }} />
                                                    )}
                                                </Box>
                                            </Center>
                                        </Collapsible.Content>
                                    </Collapsible.Root>
                                    <Button
                                        onClick={() => removeTag(tag.id)}
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
                onClick={() => setIsCreatingTag(!isCreatingTag)}
                className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all"
            >
                {isCreatingTag ? 'Close Tag Form' : 'Add Tag'}
            </button>
            {isCreatingTag && (
                <div className="mt-4">
                    <TagForm onClose={handleTagCreated} />
                </div>
            )}
        </Box>
    );
};
