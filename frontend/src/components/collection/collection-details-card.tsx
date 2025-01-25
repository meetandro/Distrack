import { Collection } from '../../models/collection';
import { formatDate } from '../../utils/format-date';
import { Box, Button, Editable, Text } from '@chakra-ui/react';

interface Props {
    collection: Collection;
    handleChange: any;
    handleSubmit: any;
    handleDelete: any;
}

export const CollectionDetailsCard = ({ collection, handleChange, handleSubmit, handleDelete }: Props) => {
    const formattedDate = formatDate(collection.createdDate);

    return (
        <Box className="bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100 mt-4">
            <form onSubmit={handleSubmit}>
                <Editable.Root _hover={{ color: 'black' }} name='name' value={collection.name} onChange={handleChange} defaultValue={collection.name}>
                    <Editable.Preview />
                    <Editable.Input />
                </Editable.Root>

                <Editable.Root _hover={{ color: 'black' }} name='description' value={collection.description} onChange={handleChange} defaultValue={collection.description}>
                    <Editable.Preview />
                    <Editable.Input />
                </Editable.Root>

                <Text>Created at {formattedDate}</Text>

                <Button type='submit' bg={'green'} padding={5} _hover={{ background: "green.700" }}>submit</Button>
            </form>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-all">
                Delete
            </button>
        </Box>
    );
};
