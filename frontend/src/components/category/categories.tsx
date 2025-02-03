import { useState } from 'react';
import { Box, Text, SimpleGrid, GridItem, Button, DialogBody, DialogContent, DialogRoot, DialogTrigger } from '@chakra-ui/react';
import { CategoryForm } from './category-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { deleteCategory } from '../../state/category-slice';
import { useCategories } from '../../hooks/use-categories';
import { Category } from '../../models/category';

export const Categories = () => {
    const categories = useCategories();
    const dispatch = useDispatch<AppDispatch>();

    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleEditClick = (category: Category) => {
        setSelectedCategory(category);
        setOpenUpdate(true);
    };

    return (
        <Box className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100">
            <Text as={'h2'}>Global Categories</Text>
            <SimpleGrid gap={5}>
                {categories.map((category) => (
                    <GridItem key={category.id} display={'flex'} className="bg-gray-800 p-4 rounded-lg text-gray-100 shadow-md">
                        <Box width={'10/12'}>
                            <Text>{category.name}</Text>
                        </Box>
                        <Box width={'2/12'}>
                            <DialogRoot open={openUpdate} onOpenChange={(e) => setOpenUpdate(e.open)}>
                                <DialogTrigger asChild>
                                    <Button bg={'green'} onClick={() => handleEditClick(category)}>Edit</Button>
                                </DialogTrigger>
                                <DialogContent className='fixed top-0 left-0 right-0 bg-zinc-800 border-2 border-zinc-600'>
                                    <DialogBody>
                                        {selectedCategory && <CategoryForm existingCategory={selectedCategory} onClose={() => setOpenUpdate(false)} />}
                                    </DialogBody>
                                </DialogContent>
                            </DialogRoot>
                            <Button bg={'red'} float={'right'} onClick={() => dispatch(deleteCategory(category.id))}>Delete</Button>
                        </Box>
                    </GridItem>
                ))}
            </SimpleGrid>

            <DialogRoot open={openCreate} onOpenChange={(e) => setOpenCreate(e.open)}>
                <DialogTrigger asChild>
                    <Button>Create a New Category</Button>
                </DialogTrigger>
                <DialogContent className='fixed top-0 right-0 left-0 bg-zinc-800 border-2 border-zinc-600'>
                    <DialogBody>
                        <CategoryForm onClose={() => setOpenCreate(false)} />
                    </DialogBody>
                </DialogContent>
            </DialogRoot>
        </Box>
    );
};

