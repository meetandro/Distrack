import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Collectible } from '../models/collectible';
import { CategoryForm } from '../components/category/category-form';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, Stack } from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { createCollectible } from '../state/collectibleSlice';
import { useCategories } from '../hooks/useCategories';

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
            acquiredDate: new Date(),
            isPatented: false,
            collectionId: Number(id),
            categoryId: 0,
        }
    });

    if (categories.length === 0) {
        return <Link className='text-blue-700' to={`/collections/${id}/settings`}>There are no existing categories to assign to collectibles. Please head to the settings page and create one.</Link>
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const onSubmit = async (data: Collectible) => {
        dispatch(createCollectible({ data: data, images: images }))

        reset();

        navigate(`/collections/${id}`)
    };

    return (
        <Box className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
                <Stack>
                    <Field label="Name" required>
                        <Input
                            {...register("name")}
                            type="text"
                            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </Field>
                    <Field label="Description">
                        <Input
                            {...register("description")}
                            type="text"
                            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </Field>
                    <Field label="Condition">
                        <select
                            {...register("condition")}
                            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
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
                            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
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
                    <Field label="Currency">
                        <Input
                            {...register("currency")}
                            type="text"
                            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </Field>
                    <Field label="Value">
                        <Input
                            {...register("value")}
                            type="number"
                            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </Field>
                    <Field label="Acquired Date">
                        <Input
                            {...register("acquiredDate")}
                            type='date'
                        />
                    </Field>
                    <Field label="Patented" className="text-sm mb-1 flex items-center">
                        <input
                            {...register("isPatented")}
                            type="checkbox"
                            className="ml-2"
                        />
                    </Field>
                    <Field label="Category">
                        <select
                            {...register("categoryId")}
                            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
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
                            onClick={() => setShowCreateCategory(true)} // Toggle CreateCategory
                            className="block text-blue-500 hover:underline mt-2"
                        >
                            Create a New Category
                        </Button>
                    </Field>
                    <Field label="Images">
                        <Input
                            onChange={handleFileChange}
                            type="file"
                            multiple
                            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </Field>
                    <Button
                        type="submit"
                        className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all"
                    >
                        Create Collectible
                    </Button>
                </Stack>
            </form>

            {showCreateCategory && (
                <Box className="mt-6 bg-gray-700 p-4 rounded-lg">
                    <CategoryForm
                        onClose={() => setShowCreateCategory(false)} // Close CreateCategory
                    />
                </Box>
            )}
        </Box>
    );
};
