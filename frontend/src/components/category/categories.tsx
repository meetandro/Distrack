import { useState } from 'react';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { CategoryForm } from './category-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { deleteCategory } from '../../state/category-slice';
import { useCategories } from '../../hooks/use-categories';
import { Category } from '../../models/category';
import {
    Box,
    Text,
    SimpleGrid,
    GridItem,
    Button,
    DialogBody,
    DialogContent,
    DialogRoot,
    DialogTrigger,
    Icon
} from '@chakra-ui/react';


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
        <Box
            color="gray.100"
            px={6}
        >
            <SimpleGrid
                gap={5}
                columns={{ base: 1, sm: 1, md: 2, lg: 3 }}
                minWidth={60}
            >
                {categories.length > 0 && categories.map((category) => (
                    <GridItem
                        key={category.id}
                        display={'flex'}
                        bg="gray.700"
                        p={5}
                        rounded="lg"
                        color="gray.200"
                        shadow="md"
                    >
                        <Box width="10/12">
                            <Text>{category.name}</Text>
                        </Box>
                        <Box
                            width="2/12"
                            display="flex"
                            justifyContent="flex-end"
                        >
                            <DialogRoot open={openUpdate} onOpenChange={(e) => setOpenUpdate(e.open)}>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() => handleEditClick(category)}
                                        bg="gray.500"
                                        _hover={{
                                            bg: "green.500"
                                        }}
                                        marginRight={5}
                                        color="white"
                                    >
                                        <Icon as={FaPen} />
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
                                        {selectedCategory && <CategoryForm existingCategory={selectedCategory} onClose={() => setOpenUpdate(false)} />}
                                    </DialogBody>
                                </DialogContent>
                            </DialogRoot>
                            <Button
                                onClick={() => dispatch(deleteCategory(category.id))}
                                bg="red.500"
                                _hover={{
                                    bg: "red.400"
                                }}
                                color="white"
                            >
                                <Icon as={FaTrash} />
                            </Button>
                        </Box>
                    </GridItem>
                ))}
                {categories.length === 0 && (
                    <Text>No Categories</Text>
                )}
            </SimpleGrid>

            <DialogRoot open={openCreate} onOpenChange={(e) => setOpenCreate(e.open)}>
                <DialogTrigger asChild>
                    <Button
                        bg="gray.600"
                        _hover={{
                            bg: "gray.500"
                        }}
                        p={4}
                        marginTop={4}
                        rounded="lg"
                        color="white"
                    >
                        <Icon as={FaPlus} />
                    </Button>
                </DialogTrigger>
                <DialogContent
                    position="fixed"
                    top={0}
                    right={0}
                    left={0}
                    borderWidth={2}
                    borderColor="gray.600"
                    bg="gray.800"
                >
                    <DialogBody>
                        <CategoryForm onClose={() => setOpenCreate(false)} />
                    </DialogBody>
                </DialogContent>
            </DialogRoot>
        </Box>
    );
};

