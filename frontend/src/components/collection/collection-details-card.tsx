import { useForm } from 'react-hook-form';
import { Collection } from '../../models/collection';
import { formatDate } from '../../utils/format-date';
import { Box, Button, Editable, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { CollectionContext } from '../../context/collections-context';
import { useNavigate } from 'react-router-dom';

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

    const onSubmit = (data: Collection) => {
        editCollection(data);
    }

    return (
        <Box className="bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100 mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Editable.Root _hover={{ color: 'black' }} {...register("name")} defaultValue={collection.name}>
                    <Editable.Preview />
                    <Editable.Input />
                </Editable.Root>

                <Editable.Root _hover={{ color: 'black' }} {...register("description")} defaultValue={collection.description}>
                    <Editable.Preview />
                    <Editable.Input />
                </Editable.Root>

                <Text>Created at {formattedDate}</Text>

                <Button type='submit' bg={'green'} padding={5} _hover={{ background: "green.700" }}>submit</Button>
            </form>
            <Button
                onClick={() => { removeCollection(collection.id); navigate('/') }}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-all"
            >
                Delete
            </Button>
        </Box>
    );
};
