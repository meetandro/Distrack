import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { deleteCollectible, updateCollectible } from '../state/collectible-slice';
import { useCategories } from '../hooks/use-categories';
import { mapColor, mapCondition } from '../utils/enum-mapper';
import { useForm } from 'react-hook-form';
import { Collectible } from '../models/collectible';
import { ModifyTags } from '../components/tag/modify-tags';
import { Field } from '../components/ui/field';
import { FaCheck, FaRegEdit, FaTrash } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import {
    AbsoluteCenter,
    Box,
    Button,
    Float,
    Icon,
    Image,
    Input,
    Spinner,
    Stack,
    Text
} from '@chakra-ui/react';
import { api } from '../utils/api';

export const CollectibleDetails = () => {
    const { id, collectibleId } = useParams<{ id: string, collectibleId: string }>();
    const [collectible, setCollectible] = useState<Collectible>();
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
        dispatch(updateCollectible({ data: { ...data, id: Number(collectibleId), collectionId: Number(id), isPatented: checked }, images: images }));
        navigate(`/collections/${id}`)
    }

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(
                `/collectibles/${collectibleId}`
            );
            setCollectible(response.data);
        };
        fetchData();
    }, [collectibleId]);

    useEffect(() => {
        if (collectible) {
            setChecked(collectible.isPatented || false)
            setImages(collectible.images)
        }
    }, [collectible])

    if (!collectible || !collectible.tags) return <AbsoluteCenter><Spinner /></AbsoluteCenter>;

    return (
        <Box p={5} minWidth={'64'}>
            <Box
                borderColor="gray.700"
                p={5}
                rounded="sm"
                color="gray.200"
                borderWidth={2}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field marginBottom={5}>
                        {isEditing ? (
                            <>
                                <Input
                                    onChange={handleFileChange}
                                    type="file"
                                    multiple
                                    border="none"
                                />
                                <Stack direction={{ base: "column", sm: "column", md: "row" }}>
                                    {images.map((image, index) => (
                                        <Box key={index} position="relative">
                                            {typeof image === 'string' ? (
                                                <Image
                                                    src={`https://localhost:5001${image}`}
                                                    alt={`Collectible ${index}`}
                                                    w={72}
                                                    h={72}
                                                    objectFit="cover"
                                                />
                                            ) : (
                                                <Image
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Collectible ${index}`}
                                                    w={72}
                                                    h={72}
                                                    objectFit="cover"
                                                />
                                            )}
                                            <Float placement="top-end" border="none" offsetX={7} offsetY={5}>
                                                <Button
                                                    onClick={() => handleRemoveImage(index)}
                                                    color="red.500"
                                                    bg={'red.100'}
                                                    rounded={'sm'}
                                                >
                                                    <Icon as={FaXmark} />
                                                </Button>
                                            </Float>
                                        </Box>
                                    ))}
                                </Stack>
                            </>
                        ) : (
                            <Box display="flex" flexWrap='wrap'>
                                {collectible.images && collectible.images.map((image, index) => (
                                    <Image
                                        key={index}
                                        src={`https://localhost:5001${image}`}
                                        alt={`Collectible ${index}`}
                                        w={72}
                                        h={72}
                                        objectFit="cover"
                                        margin={1}
                                    />
                                ))}
                            </Box>
                        )}
                    </Field>

                    {!isEditing ? (
                        <Text fontSize={"4xl"} marginBottom={5}>{collectible.name}</Text>
                    ) :
                        <Field>
                            <Input
                                {...register("name")}
                                defaultValue={collectible.name}
                                fontSize={'3xl'}
                                marginBottom={5}
                                padding={0}
                                _disabled={{
                                    color: 'white',
                                    opacity: 1,
                                }}
                                type="text"
                                disabled={!isEditing}
                                border="none"
                            />
                        </Field>
                    }

                    {isEditing && (
                        <Field>
                            <textarea
                                style={{
                                    background: 'none',
                                    width: '100%'
                                }}
                                {...register("description")}
                                defaultValue={collectible.description}
                                disabled={!isEditing}
                            />
                        </Field>
                    )}

                    {!isEditing && (
                        <p>{collectible.description}</p>
                    )}

                    {isEditing && (
                        <Stack direction={'row'}>
                            <Field fontSize={'3xl'}>
                                <Input
                                    _disabled={{
                                        color: 'white',
                                        opacity: 1,
                                    }}
                                    {...register("value")}
                                    defaultValue={collectible.value}
                                    type="number"
                                    disabled={!isEditing}
                                    border="none"
                                />
                            </Field>
                            <Field fontSize={'3xl'}>
                                <Input
                                    {...register("currency")}
                                    defaultValue={collectible.currency}
                                    _disabled={{
                                        color: 'white',
                                        opacity: 1,
                                    }}
                                    type="text"
                                    border="none"
                                    disabled={!isEditing}
                                />
                            </Field>
                        </Stack>
                    )}

                    {!isEditing && collectible.value !== 0 && (
                        <Stack>
                            <Text p={2} fontSize={'3xl'}>{collectible.value} {collectible.currency}</Text>
                        </Stack>
                    )}

                    <Field>
                        <Input
                            {...register("acquiredDate")}
                            defaultValue={collectible.acquiredDate.slice(0, 10)}
                            padding={0}
                            _disabled={{
                                cursor: 'text',
                                color: 'white',
                                opacity: 1,
                            }}
                            type="date"
                            border="none"
                            disabled={!isEditing}
                        />
                    </Field>

                    <Stack direction={{ base: "column", sm: "row" }} bg={'gray.800'} p={5} rounded={'sm'} gap={5}>
                        <Field label="Condition">
                            {isEditing ? (
                                <select
                                    {...register("condition")}
                                    defaultValue={collectible.condition}
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

                        <Field label='Color'>
                            {isEditing ? (
                                <select
                                    {...register("color")}
                                    defaultValue={collectible.color}
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
                        {(isEditing || collectible.isPatented) && (
                            <Field label="P">
                                <input
                                    {...register("isPatented")}
                                    checked={checked}
                                    onChange={() => setChecked(!checked)}
                                    type="checkbox"
                                    disabled={!isEditing}
                                />
                            </Field>
                        )}
                    </Stack>

                    {isEditing && (
                        <Button
                            type='submit'
                            bg="green.600"
                            _hover={{
                                bg: "green.500"
                            }}
                            marginTop={5}
                            color="white"
                            title='Save changes'
                        >
                            <Icon as={FaCheck} />
                        </Button>
                    )}
                </form>

                <Stack direction={'row'} marginTop={'5'}>
                    <ModifyTags collectible={collectible} />

                    <Button
                        onClick={() => toggleEditMode()}
                        bg={'gray.700'}
                        _hover={{
                            bg: 'green.600'
                        }}
                        color="white"
                        title={isEditing ? 'Discard changes' : 'Edit collectible'}
                    >
                        {isEditing ? <Icon as={FaXmark} /> : <Icon as={FaRegEdit} />}
                    </Button>

                    <Button
                        onClick={() => { dispatch(deleteCollectible(collectible.id)); navigate(`/collections/${collectible?.collectionId}`); }}
                        bg="red.600"
                        _hover={{
                            bg: "red.500"
                        }}
                        color="white"
                        title='Delete collectible'
                    >
                        <Icon as={FaTrash} />
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

