import { useState } from 'react';
import { Category } from '../../models/category';
import { Box, Text, SimpleGrid, GridItem, Button } from '@chakra-ui/react';
import { CategoryForm } from './category-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { deleteCategory } from '../../state/categorySlice';
import { useCategories } from '../../hooks/useCategories';

export const Categories = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useCategories();
    const [activeCategory, setActiveCategory] = useState<Category | null | undefined>(undefined);

    return (
        <Box>
            <Text as={'h2'}>Global Categories</Text>
            <SimpleGrid gap={5}>
                {categories.map((category) => (
                    <GridItem key={category.id} display={'flex'} className="bg-gray-800 p-4 rounded-lg text-gray-100 shadow-md">
                        <Box width={'10/12'}>
                            <Text>{category.name}</Text>
                        </Box>
                        <Box width={'2/12'}>
                            <Button bg={'green'} onClick={() => setActiveCategory(category)}>Edit</Button>
                            <Button bg={'red'} float={'right'} onClick={() => dispatch(deleteCategory(category.id))}>Delete</Button>
                        </Box>
                    </GridItem>
                ))}
            </SimpleGrid>

            <Button onClick={() => setActiveCategory(null)}>Create a New Category</Button>

            {activeCategory !== undefined && (
                <CategoryForm existingCategory={activeCategory} onClose={() => setActiveCategory(undefined)} />
            )}
        </Box>
    );
};
