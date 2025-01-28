import { useForm } from 'react-hook-form';
import { Collection } from '../../models/collection';
import { formatDate } from '../../utils/format-date';
import { Box, Button, Editable, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { CollectionContext } from '../../context/collections-context';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTrash } from 'react-icons/fa';

interface Props {
    collection: Collection;
}

export const CollectionDetailsCard = ({ collection }: Props) => {
    const { register, handleSubmit } = useForm<Collection>({
        defaultValues: collection
    });
    const formattedDate = formatDate(collection.createdDate);
    const { editCollection, removeCollection } = useContext(CollectionContext)
    const navigate = useNavigate();

    const [showDeletionModal, setShowDeletionModal] = useState<boolean>(false);

    const onSubmit = (data: Collection) => {
        editCollection(data);
    }

    return (
        <Box className="bg-zinc-800 p-3 rounded-lg shadow-lg mt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Editable.Root className='hover:text-black' {...register("name")} defaultValue={collection.name}>
                    <Editable.Preview />
                    <Editable.Input />
                </Editable.Root>

                <Editable.Root className='hover:text-black' {...register("description")} defaultValue={collection.description}>
                    <Editable.Preview />
                    <Editable.Input />
                </Editable.Root>

                <Text className='mb-2'>Created at {formattedDate}</Text>

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
                    <Button className='bg-zinc-700 p-5 mt-5 hover:bg-red-950' onClick={() => { removeCollection(collection.id); navigate('/') }}>
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
