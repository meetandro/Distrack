import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Collectible } from '../models/collectible';
import { CategoryForm } from '../components/category/category-form';
import { useForm } from 'react-hook-form';
import { Field } from '../components/ui/field';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { createCollectible } from '../state/collectible-slice';
import { useCategories } from '../hooks/use-categories';
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from '../components/ui/accordion';
import { FaCheck, FaPlus } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import {
    Box,
    Button,
    Icon,
    Input,
    Stack
} from '@chakra-ui/react';

export const CollectibleForm = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [showCreateCategory, setShowCreateCategory] = useState(false); // Toggle for CreateCategory component
    const [images, setImages] = useState<File[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const categories = useCategories();

    const { register, handleSubmit, reset } = useForm<Collectible>({
        defaultValues: {
            name: '',
            description: '',
            color: 0,
            currency: '',
            value: 0,
            condition: 0,
            acquiredDate: new Date().toISOString().slice(0, 10),
            isPatented: false,
            collectionId: Number(id),
            categoryId: 0,
        }
    });

    if (categories.length === 0) {
        return <Link style={{ color: "cyan" }} to={`/collections/${id}/settings`}>There are no existing categories to assign to collectibles. Please head to the settings page and create one.</Link>
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const onSubmit = async (data: Collectible) => {
        if (data.categoryId === 0) {
            data.categoryId = categories[0].id;
        }
        dispatch(createCollectible({ data: data, images: images }))

        reset();

        navigate(`/collections/${id}`)
    };

    return (
        <Box p={5} minWidth={'64'}>
            <Box
                color="gray.200"
                p={5}
                rounded="sm"
                borderColor="gray.700"
                borderWidth={2}
            >
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <Box spaceY={4}>
                        <Stack direction={{ base: "column", md: "row" }} gap={5}>
                            <Field label="Name" required>
                                <Input
                                    {...register("name")}
                                    type="text"
                                    borderWidth={2}
                                    borderColor={"gray.700"}
                                    padding={2}
                                />
                            </Field>
                            <Field label="Description">
                                <Input
                                    {...register("description")}
                                    type="text"
                                    borderWidth={2}
                                    borderColor={"gray.700"}
                                    padding={2}
                                />
                            </Field>
                        </Stack>

                        <Stack direction={{ base: 'column', md: 'row' }} gap={5}>
                            <Field label="Condition">
                                <select
                                    {...register("condition")}
                                    style={{ padding: 10 }}
                                >
                                    <option value="" disabled>Select Condition</option>
                                    <option value="0">Mint</option>
                                    <option value="1">Very Good</option>
                                    <option value="2">Good</option>
                                    <option value="3">Acceptable</option>
                                    <option value="4">Damaged</option>
                                </select>
                            </Field>
                            <Field label="Color">
                                <select
                                    {...register("color")}
                                    style={{ padding: 10 }}
                                >
                                    <option value="" disabled>Select Color</option>
                                    <option value="0">Black</option>
                                    <option value="1">Blue</option>
                                    <option value="2">Bronze</option>
                                    <option value="3">Crimson</option>
                                    <option value="4">Cyan</option>
                                    <option value="5">Dark Gray</option>
                                    <option value="6">Forest Green</option>
                                    <option value="7">Gold</option>
                                    <option value="8">Gray</option>
                                    <option value="9">Green</option>
                                    <option value="10">Lime</option>
                                    <option value="11">Orange</option>
                                    <option value="12">Pink</option>
                                    <option value="13">Purple</option>
                                    <option value="14">Red</option>
                                    <option value="15">Silver</option>
                                    <option value="16">Violet</option>
                                    <option value="17">Wheat</option>
                                    <option value="18">White</option>
                                    <option value="19">Yellow</option>
                                </select>
                            </Field>
                            <Field label="Category" width={'full'} required>
                                <Stack direction={'row'} width={'full'}>
                                    <select
                                        {...register("categoryId")}
                                    >
                                        {categories.length > 0 ? (
                                            categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No categories available</option>
                                        )}
                                    </select>
                                    <Button
                                        type="button"
                                        onClick={() => setShowCreateCategory(true)}
                                        color="blue.500"
                                        bg="none"
                                    >
                                        <Icon as={FaPlus} />
                                    </Button>
                                </Stack>
                            </Field>
                        </Stack>

                        <Field label="Acquired Date">
                            <Input
                                {...register("acquiredDate")}
                                p={2}
                                bg="gray.800"
                                type='date'
                            />
                        </Field>

                        <AccordionRoot collapsible>
                            <AccordionItem value={'tags'} color={'white'} bg={'gray.800'} rounded={'sm'}>
                                <AccordionItemTrigger p={5}>Images</AccordionItemTrigger>
                                <AccordionItemContent>
                                    <Field>
                                        <Input
                                            onChange={handleFileChange}
                                            type="file"
                                            multiple
                                            p={3}
                                        />
                                    </Field>
                                </AccordionItemContent>
                            </AccordionItem>
                        </AccordionRoot>

                        <AccordionRoot collapsible>
                            <AccordionItem value={'tags'} color={'white'} bg={'gray.800'} rounded={'sm'}>
                                <AccordionItemTrigger p={5}>Other Fields</AccordionItemTrigger>
                                <AccordionItemContent>
                                    <Stack direction={{ base: "column", md: "row" }} gap={5} p={5}>
                                        <Field label="Currency">
                                            <Input
                                                {...register("currency")}
                                                type="text"
                                                borderWidth={2}
                                                borderColor={"gray.700"}
                                                padding={2}
                                            />
                                        </Field>
                                        <Field label="Value">
                                            <Input
                                                {...register("value")}
                                                type="number"
                                                borderWidth={2}
                                                borderColor={"gray.700"}
                                                padding={2}
                                            />
                                        </Field>
                                        <Field label="Patented">
                                            <input
                                                {...register("isPatented")}
                                                type="checkbox"
                                            />
                                        </Field>
                                    </Stack>
                                </AccordionItemContent>
                            </AccordionItem>
                        </AccordionRoot>

                        <Stack direction="row">
                            <Button
                                type="submit"
                                bg="gray.600"
                                rounded="lg"
                                _hover={{
                                    bg: "gray.700"
                                }}
                                color="white"
                                title='Create'
                            >
                                <Icon as={FaCheck} />
                            </Button>


                            <Link to={`/collections/${id}`}>
                                <Button
                                    title='Back to collection'
                                    bg="red.600"
                                    rounded="lg"
                                    _hover={{
                                        bg: "red.700"
                                    }}
                                    color="white"
                                >
                                    <Icon as={IoMdExit} />
                                </Button>
                            </Link>
                        </Stack>

                    </Box>
                </form>
            </Box>
            {
                showCreateCategory && (
                    <Box
                        borderColor="gray.700"
                        rounded="sm"
                        p={6}
                        color="gray.200"
                        marginTop={5}
                        borderWidth={2}
                    >
                        <CategoryForm onClose={() => setShowCreateCategory(false)} />
                    </Box>
                )
            }
        </Box>
    );
};

