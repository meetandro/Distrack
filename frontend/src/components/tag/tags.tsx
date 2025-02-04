import { useParams } from 'react-router-dom';
import { Tag } from '../../models/tag';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { deleteTag } from '../../state/tag-slice';
import { useTags } from '../../hooks/use-tags';
import { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { TagForm } from './tag-form';
import {
    Badge,
    Box,
    Button,
    DialogBody,
    DialogContent,
    DialogRoot,
    DialogTrigger,
    GridItem,
    Icon,
    SimpleGrid,
    Stack,
    Text
} from '@chakra-ui/react';

export const Tags = () => {
    const { id } = useParams<{ id: string }>();
    const tags = useTags(Number(id));
    const dispatch = useDispatch<AppDispatch>();

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

    const handleEditClick = (tag: Tag) => {
        setSelectedTag(tag);
        setIsDialogOpen(true);
    };

    useEffect(() => {
        if (!isDialogOpen) {
            setSelectedTag(null);
        }
    }, [isDialogOpen])

    return (
        <Box
            px={6}
            color={'gray.100'}
        >
            <SimpleGrid gap={5} columns={{ base: 1, sm: 1, md: 2, lg: 3 }} minWidth={'60'}>
                {tags.length > 0 && tags.map((tag: Tag) => (
                    <GridItem
                        key={tag.id}
                        display={'flex'}
                        bg="gray.700"
                        p={5}
                        rounded="lg"
                        color="gray.200"
                        shadow="md"
                    >
                        <Stack width={'10/12'}>
                            <Text>{tag.name}</Text>
                            <Badge width={'1/2'} background={tag.hex} />
                            <Text fontSize="sm" color="gray.400">
                                {tag.collectibleIds?.length > 0 ?
                                    `${tag.collectibleIds.length} ${tag.collectibleIds.length === 1 ? "collectible" : "collectibles"}` : "No Collectibles"
                                }
                            </Text>
                        </Stack>
                        <Box
                            width={'2/12'}
                            display={'flex'}
                            justifyContent={'flex-end'}
                        >
                            <Button
                                onClick={() => handleEditClick(tag)}
                                bg={'gray.500'}
                                _hover={{ bg: 'green.500' }}
                                marginRight={5}
                            >
                                <Icon as={FaPen} color="white" />
                            </Button>
                            <Button
                                onClick={() => dispatch(deleteTag(tag.id))}
                                bg="red.500"
                                _hover={{
                                    bg: "red.400"
                                }}
                            >
                                <Icon as={FaTrash} color="white" />
                            </Button>
                        </Box>
                    </GridItem>
                ))}
                {tags.length === 0 && (
                    <Text>No Tags</Text>
                )}
            </SimpleGrid>

            <DialogRoot open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e.open)}>
                <DialogTrigger asChild>
                    <Button
                        p={4}
                        rounded="lg"
                        bg="gray.600"
                        _hover={{
                            bg: "gray.500"
                        }}
                        marginTop={4}
                    >
                        <Icon as={FaPlus} color="white" />
                    </Button>
                </DialogTrigger>
                <DialogContent
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    bg="gray.800"
                    borderWidth={2}
                    borderColor="gray.600"
                >
                    <DialogBody>
                        <TagForm existingTag={selectedTag} onClose={() => setIsDialogOpen(false)} />
                    </DialogBody>
                </DialogContent>
            </DialogRoot>
        </Box>
    );
};

