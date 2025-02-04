import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { deleteCollection, updateCollection } from '../../state/collection-slice';
import { AppDispatch } from '../../state/store';
import { Collection } from '../../models/collection';
import { FaCheck, FaTrash } from 'react-icons/fa';
import {
    Box,
    Button,
    Editable,
    Stack,
    Text
} from '@chakra-ui/react';

interface Props {
    collection: Collection;
}

export const CollectionDetailsCard = ({ collection }: Props) => {
    const { register, handleSubmit } = useForm<Collection>({
        defaultValues: collection
    });
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [showDeletionModal, setShowDeletionModal] = useState<boolean>(false);

    const onSubmit = (data: Collection) => {
        dispatch(updateCollection(data));
    }

    return (
        <Stack
            bg="gray.800"
            p={3}
            rounded="lg"
            marginTop={2}
            gap={2}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <Stack>
                        <Editable.Root {...register("name")} defaultValue={collection.name}>
                            <Editable.Preview _hover={{ bg: "gray.700" }} />
                            <Editable.Input bg="gray.700" />
                        </Editable.Root>

                        <Editable.Root {...register("description")} defaultValue={collection.description}>
                            <Editable.Preview _hover={{ bg: "gray.700" }} />
                            <Editable.Input bg="gray.700" />
                        </Editable.Root>
                    </Stack>
                    <Text>Created at {collection.createdDate.slice(0, 10)}</Text>
                    <Stack direction="row">
                        <Button
                            type='submit'
                            p={5}
                            bg="gray.600"
                            _hover={{
                                bg: "green.500"
                            }}
                            color="white"
                        >
                            <FaCheck />
                        </Button>
                        <Button
                            onClick={() => setShowDeletionModal(!showDeletionModal)}
                            p={5}
                            bg="red.600"
                            _hover={{
                                bg: "red.500"
                            }}
                            color="white"
                        >
                            <FaTrash size={20} />
                        </Button>
                    </Stack>
                </Stack>
            </form>

            {showDeletionModal === true && (
                <Box>
                    <Text marginBottom={2}>Delete the whole collection?</Text>
                    <Stack direction="row" display="flex" flexWrap="wrap">
                        <Button
                            onClick={() => { dispatch(deleteCollection(collection.id)); navigate('/') }}
                            p={5}
                            bg="gray.700"
                            _hover={{
                                bg: "red.900"
                            }}
                        >
                            <Text color="red.600" fontWeight="medium">Confirm</Text>
                        </Button>
                        <Button
                            onClick={() => setShowDeletionModal(false)}
                            p={5}
                            bg="gray.700"
                            _hover={{
                                bg: "green.900"
                            }}
                        >
                            <Text color="green.600" fontWeight="medium">Cancel</Text>
                        </Button>
                    </Stack>
                </Box>
            )}
        </Stack>
    );
};

