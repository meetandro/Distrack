import { useContext, useState } from 'react';
import { Category } from '../../models/category';
import { Box, Text, SimpleGrid, GridItem, Button } from '@chakra-ui/react';
import { CategoryForm } from './category-form';
import { CategoryContext } from '../../context/category-context';

export const Categories = () => {
    const { categories, removeCategory } = useContext(CategoryContext);

    const [showCreateCategory, setShowCreateCategory] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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
                            <Button bg={'green'} onClick={() => { setEditingCategory(category); }}>Edit</Button>
                            <Button bg={'red'} float={'right'} onClick={() => removeCategory(category.id)}>Delete</Button>
                        </Box>
                    </GridItem>
                ))}
            </SimpleGrid>

            <Button onClick={() => setShowCreateCategory(true)}>Create a New Category</Button>

            {showCreateCategory && (
                <CategoryForm onClose={() => setShowCreateCategory(false)} />
            )}

            {editingCategory && (
                <CategoryForm existingCategory={editingCategory} onClose={() => { setShowCreateCategory(false); setEditingCategory(null) }} />
            )}
        </Box>
    );
};
