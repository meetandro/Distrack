import { Link, useNavigate, useParams } from 'react-router-dom';
import { Collectibles } from '../components/collectible/collectibles';
import { Box, Button, DialogBody, DialogContent, DialogRoot, DialogTrigger, Text } from '@chakra-ui/react';
import { CollectionDetailsCard } from '../components/collection/collection-details-card';
import { BiHome } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa';
import { useCollections } from '../hooks/use-collections';

export const CollectionDetails = () => {
    const { id } = useParams<{ id: string }>();
    const collections = useCollections();
    const collection = collections.find(collection => collection.id == Number(id))
    const navigate = useNavigate();

    if (!collection) return;

    return (
        <Box>
            <Box className="relative">
                <Link to={`/collections/${collection.id}/collectibles/new`}
                    className="text-white p-3 rounded-lg top-20 left-4 fixed"
                >
                    <IoIosAddCircleOutline size={20} />
                </Link>

                <Link to={`/`}
                    className="text-white p-3 rounded-lg top-28 left-4 fixed"
                >
                    <BiHome size={20} />
                </Link>

                <DialogRoot>
                    <DialogTrigger asChild>
                        <Button
                            className="text-white p-2 rounded-lg top-12 left-4 fixed"
                        >
                            <CiSettings size={20} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='text-white bg-zinc-700 rounded-lg top-2 left-14 fixed z-10 p-2'>
                        <DialogBody className='p-0 m-0'>
                            <Box
                                onClick={() => navigate(`/collections/${id}/settings`)}
                                className="p-2 text-sm text-gray-300 bg-zinc-800 rounded-md hover:bg-zinc-900 text-center cursor-pointer"
                            >
                                <Text display={'inline'}>Tags & Categories</Text> <FaArrowRight className='inline text-lg align-middle' />
                            </Box>

                            <CollectionDetailsCard collection={collection} />
                        </DialogBody>
                    </DialogContent>
                </DialogRoot>
            </Box>

            <Collectibles />
        </Box>
    );
};
