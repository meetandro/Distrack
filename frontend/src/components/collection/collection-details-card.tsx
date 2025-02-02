import { useForm } from 'react-hook-form';
import { Collection } from '../../models/collection';
import { Box, Button, Editable, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { deleteCollection, updateCollection } from '../../state/collection-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';

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
        <Box className="bg-zinc-800 p-3 rounded-lg shadow-lg mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Editable.Root {...register("name")} defaultValue={collection.name}>
                    <Editable.Preview className='hover:bg-zinc-700' />
                    <Editable.Input className='bg-zinc-700' />
                </Editable.Root>

                <Editable.Root className='mt-2' {...register("description")} defaultValue={collection.description}>
                    <Editable.Preview className='hover:bg-zinc-700' />
                    <Editable.Input className='bg-zinc-700' />
                </Editable.Root>

                <Text className='mb-2'>Created at {collection.createdDate.slice(0, 10)}</Text>

                <Button className='bg-green-500 p-5 hover:bg-green-600' type='submit'>
                    <FaCheck />
                </Button>
                <Button
                    onClick={() => setShowDeletionModal(!showDeletionModal)}
                    className="p-5 ml-5 bg-red-500 hover:bg-red-600"
                >
                    <FaTrash size={20} />
                </Button>
            </form>

            {showDeletionModal === true && (
                <Box className='flex flex-col'>
                    <Button className='bg-zinc-700 p-5 mt-5 hover:bg-red-950' onClick={() => { dispatch(deleteCollection(collection.id)); navigate('/') }}>
                        Are you sure?
                        <Text className='text-red-700'>WARNING: This will delete the WHOLE collection.</Text>
                    </Button>
                    <Button className='bg-zinc-700 p-5 mt-3 hover:bg-green-950' onClick={() => setShowDeletionModal(false)}>
                        <Text className='text-green-500'>Cancel Deletion</Text>
                    </Button>
                </Box>
            )}
        </Box >
    );
};
