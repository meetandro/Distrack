import { useParams } from 'react-router-dom';
import { Tag } from '../../models/tag';
import {
    Badge,
    Box,
    Button,
    DialogBody,
    DialogContent,
    DialogRoot,
    DialogTrigger,
    GridItem,
    SimpleGrid,
    Text,
} from '@chakra-ui/react';
import { TagForm } from './tag-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { deleteTag } from '../../state/tag-slice';
import { useTags } from '../../hooks/use-tags';
import { useState } from 'react';

export const Tags = () => {
    const { id } = useParams<{ id: string }>();
    const tags = useTags(Number(id));
    const dispatch = useDispatch<AppDispatch>();

    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

    const handleEditClick = (tag: Tag) => {
        setSelectedTag(tag);
        setOpenUpdate(true);
    };

    return (
        <Box>
            <Text className="text-xl font-semibold">Tags for Collection {id}</Text>
            <SimpleGrid gap={5}>
                {tags.map((tag: Tag) => (
                    <GridItem key={tag.id} display={'flex'} className="bg-gray-800 p-4 rounded-lg text-gray-100 shadow-md">
                        <Box width={'10/12'}>
                            <Text>{tag.name}</Text>
                            <Badge width={'1/3'} background={tag.hex}>{tag.name}</Badge>
                        </Box>
                        <Box width={'2/12'} display={'flex'} justifyContent={'flex-end'}>
                            <DialogRoot open={openUpdate} onOpenChange={(e) => setOpenUpdate(e.open)}>
                                <DialogTrigger asChild>
                                    <Button bg={'green'} onClick={() => handleEditClick(tag)}>
                                        Edit
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='fixed inset-0 bg-zinc-800 border-2 border-zinc-600'>
                                    <DialogBody>
                                        {selectedTag && <TagForm existingTag={selectedTag} onClose={() => setOpenUpdate(false)} />}
                                    </DialogBody>
                                </DialogContent>
                            </DialogRoot>
                            <Button
                                onClick={() => dispatch(deleteTag(tag.id))}
                                className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-500 transition-all"
                            >
                                Delete
                            </Button>
                        </Box>
                    </GridItem>
                ))}
            </SimpleGrid>

            <DialogRoot open={openCreate} onOpenChange={(e) => setOpenCreate(e.open)}>
                <DialogTrigger asChild>
                    <Button
                        className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all"
                    >
                        Create Tag
                    </Button>
                </DialogTrigger>
                <DialogContent className='fixed inset-0 bg-zinc-800 border-2 border-zinc-600'>
                    <DialogBody>
                        <TagForm onClose={() => setOpenCreate(false)} />
                    </DialogBody>
                </DialogContent>
            </DialogRoot>
        </Box>
    );
};

