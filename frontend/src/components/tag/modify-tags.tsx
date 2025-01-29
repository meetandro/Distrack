import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCollectible } from '../../hooks/use-collectible';
import { Box, Button, Center, DrawerActionTrigger, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerRoot, DrawerTrigger, SimpleGrid } from '@chakra-ui/react';
import { CloseButton } from '../ui/close-button';
import { Checkbox } from '../ui/checkbox';
import { Tag } from '../../models/tag';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { addTagsToCollectible, getTags } from '../../state/tagSlice';

export const ModifyTags = () => {
    const { id, collectibleId } = useParams<{ id: string; collectibleId: string }>();
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const { collectible } = useCollectible(Number(collectibleId));
    const dispatch = useDispatch<AppDispatch>();
    const { tags } = useSelector((state: RootState) => state.tags)

    useEffect(() => {
        dispatch(getTags(Number(id)));
        setSelectedTags(collectible?.tags || []);
    }, [id, collectible?.tags, dispatch]);

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
                        className="w-full py-2 mt-6 bg-purple-600 rounded-lg hover:bg-purple-500 transition-all flex items-center justify-center"
                    >
                        Modify Tags
                    </Button>
                </DrawerTrigger>
                <DrawerContent rounded={'md'} bg={'black'} position={'fixed'} padding={5} className='inset-0 fixed'>
                    <DrawerHeader>
                        <DrawerActionTrigger asChild>
                            <CloseButton color={'white'} />
                        </DrawerActionTrigger>
                    </DrawerHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <SimpleGrid gap={5} padding={5}>
                            {tags.map((tag: Tag) => (
                                <Box key={tag.id} className="flex items-center bg-gray-700 p-2 rounded-md shadow hover:bg-gray-600 transition-colors">
                                    <Checkbox variant={'outline'} bg={tag.hex} checked={selectedTags.includes(tag.id)} onCheckedChange={() => handleTagChange(tag.id)}>{tag.name}</Checkbox>
                                </Box>
                            ))}
                        </SimpleGrid>
                        <Center>
                            <Button
                                type="submit"
                                padding={5}
                                bg={'gray'}
                                _hover={{ background: 'gray.800' }}
                            >
                                Apply
                            </Button>
                        </Center>
                    </form>
                </DrawerContent>
            </DrawerRoot>
        </Box>
    );
};
