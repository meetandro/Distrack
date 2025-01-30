import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ModifyTags } from '../components/tag/modify-tags';
import { Box, Button, Image, Input, Stack } from '@chakra-ui/react';
import { Field } from '../components/ui/field';
import { FaRegEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { mapColor, mapCondition } from '../utils/enum-mapper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { deleteCollectible, updateCollectible } from '../state/collectibleSlice';
import { useCollectibles } from '../hooks/useCollectibles';
import { Collectible } from '../models/collectible';
import { useCategories } from '../hooks/useCategories';

export const CollectibleDetails = () => {
    const { id, collectibleId } = useParams<{ id: string, collectibleId: string }>();
    const { filters } = useSelector((state: RootState) => state.collectibles);
    const collectibles = useCollectibles(Number(id), 1, 10, filters);
    const collectible = collectibles.find(collectible => collectible.id == Number(collectibleId))
    const categories = useCategories();
    const [images, setImages] = useState<(File | string)[]>(
        collectible?.images ?? []
    );

    const [checked, setChecked] = useState(false)

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit } = useForm<Collectible>();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages((prevImages) => [
                ...prevImages,
                ...Array.from(e.target.files || []),
            ]);
        }
    };
    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing)
        setImages(collectible?.images ?? [])
    }

    const onSubmit = (data: Collectible) => {
        setIsEditing(false);
        dispatch(updateCollectible({ data: { ...data, id: collectibleId, collectionId: id, isPatented: checked }, images: images }));
        navigate(`/collections/${id}`)
    }

    useEffect(() => {
        if (collectible) {
            setChecked(collectible.isPatented || false)
        }
    }, [collectible])

    const acquiredDate = collectible?.acquiredDate ? new Date(collectible.acquiredDate) : new Date();
    const formattedDate = acquiredDate.toISOString();

    if (!collectible) return <p>Loading...</p>;

    return (
        <Box className="flex items-center justify-center min-h-screen">
            <Box className="w-1/2 mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100 my-10">
                <Box className="space-y-4">
                    <Box className="flex justify-between items-center">
                        <Button
                            onClick={() => toggleEditMode()}
                            className="text-blue-500 hover:underline flex items-center"
                        >
                            {isEditing ? <><FaRegEdit /> Cancel</> : <FaRegEdit />}
                        </Button>
                    </Box>

                    <Box className="space-y-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack>
                                <Field label={"Name"}>
                                    <Input
                                        {...register("name")}
                                        defaultValue={collectible.name}
                                        _disabled={{
                                            color: 'white',
                                            opacity: 1,
                                        }}
                                        type="text"
                                        disabled={!isEditing}
                                    />
                                </Field>
                                <Field label={"Description"}>
                                    <Input
                                        {...register("description")}
                                        defaultValue={collectible.description}
                                        _disabled={{
                                            color: 'white',
                                            opacity: 1,
                                        }}
                                        type="text"
                                        disabled={!isEditing}
                                    />
                                </Field>
                                <Field label={"Currency"}>
                                    <Input
                                        {...register("currency")}
                                        defaultValue={collectible.currency}
                                        _disabled={{
                                            color: 'white',
                                            opacity: 1,
                                        }}
                                        type="text"
                                        disabled={!isEditing}
                                    />
                                </Field>
                                <Field label="Patented" className="text-sm mb-1 flex items-center">
                                    <input
                                        {...register("isPatented")}
                                        checked={checked}
                                        onChange={() => setChecked(!checked)}
                                        type="checkbox"
                                        className="ml-2"
                                        disabled={!isEditing}
                                    />
                                </Field>
                                <Field label={"Value"}>
                                    <Input
                                        className='disabled:text-white disabled:opacity-100'
                                        {...register("value")}
                                        defaultValue={collectible.value}
                                        type="number"
                                        disabled={!isEditing}
                                    />
                                </Field>
                                <Field label="Acquired Date">
                                    <Input
                                        {...register("acquiredDate")}
                                        defaultValue={formattedDate.substring(0, 10)}
                                        _disabled={{
                                            color: 'white',
                                            opacity: 1,
                                        }}
                                        type="date"
                                        disabled={!isEditing}
                                    />
                                </Field>
                                <Field label="Condition">
                                    {isEditing ? (
                                        <select
                                            {...register("condition")}
                                            defaultValue={collectible.condition}
                                            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
                                        >
                                            <option value="" disabled>Select Condition</option>
                                            <option value="0">Mint</option>
                                            <option value="1">Very Good</option>
                                            <option value="2">Good</option>
                                            <option value="3">Acceptable</option>
                                            <option value="4">Damaged</option>
                                        </select>
                                    ) : (
                                        <p>{collectible.condition !== undefined ? mapCondition(collectible.condition) : 'No condition provided'}</p>
                                    )}
                                </Field>
                                <Field label="Color">
                                    {isEditing ? (
                                        <select
                                            {...register("color")}
                                            defaultValue={collectible.color}
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
                                    ) : (
                                        <p>{collectible.color !== undefined ? mapColor(collectible.color) : 'No color provided'}</p>
                                    )}
                                </Field>
                                <Field label="Category">
                                    {isEditing ? (
                                        <select
                                            {...register("categoryId")}
                                            defaultValue={collectible.categoryId}
                                            className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100"
                                        >
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p>{categories.find((cat) => cat.id === collectible.categoryId)?.name || 'No category selected'}</p>
                                    )}
                                </Field>

                                <Field label="Images">
                                    {isEditing ? (
                                        <>
                                            <Input
                                                onChange={handleFileChange}
                                                type="file"
                                                multiple
                                                className="w-full px-3 py-2 bg-gray-700 rounded-lg text-gray-100"
                                            />
                                            <Box className="flex flex-wrap mt-4">
                                                {images.map((image, index) => (
                                                    <Box key={index} className="relative m-1">
                                                        {typeof image === 'string' ? (  // URL case
                                                            <Image
                                                                src={`https://localhost:5001${image}`} // Display existing image from URL
                                                                alt={`Collectible ${index}`}
                                                                className="w-20 h-20 object-cover"
                                                            />
                                                        ) : (  // File object case
                                                            <Image
                                                                src={URL.createObjectURL(image)} // Display file preview
                                                                alt={`Collectible ${index}`}
                                                                className="w-20 h-20 object-cover"
                                                            />
                                                        )}
                                                        <Button
                                                            onClick={() => handleRemoveImage(index)}
                                                            className="absolute top-0 right-0 text-red-500"
                                                        >
                                                            X
                                                        </Button>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </>
                                    ) : (
                                        <Box className="flex flex-wrap">
                                            {collectible.images && collectible.images.map((image, index) => (
                                                <Image
                                                    key={index}
                                                    src={`https://localhost:5001${image}`} // Display existing image
                                                    alt={`Collectible ${index}`}
                                                    className="w-20 h-20 object-cover m-1"
                                                />
                                            ))}
                                        </Box>
                                    )}
                                </Field>
                            </Stack>

                            {isEditing && (
                                <Button
                                    type='submit'
                                    className="w-full py-2 mt-6 bg-green-600 rounded-lg hover:bg-green-500 transition-all flex items-center justify-center"
                                >
                                    Save Changes
                                </Button>
                            )}
                        </form>
                    </Box>

                    <Button
                        onClick={() => { dispatch(deleteCollectible(collectible.id)); navigate(`/collections/${collectible?.collectionId}`); }}
                        className="w-full py-2 mt-6 bg-red-600 rounded-lg hover:bg-red-500 transition-all flex items-center justify-center"
                    >
                        Delete Collectible
                    </Button>

                    <ModifyTags collectible={collectible} />

                    <Link to={`/collections/${collectible.collectionId}`} className="w-full py-2 mt-6 bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-all flex items-center justify-center">
                        Back to collection
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};
