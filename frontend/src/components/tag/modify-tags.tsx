import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { addTagsToCollectible } from '../../state/tag-slice';
import { useTags } from '../../hooks/use-tags';
import { Collectible } from '../../models/collectible';
import { Tag } from '../../models/tag';
import { FaCheck, FaTags } from 'react-icons/fa';
import { CloseButton } from '../ui/close-button';
import { Checkbox } from '../ui/checkbox';
import {
    Box,
    Button,
    Center,
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerContent,
    DrawerHeader,
    DrawerRoot,
    DrawerTrigger,
    Icon,
    SimpleGrid
} from '@chakra-ui/react';

interface Props {
    collectible: Collectible;
}

export const ModifyTags = ({ collectible }: Props) => {
    const { id, collectibleId } = useParams<{ id: string; collectibleId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const [selectedTags, setSelectedTags] = useState<number[]>(collectible.tags.map(t => t.id) || []);
    const tags = useTags(Number(id));

    const handleTagChange = (tagId: number) => {
        setSelectedTags((prevState) =>
            prevState.includes(tagId)
                ? prevState.filter((id) => id !== tagId)
                : [...prevState, tagId]
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            id: Number(collectibleId),
            tagIds: selectedTags,
        }
        dispatch(addTagsToCollectible(payload))
    };

    return (
        <Box>
            <DrawerRoot placement={'start'}>
                <DrawerBackdrop />
                <DrawerTrigger asChild>
                    <Button
                        bg="teal.600"
                        _hover={{
                            bg: "teal.500"
                        }}
                        color="white"
                        title='Modify tags'
                    >
                        <Icon as={FaTags} />
                    </Button>
                </DrawerTrigger>
                <DrawerContent
                    rounded={'md'}
                    bg={'gray.900'}
                    position={'fixed'}
                    padding={5}
                    inset={0}
                >
                    <DrawerHeader>
                        <DrawerActionTrigger asChild>
                            <CloseButton color={'white'} />
                        </DrawerActionTrigger>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit}>
                        <SimpleGrid gap={5} padding={5}>
                            {tags.map((tag: Tag) => (
                                <Box
                                    key={tag.id}
                                    p={2}
                                    rounded="md"
                                    bg="gray.700"
                                >
                                    <Checkbox
                                        checked={selectedTags.includes(tag.id)}
                                        onCheckedChange={() => handleTagChange(tag.id)}
                                        variant={'outline'}
                                        bg={tag.hex}
                                    >
                                        {tag.name}
                                    </Checkbox>
                                </Box>
                            ))}
                        </SimpleGrid>
                        <Center>
                            <Button
                                type="submit"
                                padding={5}
                                bg={'gray.600'}
                                _hover={{ background: 'gray.700' }}
                                color="white"
                            >
                                <Icon as={FaCheck} />
                            </Button>
                        </Center>
                    </form>
                </DrawerContent>
            </DrawerRoot>
        </Box>
    );
};

